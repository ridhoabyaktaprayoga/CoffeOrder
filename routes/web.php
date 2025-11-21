<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $recentOrders = $user->orders()->latest()->take(5)->get();

        return Inertia::render('dashboard', [
            'recentOrders' => $recentOrders,
        ]);
    })->name('dashboard');

    Route::get('menu', function () {
        $menuItems = \App\Models\MenuItem::with('category')
            ->where('is_available', true)
            ->orderBy('name')
            ->get();
        return Inertia::render('Menu/Index', [
            'menuItems' => $menuItems,
        ]);
    })->name('menu')->middleware('role:user');

    // Order routes
    Route::resource('orders', OrderController::class)->except(['create', 'show', 'edit']);
    Route::post('orders', [OrderController::class, 'store'])->middleware('role:user');

    Route::middleware('role:admin')->group(function () {
        Route::get('admin', function () {
            return Inertia::render('admin');
        })->name('admin');

        // Category management routes
        Route::resource('admin/category', CategoryController::class)->names([
            'index' => 'admin.category.index',
            'create' => 'admin.category.create',
            'store' => 'admin.category.store',
            'show' => 'admin.category.show',
            'edit' => 'admin.category.edit',
            'update' => 'admin.category.update',
            'destroy' => 'admin.category.destroy',
        ]);

        // Menu management routes
        Route::resource('admin/menu', MenuController::class)->names([
            'index' => 'admin.menu.index',
            'create' => 'admin.menu.create',
            'store' => 'admin.menu.store',
            'show' => 'admin.menu.show',
            'edit' => 'admin.menu.edit',
            'update' => 'admin.menu.update',
            'destroy' => 'admin.menu.destroy',
        ]);
    });
});

require __DIR__.'/settings.php';
