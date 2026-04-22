"use client";

import { useEffect, useMemo, useState } from "react";
import { getTelegramWebApp, initTelegramWebApp, isTelegramEnvironment } from "../lib/telegram";

const categories = [
  { title: "Косметика", icon: "🧴" },
  { title: "Лекарства", icon: "💊" },
  { title: "Витамины и БАДы", icon: "🍋" },
  { title: "Интимные средства", icon: "🩺" },
  { title: "Медизделия", icon: "🩹" },
  { title: "Ортопедия", icon: "🦴" },
  { title: "Медтехника", icon: "🩻" },
  { title: "Мама и малыш", icon: "🍼" },
];

const quickLinks = [
  { title: "Филиалы", subtitle: "Ближайшие аптеки", icon: "📍" },
  { title: "Лицензии", subtitle: "Сертификаты", icon: "📄" },
  { title: "FAQ", subtitle: "Частые вопросы", icon: "❓" },
  { title: "Помощь", subtitle: "Как оформить заказ", icon: "💬" },
];

const products = [
  { id: 1, title: "Парацетамол 500 мг", price: "18 000 сум", tag: "Лекарства", icon: "💊" },
  { id: 2, title: "Витамин C 1000", price: "49 000 сум", tag: "Витамины и БАДы", icon: "🍋" },
  { id: 3, title: "Тонометр автоматический", price: "389 000 сум", tag: "Медтехника", icon: "🩺" },
];

const navItems = [
  { key: "home", label: "Главная", icon: "🏠" },
  { key: "catalog", label: "Каталог", icon: "📚" },
  { key: "cart", label: "Корзина", icon: "🛒" },
  { key: "profile", label: "Профиль", icon: "👤" },
];

