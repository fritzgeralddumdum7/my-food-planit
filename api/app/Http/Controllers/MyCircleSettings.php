<?php

namespace App\Http\Controllers;

use App\Models\MyCircleSettings as ModelsMyCircleSettings;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Request;

class MyCircleSettings extends Controller
{
    public function getCircleSettings(User $user = null){
        try {
            if(!$user) {
                $user = auth('sanctum')->user();
            }

            $circleSettings = $user->circleSettings;

            if(!$circleSettings){

                $circleSettings = ModelsMyCircleSettings::create(['user_id'=>$user->id,"food_diary"=>0,
                "recipes"=>0,
                "water_tracker"=>0]);
            }

            // $user->circleSettings()->save($circleSettings);

            return response($circleSettings, 200);
        }
        catch(Exception $e){
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }

    public function setCircleSettings(){
        try {
            $data = request()->validate([
                'food_diary' => ['boolean'],
                'recipes' => ['boolean'],
                'water_tracker' => ['boolean'],
            ]);

            $circleSettings = auth('sanctum')->user()->circleSettings;

            if(!$circleSettings) {
                $data['user_id'] = auth('sanctum')->user()->id;
                auth('sanctum')->user()->circleSettings = ModelsMyCircleSettings::create($data);
            }

            $circleSettings->fill($data)->save();
            return response(auth('sanctum')->user()->circleSettings , 200);
        }
        catch(Exception $e){
            return response(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }
}
