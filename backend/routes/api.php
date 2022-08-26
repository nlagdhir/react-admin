<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\OrderController;

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

Route::get('all-categories',[FrontendController::class,'allcategories']);
Route::get('product-list/{slug}',[FrontendController::class,'productList']);
Route::get('view-product/{category_slug}/{product_slug}',[FrontendController::class,'viewProduct']);
Route::post('add-to-cart',[CartController::class,'addtocart']);
Route::get('cart',[CartController::class,'viewcart']);
Route::delete('delete-cartitem/{cart_id}',[CartController::class,'deleteCartItem']);  
Route::put('cart-updatequantity/{cart_id}/{scope}',[CartController::class,'updateCartQuantity']);
Route::put('place-order',[CheckoutController::class,'placeOrder']);
Route::post('validate-order',[CheckoutController::class,'validateOrder']);

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
    Route::post('update-product/{id}',[ProductController::class,'update']);

    // Orders 
    Route::get('orders',[OrderController::class,'index']);
    Route::post('logout',[AuthController::class,'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
