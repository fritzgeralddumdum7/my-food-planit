<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FriendsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 10; $i++) { 
            DB::table('friends')->insert([
                'invited_by' => 1,
                'email' => "invited_email$i@mail.com",
                'hasJoined' => 0,
                'invited' => now(),
                'joined' => null,
                'created_at' => now()
            ]);
        }
    }
}
