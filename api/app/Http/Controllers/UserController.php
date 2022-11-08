<?php

namespace App\Http\Controllers;

use App\Jobs\UploadProfileImageJob;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipe;
use App\Models\Relationships;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    //
    public function profile(User $user = null) {
        if($user) {
            $user['user_detail'] = $user->userDetail;
            $user['is_current_user'] = $user->id == auth()->user()->id;
            return $user;
        }

        $user = User::with('userDetail')->findOrFail(auth()->user()->id);
        return $user;
    }

    public function update(Request $request) {
        try {
            $dirty = false;
            $user = auth()->user();
            $data = $request->validate([
                'email'=>['email',Rule::unique('users')->ignore($user->id),'nullable'],
                'name'=>'string|nullable',
                'username'=>'string|nullable',
                'password'=>'string|nullable',
                'new_password'=>'string|nullable',
                'gender'=>'numeric|nullable',
                'height'=>'numeric|nullable',
                'height_unit' => 'nullable',
                'DOB' => 'date|nullable',
                'calorie_goal'=>'numeric|nullable',
                'image'=>'image|nullable',
                'goal_weight' => 'nullable',
                'weight_unit' => 'nullable'
            ]);

            $data = array_filter($data);
            
            $user->fill($data);

            if($request->filled('gender')){
                $user->userDetail->gender = $data['gender'];
                $dirty = true;           
            }

            if($request->input('height') > 0){
                $user->userDetail->height = $data['height'];
                $dirty = true;           
            }

            if($request->input('height_unit') > 0){
                $user->userDetail->height_unit = $data['height_unit'];
                $dirty = true;           
            }

            // if($request->filled('DOB')){
            //     $user->userDetail->DOB = Carbon::parse($data['DOB']);
            //     $dirty = true;           
            // }

            if($request->input('calorie_goal') > 0){
                $user->userDetail->calorie_goal = $data['calorie_goal'];
                $dirty = true;           
            }

            if($request->filled('username')){
                $user->userDetail->username = $data['username'];
                $dirty = true;           
            }

            if($request->filled('goal_weight')){
                $user->userDetail->goal_weight = $data['goal_weight'];
                $dirty = true;           
            }

            if($request->filled('weight_unit')){
                $user->userDetail->goal_weight_unit = $data['weight_unit'];
                $dirty = true;           
            }

            if($request->filled('password')){
                if(!Hash::check($data['password'], $user->password)){
                    throw ValidationException::withMessages([
                        'password' => 'Wrong Current Password',
                    ]);
                }
                $user->password = bcrypt($data['new_password']);
                $dirty = true;
                
            }
            if($request->hasFile('image')){
                
                $file = $request->file('image');
                $fileName = $file->getClientOriginalName();
                Storage::disk('s3')->put('profiles/'.$user->id.'/'.$fileName,file_get_contents($file));
                $user->userDetail->image = $fileName;

                // UploadProfileImageJob::dispatch([
                //     'path' => 'profiles/'.$user->id,
                //     'fileName'=>$fileName,
                //     'user'=>$user
                // ]);
                
                $dirty = true;
            }

            if($user->isDirty() || $dirty) {
                $user->push();
            }

            return $user;
        }
        catch (ValidationException $e){
            return response()->json($e->getMessage(),500);
        }
        catch(Exception $e) {
            return response()->json($e->getMessage(),500);
        }
    }

    public function follows(Request $request) {
        $users = Relationships::where('follower_id', auth()->user()->id)
            ->whereRelation('following', 'email', 'LIKE', "%$request->search%")
            ->with('following')
            ->get();
        return $users->map(function ($user){
            $user['user_detail']=$user->following->userDetail;
            return $user;
        });

    }

    public function profileRecipes($id, Request $request) {
        $order = $request->sort ?? '';

        $recipes = Recipe::search($request->keyword)
            ->where('user_id', $id)
            ->when($order, function ($query) use ($order) {
                if ($order == 'created_at') {
                    $query->orderBy('created_at', 'desc');
                } else {
                    $query->orderBy($order);
                }
            })
            ->with('tags')
            ->paginate(10);

        return $recipes->toJson();
    }

    public function s3TempSignedUrl()
    {
        $user = auth('sanctum')->user();
        $url = "profiles/$user->id";
        
        $client = Storage::disk('s3')->getClient();
        $expiry = "+5 minutes";

        $command = $client->getCommand('PutObject', [
            'Bucket' => \Config::get('filesystems.disks.s3.bucket'),
            'Key' => $url,
            'ACL'=> 'public-read'
        ]);

        $s3 = $client->createPresignedRequest($command, $expiry);

        $user->userDetail()->update([
            'image' => Storage::disk('s3')->url($url)
        ]);

        return (string) $s3->getUri();
    }
}