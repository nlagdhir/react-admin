<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
}
