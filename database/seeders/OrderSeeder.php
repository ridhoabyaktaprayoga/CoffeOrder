<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            return;
        }

        $sampleItems = [
            [
                ['name' => 'Espresso', 'quantity' => 2, 'price' => 3.50],
                ['name' => 'Croissant', 'quantity' => 1, 'price' => 4.00],
            ],
            [
                ['name' => 'Latte', 'quantity' => 1, 'price' => 4.50],
                ['name' => 'Muffin', 'quantity' => 2, 'price' => 3.25],
            ],
            [
                ['name' => 'Cappuccino', 'quantity' => 3, 'price' => 4.00],
            ],
            [
                ['name' => 'Americano', 'quantity' => 1, 'price' => 3.00],
                ['name' => 'Bagel', 'quantity' => 1, 'price' => 3.50],
                ['name' => 'Orange Juice', 'quantity' => 1, 'price' => 3.75],
            ],
        ];

        $statuses = ['pending', 'processing', 'completed', 'cancelled'];

        foreach ($users as $user) {
            // Create 2-5 orders per user
            $orderCount = rand(2, 5);

            for ($i = 0; $i < $orderCount; $i++) {
                $items = $sampleItems[array_rand($sampleItems)];
                $totalAmount = collect($items)->sum(function ($item) {
                    return $item['quantity'] * $item['price'];
                });

                Order::create([
                    'user_id' => $user->id,
                    'items' => $items,
                    'total_amount' => $totalAmount,
                    'status' => $statuses[array_rand($statuses)],
                    'notes' => rand(0, 2) === 0 ? 'Extra sugar please' : null,
                    'created_at' => now()->subDays(rand(0, 30)),
                ]);
            }
        }
    }
}
