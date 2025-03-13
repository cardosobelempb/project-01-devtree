'use client'

import { userMeService } from '@/services/user/user-me.service'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../pages/dashboard/layout/dashboard.layout'

export const AuthPrivate = () => {
    const router = useRouter()
    const { data, isLoading, isError } = useQuery({
        queryFn: userMeService,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false,
    })
    if (isLoading) return 'Carregando...'
    if (isError) router.push('/auth/signin')
    console.log(data)

    return data ? (
        <>
            <DashboardLayout data={data}>
                <h1>AuthPrivate</h1>
            </DashboardLayout>
        </>
    ) : (
        <>
            <h1>Not found</h1>
        </>
    )
}
