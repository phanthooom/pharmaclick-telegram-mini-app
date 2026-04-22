"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Главная", icon: "🏠" },
    { href: "/catalog", label: "Каталог", icon: "📚" },
    { href: "/cart", label: "Корзина", icon: "🛒" },
    { href: "/profile", label: "Профиль", icon: "👤" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="pc-bottom-nav fixed bottom-0 left-0 right-0 z-30">
            <div className="grid grid-cols-4 gap-2">
                {navItems.map((item) => {
                    const active =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-2 rounded-[22px] px-3 py-3 text-xs font-medium transition ${active
                                    ? "bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]"
                                    : "text-[var(--text-secondary)]"
                                }`}
                        >
                            <span className="text-[28px] leading-none">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}