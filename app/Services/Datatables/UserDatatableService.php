<?php

namespace App\Services\Datatables;

use App\Models\User;
use Illuminate\Http\Request;

class UserDatatableService
{
    private function getStartedQuery(Request $request){
        $query = User::with('division');

        $query->when($request->search, function($query, $search){
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        })->when($request->sort_by, function($query, $sortBy) use ($request){
            $sortType = $request->sort_type ?? 'asc';
            if ($sortBy === 'division.name') {
                $query->leftJoin('divisions', 'users.division_id', '=', 'divisions.id')
                      ->orderBy('divisions.name', $sortType)
                      ->select('users.*');
            } else {
                $query->orderBy($sortBy, $sortType);
            }
        });

        $columnFilters = ['name', 'email', 'division_id'];

        foreach ($columnFilters as $column) {
            if ($request->has($column) && $request->input($column) !== null) {
                $value = $request->input($column);
                if ($column === 'division_id') {
                    if ($value !== '0') {
                        $query->whereHas('division', function ($q) use ($value) {
                            $q->where('id', $value);
                        });
                    }
                } else {
                    $query->where($column, 'like', "%{$value}%");
                }
            }
        }

        return $query;
    }

    public function getDatatable(Request $request)
    {
        $perPage = $request->per_page ?? 10;
        $query = $this->getStartedQuery($request);

        return $query->paginate($perPage);
    }
}
