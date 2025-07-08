<?php

namespace App\Services\Division;

use App\Repositories\Division\DivisionRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class DivisionService
{
    public function __construct(
        protected DivisionRepositoryInterface $repository
    ) {}

    public function getAllDivisions(): Collection
    {
        return $this->repository->getAll();
    }
}
