<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DebugController extends Controller
{
    public function index()
    {
        $arr = [
            'user' => env('MAIL_USERNAME'),
            'pass' => env('MAIL_PASSWORD'),
            'region' => env('AWS_DEFAULT_REGION'),
            'token' => env('AWS_SESSION_TOKEN'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
        ];

        return $arr;
    }
}