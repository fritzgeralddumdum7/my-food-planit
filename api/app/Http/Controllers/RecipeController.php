<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Tag;
use App\Models\Recipe;
use App\Models\MyTracker;
use App\Models\ScheduledPlan;
use App\Models\MyMealPlan;
use App\Models\RecipePlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RecipeStoreRequest;
use App\Jobs\ImportJob;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->sort ?? '';
        $type = ($request->type && $request->type == "imported") ? 0 : 1;

        $recipes = Recipe::search($request->keyword)
            ->where('is_ninety_ten', $type)
            ->when($request->type == "imported", function ($query) {
                $query->where('user_id', auth('sanctum')->user()->id);
            })
            ->when($order, function ($query) use ($order) {
                if ($order == 'created_at') {
                    $query->orderBy('created_at', 'desc');
                } else {
                    $query->orderBy($order);
                }
            })
            ->with('tags')
            ->get();
        
        return $recipes->toJson();
    }

    public function paginatedRecipe(Request $request)
    {
        $order = $request->sort ?? '';
        $type = ($request->type && $request->type == "imported") ? 0 : 1;

        $recipes = Recipe::search($request->keyword)
            ->where('is_ninety_ten', $type)
            ->when($request->type == "imported", function ($query) {
                $query->where('user_id', auth('sanctum')->user()->id);
            })
            ->when($order, function ($query) use ($order) {
                if ($order == 'created_at') {
                    $query->orderBy('created_at', 'desc');
                } else {
                    $query->orderBy($order);
                }
            })
            ->with('tags')
            ->paginate(10);
        
        return $recipes->toJson();
    }
    public function dbByTags(Request $request)
    {
        $result = Tag::whereHasMorph('taggable',  [Recipe::class], function ($query) use ($request) {
                $query->where('is_ninety_ten', TRUE)
                    ->when($request->keyword, function ($query) use ($request) {
                        $query->where('title', 'LIKE', "%$request->keyword%");
                    });
            })
            ->when($request->tag, function ($query) use ($request) {
                $query->where('label', $request->tag);
            })
            ->with(['taggable'])
            ->get();
        
        $recipes = [];
        foreach ($result as $key) {
            $recipes[$key['label']][] = $key['taggable'];
        }
        
        return $recipes;
    }

    public function show($id)
    {
        try {
            $recipe = Recipe::with('tags')->findOrFail($id);

            if (!$this->verifyIfImported($recipe) && !$recipe->is_ninety_ten)
            {
                throw new Exception('Not Found');
            }

            return $recipe->toJson();
        } catch(Exception $e) {
            abort(404, $e->getMessage());
        }
    }

    public function store(RecipeStoreRequest $request)
    {
        
        DB::beginTransaction();
        try {
            $recipe = Recipe::create([
                'user_id' => auth('sanctum')->user()->id,
                'title' => $request['title'],
                'author' => $request['author'] ?? '',
                'image' => $request['image'],
                'url' => $request['url'],
                'serving' => $request['serving'],
                'ingredients' => $request['ingredients'],
                'nutritions' => $request['nutritions'],
                'directions' => $request['directions'],
            ]);

            $arrOfTags = [];
            foreach ($request['tags'] as $tag) {
                $arrOfTags[] = ['label' => $tag];
            }

            if ($arrOfTags) {
                $recipe->tags()->createMany($arrOfTags);
            }
            
            if ($request['isMealPlan']) {
                $planable = new ScheduledPlan;
                $planable->user_id = auth('sanctum')->user()->id;
                $planable->meal_type = $request['plan']['meal_type'];
                $planable->date = $request['plan']['date'];
                $recipe->scheduledPlan()->save($planable);
            }
            
            if ($request['isTracker']) {
                MyTracker::create([
                    'user_id' => auth('sanctum')->user()->id,
                    'planable_id' => $recipe['id'],
                    'planable_type' => 'App\\Models\\Recipe',
                    'meal_type' => $request['plan']['meal_type'],
                    'serving' => $request['plan']['serving'],
                    'date' => $request['plan']['date']
                ]);
            }

            DB::commit();

            return response('Recipe successfully imported', 200);
        } catch (Exception $e) {
            DB::rollback();
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
        
    }

    public function importJson(Request $request)
    {
        $request->validate([
            'json' => 'required'
        ]); 

        $json_data = json_decode($request->json);

        DB::beginTransaction();
        try {
            foreach($json_data as $recipe_data)
            {
                $instructions = $this->parseInstructions($recipe_data->instructions_flat);

                $recipe = Recipe::create([
                    'title' => $recipe_data->name,
                    'image' => $recipe_data->image_url,
                    'serving' => $recipe_data->servings,
                    'ingredients' => json_encode($recipe_data->ingredients_flat),
                    'nutritions' => json_encode($recipe_data->nutrition),
                    'directions' => json_encode($instructions),
                    'is_ninety_ten' => true,
                    'author' => $recipe_data->author_name != "" ? $recipe_data->author : "Anonymous",
                    'url' => '-',
                ]);

                foreach($recipe_data->tags->recipe_type as $tag)
                {
                    $model = new Tag;
                    $model->label = $tag;
                    $recipe->tags()->save($model);
                }

                $payload = [
                    'ingredients' => $recipe_data->ingredients,
                    'id' => $recipe->id,
                    'serving' => $recipe->serving
                ];

                ImportJob::dispatch($payload);
            }

            DB::commit();

            return response('Recipe successfully imported', 200);
        } catch(Exception $e) {
            DB::rollback();
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }
    
    public function getRelatedRecipe($id) {
        $recipe = Recipe::with('tags')->findOrFail($id);

        $recipe = Recipe::when($this->verifyIfImported($recipe), function ($query) {
            $query->where('user_id', auth('sanctum')->user()->id);
        })->findOrFail($id);
        $relatedRecipe = Recipe::whereHas('tags', function ($q) use ($recipe) {
            return $q->whereIn('label',$recipe->tags->pluck('label'));
        })
        ->where('id', '!=', $recipe->id)
        ->inRandomOrder()
        ->limit(4)
        ->get();
        return response($relatedRecipe);
    }

    private function parseInstructions($data)
    {
        $instructions = [];

        foreach($data as $instruction) {
            array_push($instructions, ($instruction->type == "instruction") ? $instruction->text : $instruction->name);
        }
        
        return $instructions;
    }

    private function verifyIfImported(Recipe $recipe)
    {
        return $recipe->is_ninety_ten == 0 && $this->verifyRecipeOwner($recipe);
    }

    private function verifyRecipeOwner(Recipe $recipe)
    {
        return $recipe->user_id == auth('sanctum')->user()->id;
    }
}