<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $menuItems = MenuItem::with('category')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Menu/Index', [
            'menuItems' => $menuItems,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $categories = \App\Models\Category::active()->ordered()->get();

        return Inertia::render('Admin/Menu/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'is_available' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $originalName = $request->file('image')->getClientOriginalName();
            $imagePath = $request->file('image')->storeAs('menu-items', $originalName, 'public');
            $validated['image'] = $imagePath;
        } else {
            // Use default image if no image is uploaded
            $validated['image'] = 'menu-items/defautfoodimage.png';
        }

        MenuItem::create($validated);

        return redirect()->route('admin.menu.index')->with('success', 'Menu item created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $menuItem = MenuItem::findOrFail($id);
        $categories = \App\Models\Category::active()->ordered()->get();

        return Inertia::render('Admin/Menu/Edit', [
            'menuItem' => $menuItem,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $menuItem = MenuItem::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'is_available' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists and it's not the default image
            if ($menuItem->image &&
                $menuItem->image !== 'menu-items/defautfoodimage.png' &&
                \Storage::disk('public')->exists($menuItem->image)) {
                \Storage::disk('public')->delete($menuItem->image);
            }

            $originalName = $request->file('image')->getClientOriginalName();
            $imagePath = $request->file('image')->storeAs('menu-items', $originalName, 'public');
            $validated['image'] = $imagePath;
        }

        $menuItem->update($validated);

        return redirect()->route('admin.menu.index')->with('success', 'Menu item updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();

        return redirect()->route('admin.menu.index')->with('success', 'Menu item deleted successfully!');
    }
}
