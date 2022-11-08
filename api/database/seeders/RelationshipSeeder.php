<?php

namespace Database\Seeders;

use App\Models\Relationships;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RelationshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(User::all()->count() > 50){
            Relationships::factory()->count(20)->state(['follower_id'=>User::where('email','test@test.com')->first()->id])->create();
            Relationships::factory()->count(50)->create();
        }
    }
}
