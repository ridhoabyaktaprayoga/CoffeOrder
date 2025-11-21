<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Coffee',
                'description' => 'Hot and cold coffee beverages',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Pastries',
                'description' => 'Fresh baked goods and desserts',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Beverages',
                'description' => 'Non-coffee drinks and refreshments',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
