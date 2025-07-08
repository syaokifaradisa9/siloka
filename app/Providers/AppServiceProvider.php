<?php

namespace App\Providers;

use App\Repositories\Auth\AuthRepository;
use App\Repositories\Auth\AuthRepositoryInterface;
use App\Repositories\Division\DivisionRepository;
use App\Repositories\Division\DivisionRepositoryInterface;
use App\Services\Division\DivisionService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            AuthRepositoryInterface::class,
            AuthRepository::class
        );

        $this->app->bind(
            DivisionRepositoryInterface::class,
            DivisionRepository::class
        );

        $this->app->singleton(DivisionService::class, function ($app) {
            return new DivisionService($app->make(DivisionRepositoryInterface::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
