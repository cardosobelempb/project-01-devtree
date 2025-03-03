'use client'

import { Brand } from "@/components/brand/brand";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {useForm} from 'react-hook-form'
import { z } from "zod";

export namespace SignupPageProps {
    export const schema = z
        .object({
            name: z.string().min(3, 'Campo é obrigatório'),
            email: z
                .string()
                .min(3, 'Campo é obrigatório')
                .email('Email inválido'),
            userName: z.string().min(5, 'Deve ter 5 ou mais caracteres'),
            password: z.string().min(3, 'Password é obrigatório'),
            passwordConfirmation: z
                .string()
                .min(3, 'Repetir password é obrigatório'),
        })
        .refine(data => data.password === data.passwordConfirmation, {
            message: 'As senhas não correspondem',
            path: ['passwordConfirmation'],
        })

    export type Schema = z.infer<typeof schema>
}

export default function SignupPage(){

    const initialValues: SignupPageProps.Schema = {
        name: '',
        email: '',
        userName: '',
        password: '',
        passwordConfirmation: ''
    }

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupPageProps.Schema>({
        resolver: zodResolver(SignupPageProps.schema),
        defaultValues: initialValues,
    })

    console.log(errors)

    const handleSignup = (data: SignupPageProps.Schema) => {
        console.log(data)
    }

    return (
        <main className="min-h-screen max-w-lg mx-auto px-10 py-10 flex flex-col justify-center">
            <Brand />

            <h1 className="text-4xl font-bold text-white mt-5">Criar conta</h1>

            <form
                onSubmit={handleSubmit(handleSignup)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">
                        Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name')}
                    />
                    {errors.name && (
                        <ErrorMessage>
                            {errors.name?.message}
                        </ErrorMessage>
                    )}
                </div>
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
                        htmlFor="userName"
                        className="text-2xl text-slate-500"
                    >
                        User name
                    </label>
                    <input
                        id="userName"
                        type="text"
                        placeholder="Nome de usuário: sem espaços"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('userName')}
                    />
                    {errors.userName && (
                        <ErrorMessage>
                            {errors.userName?.message}
                        </ErrorMessage>
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
                        <ErrorMessage>
                            {errors.password?.message}
                        </ErrorMessage>
                    )}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label
                        htmlFor="passwordConfirmation"
                        className="text-2xl text-slate-500"
                    >
                        Repetir Password
                    </label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('passwordConfirmation')}
                    />
                    {errors.passwordConfirmation && (
                        <ErrorMessage>
                            {errors.passwordConfirmation?.message}
                        </ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value="Criar uma conta"
                />
            </form>
            <nav className="mt-10">
                <Link
                    className="text-center text-white text-lg block"
                    href={`/auth/signin`}
                >
                    Já tem uma conta? Entrar
                </Link>
            </nav>
        </main>
    )
}
