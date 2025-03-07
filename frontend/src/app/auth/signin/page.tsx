'use client'

import { Brand } from '@/components/brand/brand'
import ErrorMessage from '@/components/ErrorMessage'
import { toatError, toatSuccess } from '@/components/show-toats'
import { api } from '@/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosResponse, isAxiosError } from 'axios'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export namespace SigninPageProps {
    export const schema = z.object({
        email: z.string().min(3, 'Campo é obrigatório').email('Email inválido'),
        password: z.string().min(3, 'Password é obrigatório'),
    })

    export const initialValues: SigninPageProps.Schema = {
        email: '',
        password: '',
    }

    export type Schema = z.infer<typeof schema>

    export type Request = Pick<Schema, 'email' | 'password'>

    export type Response = {
        access_token: string
    }

    export const resourceUrl = '/auth/token'
}

export default function SigninPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SigninPageProps.Schema>({
        resolver: zodResolver(SigninPageProps.schema),
        defaultValues: SigninPageProps.initialValues,
    })

    const handleSignin = async (
        formData: SigninPageProps.Request,
    ) => {
        try {
            const { data }: AxiosResponse<SigninPageProps.Response> =
                await api.post(SigninPageProps.resourceUrl, formData)
            localStorage.setItem('AUTH_TOKEN', data.access_token)
            toatSuccess({ message: 'Login realizado com successo.' })
            console.log(data.access_token)

            reset()
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toatError({ message: error.response.data?.message })
            }
        }
    }

    return (
        <main className="min-h-screen max-w-lg mx-auto pt-10 px-5 flex flex-col justify-center">
            <Brand />

            <h1 className="text-white font-bold text-4xl">Login</h1>

            <form
                onSubmit={handleSubmit(handleSignin)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email')}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    )}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label
                        htmlFor="password"
                        className="text-2xl text-slate-500"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password')}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value="Entrar"
                />
            </form>

            <nav className="mt-10">
                <Link
                    className="text-center block text-white text-lg"
                    href="/auth/signup"
                >
                    Não tem conta? Crie um aqui.
                </Link>
            </nav>
        </main>
    )
}
