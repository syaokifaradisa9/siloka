<?php

namespace App\Http\Controllers;

use App\Services\Datatables\UserDatatableService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        protected UserDatatableService $datatableService
    ){}

    public function index()
    {
        return Inertia::render('users/index');
    }

    public function datatable(Request $request){
        return $this->datatableService->getDatatable($request);
    }
}
