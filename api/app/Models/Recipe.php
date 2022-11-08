<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeSearch($query, $search)
    {
        return $query->orWhere('title', 'LIKE', "%$search%");
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function tags(){
        return $this->morphMany(Tag::class, 'taggable'); 
    }
    
    public function recipePlans()
    {
        return $this->morphOne(RecipePlan::class, 'recipe_plannable');
    }
    
    public function recipeStorePlans()
    {
        return $this->morphOne(RecipeStorePlan::class, 'planable');
    }
    
    public function myTracker()
    {
        return $this->morphOne(MyTracker::class, 'planable');
    }
    
    public function scheduledPlan()
    {
        return $this->morphOne(ScheduledPlan::class, 'planable');
    }
    
    public function foodDiaries()
    {
        return $this->morphMany(FeedFoodDiary::class, 'planable');
    }
}
