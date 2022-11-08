<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Recipe;
use App\Models\TrackedWater;
use App\Models\ScheduledPlan;
use App\Models\MyTracker;
use Illuminate\Http\Request;
use App\Models\DashboardSettings;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function show()
    {
        try {
            $user = auth('sanctum')->user();
            $dasboardSettings = $user->dashboardSettings;
            if (!$dasboardSettings) {
                $dasboardSettings = DashboardSettings::create([
                    'user_id' => $user->id,
                    'panel_1_type' => 'green_tier',
                    'panel_2_type' => 'yellow_tier',
                    'panel_3_type' => 'red_tier',
                ]);
            }
            return response()->json($dasboardSettings, 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function showTypes()
    {
        $types = DashboardSettings::$panelTypes;
        return response()->json($types, 200);
    }

    public function store(Request $request)
    {
        try {
            $user = auth('sanctum')->user();
            $dasboardSettings = $user->dashboardSettings;
            if (!$dasboardSettings) {
                $dasboardSettings = DashboardSettings::create([
                    'user_id' => $user->id,
                    'panel_1_type' => 'green_tier',
                    'panel_2_type' => 'yellow_tier',
                    'panel_3_type' => 'red_tier',
                ]);
            }
            $dasboardSettings->update([
                'panel_1_type' => $request->panel_1_type,
                'panel_2_type' => $request->panel_2_type,
                'panel_3_type' => $request->panel_3_type,
            ]);
            return response()->json($dasboardSettings, 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function getSummary(Request $request)
    {
        try {
            $summary = [];
            $user = auth('sanctum')->user();
            $types = $request->types ?? DashboardSettings::$panelTypes;
            foreach ($types as $type) {
                switch ($type) {
                    case 'green_tier':
                        $summary[$type] = $user->trackers()
                            ->whereHasMorph('planable', Recipe::class, function ($query) {
                                $query->whereHas('tags', function ($query2) {
                                    $query2->where('label', 'like', '%Green Tier%');
                                });
                            })
                            ->count();
                        break;
                    // 
                    case 'yellow_tier':
                        $summary[$type] = $user->trackers()
                            ->whereHasMorph('planable', Recipe::class, function ($query) {
                                $query->whereHas('tags', function ($query2) {
                                    $query2->where('label', 'like', '%Yellow Tier%');
                                });
                            })
                            ->count();
                        break;
                    // 
                    case 'red_tier':
                        $summary[$type] = $user->trackers()
                            ->whereHasMorph('planable', Recipe::class, function ($query) {
                                $query->whereHas('tags', function ($query2) {
                                    $query2->where('label', 'like', '%Red Tier%');
                                });
                            })
                            ->count();
                        break;
                    // 
                    case 'protein_count':
                    case 'calories_tracker':
                    case 'fat_count':
                        $trackers = $user->trackers()
                            ->where('date', $request->today)
                            ->with(['planable'])
                            ->get();
                        $userDetail = $user->userDetail;
                        $calorieGoal = !!$userDetail
                            ? $userDetail->calorie_goal
                            : 0;
                        $carbs = !!$calorieGoal
                            ? ($calorieGoal * 0.5) / 4
                            : 0;
                        $fat = !!$calorieGoal
                            ? ($calorieGoal * 0.3) / 4
                            : 0;
                        $protein = !!$calorieGoal
                            ? ($calorieGoal * 0.2) / 4
                            : 0;
                        $summary[$type] = [
                            'data' => $trackers,
                            'goal' => [
                                'calories' => $calorieGoal,
                                'carbs' => $carbs,
                                'fat' => $fat,
                                'protein' => $protein,
                            ]
                        ];
                        break;
                    // 
                    case 'total_recipes':
                        $summary[$type] = $user->recipes
                            ->where('is_ninety_ten', false)
                            ->count();
                        break;
                    // 
                    case 'water_tracked':
                        $summary[$type] = TrackedWater::where('user_id', $user->id)
                            ->whereDate('created_at', Carbon::today())
                            ->sum('value');
                        break;
                    // 
                    case 'total_days_tracked':
                        $summary[$type] = $user->trackers->unique('date')->count();
                        break;
                    // 
                    default:
                }
            }

            $entry = auth('sanctum')->user()->trackers->where('date', date('Y-m-d'));

            $trackers = MyTracker::with(['planable'])->where([
                'user_id' => auth('sanctum')->user()->id,
                'date' => $request->today
            ])->get();
            $consumed = 0;

            if (count($trackers)) {
                foreach ($trackers as $tracker) {
                    $consumed += json_decode($tracker->planable->nutritions)->calories;
                }
            }
            
            $summary['progress'] = [
                'aim' => auth('sanctum')->user()->userDetail->calorie_goal,
                'consumed' => $consumed
            ];
            return response()->json($summary, 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function caloryHistory()
    {
        $dataset = [];

        if (request()->query('type') === 'day') {
            $trackers = MyTracker::with('planable')->where([
                'user_id' => auth('sanctum')->user()->id,
                'date' => request()->query('date')
            ])->get();

            for ($i = 1; $i <= 5; $i++) {
                $tracks = $trackers->where('meal_type', $i);
                $total = 0;

                foreach ($tracks as $track) {
                    $total += json_decode($track->planable->nutritions)->calories;
                }
                
                $dataset[] = $total;
            }
        } else {
            $dataset = $this->getWeekMonthDataset();
        }

        return response(['dataset' => $dataset]);
    }
    
    public function getWeekMonthDataset() {
        for ($i = 0; $i < request()->query('limit'); $i++) {
            $date = date('Y-m-d', strtotime(request()->query('date') . ' ' . $i . ' days'));
            $trackers = MyTracker::with('planable')->where([
                'user_id' => auth('sanctum')->user()->id,
                'date' => $date
            ])->get();

            $total = 0;

            foreach ($trackers as $track) {
                $total += json_decode($track->planable->nutritions)->calories;
            }

            $dataset[] = $total;
        }

        return $dataset;
    }

    public function myPlan($date) {
        return ScheduledPlan::where('user_id', auth('sanctum')->user()->id)
            ->with(['planable'])
            ->where('date', $date)
            ->get()
            ->sortBy('meal_type')
            ->values();
    }
}
