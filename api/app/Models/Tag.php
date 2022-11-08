<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    use HasFactory;

    protected $guarded = [];
    public $timestamps = false;

    public function taggable(){
        return $this->morphTo();
    }

    public function recipe(){
        return $this->morphOne(Recipe::class, 'taggable'); 
    }

    public function myMealPlan(){
        return $this->morphOne(MyMealPlan::class, 'taggable'); 
    }

    public function storePlan(){
        return $this->morphOne(StorePlan::class, 'taggable'); 
    }
}
