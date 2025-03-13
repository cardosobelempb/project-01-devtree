'use client'

import { UserMeProps } from '@/services/user/user-me.service'
import { BookmarkIcon, User2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent } from 'react'

const tabs = [
    { name: 'Dashboard', href: '/dashboard', icon: BookmarkIcon },
    { name: 'Meu perfil', href: '/dashboard/profile', icon: User2 },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type DashboardProfileProps = {
    data: UserMeProps.Response
}

export const NavigationTabs: React.FC<DashboardProfileProps> = ({ data }) => {
    const pathname = usePathname()
    const navigation = useRouter()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        navigation.push(e.target.value)
    }

    return (
        <div className="mb-5">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    onChange={handleChange}
                >
                    {tabs.map(tab => (
                        <option value={tab.href} key={tab.name}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map(tab => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                passHref
                                className={classNames(
                                    pathname === tab.href
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-xl',
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        pathname === tab.href
                                            ? 'text-blue-500'
                                            : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5',
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name} {data.userName}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
