<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Feed;
use App\Models\User;
use App\Models\FeedImage;
use App\Jobs\FeedImagesJob;
use Illuminate\Http\Request;
use App\Models\FeedFoodDiary;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\Relationship;

class FeedController extends Controller
{

    public function index () {
        $authUserId = auth('sanctum')->user()->id;
        $circles = User::whereHas('following', function ($query) use ($authUserId) {
            $query->where('following_id', $authUserId);
        })->get()->pluck('id');
        $circles->push($authUserId);
        $feed = Feed::whereIn('user_id', $circles)
            ->with(['feedComments' => function ($query) {
                $query->with('user.userDetail')->latest()->get();
            },'feedFoodDiares.planable', 'feedImages','user.userDetail', 'userFeedLike'])->withCount(['feedComments', 'feedLikes' => function ($query) {
                $query->where('liked', 1);
            }])->latest()->paginate(10);
        
        return $feed->toJson();
    }

    public function store (Request $request) {
        DB::beginTransaction();
        try {
            $user = auth('sanctum')->user();
            $feed = Feed::create([
                'user_id' => auth('sanctum')->user()->id,
                'feed_text' => $request->feedText
            ]);

            $preSignedUrls = [];
            foreach($request['files'] as $file){
                $url = "feeds/$feed->id/$file";
                
                $s3 =  Storage::disk('s3');
                $client = $s3->getClient();
                $expiry = "+5 minutes";

                $command = $client->getCommand('PutObject', [
                    'Bucket' => \Config::get('filesystems.disks.s3.bucket'),
                    'Key' => $url,
                    'ACL'=> 'public-read'
                ]);

                FeedImage::create([
                    'feed_id' => $feed->id,
                    'image' => $s3->url($url)
                ]);
                
                $preSignedUrls[] = (string) $client->createPresignedRequest($command, $expiry)->getUri();

            }
            
            if ($request->foodDiaries) {
                FeedFoodDiary::saveDiary($request->foodDiaries, $feed->id);
            }

            DB::commit();
            $feedData = Feed::with(['feedComments' => function ($query) {
                $query->latest()->get();
            },'feedFoodDiares.planable', 'feedImages','user.userDetail', 'userFeedLike'])->withCount(['feedComments', 'feedLikes' => function ($query) {
                $query->where('liked', 1);
            }])->where('id',$feed->id)->latest()->get();
            
            return response([
                'feedData' => $feedData,
                'urls' => $preSignedUrls,
            ])->setStatusCode(201);

        } catch (Exception $e) {
            DB::rollback();
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }
}