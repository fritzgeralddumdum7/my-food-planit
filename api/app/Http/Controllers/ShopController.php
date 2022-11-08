<?php

namespace App\Http\Controllers;

use App\Jobs\CartEmailJob;
use App\Models\PrintRecipe;
use Illuminate\Http\Request;
use App\Models\ScheduledPlan;
use Illuminate\Support\Facades\Hash;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $plans = ScheduledPlan::with(['planable', 'cart'])
            ->where('user_id', auth('sanctum')->user()->id)
            ->whereBetween('date', [$request->from, $request->to])
            ->orderBy('date', 'ASC')
            ->get();

        $byDays = [];
        foreach ($plans as $plan) {
            if ($plan->cart) $plan->inCart = true;
            
            $byDays[$plan->date][] = $plan; 
        }

        return response($byDays, 200);
    }
}
