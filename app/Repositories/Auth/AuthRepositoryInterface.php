<?php

namespace App\Repositories\Auth;

use App\DTO\Auth\LoginDTO;
use App\Models\User;

interface AuthRepositoryInterface
{
    public function attemptLogin(LoginDTO $loginDTO): ?User;
}

