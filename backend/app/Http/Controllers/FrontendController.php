<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function allcategories()
    {
        $categories = Category::where('status','0')->get();
        return response()->json([
            'status' => 200,
            'categories' => $categories,
        ]);
    }   

    public function productList($slug)
    {
        $category = Category::where('slug',$slug)->where('status','0')->first();
        if($category)
        {
            $products = Product::where('category',$category->id)->where('status','0')->get();
            if($products)
            {
                return response()->json([
                    'status' => 200,
                    'products' => $products,
                    'category' => $category
                ]);
            }
            else
            {
                return response()->json([
                'status' => 404,
                'message' => 'No product available',
            ]);
            }
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'No category found',
            ]);
        }

    }

    public function viewProduct($category, $product)
    {
        $category = Category::where('slug',$category)->where('status','0')->first();
        if($category)
        {
            $product = Product::where('category',$category->id)
                        ->where('slug',$product)
                        ->where('status','0')
                        ->first();
            if($product)
            {
                return response()->json([
                    'status' => 200,
                    'product' => $product
                ]);
            }
            else
            {
                return response()->json([
                'status' => 404,
                'message' => 'No product available',
            ]);
            }
            }
            else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'No category found',
                ]);
            }
    }
}