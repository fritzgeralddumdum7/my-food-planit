<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'email',
        'password',
        'provider',
        'provider_id',
        'hasJoined',
        'referral_code',
        'joined',
        'invited_by',
        'invited',
    ];

    public function inviter()
    {
        return $this->belongsTo(User::class, 'invited_by');
    }
}
