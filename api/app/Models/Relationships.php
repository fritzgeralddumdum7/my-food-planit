<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Relationships extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'follower_id',
        'following_id'
    ];

    public function follower()
    {
        return $this->belongsTo(User::class, 'follower_id', 'id');
    }

    public function following()
    {
        return $this->belongsTo(User::class, 'following_id', 'id');
    }
}
