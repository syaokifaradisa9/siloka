<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\User;
use App\Services\Datatables\UserDatatableService;
use App\Services\Division\DivisionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

    public function printPdf(Request $request){
        return $this->datatableService->printPdf($request);
    }

    public function printExcel(Request $request){
        return $this->datatableService->printExcel($request);
    }

    public function create()
    {
        $divisions = $this->divisionService->getAllDivisions();

        return Inertia::render('users/form', [
            'divisions' => $divisions,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        User::create($data);

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        $divisions = $this->divisionService->getAllDivisions();

        return Inertia::render('users/form', [
            'user' => $user,
            'divisions' => $divisions,
        ]);
    }

    public function update(UpdateRequest $request, User $user)
    {
        $data = $request->validated();
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $user->update($data);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }
}
