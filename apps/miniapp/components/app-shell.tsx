'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeftIcon, CartIcon, GridIcon, HomeIcon, SearchIcon, UserIcon } from './ui-icons'

const PAGE_TITLES: Record<string, string> = {
    '/': 'PharmaClick',
    '/catalog': 'Каталог',
    '/cart': 'Корзина',
    '/profile': 'Профиль',
}

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    const isHome = pathname === '/'
    const isProduct = pathname.startsWith('/product/')
    const isCatalogChild = pathname.startsWith('/catalog/')

    const title = isProduct
        ? 'Товар'
        : isCatalogChild
            ? 'Каталог'
            : PAGE_TITLES[pathname] ?? 'PharmaClick'

    const navItems = [
        { href: '/', label: 'Главная', icon: HomeIcon },
        { href: '/catalog', label: 'Каталог', icon: GridIcon },
        { href: '/cart', label: 'Корзина', icon: CartIcon },
        { href: '/profile', label: 'Профиль', icon: UserIcon },
    ]

    return (
        <div className="pc-app">
            <header className="pc-header">
                <div className="pc-header-inner">
                    <div className="pc-header-left">
                        {!isHome ? (
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="pc-icon-button"
                                aria-label="Назад"
                            >
                                <ArrowLeftIcon width={18} height={18} />
                            </button>
                        ) : (
                            <div className="pc-logo-pill">PC</div>
                        )}
                    </div>

                    <div className="pc-header-center">
                        <div className="pc-header-title">{title}</div>
                        {isHome && (
                            <div className="pc-header-subtitle">Online pharmacy</div>
                        )}
                    </div>

                    <div className="pc-header-right">
                        <Link href="/catalog" className="pc-icon-button" aria-label="Поиск">
                            <SearchIcon width={18} height={18} />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pc-main">
                {children}
            </main>

            <nav className="pc-bottom-nav">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const active =
                        pathname === href || (href !== '/' && pathname.startsWith(href))

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`pc-bottom-nav-item ${active ? 'active' : ''}`}
                        >
                            <span className="pc-bottom-nav-icon">
                                <Icon width={20} height={20} />
                            </span>
                            <span>{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}