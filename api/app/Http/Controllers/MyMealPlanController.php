<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\MyMealPlan;
use App\Models\RecipePlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\MyMealPlanRequest;

class MyMealPlanController extends Controller
{
    public function index(Request $request)
    {
        $tags = $request->tags ?? [] ;
        $order = $request->sort ?? 'created_at';
        $total_recipe_min = $request->total_recipe_min;
        $total_recipe_max = $request->total_recipe_max;
        $total_days_min = $request->total_days_min;
        $total_days_max = $request->total_days_max;

        $recipes = MyMealPlan::withCount('recipePlans')
            ->where('user_id', auth('sanctum')->user()->id)
            ->when(count($tags), function($query) use($tags){
                foreach($tags as $tag) {
                    $query->where('title', 'LIKE', "%$tag%")
                    ->orWhereRelation('tags', 'label', 'LIKE', "%$tag%")
                    ->where('user_id', auth('sanctum')->user()->id);
                }
            })
            ->when($total_recipe_min, function($query) use($total_recipe_min) {
                $query->has('recipePlans', '>=', $total_recipe_min);
            })
            ->when($total_recipe_max, function($query) use($total_recipe_max) {
                $query->has('recipePlans', '<=', $total_recipe_max);
            })
            ->when($total_days_min, function($query) use($total_days_min) {
                $query->where('days', '>=', $total_days_min);
            })
            ->when($total_days_max, function($query) use($total_days_max) {
                $query->where('days', '<=', $total_days_max);
            })
            ->when($request, function ($query, $request){
                if (!$request->sort || $request->sort == "oldest") {
                    $query->orderBy('created_at', 'asc');
                } else if ($request->sort == "newest") {
                    $query->orderBy('created_at', 'desc');
                } else if ($request->sort == "title") {
                    $query->orderBy('title');
                }
            })
            ->get();

        return $recipes->toJson();
    }

    public function show($id)
    {
        $result = MyMealPlan::where('user_id', auth('sanctum')->user()->id)
            ->with('recipePlans.recipePlannable', 'tags.taggable')
            ->findOrFail($id);

        $byDays = [];
        foreach ($result->recipePlans as $plans) {
            $byDays[$plans['nth_day']][] = $plans; 
        }
        
        $result->byDays = $byDays;

        return response($result, 200);
    }

    public function store(MyMealPlanRequest $request)
    {
        DB::beginTransaction();
        try {
            $items = [];
            $myMealPlan = MyMealPlan::create([
                'title' => $request['title'],
                'days' => $request['days'],
                'user_id' => auth('sanctum')->user()->id,
                'meal_plan_type' => 'personal'
            ]);

            foreach ($request['recipePlans'] as $plan) {
                $recipe = Recipe::find($plan['recipe_id']);
                $items[] = $recipe->recipePlans()->create([
                    'my_meal_plan_id' => $myMealPlan['id'],
                    'meal_type' => $plan['meal_type'],
                    'nth_day' => $plan['nth_day'],
                ]);
            }

            $arrOfTags = [];
            foreach ($request['tags'] as $tag) {
                $arrOfTags[] = ['label' => $tag];
            }

            if ($arrOfTags) {
                $myMealPlan->tags()->createMany($arrOfTags);
            }

            foreach ($request['newIngredients'] as $ingredient) {
                Ingredient::create([
                    'title' => $ingredient['title'],
                    'content' => $ingredient['content'],
                    'ingredients' => $ingredient['ingredients'],
                    'nutritions' => $ingredient['nutritions'],
                ]);
                $ingrResult->recipePlans()->create([
                    'my_meal_plan_id' => $myMealPlan['id'],
                    'meal_type' => $ingredient['recipePlans']['meal_type'],
                    'nth_day' => $ingredient['recipePlans']['nth_day'],
                ]);
            }

            DB::commit();

            return response('Saved successfully.', 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }

    public function destroy($id) {
        $deleted = MyMealPlan::destroy($id);

        return $deleted;
    }

    public function update(Request $request)
    {
        $result = MyMealPlan::where('user_id', auth('sanctum')->user()->id)
            ->with('recipePlans.recipePlannable')
            ->findOrFail($request['id']);

        $result->recipePlans()->delete();
        $result->tags()->delete();

        $arrOfTags = [];
        foreach ($request['tags'] as $tag) {
            $arrOfTags[] = ['label' => $tag];
        }

        if ($arrOfTags) {
            $result->tags()->createMany($arrOfTags);
        }

        foreach ($request['recipePlans'] as $plan) {
            $recipe = Recipe::find($plan['recipe_id']);
            $recipe->recipePlans()->create([
                'my_meal_plan_id' => $result['id'],
                'meal_type' => $plan['meal_type'],
                'nth_day' => $plan['nth_day'],
            ]);
        }

        foreach ($request['newIngredients'] as $ingredient) {
            $ingrResult = Ingredient::create([
                'title' => $ingredient['title'],
                'content' => $ingredient['content'],
                'ingredients' => $ingredient['ingredients'],
                'nutritions' => $ingredient['nutritions'],
            ]);
            $ingrResult->recipePlans()->create([
                'my_meal_plan_id' => $result['id'],
                'meal_type' => $ingredient['recipePlans']['meal_type'],
                'nth_day' => $ingredient['recipePlans']['nth_day'],
            ]);
        }
        
        $result->title = $request['title'];
        $result->days = $request['days'];
        $result->save();

        return response($result, 200);
    }
}
