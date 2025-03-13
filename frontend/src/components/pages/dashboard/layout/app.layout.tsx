'use client'

import { PageHeader } from '../dahsboard-header'

export namespace PageProfileProps {

    export type Request = {
        id: string
        name: string
        userName: string
        email: string
        createdAt: string
        updatedAt: string
    }

    export type Response = {
        access_token: string
    }

    export const resourceUrl = '/auth/token'
}

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <>
            <PageHeader />
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    {children}
                </main>
            </div>
        </>
    )
}
