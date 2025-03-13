'use client'

import { ReactNode } from "react"

type ProfileLeftProps = {
    children?: ReactNode
}

export const ProfileLeft: React.FC<ProfileLeftProps> =  () => {
    return (
        <div className="flex-1 ">
            <form
                className="bg-white p-10 rounded-lg space-y-5"
                onSubmit={() => {}}
            >
                <legend className="text-2xl text-slate-800 text-left font-bold">
                    Editar informações
                </legend>
                <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="userName">User name:</label>
                    <input
                        type="text"
                        className="border-none bg-slate-100 rounded-lg p-2"
                        placeholder="identificador ou nome de usuário"
                    />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        className="border-none bg-slate-100 rounded-lg p-2"
                        placeholder="Sua descrição"
                    />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="handle">Imagen:</label>
                    <input
                        id="image"
                        type="file"
                        name="handle"
                        className="border-none bg-slate-100 rounded-lg p-2"
                        accept="image/*"
                        onChange={() => {}}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value="Salvar alterações"
                />
            </form>
        </div>
    )
}
