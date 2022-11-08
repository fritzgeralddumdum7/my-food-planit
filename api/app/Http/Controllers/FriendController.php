<?php

namespace App\Http\Controllers;

use App\Jobs\InviteEmailJob;
use App\Models\Friend;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    public function index() {
        $friendsList = Friend::where('invited_by', auth('sanctum')->user()->id)->paginate(5);

        // $friendsList = Friend::where('invited_by', auth('sanctum')->user()->id)->with('invitee', function($query) {
        //     return $query->with('userDetail', function($query2) {
        //         return $query->select('profile_picture');
        //     })
        // })->paginate(5);


        return $friendsList;
    }

    public function getJoinedCount() {
        $joinCount = Friend::where([['invited_by', auth('sanctum')->user()->id],['hasJoined',1]])->count();

        return $joinCount;
    }

    public function verifyCode(string $code) {
        $user = User::where('referral_code', $code)->with('userDetail')->first();

        if ($user) {
            return $user;
        } else {
            return response()->json(['error'], 404);
        }
    }

    public function getInviteLink() {
        $user = User::whereId(auth('sanctum')->user()->id)->with('userDetail')->first();

        $name = $user->name != null ? $user->name : $user->userDetail->username;
        $response = [
            'name' => $name,
            'url' => $user->getInviteLink(),
        ];

        return $response;
    }

    public function sendInvite(Request $request) {
        $fields = $request->validate([
            'email' => 'required|email',
            'url' => 'required',
            'name' => 'required'
        ]);
        
        InviteEmailJob::dispatch(collect($request->all()));
        
        $friend = Friend::where('email', $fields['email'])->get();

        if(count($friend) == 0) {
            Friend::create([
                'invited_by' => auth('sanctum')->user()->id,
                'email' => $fields['email'],
                'hasJoined' => 0,
                'invited' => Carbon::now(),
            ]);
        }

        return response('Email Sent.', 200);
    }

    public function resendInvite(Request $request) {
        $fields = $request->validate([
            'email' => 'required|email',
        ]);

        $user = auth('sanctum')->user();


        $body = [
            'email' => $fields['email'],
            'url' => $user->getInviteLink(),
            'name' => $user->userDetail->username
        ];
        
        InviteEmailJob::dispatch(collect($body));

        return response('Email Sent.', 200);
    }
}
