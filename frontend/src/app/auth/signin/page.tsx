import { Brand } from "@/components/brand/brand";
import Link from "next/link";

export default function SigninPage() {
    return (
        <main className="min-h-screen max-w-lg mx-auto pt-10 px-5 flex flex-col justify-center">
            <Brand />
            <div className="py-10">
                <h1 className="text-white font-bold text-4xl">Login</h1>
            </div>
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
