"use client";

import { useEffect, useMemo, useState } from "react";
import { getTelegramWebApp, initTelegramWebApp, isTelegramEnvironment } from "../lib/telegram";

const categories = [
  "Лекарства",
  "Витамины",
  "Красота",
  "Мама и ребёнок",
  "Гигиена",
  "Медтехника",
];

const products = [
  { id: 1, title: "Парацетамол 500 мг", price: "18 000 сум", tag: "OTC" },
  { id: 2, title: "Витамин C 1000", price: "49 000 сум", tag: "Популярное" },
  { id: 3, title: "Тонометр автоматический", price: "389 000 сум", tag: "Медтехника" },
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
    ? "w-full min-h-[100dvh] bg-white"
    : "mx-auto w-full max-w-[430px] min-h-screen bg-white shadow-[0_0_40px_rgba(15,23,42,0.08)]";

  return (
    <main className="min-h-[100dvh] bg-[var(--tg-bg_color,var(--app-bg))] text-slate-900">
      <div className={shellClass}>
        <header
          className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 px-4 pb-4 backdrop-blur"
          style={{
            paddingTop: "max(16px, var(--content-safe-top))",
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-600">
                PharmaClick
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight">
                Здравствуйте, {username}
              </h1>
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>

            <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-right">
              <div className="text-xs text-slate-500">Доставка</div>
              <div className="text-sm font-semibold text-emerald-700">Ташкент</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-sm text-slate-400">
              🔎 Поиск по лекарствам, витаминам и товарам аптек
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
          <div className="rounded-[28px] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-5 text-white shadow-lg">
            <div className="text-xs uppercase tracking-[0.18em] text-white/80">
              Telegram Mini App
            </div>
            <h2 className="mt-2 text-2xl font-bold">Онлайн-аптека нового формата</h2>
            <p className="mt-2 text-sm text-white/90">
              Быстрый поиск, корзина, оформление заказа, избранное и личный кабинет.
            </p>
            <div className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
              Доставка по Ташкенту и Узбекистану
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
            <h3 className="text-lg font-semibold">Категории</h3>
            <button className="text-sm font-medium text-emerald-700">Все</button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className="whitespace-nowrap rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"
              >
                {category}
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
            <h3 className="text-lg font-semibold">Популярные товары</h3>
            <button className="text-sm font-medium text-emerald-700">См. всё</button>
          </div>

          <div className="space-y-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
              >
                <div className="flex gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                    💊
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {product.tag}
                    </div>

                    <h4 className="line-clamp-2 text-base font-semibold leading-snug">
                      {product.title}
                    </h4>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-base font-bold text-slate-900">{product.price}</span>
                      <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
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
          className="px-4 pb-28 pt-5"
          style={{
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <div className="mb-1 font-semibold">Важно</div>
            Самолечение может быть вредным для здоровья. Перед применением лекарственных
            средств рекомендуется консультация врача.
          </div>
        </section>

        <nav
          className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-slate-200 bg-white px-2 pt-3"
          style={{
            paddingLeft: "max(8px, var(--content-safe-left))",
            paddingRight: "max(8px, var(--content-safe-right))",
            paddingBottom: "max(12px, var(--content-safe-bottom))",
          }}
        >
          {navItems.map((item) => {
            const active = activeNav === item.key;

            return (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`flex min-w-[72px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition ${active ? "bg-emerald-50 text-emerald-700" : "text-slate-500"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </main>
  );
}