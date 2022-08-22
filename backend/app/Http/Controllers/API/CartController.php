<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;

class CartController extends Controller
{
    public function addtocart(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $product_id = $request->get('product_id');
            $product_qty = $request->get('product_qty');
            $user_id = auth('sanctum')->user()->id;
            
            $productCheck = Product::where('id',$product_id)->first();

            if($productCheck)
            {
                if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
                {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name.' Product already exists',
                    ]);   
                }
                else
                {
                    $cartitem = new Cart;
                    $cartitem->user_id = $user_id;
                    $cartitem->product_id = $product_id;
                    $cartitem->product_qty = $product_qty;
                    $cartitem->save();

                    return response()->json([
                        'status' => 200,
                        'message' => 'Added to cart',
                    ]); 
                }     
            }
            else
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found',
                ]); 
            }    
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Add to Cart',
            ]);
        }
    }

    public function viewcart()
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id',$user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cartItems,
            ]);
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Login to view cart data',
            ]);
        }
    }
}
