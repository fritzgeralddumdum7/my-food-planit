<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $default_pass = bcrypt('password123');
        User::factory()->hasUserDetail()->state(['name'=>'Tester McTesterson','email'=>'test@test.com','password'=>$default_pass,'is_admin'=>false])->create();
        User::factory()->hasUserDetail()->state(['name'=>'Admin McTesterson','email'=>'admin@admin.com','password'=>$default_pass,'is_admin'=>true])->create();
        User::factory()->count(50)->hasUserDetail()->create();
    }
}
