'use client'
import { ExternalToast, toast } from "sonner"

type showToatsProps = {
    message?: string
    data?: ExternalToast
}

export const toatSuccess = ({ message, data }: showToatsProps) => {
    toast.success(message, data)
}

export const toatError = ({ message, data }: showToatsProps) => {
    toast.error(message, data)
}

export const toatInfo = ({ message, data }: showToatsProps) => {
    toast.info(message, data)
}

