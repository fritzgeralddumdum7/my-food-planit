<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ReferralCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::all()->map(function ($currentUser) {
            $referral_code = Str::random(10);
            $unique = false;

            while (!$unique) {
                $user = User::where('referral_code', $referral_code)->first();

                if ($user) {
                    $referral_code = Str::random(10);
                } else {
                    $unique = true;
                }
            }

            $currentUser->update([
                'referral_code' => $referral_code
            ]);
        });
    }
}
