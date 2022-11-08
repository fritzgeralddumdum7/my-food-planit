<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeStorePlan extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function planable()
    {
        return $this->morphTo();
    }

    public function recipe(){
        return $this->morphOne(Recipe::class, 'planable'); 
    }
    
    public function ingredient(){
        return $this->morphOne(Ingredient::class, 'planable'); 
    }

    public function storePlan()
    {
        return $this->belongsTo(StorePlan::class);
    }
}
