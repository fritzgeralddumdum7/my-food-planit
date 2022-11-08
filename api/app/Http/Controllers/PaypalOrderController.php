<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\StorePlan;
use App\Models\MyMealPlan;
use App\Models\PlanPurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalOrderController extends Controller
{
    public function create(Request $request)
    {
        $plan = StorePlan::find($request->id);

        $provider = new PayPalClient;
        $provider->getAccessToken();
        $data = json_decode('{
            "intent": "CAPTURE",
            "purchase_units": [
              {
                "amount": {
                  "currency_code": "USD",
                  "value": "'.$plan->price.'"
                }
              }
            ]
        }', true);
        
        $order = $provider->createOrder($data); 

        PlanPurchase::create([
          'user_id' => auth('sanctum')->user()->id,
          'store_plan_id' => $plan->id,
          'price' => $plan->price,
          'paypal_id' => $order['id'],
          'status' => $order['status'],
        ]);

        return json_encode($order);
    }

    public function capture(Request $request)
    {   
      $provider = new PayPalClient;
      $provider->getAccessToken();
      $order = $provider->capturePaymentOrder($request->orderId);

      $purchase = PlanPurchase::where('paypal_id', $request->orderId)->firstOrFail();
      $purchase->status = $order['status'];
      $purchase->save();

      if($order['status'] === 'COMPLETED'){
        $plan = StorePlan::with('recipeStorePlans')->find($purchase->store_plan_id);
        $myMealPlan = MyMealPlan::create([
            'user_id' => auth('sanctum')->user()->id,
            'title' => $plan->title,
            'days' => $plan->days,
            'meal_plan_type' => 'premium'
        ]);
        $purchase->saveStoreToRecipePlans($plan->recipeStorePlans, $myMealPlan->id);
        $purchase->saveStoreToTags($plan->tags());
        $purchase->saveToOntraport($plan->ontraport_id, $purchase->id);
      }

      return json_encode($order);
    }

    public function createOrder(Request $request)
    {
      $plan = StorePlan::find($request->id);

      $planPurchase = PlanPurchase::create([
        'user_id' => auth('sanctum')->user()->id,
        'store_plan_id' => $plan->id,
        'price' => $plan->price,
        'status' => 'CREATED',
      ]);

      return $planPurchase;
    }

    public function captureOrder(Request $request, $id)
    {   
      $plan = StorePlan::findOrFail($id);

      $purchase = PlanPurchase::create([
        'user_id' => auth('sanctum')->user()->id,
        'store_plan_id' => $plan->id,
        'price' => (float) $request['purchase_units'][0]['amount']['value'],
        'paypal_id' => $request['id'],
        'status' => $request['status'],
      ]);

      if($request['status'] === 'COMPLETED'){
        $plan = StorePlan::with('recipeStorePlans')->find($purchase->store_plan_id);
        $myMealPlan = MyMealPlan::create([
            'user_id' => auth('sanctum')->user()->id,
            'title' => $plan->title,
            'days' => $plan->days,
            'meal_plan_type' => 'premium'
        ]);
        $purchase->saveStoreToRecipePlans($plan->recipeStorePlans, $myMealPlan->id);
        $purchase->saveStoreToTags($plan->tags());
        $purchase->saveToOntraport($plan->ontraport_id, $purchase->id);
      }

      return $plan;
    }
}
