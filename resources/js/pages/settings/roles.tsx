import AppLayout from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings/profile',
    },
    {
        title: 'Roles',
        href: '/settings/roles',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        id: number;
        name: string;
    };
}

interface Role {
    id: number;
    name: string;
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
    };
    roles: Role[];
}

export default function Roles({ users, roles }: Props) {
    const [updating, setUpdating] = useState<number | null>(null);

    const handleRoleChange = (userId: number, roleId: string) => {
        setUpdating(userId);
        router.put(`/settings/roles/${userId}`, { role_id: roleId }, {
            onFinish: () => setUpdating(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <HeadingSmall
                    title="User Roles"
                    description="Manage user roles and permissions"
                />

                <div className="grid gap-4">
                    {users.data.map((user) => (
                        <Card key={user.id}>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">{user.name}</h3>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                        <p className="text-sm">Current Role: {user.role.name}</p>
                                    </div>
                                    <Select
                                        value={user.role.id.toString()}
                                        onValueChange={(value) => handleRoleChange(user.id, value)}
                                        disabled={updating === user.id}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.id} value={role.id.toString()}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
