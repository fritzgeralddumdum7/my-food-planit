<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\StorePlan;
use App\Models\MyMealPlan;
use App\Models\PlanPurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlanPurchaseController extends Controller
{

    public function store(Request $request)
    {

        DB::beginTransaction();
        try {
            $plan = StorePlan::with('recipeStorePlans')->findOrFail($request->id);
    
            $purchase = PlanPurchase::create([
                'user_id' => auth('sanctum')->user()->id,
                'store_plan_id' => $plan->id,
                'price' => $plan->price,
                'status' => 'FREE',
            ]);
    
            $myMealPlan = MyMealPlan::create([
                'user_id' => auth('sanctum')->user()->id,
                'title' => $plan->title,
                'days' => $plan->days,
                'meal_plan_type' => 'free'
            ]);
    
            $purchase->saveStoreToRecipePlans($plan->recipeStorePlans, $myMealPlan->id);
            $purchase->saveStoreToTags($plan->tags());
            $purchase->saveToOntraport($plan->ontraport_id, $purchase->id);

            DB::commit();

            return response('Purchased successfully.', 200);
        } catch (Exception $e) {
            DB::rollback();
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }
}
