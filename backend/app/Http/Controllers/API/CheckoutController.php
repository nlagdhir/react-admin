<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeOrder(Request $request)
    {   
        if(auth('sanctum')->check())
        {
            $validadator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',
            ]);

            if($validadator->fails())
            {
                return response()->json([
                    'status' => 422,
                    'errors' => $validadator->messages(),
                ]);
            }
            else
            {
                $user_id = auth('sanctum')->user()->id;
                $order = new Order;
                $order->user_id = $user_id;
                $order->firstname = $request->firstname;
                $order->lastname = $request->lastname;
                $order->phone = $request->phone;
                $order->email = $request->email;
                $order->address = $request->address;
                $order->city = $request->city;
                $order->state = $request->state;
                $order->zipcode = $request->zipcode;

                $order->payment_mode = 'COD';
                $order->tracking_no = 'track'.rand(1111,9999);
                $order->save();

                $cart = Cart::where('user_id',$user_id)->get();
                $orderItem = [];
                foreach($cart as $item)
                {
                    $orderItem[] = [
                        'product_id' => $item->product_id,
                        'quantity' => $item->product_qty,
                        'price' => $item->product->selling_price,
                    ];

                    $item->product->update([
                        'quantity' => $item->product->quantity - $item->product_qty
                    ]);
                }

                $order->orderitems()->createMany($orderItem);

                Cart::destroy($cart);

                return response()->json([
                    'status' => 200,
                    'message' => 'Order Placed Successfully!',
                ]);  
            }
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue',
            ]);
        }
    }
}
