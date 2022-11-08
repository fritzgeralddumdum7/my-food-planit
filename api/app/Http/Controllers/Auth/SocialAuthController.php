<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\SocialRegisterRequest;
use App\Jobs\ReferralCodeJob;
use Illuminate\Http\Request;
use Socialite;
use App\Jobs\UserInfoJob;
use App\Models\Friend;
use App\Models\Relationships;
use Carbon\Carbon;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    public function register(SocialRegisterRequest $request, $provider)
    {
        $code = $request->referralCode ?? null;

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
            'email' => $request->email,
            'provider' => $provider,
            'provider_id' => $request->googleId,
            'referral_code' => $referral_code
        ]);


        if ($user) {
            UserInfoJob::dispatch($request->onBoardingData, $user->id);
        }

        $invitePayload = [
            'email' => $request->email,
            'referral_code' => $referral_code,
            'code' => $code
        ];

        ReferralCodeJob::dispatch($invitePayload);

        return response($this->generateResponse($user), Response::HTTP_CREATED);
    }

    public function login(Request $request, $provider)
    {
        $user = User::where('email', $request->email)
            ->where('provider_id', $request->googleId)
            ->firstOrFail();
        
        return response($this->generateResponse($user), Response::HTTP_OK);
    }

    private function generateResponse($user)
    {
        return [
            'user' => $user,
            'token' => $user->createToken('app_token')->plainTextToken
        ];
    }
}
