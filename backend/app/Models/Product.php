<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class Product extends Model
{
    use HasApiTokens, HasFactory;
    protected $table = 'products';
    // protected $fillables = [
    //     'category',
    //     'meta_title',
    //     'meta_keyword',
    //     'meta_description',
    //     'slug',
    //     'name',
    //     'description',
    //     'brand',
    //     'selling_price',
    //     'original_price',
    //     'image',
    //     'featured',
    //     'popular',
    //     'status',
    //     'quantity',
    // ];
    protected $guarded = [];

    protected $with = ['category'];

    public function category()
    {
        return $this->belongsTo(Category::class,'category','id');
    }
}
