'use client'

import { Brand } from "@/components/brand/brand"

export const DashboardHeader = () => {
    return (
        <header className="bg-slate-800 py-5">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                <div className="w-full p-5 lg:p-0 md:w-1/3">
                    <Brand link="/" />
                </div>
                <div className="md:w-1/3 md:flex md:justify-end">
                    <button className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer">
                        Sair
                    </button>
                </div>
            </div>
        </header>
    )
}
