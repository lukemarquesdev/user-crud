<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function createUser(Request $request)
    {
        return $request->user();
    }
    
    public function store(Request $request)
    {
        echo "Raycon vc eh um frango";
    }
}
