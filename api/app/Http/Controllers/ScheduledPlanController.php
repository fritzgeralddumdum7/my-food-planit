<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\MyMealPlan;

use Illuminate\Http\Request;
use App\Models\ScheduledPlan;
use App\Models\Ingredient;
use Illuminate\Support\Carbon;

class ScheduledPlanController extends Controller
{
    public function index(Request $request)
    {
        try {
            $type = request()->query('type');
            $search = request()->query('search');

            if ($type == 'week') {
                $dates = [];
                for ($i = 0; $i < 7; $i++) {
                    $date = date('Y-m-d', strtotime(request()->query('date') . ' ' . $i . ' days'));
                    $dates[$date] =  $this->scheduledPlans($search, $date);
                }

                return response($dates);
            } else if ($type == 'day') {
                $result = $this->scheduledPlans($search, request()->query('date'));
                return response()->json($result);
            } else {
                $dates = [];
                for ($i = 0; $i < request()->query('daysInMonth'); $i++) {
                    $date = date('Y-m-d', strtotime(request()->query('date') . ' ' . $i . ' days'));
                    $dates[$date] = $this->scheduledPlans($search, $date);
                }
                return response($dates);
            }
        } catch(Exception $e) {
            abort(404, $e->getMessage());
        }
    }
    
    public function getTodaysPlans(Request $request)
    {
        return $this->scheduledPlans(null, Carbon::parse($request->date));
    }

    public function scheduledPlans($search, $date) {
        return ScheduledPlan::where('user_id', auth('sanctum')->user()->id)
            ->with(['planable'])
            ->when($search, function($query) use ($search) {
                $query->whereRelation('planable', 'title', 'LIKE', "%$search%");
            })->where('date', $date)
            ->get()
            ->sortBy('meal_type')
            ->values();
    }

    public function store(Request $request)
    {
        $request->validate([
            'startDate' => ['required','date'],
            'myMealPlanId' => ['required', 'numeric'],
        ]);

        $myMealPlans = MyMealPlan::where('user_id', auth('sanctum')->user()->id)
            ->with('recipePlans.recipePlannable')
            ->findOrFail($request->myMealPlanId);

        $isConflict = ScheduledPlan::checkConflict($myMealPlans, $request->startDate);

        if ($isConflict) {
            return response(['message' => 'Date and Time Conflict'])->setStatusCode(500);
        }

        ScheduledPlan::createFoods($myMealPlans, $request->startDate);

        return response(['message' => 'Applied to meal plan', 'isConflict' => $isConflict]);
    }

    public function addToPlan(Request $request)
    {
        ScheduledPlan::where('meal_type', $request->food['meal_type'])->where('date', $request->date)->delete();
        $id = null;
        $type = null;
        
        if ($request->food['type'] != 'ingredient') {
            $id = $request->food['food']['id'];
            $type = 'App\Models\Recipe';
        } else {
            $ingredient = Ingredient::create([
                'title' => $request->food['food']['title'],
                'content' => $request->food['food']['content'],
                'ingredients' => $request->food['food']['ingredients'],
                'nutritions' => $request->food['food']['nutritions'],
            ]);

            $id = $ingredient['id'];
            $type = 'App\Models\Ingredient';
        }

        $plan = ScheduledPlan::create([
            'user_id' => auth('sanctum')->user()->id,
            'planable_id' => $id,
            'planable_type' => $type,
            'date' => $request->date,
            'meal_type' => $request->food['meal_type'],
        ]);

        return response([
            'message' => 'Applied successfully',
            'plan' => $plan
        ], 200);
    }

    public function destroy($id)
    {
        ScheduledPlan::whereId($id)->delete();

        return response(['message' => 'Removed successfully']);
    }
}
