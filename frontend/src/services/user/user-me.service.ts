import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
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
        user: {
            id: string
            name: string
            userName: string
            email: string
            isActive: boolean | string
            createdAt: string
            updatedAt: string
        }
    }

    export const resourceUrl = '/me'
}

async function userMeService() {
    try {
        const { data }: AxiosResponse<UserMeProps.Response> = await api.get(
            UserMeProps.resourceUrl,
        )
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const queryUserMeService = () => {
    const { data, isError, isLoading, isFetching } = useQuery({
        queryKey: ['user'],
        queryFn: userMeService,
        retry: 1,
        refetchOnWindowFocus: false,
    })

    return { data, isError, isLoading, isFetching }
}
