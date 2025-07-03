<?php

namespace App\Services\Auth;

use App\DTO\Auth\LoginDTO;
use App\Repositories\Auth\AuthRepositoryInterface;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(
        protected AuthRepositoryInterface $authRepository
    ) {}

    public function login(LoginDTO $loginDTO): void
    {
        if (! $this->authRepository->attemptLogin($loginDTO)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }
    }
}
