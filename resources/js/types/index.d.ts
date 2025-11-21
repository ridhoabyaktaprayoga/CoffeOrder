import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Role {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role?: Role;
    [key: string]: unknown; // This allows for additional properties...
}

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    user_id: number;
    items: OrderItem[];
    total_amount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    notes?: string;
    created_at: string;
    updated_at: string;
    user?: User;
}
