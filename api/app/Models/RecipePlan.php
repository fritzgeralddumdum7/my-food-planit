<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipePlan extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    /**
     * Get the MyMealPlan that owns the RecipePlan
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function MyMealPlan()
    {
        return $this->belongsTo(MyMealPlan::class, 'my_meal_plan_id', 'id');
    }

    public function recipePlannable(){
        return $this->morphTo();
    }

    public function recipe(){
        return $this->morphOne(Recipe::class, 'recipe_plannable'); 
    }
    
    public function ingredient(){
        return $this->morphOne(Ingredient::class, 'recipe_plannable'); 
    }
}
