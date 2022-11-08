<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DashboardSettings extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'dashboard_settings';

    public static $panelTypes = [
        'green_tier',
        'yellow_tier',
        'red_tier',
        'protein_count',
        'total_recipes',
        'water_tracked',
        'calories_tracker',
        'fat_count',
        'total_days_tracked',
    ];

    public static function createDefault(User $user) {
        return self::create([
            'user_id' => $user->id,
            'panel_1_type' => 'green_tier',
            'panel_2_type' => 'yellow_tier',
            'panel_3_type' => 'red_tier',
        ]);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
