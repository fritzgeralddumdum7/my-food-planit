<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Ingredient;
use App\Models\MyTracker;
use App\Models\ScheduledPlan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MyTrackerController extends Controller
{

    public function index(Request $request)
    {
        try {
            $result = $this->trackedFood(request()->query('date'), $request->user);
            return response()->json($result);
        } catch(Exception $e) {
            abort(404, $e->getMessage());
        }
    }

    public function trackedFood($date, $userId = null) {

        return MyTracker::where('user_id', $userId ? $userId : auth('sanctum')->user()->id)
            ->with(['planable'])
            ->where('date', $date)
            ->get()
            ->sortBy('meal_type')
            ->values();
    }

    public function destroy(int $id, Request $request) {
        MyTracker::findOrFail($id)->delete();

        return response('Deleted', 200);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $entries = $request->data;

            foreach($entries as $entry) {
                if (isset($entry['type']) || $entry['planable_type'] == 'App\\Models\\Ingredient') {
                    if ($entry['selected'] || $entry['isNew']) {
                        $ref = Ingredient::create([
                            'title' => $entry['planable']['title'],
                            'content' => $entry['planable']['content'],
                            'nutritions' => $entry['planable']['nutritions'],
                        ]);
                        $entry['planable_id'] = $ref->id;
                    }

                    MyTracker::create([
                        'user_id' => auth('sanctum')->user()->id,                        
                        'meal_type' => $request->mealType + 1,
                        'serving' => 1,
                        'date' => Carbon::parse($request->currentDate),
                        'planable_id' => $entry['planable_id'],
                        'planable_type' => 'App\\Models\\Ingredient'
                    ]);
                } else {
                    MyTracker::create([
                        'user_id' => auth('sanctum')->user()->id,                  
                        'meal_type' => $request->mealType + 1,
                        'serving' => 1,
                        'date' => Carbon::parse($request->currentDate),
                        'planable_id' => $entry['planable_id'],
                        'planable_type' => $entry['planable_type']
                    ]);
                }
            }
            DB::commit();
            return response($request->data, 201);
        } catch(Exception $e) {
            DB::rollBack();
            return response(['error' => $e->getMessage()], 500);
        }
    }
}
