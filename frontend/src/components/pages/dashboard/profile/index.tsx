'use client'

import { UserMeProps } from "@/services/user/user-me.service"
import { DashboardHeader } from "../dahsboard-header"
import DashboardLayout from "../layout/dashboard.layout"

export namespace DashboardProfileProps {
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
    }

    export const resourceUrl = '/auth/token'
}

export const DashboardProfile: React.FC<DashboardProfileProps.Props> = ({data}) => {
    return (
        <>
            <DashboardLayout data={data}>
                <DashboardHeader />
                <h1>DashboardProfile</h1>
            </DashboardLayout>
        </>
    )
}
