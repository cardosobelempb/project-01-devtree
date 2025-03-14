'use client'

import { UserMeProps } from '@/services/user/user-me.service'
import { ReactNode } from 'react'
import { DashboardHeader } from '../dahsboard-header'

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

export default function DashboardLayout({ data }: DashboardLayoutProps.Props) {
    console.log()
    return (
        <>
            <DashboardHeader/>

            <h1>Dashboard Layout email = {data.user.email}</h1>

        </>
    )
}
