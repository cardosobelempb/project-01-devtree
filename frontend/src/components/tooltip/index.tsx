'use client'

import {
    Tooltip as TooltipRoot,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './primitive'
import { ReactNode } from 'react'

type TooltipProps = {
    children: ReactNode
    content: string | number | ReactNode
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    return (
        <TooltipProvider>
            <TooltipRoot delayDuration={300}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <p className='bg-green-200 text-green-500'>{content}</p>
                </TooltipContent>
            </TooltipRoot>
        </TooltipProvider>
    )
}
