<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduledPlan extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function planable()
    {
        return $this->morphTo();
    }

    public function cart() {
        return $this->hasOne(CartItem::class);
    }

    static function checkConflict($myMealPlans, $startDate) {
        foreach ($myMealPlans->recipePlans as $plan) {
            $findDups = self::where([
                    'user_id' => auth('sanctum')->user()->id,
                    'date' => $startDate,
                    'meal_type' => $plan->meal_type
                ])
                ->count();

            if ($findDups) {
                return true;
            }
        }
    }

    static function createFoods($myMealPlans, $startDate, $isCalendar = false) {
        foreach ($myMealPlans->recipePlans as $plan) {
            $date = !$isCalendar ? $startDate : date('Y-m-d',(strtotime('-1 day' , strtotime($startDate))));
            ScheduledPlan::create([
                'user_id' => auth('sanctum')->user()->id,
                'planable_type' => $plan->recipe_plannable_type,
                'planable_id' => $plan->recipe_plannable_id,
                'date' => !$isCalendar ? $date : date('Y-m-d',(strtotime($plan->nth_day .' day' , strtotime($date)))),
                'meal_type' => $plan->meal_type,
            ]);
        }
    }
}
