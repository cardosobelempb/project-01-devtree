'use client'

import { UserMeProps } from '@/services/user/user-me.service'
import AuthLayout from './layout/auth.layout'

type DashBoradProps = {
    data: UserMeProps.Response
}

export const DashBoradPage: React.FC<DashBoradProps> = ({ data }) => {
    return (
        <AuthLayout>
            <div className="flex flex-col md:flex-row gap-10 mt-10">
                <h1>Dashboard</h1>
            </div>
        </AuthLayout>
    )
}
