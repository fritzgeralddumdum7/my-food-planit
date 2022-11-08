<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Jobs\UserInfoJob;
use App\Models\Friend;
use App\Models\Relationships;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Str;


class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|min:10',
            'referral_code' => 'sometimes|string'
        ]);

        $code = $fields['referral_code'] ?? null;

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

        $user = User::create([
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'referral_code' => $referral_code
        ]);

        if ($user) {
            UserInfoJob::dispatch($request->all(), $user->id);
        }

        $token = $user->createToken('app_token')->plainTextToken;

        $user->circleSettings()->create(['user_id'=>$user->id]);
        $user->push();

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        if ($code) {
            $user = User::where('referral_code', $fields['referral_code'])->first();
            $invitation = $user->friends()->where('email', $fields['email'])->first();
            $friend = null;

            if ($invitation) {
                $friend = $invitation->update([
                    'hasJoined' => true,
                    'joined' => Carbon::now()
                ]);
            } else {
                $friend = Friend::create([
                    'invited_by' => $user->id,
                    'email' => $fields['email'],
                    'hasJoined' => true,
                    'invited' => Carbon::now(),
                    'joined' => Carbon::now(),
                ]);
            }

            $new_user = User::where('email', $fields['email'])->first();

            Relationships::create([
                'follower_id' => $user->id,
                'following_id' => $new_user->id
            ]);

            Relationships::create([
                'follower_id' => $new_user->id,
                'following_id' => $user->id
            ]);
        } else {
            $invitation = Friend::where('email', $fields['email'])->first();

            if ($invitation) {
                $invitation->update([
                    'hasJoined' => 1,
                    'joined' => Carbon::now()
                ]);

                Relationships::create([
                    'follower_id' => $user->id,
                    'following_id' => $invitation->inviter->id
                ]);

                Relationships::create([
                    'follower_id' => $invitation->inviter->id,
                    'following_id' => $user->id
                ]);
            }
        }

        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:10'
        ]);

        $user = User::firstWhere('email', $fields['email']);

        if (!$user) {
            return response([
                'message' => "You haven't created an account yet"
            ],401);
        }
        if (!Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => "Incorrect password"
            ],401);
        }

        $token = $user->createToken('app_token')->plainTextToken;

        $user->push();
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function checkLogin() {
        $auth = auth()->check();
        $response = [
            'isloggedIn' => $auth
        ];
        return response($response,201);
    }
    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'User Logged Out'
        ];
    }
}