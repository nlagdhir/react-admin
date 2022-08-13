<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Category extends Model
{
    use HasApiTokens, HasFactory;
    protected $table = 'categories';
    protected $fillable = [
        'meta_title', 
        'meta_keyword',
        'meta_description',
        'slug',
        'name',
        'description',
        'status',
    ];
}
