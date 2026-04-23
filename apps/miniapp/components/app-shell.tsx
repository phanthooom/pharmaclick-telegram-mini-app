'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PAGE_TITLES: Record<string, string> = {
    '/': 'PharmaClick',
    '/catalog': 'Каталог',
    '/cart': 'Корзина',
    '/profile': 'Профиль',
}

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    const [safeTop, setSafeTop] = useState(0)
    const [inTelegram, setInTelegram] = useState(false)

    useEffect(() => {
        const wa = window.Telegram?.WebApp as
            | {
                initData?: string
                safeAreaInset?: { top?: number }
                contentSafeAreaInset?: { top?: number }
                onEvent?: (event: string, cb: () => void) => void
                offEvent?: (event: string, cb: () => void) => void
            }
            | undefined

        if (!wa) {
            setInTelegram(false)
            setSafeTop(0)
            return
        }

        setInTelegram(true)

        const updateSafeArea = () => {
            const top = wa.contentSafeAreaInset?.top ?? wa.safeAreaInset?.top ?? 0
            setSafeTop(top)
        }

        updateSafeArea()
        wa.onEvent?.('safeAreaChanged', updateSafeArea)
        wa.onEvent?.('contentSafeAreaChanged', updateSafeArea)
        wa.onEvent?.('fullscreenChanged', updateSafeArea)

        return () => {
            wa.offEvent?.('safeAreaChanged', updateSafeArea)
            wa.offEvent?.('contentSafeAreaChanged', updateSafeArea)
            wa.offEvent?.('fullscreenChanged', updateSafeArea)
        }
    }, [])

    const isHome = pathname === '/'
    const isProduct = pathname.startsWith('/product/')
    const isCatalogChild = pathname.startsWith('/catalog/')

    const title = isProduct
        ? 'Товар'
        : isCatalogChild
            ? 'Каталог'
            : PAGE_TITLES[pathname] ?? 'PharmaClick'

    const topPad = inTelegram ? Math.max(safeTop, 72) : Math.max(safeTop, 0)

    return (
        <div className="pc-app">
            <header className="pc-header">
                <div
                    className="pc-header-inner"
                    style={{ paddingTop: `${topPad}px` }}
                >
                    <div className="pc-header-left">
                        {!isHome ? (
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="pc-icon-button"
                                aria-label="Назад"
                            >
                                ←
                            </button>
                        ) : (
                            <div className="pc-logo-pill">PC</div>
                        )}
                    </div>

                    <div className="pc-header-center">
                        <div className="pc-header-title">{title}</div>
                        {isHome && <div className="pc-header-subtitle">Online pharmacy</div>}
                    </div>

                    <div className="pc-header-right">
                        <Link href="/catalog" className="pc-icon-button" aria-label="Поиск">
                            ⌕
                        </Link>
                    </div>
                </div>
            </header>

            <main
                className="pc-main"
                style={{ paddingTop: `${topPad + 76}px` }}
            >
                {children}
            </main>

            <nav className="pc-bottom-nav">
                {[
                    { href: '/', label: 'Главная', icon: '⌂' },
                    { href: '/catalog', label: 'Каталог', icon: '⌕' },
                    { href: '/cart', label: 'Корзина', icon: '🛒' },
                    { href: '/profile', label: 'Профиль', icon: '◉' },
                ].map(({ href, label, icon }) => {
                    const active = pathname === href || (href !== '/' && pathname.startsWith(href))

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`pc-bottom-nav-item ${active ? 'active' : ''}`}
                        >
                            <span className="pc-bottom-nav-icon">{icon}</span>
                            <span>{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}