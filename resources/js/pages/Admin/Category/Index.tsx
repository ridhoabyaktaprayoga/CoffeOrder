import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    menu_items_count?: number;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Category Management',
        href: '/admin/category',
    },
];

export default function Index({ categories }: Props) {
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

    const handleDelete = () => {
        if (deleteCategory) {
            router.delete(`/admin/category/${deleteCategory.id}`, {
                onSuccess: () => setDeleteCategory(null),
            });
        }
    };

    const toggleActive = (category: Category) => {
        router.put(`/admin/category/${category.id}`, {
            ...category,
            is_active: !category.is_active,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category Management" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Category Management</h2>
                        <p className="text-muted-foreground">
                            Create and manage menu categories for your coffee shop
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/category/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                        <CardDescription>
                            Manage your menu categories and their display order
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {categories.length === 0 ? (
                            <p className="text-center py-8 text-muted-foreground">
                                No categories found.
                            </p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Sort Order</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Menu Items</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium">
                                                {category.name}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {category.description || 'No description'}
                                            </TableCell>
                                            <TableCell>
                                                {category.sort_order}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={category.is_active ? 'default' : 'secondary'}>
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {category.menu_items_count || 0} items
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toggleActive(category)}
                                                    >
                                                        {category.is_active ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={`/admin/category/${category.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setDeleteCategory(category)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Delete Category</DialogTitle>
                                                                <DialogDescription>
                                                                    Are you sure you want to delete "{category.name}"?
                                                                    {category.menu_items_count && category.menu_items_count > 0
                                                                        ? ` This category has ${category.menu_items_count} menu items and cannot be deleted.`
                                                                        : ' This action cannot be undone.'
                                                                    }
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => setDeleteCategory(null)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={handleDelete}
                                                                    disabled={!!(category.menu_items_count && category.menu_items_count > 0)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
