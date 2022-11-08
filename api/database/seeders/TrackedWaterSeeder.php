<?php

namespace Database\Seeders;

use App\Models\TrackedWater;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrackedWaterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 10; $i++) { 
            TrackedWater::create([
                'user_id' => 1,
                'value' => 8,
            ]);
        }
    }
}
