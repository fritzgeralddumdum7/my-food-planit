<?php

namespace App\Models;

use App\Models\Feed;
use App\Models\Friend;
use App\Models\Recipe;
use App\Models\MyTracker;
use App\Models\UserDetail;
use App\Models\HealthVital;
use App\Models\Relationships;
use App\Models\DashboardSetting;
use App\Models\MyCircleSettings;
use App\Models\DashboardSettings;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'name',
        'password',
        'provider',
        'provider_id',
        'referral_code',
        'circleSettings',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userDetail() {
        return $this->hasOne(UserDetail::class);
    }

    public function recipes() {
        return $this->hasMany(Recipe::class);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\Auth\QueuedResetPassword($token));
    }
    public function feeds() {
        return $this->hasMany(Feed::class);
    }

    public function followers()
    {
        return $this->hasMany(Relationships::class, 'following_id');
    }

    public function following()
    {
        return $this->hasMany(Relationships::class, 'follower_id');
    }

    public function friends()
    {
        return $this->hasMany(Friend::class, 'invited_by');
    }

    public function getInviteLink()
    {
        return env('FE_APP_URL') . "/friend/" . $this->referral_code;
    }

    public function circleSettings()
    {
        return $this->hasOne(MyCircleSettings::class);
    }

    public function healthVitals()
    {
        return $this->hasMany(HealthVital::class);
    }

    public function trackers()
    {
        return $this->hasMany(MyTracker::class);
    }

    public function foodDiaryEntry()
    {
        return $this->hasMany(FoodDiaryEntry::class);
    }

    public function dashboardSettings()
    {
        return $this->hasOne(DashboardSettings::class);
    }
}
