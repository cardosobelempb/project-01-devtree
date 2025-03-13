'use client'

import { Toaster } from "@/components/ui/sonner"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import QueryProvider from "./query-provider"

type ProvidersProps = {
    children: ReactNode
}
export const Providers: React.FC<ProvidersProps> = ({children}) => {
     return (
         <>
             <ThemeProvider
                 attribute="class"
                 defaultTheme="system"
                 enableSystem
                 disableTransitionOnChange
             >
                 <QueryProvider>
                     {children}
                     <ReactQueryDevtools />
                 </QueryProvider>
                 <Toaster richColors position="top-right" />
             </ThemeProvider>
         </>
     )
}