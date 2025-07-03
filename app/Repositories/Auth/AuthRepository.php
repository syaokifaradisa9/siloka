<?php

namespace App\Repositories\Auth;

use App\DTO\Auth\LoginDTO;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthRepository implements AuthRepositoryInterface
{
    public function attemptLogin(LoginDTO $loginDTO): ?User
    {
        if (Auth::attempt(['email' => $loginDTO->email, 'password' => $loginDTO->password], $loginDTO->remember)) {
            return Auth::user();
        }

        return null;
    }
}
