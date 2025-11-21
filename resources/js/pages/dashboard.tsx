import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type Order, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus, ShoppingCart } from 'lucide-react';

interface Props {
    recentOrders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ recentOrders }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.role?.name === 'admin';

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary';
            case 'processing':
                return 'default';
            case 'completed':
                return 'default';
            case 'cancelled':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    {!isAdmin && (
                        <Button asChild>
                            <Link href="/menu">
                                <Plus className="mr-2 h-4 w-4" />
                                Order Now
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Orders
                            </CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {recentOrders.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Recent orders
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Orders
                            </CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    recentOrders.filter(
                                        (order) => order.status === 'pending',
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting processing
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Completed Orders
                            </CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    recentOrders.filter(
                                        (order) => order.status === 'completed',
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Successfully delivered
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                            Your latest order activity
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentOrders.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                {isAdmin ? (
                                    'No orders to display.'
                                ) : (
                                    <>
                                        No orders yet.{' '}
                                        <Link
                                            href="/menu"
                                            className="text-primary hover:underline"
                                        >
                                            Place your first order
                                        </Link>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between border-b pb-4 last:border-b-0"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm leading-none font-medium">
                                                Order #{order.id}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.items
                                                    .map(
                                                        (item) =>
                                                            `${item.quantity}x ${item.name}`,
                                                    )
                                                    .join(', ')}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(order.created_at)}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge
                                                variant={getStatusBadgeVariant(
                                                    order.status,
                                                )}
                                            >
                                                {order.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    order.status.slice(1)}
                                            </Badge>
                                            <div className="text-sm font-medium">
                                                {formatCurrency(
                                                    order.total_amount,
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4">
                                    <Button
                                        variant="outline"
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href="/orders">
                                            View All Orders
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
