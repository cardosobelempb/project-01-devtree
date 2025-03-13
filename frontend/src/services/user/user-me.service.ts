import { api } from '@/lib/axios'
import { AxiosResponse, isAxiosError } from 'axios'
import { z } from 'zod'

export namespace UserMeProps {
    export const schema = z.object({
        description: z.string(),
        userName: z.string(),
        imgUrl: z.string(),
    })

    export type Schema = z.infer<typeof schema>

    export type Response = {
        id: string
        name: string
        userName: string
        email: string
        isActive: boolean | string
        createdAt: string
        updatedAt: string
    }

    export const initialValues: UserMeProps.Response = {
        id: '',
        name: '',
        userName: '',
        email: '',
        isActive: '',
        createdAt: '',
        updatedAt: '',
    }

    export const resourceUrl = '/me'
}

export async function userMeService() {
    try {
        const { data }: AxiosResponse<UserMeProps.Response> = await api.get(
            UserMeProps.resourceUrl,
        )
        // console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
