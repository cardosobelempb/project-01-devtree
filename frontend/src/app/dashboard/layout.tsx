import { AuthPrivate } from '@/components/auth-private/auth-private'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Generated by create next app',
}

export default function PageAdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <AuthPrivate>
            {children}
            <h1>PageAdminLayout</h1>
        </AuthPrivate>
    )
}
