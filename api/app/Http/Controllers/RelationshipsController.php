<?php

namespace App\Http\Controllers;

use App\Models\Relationships;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RelationshipsController extends Controller
{
    public function follow(User $user) {
        if(auth('sanctum')->user()->id == $user->id) {
            return response(['message' => 'You can\'t follow yourself'])->setStatusCode(500);
        }

        $rel = Relationships::where([
            ['follower_id', auth('sanctum')->user()->id],
            ['following_id', $user->id]
        ])->first();

        if($rel){
            return response(['message' => 'Already following this user'])->setStatusCode(500);
        }

        try{
            Relationships::create([
                'follower_id' => auth('sanctum')->user()->id,
                'following_id' => $user->id
            ]);
            return response('Follow successful', 200);
        }
        catch(Exception $e){
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }

    public function unfollow(User $user) {
        try{
            $rel = Relationships::where([
                ['follower_id', auth('sanctum')->user()->id],
                ['following_id', $user->id]
            ])->first()->delete();
            return response('Unfollow successful', 200);
        }
        catch(Exception $e){
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }
}
