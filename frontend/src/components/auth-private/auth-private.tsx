'use client'

import {
    queryUserMeService,
    UserMeProps,
} from '@/services/user/user-me.service'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../pages/dashboard/layout/dashboard.layout'
import { ReactNode } from 'react'

export namespace AuthPrivateProps {
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
        // data: UserMeProps.Response
        children: ReactNode
    }

    export const resourceUrl = '/auth/token'
}

export const AuthPrivate: React.FC<AuthPrivateProps.Props> = ({ children }) => {
    const router = useRouter()
    const { data, isError, isLoading, isFetching } = queryUserMeService()

    if (isLoading) return 'Carregando...'
    if (isFetching) return 'Re Carregando...'
    if (isError) router.push('/auth/signin')
    // console.log(data)

    // return data && <>{children}</>

    console.log(data?.user.email)
    return data && <DashboardLayout data={data}>{children}</DashboardLayout>
}
