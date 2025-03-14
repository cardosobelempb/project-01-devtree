'use client'

import { AuthPrivate } from '@/components/auth-private/auth-private'
import { ReactNode } from 'react'
import { z } from 'zod'

export namespace PageProfileProps {
    export const schema = z.object({
        email: z.string().min(3, 'Campo é obrigatório').email('Email inválido'),
        password: z.string().min(3, 'Password é obrigatório'),
    })

    export const initialValues: PageProfileProps.Schema = {
        email: '',
        password: '',
    }

    export type Schema = z.infer<typeof schema>

    export type Request = Pick<Schema, 'email' | 'password'>

    export type Response = {
        children: ReactNode
    }

    export const resourceUrl = '/auth/token'
}

export default function PageProfile({children}: PageProfileProps.Response) {
    return (
        <>
            <AuthPrivate>
                {children}
            </AuthPrivate>
        </>
    )
}

/*17857765414*/