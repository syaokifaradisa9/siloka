<?php

namespace App\Repositories\Division;

use App\Models\Division;
use Illuminate\Database\Eloquent\Collection;

interface DivisionRepositoryInterface
{
    public function store(array $data): Division;
    public function update(Division $division, array $data): Division;
    public function delete(Division $division): void;
    public function getAll(): Collection;
}
