<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FeedComment;

class FeedCommentController extends Controller
{
    public function index(Request $request) 
    {
        $feedFeedComents = FeedComment::where($request->postId)->with('user.userDetails')->paginate(10);
        return $feedComments->toJson();
    }
    public function store(Request $request) 
    {
        $feedComment = FeedComment::create([
            'feed_id' => $request->postId,
            'comment_text' => $request->feedComment,
            'user_id' => auth('sanctum')->user()->id
        ]);
        
        $feedAllComment = FeedComment::with('user.userDetail')->where('feed_id', $request->postId)->latest()->get();
        return $feedAllComment->toJson();
    }
}
