'use client'

import { UserMeProps } from '@/services/user/user-me.service'
import { ReactNode } from 'react'

type ProfilePageProps = {
    data: UserMeProps.Response
    children?: ReactNode
}

export const ProfileContent: React.FC<ProfilePageProps> = ({ data }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-10 mt-10">
                <p>{data.email}</p>
            </div>
        </>
    )
}
