import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    category: Category;
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
    {
        title: 'Edit Category',
        href: '/admin/category/edit',
    },
];

export default function Edit({ category }: Props) {
    const [formData, setFormData] = useState({
        name: category.name,
        description: category.description || '',
        is_active: category.is_active,
        sort_order: category.sort_order,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.put(`/admin/category/${category.id}`, formData, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/category">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Categories
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Edit Category</h2>
                        <p className="text-muted-foreground">
                            Update the details for {category.name}
                        </p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Category Details</CardTitle>
                        <CardDescription>
                            Update the information for this category
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
                                        placeholder="e.g., Coffee, Pastries"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={formData.sort_order}
                                        onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the category..."
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => handleInputChange('is_active', !!checked)}
                                />
                                <Label htmlFor="is_active">Active (visible to customers)</Label>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update Category'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/admin/category">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
