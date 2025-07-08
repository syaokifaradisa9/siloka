<?php

namespace App\Http\Controllers;

use App\Services\Datatables\UserDatatableService;
use App\Services\Division\DivisionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        protected UserDatatableService $datatableService,
        protected DivisionService $divisionService
    ){}

    public function index()
    {
        $divisions = $this->divisionService->getAllDivisions();

        return Inertia::render('users/index', [
            'divisions' => $divisions,
        ]);
    }

    public function datatable(Request $request){
        return $this->datatableService->getDatatable($request);
    }
}
