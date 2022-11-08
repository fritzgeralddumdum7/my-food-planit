<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:10'
        ]);
        
        $user = User::firstWhere('email', $fields['email']);
        
        if (!$user) {
            return response([
                'message' => "You haven't created an account yet"
            ], 401);
        } 
        if (!Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => "Your password is incorrect"
            ], 401);
        }
        if(!$user->is_admin) {
            return response([
                'message' => "Unauthorized account"
            ], 401);
        }
        
        return response($this->generateResponse($user), 201);
    }

    public function oauthLogin(Request $request, $provider)
    {
        $user = User::where('email', $request->email)
            ->where('provider_id', $request->googleId)
            ->firstOrFail();
            
        if(!$user->is_admin) {
            return response([
                'message' => "Unauthorized account"
            ], 401);
        }
        
        return response($this->generateResponse($user));
    }

    private function generateResponse($user)
    {
        return [
            'user' => $user,
            'token' => $user->createToken('app_token')->plainTextToken
        ];
    }
}
