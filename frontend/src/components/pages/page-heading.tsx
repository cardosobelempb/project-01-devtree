'use client'

import Link from "next/link"

type PageHeadingProps = {
    title?: string
    link?: string
}

export const PageHeading: React.FC<PageHeadingProps> = ({link, title}) => {
    return (
        <div className="flex justify-end">
            {link && (
                <Link
                    className="font-bold text-right text-slate-800 text-2xl"
                    href={''}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {title}
                </Link>
            )}
            {!link && (
                <h2 className="font-bold text-right text-slate-800 text-2xl">
                    {title}
                </h2>
            )}
        </div>
    )
}
