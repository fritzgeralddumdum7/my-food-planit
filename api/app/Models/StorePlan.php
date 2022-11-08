<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StorePlan extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    
    public function tags()
    {
        return $this->morphMany(Tag::class, 'taggable'); 
    }

    public function recipeStorePlans()
    {
        return $this->hasMany(RecipeStorePlan::class);
    }

    public function purchase()
    {
        return $this->hasMany(PlanPurchase::class);
    }

    public function purchasedCompleted() {        
        return $this->purchase()
            ->where('user_id', auth('sanctum')->user()->id)
            ->whereIn('status', ['COMPLETED', 'FREE']);
    }

    public function scopeSearchTitle($query, $search)
    {
        return $query->orWhere('title', 'LIKE', "%$search%");
    }

    public function scopeMinMax($query, $request, $column, $operator, $value )
    {
        return $query->when($value, function ($q) use ($column, $operator, $value) {
            return $q->where($column, $operator, $value);
        });
    }

    public function scopeMinMaxPlans($query, $request, $column, $operator, $value )
    {
        return $query->when($value, function ($q) use ($column, $operator, $value) {
            return $q->has('recipeStorePlans', $operator, $value);
        });
    }

    public function saveRecipePlans($recipePlans, $id)
    {
        foreach ($recipePlans as $plan) {
            $recipe = Recipe::find($plan['recipe_id']);
            $recipe->recipeStorePlans()->create([
                'store_plan_id' => $id,
                'meal_type' => $plan['meal_type'],
                'nth_day' => $plan['nth_day'],
            ]);
        }
    }

    public function saveTags($tags)
    {
        $arrOfTags = [];
        foreach ($tags as $tag) {
            $arrOfTags[] = ['label' => $tag];
        }

        if ($arrOfTags) {
            $this->tags()->createMany($arrOfTags);
        }
    }

    public function saveIngredients($ingredients, $id)
    {
        foreach ($ingredients as $ingredient) {
            $ingrResult = Ingredient::create([
                'title' => $ingredient['title'],
                'content' => $ingredient['content']
            ]);
            $ingrResult->recipePlans()->create([
                'store_plan_id' => $id,
                'meal_type' => $ingredient['recipePlans']['meal_type'],
                'nth_day' => $ingredient['recipePlans']['nth_day'],
            ]);
        }
    }
}
