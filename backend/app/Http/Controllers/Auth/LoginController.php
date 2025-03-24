<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\PersonalAccessToken;
use Exception;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        try {
            session()->regenerate();
            $user = DB::table('users')->where('email', $request->email)->first();

            if (!$user) {
                throw new Exception('Email not found');
            }

            if (!Hash::check($request->password, $user->password)) {
                throw new Exception('Invalid credentials');
            }

            // Remover tokens antigos
            DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->delete();

            // Gerar novo token
            $plainToken = \Str::random(40);
            $hashedToken = hash('sha256', $plainToken);

            // Inserir o token no banco
            $tokenId = DB::table('personal_access_tokens')->insertGetId([
                'tokenable_type' => 'App\\Models\\User', 
                'tokenable_id'   => $user->id,
                'name'           => 'auth_token',
                'token'          => $hashedToken,
                'abilities'      => json_encode(['*']),
                'created_at'     => now(),
                'updated_at'     => now(),
            ]);

            // Formatar no padrão esperado: "ID|TOKEN"
            $formattedToken = "{$tokenId}|{$plainToken}";

            return response()->json([
                'user'  => $user,
                'token' => $formattedToken,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
