<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;

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

Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/checkingAuthenticated', function() {
        return response()->json(['message'=>'You are in','status' => 200],200);
    });  

    // Category Routes
    Route::post('store-category',[CategoryController::class,'store']);
    Route::get('category-list',[CategoryController::class,'index']);
    Route::get('category-edit/{id}',[CategoryController::class,'edit']);
    Route::put('update-category/{id}',[CategoryController::class,'update']);
    Route::delete('delete-category/{id}',[CategoryController::class,'destroy']);
    Route::get('all-category',[CategoryController::class,'allcategory']);

    // Product Routes 
    Route::post('store-product',[ProductController::class,'store']);
    Route::get('view-products',[ProductController::class,'index']);
    Route::get('product-edit/{id}',[ProductController::class,'edit']);
    Route::put('update-product/{id}',[ProductController::class,'update']);

    Route::post('logout',[AuthController::class,'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
