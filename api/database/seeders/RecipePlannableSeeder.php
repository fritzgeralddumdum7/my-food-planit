<?php

namespace Database\Seeders;

use App\Models\RecipePlan;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RecipePlannableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plans = RecipePlan::all();
        $plans->each(function ($plan) {
            if ($plan->recipe_id && !$plan->recipe_plannable_type) {
                $plan->recipe_plannable_id = $plan->recipe_id;
                $plan->recipe_plannable_type = 'App\Models\Recipe';
                $plan->save();
            }
        });
    }
}
