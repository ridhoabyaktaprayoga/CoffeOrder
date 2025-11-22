import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

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

interface CartItem extends MenuItem {
    quantity: number;
}

interface Props {
    menuItems: MenuItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Menu',
        href: '/menu',
    },
];

export default function Index({ menuItems }: Props) {
    console.log('Menu items received:', menuItems); // Debug log
    const [cart, setCart] = useState<CartItem[]>([]);
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addToCart = (item: MenuItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (cartItem) => cartItem.id === item.id,
            );
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem,
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (cartItem) => cartItem.id === itemId,
            );
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map((cartItem) =>
                    cartItem.id === itemId
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem,
                );
            } else {
                return prevCart.filter((cartItem) => cartItem.id !== itemId);
            }
        });
    };

    const getTotalAmount = () => {
        return cart.reduce(
            (total, item) => total + Number(item.price) * item.quantity,
            0,
        );
    };

    const handleSubmitOrder = () => {
        if (cart.length === 0) return;

        setIsSubmitting(true);

        const orderItems = cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        }));

        router.post(
            '/orders',
            {
                items: orderItems,
                notes: notes.trim() || undefined,
            },
            {
                onFinish: () => {
                    setIsSubmitting(false);
                    setCart([]);
                    setNotes('');
                },
            },
        );
    };

    // Group menu items by category and filter only available items
    const groupedItems = menuItems
        .filter((item) => item.is_available)
        .reduce(
            (acc, item) => {
                const categoryName = item.category?.name || 'Uncategorized';
                if (!acc[categoryName]) {
                    acc[categoryName] = [];
                }
                acc[categoryName].push(item);
                return acc;
            },
            {} as Record<string, MenuItem[]>,
        );

    const hasMenuItems = Object.keys(groupedItems).length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Menu</h2>
                    {cart.length > 0 && (
                        <Badge variant="secondary" className="text-sm">
                            <ShoppingCart className="mr-1 h-3 w-3" />
                            {cart.length} item{cart.length !== 1 ? 's' : ''}
                        </Badge>
                    )}
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Menu Items */}
                    <div className="space-y-6 lg:col-span-2">
                        {!hasMenuItems ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">
                                    No menu items available at the moment.
                                </p>
                                <p className="text-muted-foreground text-sm mt-2">
                                    Please check back later.
                                </p>
                            </div>
                        ) : (
                            Object.entries(groupedItems).map(
                                ([categoryName, categoryItems]) => (
                                    <div key={categoryName}>
                                        <h3 className="mb-4 text-xl font-semibold">
                                            {categoryName}
                                        </h3>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {categoryItems.map((item) => {
                                                const cartItem = cart.find(
                                                    (cartItem) =>
                                                        cartItem.id === item.id,
                                                );
                                                return (
                                                    <Card
                                                        key={item.id}
                                                        className="relative"
                                                    >
                                                        <CardHeader className="pb-3">
                                                            {item.image && (
                                                                <div className="mb-3">
                                                                    <img
                                                                        src={`/storage/${item.image}`}
                                                                        alt={
                                                                            item.name
                                                                        }
                                                                        className="h-48 w-full rounded-md object-cover"
                                                                        onError={(e) => {
                                                                            e.currentTarget.style.display = 'none';
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="flex items-center justify-between">
                                                                <CardTitle className="text-lg">
                                                                    {item.name}
                                                                </CardTitle>
                                                                <span className="text-lg font-bold">
                                                                    $
                                                                    {Number(item.price).toFixed(
                                                                        2,
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <CardDescription>
                                                                {item.description}
                                                            </CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="flex items-center justify-between">
                                                                {cartItem ? (
                                                                    <div className="flex items-center space-x-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                removeFromCart(
                                                                                    item.id,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                        <span className="min-w-[2rem] text-center font-medium">
                                                                            {
                                                                                cartItem.quantity
                                                                            }
                                                                        </span>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                addToCart(
                                                                                    item,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Plus className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() =>
                                                                            addToCart(
                                                                                item,
                                                                            )
                                                                        }
                                                                        className="w-full"
                                                                    >
                                                                        Add to Cart
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ),
                            )
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cart.length === 0 ? (
                                    <p className="py-8 text-center text-muted-foreground">
                                        Your cart is empty
                                    </p>
                                ) : (
                                    <>
                                        <div className="space-y-3">
                                            {cart.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-medium">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            $
                                                            {Number(item.price).toFixed(
                                                                2,
                                                            )}{' '}
                                                            × {item.quantity}
                                                        </p>
                                                    </div>
                                                    <span className="font-medium">
                                                        $
                                                        {(
                                                            Number(item.price) *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t pt-3">
                                            <div className="flex items-center justify-between text-lg font-bold">
                                                <span>Total</span>
                                                <span>
                                                    $
                                                    {getTotalAmount().toFixed(
                                                        2,
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">
                                                Special Instructions (Optional)
                                            </Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Any special requests..."
                                                value={notes}
                                                onChange={(e) =>
                                                    setNotes(e.target.value)
                                                }
                                                rows={3}
                                            />
                                        </div>

                                        <Button
                                            onClick={handleSubmitOrder}
                                            disabled={isSubmitting}
                                            className="w-full"
                                            size="lg"
                                        >
                                            {isSubmitting
                                                ? 'Placing Order...'
                                                : 'Place Order'}
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
