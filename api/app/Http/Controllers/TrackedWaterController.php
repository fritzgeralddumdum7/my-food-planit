<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\TrackedWater;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TrackedWaterController extends Controller
{
    public function index(Request $request)
    {
        $fields = $request->validate([
            'currentDate' => 'sometimes',
            'user' => 'numeric',
            'order_by' => Rule::in(['asc', 'desc']),
        ]);

        $date = Carbon::parse($fields['currentDate']);

        $tracked_water = TrackedWater::where('user_id', $request->has('user') ? $fields['user'] : auth('sanctum')->user()->id)
            ->whereDate('created_at', $date)
            ->orderBy('created_at', $fields['order_by'] ?? 'desc')
            ->get();

        return $tracked_water->toJson();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'value' => 'required',
            'date' => 'sometimes|date',
            'is_custom' => 'boolean',
        ]);

        $tracked_water = TrackedWater::create([
            'user_id' => auth('sanctum')->user()->id,
            'value' => $fields['value'],
            'is_custom' => $fields['is_custom'],
            'created_at' => Carbon::parse($fields['date'])
        ]);

        return response($tracked_water->toJson(), 201);
    }

    public function update(TrackedWater $trackedWater, Request $request)
    {
        $fields = $request->validate([
            'value' => 'required',
            'is_custom' => 'boolean',
        ]);

        if ($trackedWater->user_id == auth('sanctum')->user()->id) {
            $trackedWater->update($fields);

            return response($trackedWater->toJson(), 201);
        } else {
            return response('Forbidden', 403);
        }
    }

    public function destroy(TrackedWater $trackedWater)
    {
        if ($trackedWater->user_id == auth('sanctum')->user()->id) {
            $trackedWater->delete();

            return response('Deleted', 200);
        } else {
            return response('Forbidden', 403);
        }
    }
}
