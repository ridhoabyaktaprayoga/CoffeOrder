<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);

        // User::factory(10)->create();

        // Create admin user
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => 'password',
                'email_verified_at' => now(),
                'role_id' => 2, // admin
            ]
        );

        // Create regular user
        User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Regular User',
                'password' => 'password',
                'email_verified_at' => now(),
                'role_id' => 1, // user
            ]
        );

        $this->call(OrderSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(MenuItemSeeder::class);
    }
}
