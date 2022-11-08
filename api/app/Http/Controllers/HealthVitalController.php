<?php

namespace App\Http\Controllers;

use App\Models\HealthVital;
use App\Models\User;
use Illuminate\Http\Request;

class HealthVitalController extends Controller
{
    public function recent()
    {
        $record = HealthVital::where('user_id', auth('sanctum')->user()->id)->orderBy('created_at', 'desc')->first();

        if ($record) {
            return response($record, 200);
        } else {
            return response('Not found', 404);
        }
    }

    public function addEntry(Request $request)
    {
        $fields = $request->validate([
            'weight' => 'required',
            'notes' => 'required',
            'bp' => 'required',
            'a1c' => 'required',
            'neck' => 'required',
            'waist' => 'required',
            'hips' => 'required',
        ]);

        $vitals = HealthVital::create([
            'user_id'=> auth('sanctum')->user()->id,
            'weight' => $fields['weight'],
            'notes' => $fields['notes'],
            'bp' => $fields['bp'],
            'a1c' => $fields['a1c'],
            'neck' => $fields['neck'],
            'waist' => $fields['waist'],
            'hips' => $fields['hips']
        ]);

        if ($vitals) {
            return response($vitals, 200);
        } else {
            return response('Something went wrong', 404);
        }
    }
}
