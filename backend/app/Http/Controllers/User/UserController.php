<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use App\Jobs\UserRegistered;

class UserController extends Controller{
    public function index(Request $request)
    {
        try {
            $sql = "SELECT * FROM users where 1=1";
            $params = [];

            $users = DB::select($sql, $params);

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve users'], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = DB::select("SELECT * FROM users WHERE id = ?", [$id]);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve user'], 500);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|size:11|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        try {
            DB::insert("INSERT INTO users (name, cpf, email, password) VALUES (?, ?, ?, ?)", [
                $validatedData['name'],
                $validatedData['cpf'],
                $validatedData['email'],
                Hash::make($validatedData['password']),
            ]);

            $user = DB::Table('users')->where('email', $validatedData['email'])->first();

            UserRegistered::dispatch($user->name, $user->email);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create user'], 500);
        }
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|size:11|unique:users',
            'email' => 'required|email',
            'password' => 'string|min:8',
        ]);

        try {
            $user = DB::select("SELECT * FROM users WHERE id = ?", [$id]);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $data = [];
            
            if (!empty($validatedData['name'])) {
                $data['name'] = $validatedData['name'];
            }
            if (!empty($validatedData['email'])) {
                $data['email'] = $validatedData['email'];
            }
            if (!empty($validatedData['password'])) {
                $data['password'] = Hash::make($validatedData['password']);
            }

            $updated = DB::update("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [
                $data['name'],
                $data['email'],
                $data['password'],
                $id,
            ]);

            return response()->json($updated, 200);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar usuário:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to update user'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = DB::select("SELECT * FROM users WHERE id = ?", [$id]);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $deleted = DB::delete("DELETE FROM users WHERE id = ?", [$id]);

            return response()->json($deleted, 200);
        } catch (\Exception $e) {
            Log::error('Erro ao deletar usuário:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to delete user'], 500);
        }
    }

    public function getMe(Request $request)
    {
        try {
            $user = DB::table('users')->where('id', auth()->user()->id)->first();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json($user);
        } catch (\Exception $e) {
            Log::error('Erro ao consultar usuário:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to retrieve user'], 500);
        }
    }

    public function logout(Request $request){
        try {
            $token = $request->bearerToken();

            if (!$token) {
                throw new Exception('No token provided');
            }

            $tokenParts = explode('|', $token);
            if (count($tokenParts) !== 2) {
                throw new Exception('Invalid token format');
            }

            $tokenId = $tokenParts[0];

            DB::table('personal_access_tokens')->where('id', $tokenId)->delete();

            return response()->json(['message' => 'Logged out successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

}
