<?php

namespace App\DTO\Auth;

class LoginDTO
{
    public function __construct(
        public readonly string $email,
        public readonly string $password,
        public readonly bool $remember,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            email: $data['email'],
            password: $data['password'],
            remember: (bool)($data['remember'] ?? false),
        );
    }
}
