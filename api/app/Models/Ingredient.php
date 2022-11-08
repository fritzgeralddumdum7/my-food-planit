<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function recipePlans()
    {
        return $this->morphOne(RecipePlan::class, 'recipe_plannable');
    }
    
    public function recipeStorePlans()
    {
        return $this->morphOne(RecipeStorePlan::class, 'planable');
    }
    
    public function scheduledPlan()
    {
        return $this->morphOne(ScheduledPlan::class, 'planable');
    }

    public function tracker()
    {
        return $this->morphOne(MyTracker::class, 'planable');
    }
    
    public function foodDiaries()
    {
        return $this->morphMany(FeedFoodDiary::class, 'planable');
    }
}
