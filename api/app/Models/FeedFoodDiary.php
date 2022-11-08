<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedFoodDiary extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'feed_food_diaries';

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function feed() {
        return $this->belongsTo(Feed::class);
    }

    public function planable()
    {
        return $this->morphTo();
    }

    public function recipe()
    {
        return $this->morphOne(Recipe::class, 'planable'); 
    }
    
    public function ingredient()
    {
        return $this->morphOne(Ingredient::class, 'planable'); 
    }

    public static function saveDiary($data, $id)
    {
        foreach($data as $item) {
            $item = json_decode($item);
            self::create([
                'user_id' => auth('sanctum')->user()->id,
                'feed_id' => $id,
                'meal_type' => $item->meal_type,
                'planable_type' => $item->planable_type,
                'planable_id' => $item->planable_id,
            ]);
        }
    }

}
