<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feed extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }
    public function feedComments() {
        return $this->hasMany(FeedComment::class);
    }
    public function feedImages() {
        return $this->hasMany(FeedImage::class);
    }
    public function feedLikes() {
        return $this->hasMany(FeedLike::class);
    }
    public function userFeedLike() {
        return $this->hasOne(FeedLike::class)->where('user_id', auth('sanctum')->user()->id);
    }
    public function feedFoodDiares() {
        return $this->hasMany(FeedFoodDiary::class);
    }

}
