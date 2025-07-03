<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seeder Divisi
        $divisions = ["Manajemen", "Office Boy", "Laboratorium", "IT", "Keuangan"];
        foreach($divisions as $division){
            Division::create([
                "name" => $division
            ]);
        }

        // Seeder Role
        foreach(["Superadmin", "Admin", "Admin Divisi", "Admin Gudang", "Pimpinan"] as $role){
            Role::create(["name" => $role]);

            if($role != "Admin Divisi"){
                User::create([
                    "name" => str_replace(" ", "", strtolower($role)),
                    "email" => str_replace(" ", "", strtolower($role))."@gmail.com",
                    "password" => bcrypt("password"),
                    "position" => $role
                ])->assignRole($role);
            }
        }

        foreach($divisions as $division){
            User::create([
                "name" => "admin" . str_replace(" ", "", strtolower($division)),
                "email" => "admin" . str_replace(" ", "", strtolower($division))."@gmail.com",
                "password" => bcrypt("password"),
                "position" => "Admin Divisi " . $division
            ])->assignRole("Admin Divisi");
        }
    }
}
