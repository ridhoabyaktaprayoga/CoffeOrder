import AppLayout from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Users, ShoppingCart, Settings, Utensils } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

export default function Admin() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <HeadingSmall
                    title="Admin Dashboard"
                    description="Manage users and system settings"
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Category Management
                            </CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-4">
                                Create and manage categories
                            </CardDescription>
                            <Button asChild  variant="outline" className="w-full">
                                <Link href="/admin/category">Manage Categories</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Menu Management
                            </CardTitle>
                            <Utensils className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-4">
                                Create and manage menu items
                            </CardDescription>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/admin/menu">Manage Menu</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Orders Management
                            </CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-4">
                                View and manage all customer orders
                            </CardDescription>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/orders">Manage Orders</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                User Management
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-4">
                                Manage user roles and permissions
                            </CardDescription>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/settings/roles">Manage Users</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                System Settings
                            </CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="mb-4">
                                Configure system settings
                            </CardDescription>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/settings">Settings</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
