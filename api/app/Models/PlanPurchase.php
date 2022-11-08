<?php

namespace App\Models;

use App\Models\Tag;
use App\Models\RecipePlan;
use App\Jobs\OntraportPurchaseJob;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PlanPurchase extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function storePlan()
    {
        return $this->belongsTo(StorePlan::class);
    }

    public function saveStoreToRecipePlans($recipeStorePlans, $id)
    {
        foreach ($recipeStorePlans as $plan) {
            RecipePlan::create([
                'my_meal_plan_id' => $id,
                'meal_type' => $plan->meal_type,
                'nth_day' => $plan->nth_day,
                'recipe_plannable_type' => $plan->planable_type,
                'recipe_plannable_id' => $plan->planable_id,
            ]);
        }
    }

    public function saveStoreToTags($tags)
    {
        foreach ($tags as $tag) {
            Tag::create([
                'label' => $tag->label,
                'taggable_type' => $tag->taggable_type,
                'taggable_id' => $tag->taggable_id,
            ]);
        }
    }

    public function saveToOntraport($id, $purchaseId)
    {
        $ontraPayload = array(
            "contact_id"        => auth('sanctum')->user()->userDetail->ontraport_id,
            "invoice_template"  => 1,
            "chargeNow"         => "chargeLog",
            "offer"             => array(
                "products"        => array(
                    array(
                        "quantity"  => 1,
                        "id"        => $id,
                    )
                )
            )
        );

        OntraportPurchaseJob::dispatch($ontraPayload, $purchaseId);
    }
}