export default function HomePage() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [username, setUsername] = useState("Гость");
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const tg = initTelegramWebApp();
    setIsTelegram(Boolean(tg));

    const user = getTelegramWebApp()?.initDataUnsafe?.user;
    if (user?.first_name) {
      setUsername(user.first_name);
    }
  }, []);

  const subtitle = useMemo(() => {
    return isTelegram
      ? "Mini App открыт внутри Telegram"
      : "Режим обычного браузера";
  }, [isTelegram]);

  const shellClass = isTelegramEnvironment()
    ? "w-full min-h-[100dvh]"
    : "mx-auto w-full max-w-[430px] min-h-screen shadow-[0_0_40px_rgba(15,23,42,0.08)]";

  const headerTopPadding = isTelegram
    ? "calc(var(--content-safe-top) + 72px)"
    : "20px";

  return (
    <main className="pharmaclick-shell min-h-[100dvh]">
      <div className={shellClass}>
        <header
          className="sticky top-0 z-20 border-b border-[var(--border-soft)] bg-[rgba(248,252,249,0.94)] backdrop-blur"
          style={{
            paddingTop: headerTopPadding,
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
            paddingBottom: "14px",
          }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--brand-primary)]">
                PharmaClick
              </div>
              <div className="text-3xl font-bold leading-[1.05] tracking-[-0.03em]">
                Здравствуйте,<br />
                {username}
              </div>
              <div className="mt-2 text-sm text-[var(--text-secondary)]">{subtitle}</div>
            </div>

            <div className="rounded-[22px] bg-[var(--brand-primary-soft)] px-4 py-3 text-right">
              <div className="text-[11px] text-[var(--text-secondary)]">Доставка</div>
              <div className="text-sm font-semibold text-[var(--brand-primary-strong)]">
                Ташкент
              </div>
            </div>
          </div>

          <div className="mb-3 flex items-center gap-2 text-xs">
            <button className="rounded-full bg-white px-3 py-1.5 font-medium text-[var(--text-secondary)] ring-1 ring-[var(--border-soft)]">
              RU
            </button>
            <button className="rounded-full bg-[var(--brand-primary-soft)] px-3 py-1.5 font-medium text-[var(--brand-primary-strong)] ring-1 ring-[#cfe9d7]">
              UZ
            </button>
            <div className="ml-auto rounded-full bg-white px-3 py-1.5 text-[var(--text-secondary)] ring-1 ring-[var(--border-soft)]">
              +998 (78) 113-13-00
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--border-soft)] bg-white px-4 py-4">
            <div className="text-base text-[var(--text-secondary)]">
              🔎 Поиск по лекарствам, витаминам, косметике и товарам аптек
            </div>
          </div>
        </header>

        <section
          className="px-4 pt-4"
          style={{
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="pharmaclick-card rounded-[30px] overflow-hidden">
            <div className="bg-[linear-gradient(135deg,#27c267_0%,#22c97d_45%,#6de2b0_100%)] p-6 text-white">
              <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.22em] text-white/80">
                Удобный сервис
              </div>
              <h2 className="max-w-[260px] text-[34px] font-bold leading-[1.05] tracking-[-0.04em]">
                Онлайн-аптека с доставкой
              </h2>
              <p className="mt-3 max-w-[300px] text-[15px] leading-6 text-white/90">
                Доставка по Ташкенту и Узбекистану, удобный сервис, большой ассортимент и
                быстрый доступ к заказам.
              </p>
              <div className="mt-4 inline-flex rounded-full bg-white/18 px-4 py-2 text-sm font-medium">
                Доставка по Ташкенту и Узбекистану
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-white p-4">
              <div className="rounded-[22px] bg-[var(--brand-primary-soft)] p-4">
                <div className="text-2xl">📦</div>
                <div className="mt-2 text-sm font-semibold">Большой ассортимент</div>
                <div className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  Лекарства, косметика, медтехника, мама и малыш.
                </div>
              </div>
              <div className="rounded-[22px] bg-[var(--surface-muted)] p-4">
                <div className="text-2xl">⏰</div>
                <div className="mt-2 text-sm font-semibold">Режим работы</div>
                <div className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  Ежедневно с 9:00 до 21:00
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="px-4 pt-5"
          style={{
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="pharmaclick-section-title text-[30px] font-bold">Быстрый доступ</h3>
            <button className="text-sm font-semibold text-[var(--brand-primary-strong)]">
              Все
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((item) => (
              <button
                key={item.title}
                className="pharmaclick-card rounded-[24px] p-4 text-left"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="mt-3 text-base font-semibold">{item.title}</div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">{item.subtitle}</div>
              </button>
            ))}
          </div>
        </section>

        <section
          className="px-4 pt-5"
          style={{
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="pharmaclick-section-title text-[30px] font-bold">Каталог</h3>
            <button className="text-sm font-semibold text-[var(--brand-primary-strong)]">
              Все категории
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.title}
                className="pharmaclick-card rounded-[24px] p-4 text-left"
              >
                <div className="mb-4 text-3xl">{category.icon}</div>
                <div className="text-[17px] font-semibold leading-6">{category.title}</div>
              </button>
            ))}
          </div>
        </section>

        <section
          className="px-4 pt-5"
          style={{
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="pharmaclick-section-title text-[30px] font-bold">Популярные товары</h3>
            <button className="text-sm font-semibold text-[var(--brand-primary-strong)]">
              См. всё
            </button>
          </div>

          <div className="space-y-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="pharmaclick-card rounded-[28px] p-4"
              >
                <div className="flex gap-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[22px] bg-[var(--surface-muted)] text-4xl">
                    {product.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-3 inline-flex rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                      {product.tag}
                    </div>

                    <h4 className="text-[18px] font-semibold leading-6 tracking-[-0.02em]">
                      {product.title}
                    </h4>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-[20px] font-bold tracking-[-0.02em]">
                        {product.price}
                      </span>

                      <button className="rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white">
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="px-4 pb-32 pt-5"
          style={{
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="rounded-[26px] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4 text-[15px] leading-7 text-[var(--warning-text)]">
            <div className="mb-1 font-semibold">Важно</div>
            Самолечение может быть вредным для здоровья. Перед применением препарата
            проконсультируйтесь с врачом.
          </div>
        </section>

        <nav
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--border-soft)] bg-white/95 backdrop-blur"
          style={{
            paddingLeft: "max(8px, var(--content-safe-left))",
            paddingRight: "max(8px, var(--content-safe-right))",
            paddingBottom: "max(12px, var(--content-safe-bottom))",
            paddingTop: "10px",
          }}
        >
          <div className="grid grid-cols-4 gap-2">
            {navItems.map((item) => {
              const active = activeNav === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  className={`flex flex-col items-center gap-2 rounded-[22px] px-3 py-3 text-xs font-medium ${active
                      ? "bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]"
                      : "text-[var(--text-secondary)]"
                    }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </main>
  );
}