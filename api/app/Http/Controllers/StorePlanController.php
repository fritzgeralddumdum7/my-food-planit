<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Recipe;
use App\Models\StorePlan;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Jobs\OntraportAddProductJob;
use App\Http\Requests\StorePlansRequest;

class StorePlanController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->sort ?? 'created_at';

        $plan = [];
        if ($request->isFree ) $plan [] = 'Free';
        if ($request->isPremium ) $plan [] = 'Premium';

        $plans = StorePlan::searchTitle($request->keyword)
            ->when($plan, function ($q) use ($plan) {
                $q->whereIn('plan', $plan);
            })
            ->MinMax($request, 'price', '>=', $request->price_min)
            ->MinMax($request, 'price', '<=', $request->price_max)
            ->MinMaxPlans($request, 'total_recipes', '>=', $request->total_recipe_min)
            ->MinMaxPlans($request, 'total_recipes', '<=', $request->total_recipe_max)
            ->MinMax($request, 'days', '>=', $request->total_days_min)
            ->MinMax($request, 'days', '<=', $request->total_days_max)
            ->withCount(['recipeStorePlans'])
            ->with('purchasedCompleted')
            ->orderBy($order)
            ->get();
        return $plans->toJson();
    }

    public function show($id)
    {
        $result = StorePlan::with('recipeStorePlans.planable', 'tags.taggable')
            ->with('purchasedCompleted')
            ->findOrFail($id);

        $byDays = [];
        foreach ($result->recipeStorePlans as $plans) {
            $byDays[$plans['nth_day']][] = $plans; 
        }
        
        $result->byDays = $byDays;

        return response($result, 200);
    }

    public function store(StorePlansRequest $request)
    {
        DB::beginTransaction();
        try {
            $storePlan = StorePlan::create([
                'title' => $request->title,
                'days' => $request->days,
                'price' => $request->price,
                'plan' => $request->plan,
            ]);

            $storePlan->saveRecipePlans($request->recipePlans, $storePlan->id);
            $storePlan->saveTags(collect($request->tags));
            $storePlan->saveIngredients(collect($request->ingredients), $storePlan->id);
            
            OntraportAddProductJob::dispatch(array(
                'name' => $request->title,
                'price' => $request->price
            ), $storePlan->id);

            DB::commit();

            return response('Saved successfully.', 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }

    public function destroy($id)
    {
        return StorePlan::destroy($id);
    }

    public function update(Request $request)
    {
        $result = StorePlan::with('recipeStorePlans.planable', 'tags.taggable')->findOrFail($request['id']);

        $result->recipeStorePlans()->delete();
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
            $recipe->recipeStorePlans()->create([
                'store_plan_id' => $result['id'],
                'meal_type' => $plan['meal_type'],
                'nth_day' => $plan['nth_day'],
            ]);
        }

        foreach ($request['newIngredients'] as $ingredient) {
            $ingrResult = Ingredient::create([
                'title' => $ingredient['title'],
                'content' => $ingredient['content']
            ]);
            $ingrResult->recipeStorePlans()->create([
                'store_plan_id' => $result['id'],
                'meal_type' => $ingredient['recipePlans']['meal_type'],
                'nth_day' => $ingredient['recipePlans']['nth_day'],
            ]);
        }

        $result->title = $request['title'];
        $result->days = $request['days'];
        $result->plan = $request['plan'];
        $result->price = $request['price'];
        $result->save();

        return response($result, 200);
    }
}
