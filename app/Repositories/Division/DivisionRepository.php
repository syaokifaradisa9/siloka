<?php

namespace App\Repositories\Division;

use App\Models\Division;
use Illuminate\Database\Eloquent\Collection;

class DivisionRepository implements DivisionRepositoryInterface
{
    public function store(array $data): Division
    {
        return Division::create($data);
    }

    public function update(Division $division, array $data): Division
    {
        $division->update($data);

        return $division;
    }

    public function delete(Division $division): void
    {
        $division->delete();
    }

    public function getAll(): Collection
    {
        return Division::select('id', 'name')->get();
    }
}
