<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FeedLike;

class FeedLikeController extends Controller
{

    public function index (Request $request) 
    {
        $feedLikes = FeedLike::where('user_id', auth('sanctum')->user()->id)
                            ->where('feed_id', $request->postId)
                            ->where('liked', 1)
                            ->get();
    }
    // public function countLike (Request $request) 
    // {
    //     $feedLike = FeedLike::where('feed_id', $request->postId)->where('liked', 1);
    //     $feedData = [
    //         'feedAllCount' => $feedLike->count()
    //         'feedUserLiked' => $feedLike->where('user_id', auth('sanctum')->user()->id)->count
    //     ];
    //     return $feedData->toJson();
    // }
    public function checkUserLike (Request $request) 
    {
        $feedLikes = FeedLike::where('user_id', auth('sanctum')->user()->id)
            ->where('feed_id', $request->postId)
            ->where('liked', 1)
            ->count();

        return $feedLikes;
    }
    public function totalLike (Request $request) 
    {
        $feedAllLikes = FeedLike::where('liked',1)
                                ->where('feed_id', $request->postId)
                                ->cpunt();
        return $feedAllLikes;
    }
    public function like (Request $request) 
    {
        $feedLikeCount = FeedLike::where('user_id', auth('sanctum')->user()->id)
                        ->where('feed_id', $request->postId)
                        ->where('liked', 1)
                        ->count();
        $feedLike = FeedLike::where('feed_id', $request->postId);

        if ($feedLikeCount > 0) {
            $like = FeedLike::where('user_id', auth('sanctum')->user()->id)
                            ->where('feed_id', $request->postId)
                            ->update(['liked' => 0]);
            $countAllLike =  $feedLike->where('liked', 1)->count();
            $userHasLike = $feedLike->where('user_id',auth('sanctum')->user()->id)->get();
        } else {
            $like = FeedLike::updateOrCreate(
                ['user_id' => auth('sanctum')->user()->id, 'feed_id' => $request->postId],
                ['liked' => 1]
            );
            $countAllLike =  $feedLike->where('liked', 1)->count();
            $userHasLike = $feedLike->where('user_id',auth('sanctum')->user()->id)->get();
        }
        $feedLikeData = [
            'liked' => $userHasLike,
            'likeCount' => $countAllLike
        ];
        return $feedLikeData;
    }
}
