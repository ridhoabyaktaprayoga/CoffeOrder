import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Order, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    orders: Order[];
    isAdmin: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/orders',
    },
];

export default function Index({ orders, isAdmin }: Props) {
    const [updatingOrder, setUpdatingOrder] = useState<number | null>(null);

    const handleStatusChange = (orderId: number, status: string) => {
        setUpdatingOrder(orderId);
        router.put(
            `/orders/${orderId}`,
            { status },
            {
                onFinish: () => setUpdatingOrder(null),
            },
        );
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isAdmin ? 'All Orders' : 'My Orders'}
                    </h2>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>
                            {isAdmin
                                ? 'Manage all customer orders'
                                : 'View and track your orders'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {orders.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground">
                                No orders found.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        {isAdmin && (
                                            <TableHead>Customer</TableHead>
                                        )}
                                        <TableHead>Items</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        {isAdmin && (
                                            <TableHead>Actions</TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">
                                                #{order.id}
                                            </TableCell>
                                            {isAdmin && (
                                                <TableCell>
                                                    {order.user?.name}
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                <div className="space-y-1">
                                                    {order.items.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                className="text-sm"
                                                            >
                                                                {item.quantity}x{' '}
                                                                {item.name}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(
                                                    order.total_amount,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {isAdmin ? (
                                                    <Select
                                                        value={order.status}
                                                        onValueChange={(
                                                            value,
                                                        ) =>
                                                            handleStatusChange(
                                                                order.id,
                                                                value,
                                                            )
                                                        }
                                                        disabled={
                                                            updatingOrder ===
                                                            order.id
                                                        }
                                                    >
                                                        <SelectTrigger className="w-32">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">
                                                                Pending
                                                            </SelectItem>
                                                            <SelectItem value="processing">
                                                                Processing
                                                            </SelectItem>
                                                            <SelectItem value="completed">
                                                                Completed
                                                            </SelectItem>
                                                            <SelectItem value="cancelled">
                                                                Cancelled
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Badge
                                                        variant={getStatusBadgeVariant(
                                                            order.status,
                                                        )}
                                                    >
                                                        {order.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            order.status.slice(
                                                                1,
                                                            )}
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(order.created_at)}
                                            </TableCell>
                                            {isAdmin && (
                                                <TableCell>
                                                    {order.notes && (
                                                        <div className="max-w-xs truncate text-sm text-muted-foreground">
                                                            {order.notes}
                                                        </div>
                                                    )}
                                                </TableCell>
                                            )}
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
