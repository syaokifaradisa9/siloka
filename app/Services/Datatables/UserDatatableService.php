<?php

namespace App\Services\Datatables;

use App\Models\User;
use Illuminate\Http\Request;

class UserDatatableService
{
    private function getStartedQuery(Request $request){
        return User::with('division')
            ->when($request->search, function($query, $search){
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->when($request->sort, function($query, $sort){
                $sort = explode('|', $sort);
                $query->orderBy($sort[0], $sort[1]);
            });
    }

    public function getDatatable(Request $request)
    {
        $perPage = $request->per_page ?? 10;
        $query = $this->getStartedQuery($request);

        return $query->paginate($perPage);
    }
}
