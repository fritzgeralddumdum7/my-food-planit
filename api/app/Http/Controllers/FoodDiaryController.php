<?php

namespace App\Http\Controllers;

use App\Models\FoodDiaryEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FoodDiaryController extends Controller
{
    public function store (Request $request)
    {
        $request->validate([
            'nutritions' => 'required', 
            'date' => 'required'
        ]);

        $entry = FoodDiaryEntry::whereDate('date', Carbon::parse($request->date))->updateOrCreate(
            ['user_id' => auth('sanctum')->user()->id],
            ['nutritions' => $request->nutritions, 'date' => Carbon::parse($request->date)]
        );

        return response($entry, 201);
    }

    public function getLatest(Request $request)
    {
        $request->validate([
            'date' => 'required'
        ]);

        $entry = FoodDiaryEntry::where('date', Carbon::parse($request->date))->where('user_id', auth('sanctum')->user()->id)->first();

        if ($entry) return $entry;
        else return null;
    }
}
