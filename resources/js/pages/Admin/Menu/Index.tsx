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
}

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    category: Category;
    is_available: boolean;
    image: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    menuItems: MenuItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Menu Management',
        href: '/admin/menu',
    },
];

export default function Index({ menuItems }: Props) {
    const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);

    const handleDelete = () => {
        if (deleteItem) {
            router.delete(`/admin/menu/${deleteItem.id}`, {
                onSuccess: () => setDeleteItem(null),
            });
        }
    };

    const toggleAvailability = (item: MenuItem) => {
        router.put(`/admin/menu/${item.id}`, {
            name: item.name,
            description: item.description,
            price: item.price,
            category_id: item.category_id,
            is_available: !item.is_available,
            image: item.image,
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Group menu items by category
    const groupedItems = menuItems.reduce((acc, item) => {
        const categoryName = item.category?.name || 'Uncategorized';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
    }, {} as Record<string, MenuItem[]>);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Management" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
                        <p className="text-muted-foreground">
                            Create and manage menu items for your coffee shop
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/menu/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Menu Item
                        </Link>
                    </Button>
                </div>

                {Object.entries(groupedItems).map(([categoryName, categoryItems]) => (
                    <Card key={categoryName}>
                        <CardHeader>
                            <CardTitle>{categoryName}</CardTitle>
                            <CardDescription>
                                {categoryItems.length} item{categoryItems.length !== 1 ? 's' : ''}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categoryItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                {item.image ? (
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        alt={item.name}
                                                        className="h-12 w-12 rounded-md object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center text-muted-foreground text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {item.description}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(item.price)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={item.is_available ? 'default' : 'secondary'}>
                                                    {item.is_available ? 'Available' : 'Unavailable'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toggleAvailability(item)}
                                                    >
                                                        {item.is_available ? (
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
                                                        <Link href={`/admin/menu/${item.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setDeleteItem(item)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Delete Menu Item</DialogTitle>
                                                                <DialogDescription>
                                                                    Are you sure you want to delete "{item.name}"?
                                                                    This action cannot be undone.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => setDeleteItem(null)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={handleDelete}
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
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
