import AppLayout from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

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
                <div className="flex-1 rounded-xl bg-muted/50 p-4">
                    <p>Welcome to the admin panel. Here you can manage users, roles, and other administrative tasks.</p>
                </div>
            </div>
        </AppLayout>
    );
}
