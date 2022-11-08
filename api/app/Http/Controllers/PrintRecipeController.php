<?php

namespace App\Http\Controllers;

use App\Jobs\CartEmailJob;
use App\Models\PrintRecipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PrintRecipeController extends Controller
{
    public function index()
    {
        return PrintRecipe::all();
    }

    public function show($code)
    {
        return PrintRecipe::where('code', $code)->first();
    }

    public function store(Request $request)
    {
        $request->validate([
            'is_print' => 'required|boolean',
            'is_print' => 'nullable|boolean',
            'content' => 'required|json',
        ]);

        return $this->savePrint($request->all());
    }

    public function email(Request $request)
    {
        $request->validate([
            'is_print' => 'required|boolean',
            'content'=>'required|json',
        ]);

        $recipe = $this->savePrint($request->all());

        $body = [
            'email' => auth('sanctum')->user()->email,
            'url' =>  env('CLIENT_URL').'/shop/print/'.$recipe->code,
        ];
        
        CartEmailJob::dispatch(collect($body));
        
        return response('Job created');
    }

    public function savePrint($data)
    {
        $recipe = PrintRecipe::create([
            'is_print' => $data['is_print'] ?? 0,
            'is_checkout' => $data['is_checkout'] ?? 0,
            'content' => $data['content']
        ]);

        $recipe->code = md5($recipe->id);
        $recipe->save();

        return $recipe;
    }
}