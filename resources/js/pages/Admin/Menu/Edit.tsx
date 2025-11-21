import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
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

interface Props {
    menuItem: MenuItem;
    categories: Category[];
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
    {
        title: 'Edit Menu Item',
        href: '/admin/menu/edit',
    },
];

export default function Edit({ menuItem, categories }: Props) {
    const [formData, setFormData] = useState({
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price.toString(),
        category_id: menuItem.category_id.toString(),
        is_available: menuItem.is_available,
        image: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category_id', formData.category_id);
        formDataToSend.append('is_available', formData.is_available.toString());
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        router.put(`/admin/menu/${menuItem.id}`, formDataToSend, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleInputChange = (
        field: string,
        value: string | boolean | File | null,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Menu Item" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/menu">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Menu
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Edit Menu Item
                        </h2>
                        <p className="text-muted-foreground">
                            Update the details for {menuItem.name}
                        </p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Menu Item Details</CardTitle>
                        <CardDescription>
                            Update the information for this menu item
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="e.g., Espresso"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category_id">
                                        Category
                                    </Label>
                                    <Select
                                        value={formData.category_id}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                'category_id',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the menu item..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Image (Optional)</Label>
                                {menuItem.image && (
                                    <div className="mb-2">
                                        <img
                                            src={`/storage/${menuItem.image}`}
                                            alt={menuItem.name}
                                            className="h-32 w-32 rounded-md object-cover"
                                        />
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Current image
                                        </p>
                                    </div>
                                )}
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleInputChange(
                                            'image',
                                            e.target.files?.[0] || null,
                                        )
                                    }
                                />
                                <p className="text-sm text-muted-foreground">
                                    Upload a new image to replace the current
                                    one (JPEG, PNG, JPG, GIF - Max 2MB)
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'price',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="flex items-center space-x-2 pt-8">
                                    <Checkbox
                                        id="is_available"
                                        checked={formData.is_available}
                                        onCheckedChange={(checked) =>
                                            handleInputChange(
                                                'is_available',
                                                !!checked,
                                            )
                                        }
                                    />
                                    <Label htmlFor="is_available">
                                        Available for ordering
                                    </Label>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting
                                        ? 'Updating...'
                                        : 'Update Menu Item'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/admin/menu">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
