'use client'

import { UserMeProps } from '@/services/user/user-me.service'
import { ReactNode } from 'react'

export namespace DashboardLayoutProps {
    export type Request = {
        id: string
        name: string
        userName: string
        email: string
        createdAt: string
        updatedAt: string
    }

    export type Response = {
        data: UserMeProps.Response
    }

    export type Props = {
        data: UserMeProps.Response
        children: ReactNode
    }

    export const resourceUrl = '/auth/token'
}

export default function DashboardLayout({ children}: DashboardLayoutProps.Props) {
    return (
        <>
            {children}
        </>
    )
}
