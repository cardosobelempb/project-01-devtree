'use client'

import { UserMeProps } from '@/services/user/user-me.service'
import { ProfileContent } from '../profile/profile-content'
import { ReactNode } from 'react'

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

type AuthLayoutProps = {
    data: UserMeProps.Response
    children?: ReactNode
}

export default function AuthLayout({data}: AuthLayoutProps) {
    return <ProfileContent data={data} />
}
