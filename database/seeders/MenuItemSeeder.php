<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::pluck('id', 'name');

        $menuItems = [
            // Coffee
            [
                'name' => 'Espresso',
                'description' => 'Rich and bold single shot',
                'price' => 3.50,
                'category_id' => $categories['Coffee'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Americano',
                'description' => 'Espresso with hot water',
                'price' => 3.00,
                'category_id' => $categories['Coffee'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Latte',
                'description' => 'Espresso with steamed milk',
                'price' => 4.50,
                'category_id' => $categories['Coffee'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Cappuccino',
                'description' => 'Espresso with steamed milk and foam',
                'price' => 4.00,
                'category_id' => $categories['Coffee'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Mocha',
                'description' => 'Chocolate and espresso with milk',
                'price' => 5.00,
                'category_id' => $categories['Coffee'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],

            // Pastries
            [
                'name' => 'Croissant',
                'description' => 'Buttery and flaky',
                'price' => 4.00,
                'category_id' => $categories['Pastries'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Blueberry Muffin',
                'description' => 'Fresh baked with blueberries',
                'price' => 3.25,
                'category_id' => $categories['Pastries'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Bagel',
                'description' => 'Toasted with cream cheese',
                'price' => 3.50,
                'category_id' => $categories['Pastries'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Danish Pastry',
                'description' => 'Sweet and delicious',
                'price' => 3.75,
                'category_id' => $categories['Pastries'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],

            // Beverages
            [
                'name' => 'Orange Juice',
                'description' => 'Fresh squeezed',
                'price' => 3.75,
                'category_id' => $categories['Beverages'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Fruit Smoothie',
                'description' => 'Mixed berries and banana',
                'price' => 5.50,
                'category_id' => $categories['Beverages'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
            [
                'name' => 'Iced Tea',
                'description' => 'Refreshing and chilled',
                'price' => 3.00,
                'category_id' => $categories['Beverages'],
                'is_available' => true,
                'image' => 'menu-items/defautfoodimage.png',
            ],
        ];

        foreach ($menuItems as $item) {
            MenuItem::create($item);
        }
    }
}
