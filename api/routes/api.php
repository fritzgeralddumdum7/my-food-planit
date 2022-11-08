<?php

use App\Models\PlanPurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\EdamamController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\MyCircleSettings;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ScraperController;
use App\Http\Controllers\FeedLikeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StorePlanController;
use App\Http\Controllers\MyMealPlanController;
use App\Http\Controllers\MyTrackerController;
use App\Http\Controllers\FoodDiaryController;
use App\Http\Controllers\UserDetailController;
use App\Http\Controllers\FeedCommentController;
use App\Http\Controllers\PaypalOrderController;
use App\Http\Controllers\PrintRecipeController;
use App\Http\Controllers\HealthVitalController;
use App\Http\Controllers\PlanPurchaseController;
use App\Http\Controllers\TrackedWaterController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\RelationshipsController;
use App\Http\Controllers\ScheduledPlanController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Auth\SocialAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Public routes
Route::get('/sample', [DebugController::class, 'index']);
Route::get('friend/{code}', [FriendController::class, 'verifyCode']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::namespace('Admin')->controller(AdminAuthController::class)
    ->prefix('admin')->group(function(){
        Route::post('/login', 'login');
        Route::post('/oauth/{provider}/login', 'oauthLogin');
});

Route::controller(PasswordResetController::class)->group(function() {
    Route::post('/reset-password', 'resetPassword');
    Route::post('/reset-password-email', 'resetPasswordEmail');
});

Route::namespace('Auth')->controller(SocialAuthController::class)->group(function(){
    Route::post('oauth/{provider}/register', 'register');
    Route::post('oauth/{provider}/login', 'login');
});

Route::get('/print-recipe', [PrintRecipeController::class, 'index']);
Route::get('/print-recipe/{code}', [PrintRecipeController::class, 'show']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(UserDetailController::class)->group(function(){
        Route::post('/onboarding','store');
        Route::post('/username','addUserName');
        Route::get('/userdetail','show');
        Route::post('/calorie-goal', 'addCalorieGoal');
    });
    Route::controller(AuthController::class)->group(function() {
        Route::post('/logout','logout');
        Route::get('/check-login','checkLogin');
    });
    Route::controller(RecipeController::class)
        ->prefix('recipes')->group(function () {
            Route::get('/', 'index');
            Route::get('/paginated-recipe', 'paginatedRecipe');
            Route::get('/db-by-tags', 'dbByTags');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::get('/related/{id}','getRelatedRecipe');
    });
    Route::controller(UserController::class)
        ->prefix('users')->group(function () {
        Route::get('/profile/{user?}','profile');
        Route::post('/profile','update');
        Route::get('/follows','follows');
        Route::get('/profile/{id}/recipes','profileRecipes');
        Route::get('/signed-url','s3TempSignedUrl');
    });
    Route::controller(RelationshipsController::class)
        ->prefix('relationships')->group(function () {
        Route::post('/follow/{user}','follow');
        Route::post('/unfollow/{user}','unfollow');
    });
    Route::controller(MyCircleSettings::class)
        ->prefix('circle_settings')->group(function () {
        Route::get('/{user?}','getCircleSettings');
        Route::post('/','setCircleSettings');
    });
    Route::controller(StorePlanController::class)
        ->prefix('store')->group(function () {
        Route::get('/','index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}', 'show');
        Route::put('/', 'update');
    });
    Route::controller(ScraperController::class)
        ->prefix('scraper')->group(function () {
            Route::get('/','index');
            Route::get('/show/{id}','show');
            Route::get('/match-ingredient','matchIngredient');
    });
    Route::controller(MyMealPlanController::class)
        ->prefix('my-meal-plan')->group(function() {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::delete('/{id}', 'destroy');
            Route::put('/', 'update');
        }
    );
    Route::controller(ScheduledPlanController::class)
        ->prefix('my-plan')->group(function() {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/today', 'getTodaysPlans');
            Route::post('/create', 'addToPlan');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::controller(EdamamController::class)
        ->prefix('analysis')->group(function() {
            Route::get('/nutrition-data', 'index');
            Route::get('/ingredient-search', 'ingredient');
            Route::post('/add-job-ingredient-search', 'addJobSearchIngr');
            Route::get('/get-job-ingredient-search/{id}', 'getJobSearchedIngr');
        }
    );
    Route::controller(PaypalOrderController::class)
        ->prefix('paypal')->group(function() {
            Route::post('/order/create', 'create');
            Route::post('/order/create-order', 'createOrder');
            Route::post('/order/capture', 'capture');
            Route::post('/order/{id}/capture-order', 'captureOrder');
        }
    );
    Route::controller(PlanPurchaseController::class)
        ->prefix('plan-purchase')->group(function() {
            Route::post('/', 'store');
        }
    );
    Route::controller(FeedController::class)
        ->prefix('feed')->group(function() {
            Route::get('/', 'index');
            Route::post('/create','store');
    });
    Route::controller(FeedLikeController::class)
        ->prefix('feed-like')->group(function() {
            Route::get('/', 'index');
            Route::post('/like','like');
            Route::get('/check', 'checkUserLike');
    });
    Route::controller(FeedCommentController::class)
        ->prefix('feed-comment')->group(function() {
            Route::get('/', 'index');
            Route::post('/store', 'store');
    });
    Route::controller(ShopController::class)
        ->prefix('shop')->group(function() {
            Route::get('/', 'index');
            Route::post('/email', 'email');
    });
    Route::controller(CartController::class)
        ->prefix('cart')->group(function() {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::delete('/{id}', 'destroy');
    });
    Route::controller(TrackedWaterController::class)
        ->prefix('tracked-water')->group(function() {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::post('/{trackedWater}/update', 'update');
            Route::delete('/{trackedWater}', 'destroy');
    });
    Route::controller(FriendController::class)
        ->prefix('friend')->group(function() {
            Route::get('/', 'index');
            Route::post('/count', 'getJoinedCount');
            Route::post('/code', 'getInviteLink');
            Route::post('/invite', 'sendInvite');
            Route::post('/resend', 'resendInvite');
    });
    Route::controller(PrintRecipeController::class)
        ->prefix('/print-recipe')->group(function() {
            Route::post('/', 'store');
            Route::post('/email', 'email');
    });
    Route::controller(HealthVitalController::class)
        ->prefix('vitals')->group(function() {
            Route::get('/', 'recent');
            Route::post('/', 'addEntry');
    });
    Route::controller(MyTrackerController::class)
        ->prefix('tracker')->group(function() {
            Route::get('/','index');
            Route::post('/', 'store');
            Route::post('/{id}/delete', 'destroy');
    });
    Route::controller(FoodDiaryController::class)
        ->prefix('entry')->group(function() {
            Route::get('/', 'getLatest');
            Route::post('/', 'store');
    });
    Route::controller(DashboardController::class)
        ->prefix('/dashboard-settings')->group(function() {
            Route::get('/', 'show');
            Route::get('/panel-types', 'showTypes');
            Route::post('/', 'store');
    });
    Route::controller(DashboardController::class)
        ->prefix('/dashboard')->group(function() {
            Route::get('/get-summary', 'getSummary');
            Route::get('/calorie-history', 'caloryHistory');
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([], function () {
    Route::prefix('recipes')->group(function () {
        Route::get('/', 'RecipeController@index');
        Route::post('/import-json', 'RecipeController@importJson');
    });
});