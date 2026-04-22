"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BottomNav } from "../components/bottom-nav";
import { getTelegramWebApp, initTelegramWebApp, isTelegramEnvironment } from "../lib/telegram";
import { homeCategoryChips, products } from "../lib/pharmaclick-data";

export default function HomePage() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [username, setUsername] = useState("Гость");

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
    ? "pc-frame"
    : "pc-frame pc-browser-frame";

  const headerTopPadding = isTelegram
    ? "calc(var(--content-safe-top) + 72px)"
    : "20px";

  return (
    <main className="pc-shell">
      <div className={shellClass}>
        <header
          className="pc-glass sticky top-0 z-20 border-b border-[var(--border-soft)]"
          style={{
            paddingTop: headerTopPadding,
            paddingBottom: "14px",
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
                PharmaClick
              </div>
              <h1 className="pc-title text-[42px] font-bold leading-[0.95]">
                Здравствуйте,
                <br />
                {username}
              </h1>
              <p className="pc-subtitle mt-3 text-[16px]">{subtitle}</p>
            </div>

            <div className="rounded-[24px] bg-[var(--brand-primary-soft)] px-4 py-3 text-right">
              <div className="text-[11px] text-[var(--text-secondary)]">Доставка</div>
              <div className="text-sm font-semibold text-[var(--brand-primary-strong)]">
                Ташкент
              </div>
            </div>
          </div>

          <div className="mb-3 flex items-center gap-2 text-xs">
            <button className="rounded-full bg-[var(--brand-primary)] px-3 py-1.5 font-medium text-white">
              RU
            </button>
            <button className="rounded-full bg-white px-3 py-1.5 font-medium text-[var(--text-secondary)] ring-1 ring-[var(--border-soft)]">
              UZ
            </button>
            <div className="ml-auto rounded-full bg-white px-3 py-1.5 text-[var(--text-secondary)] ring-1 ring-[var(--border-soft)]">
              +998 (78) 113-13-00
            </div>
          </div>

          <Link
            href="/catalog"
            className="pc-card block rounded-[26px] px-4 py-4 text-[16px] text-[var(--text-secondary)]"
          >
            🔎 Поиск по лекарствам, витаминам, косметике и товарам аптек
          </Link>
        </header>

        <section className="pc-section-padding px-4 pt-4">
          <div className="pc-hero p-6 text-white">
            <div className="relative z-10">
              <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.24em] text-white/80">
                Online pharmacy with delivery
              </div>

              <h2 className="pc-title max-w-[270px] text-[44px] font-bold leading-[0.96]">
                Онлайн-аптека с доставкой
              </h2>

              <p className="mt-3 max-w-[300px] text-[16px] leading-7 text-white/90">
                Быстрый поиск, корзина, оформление заказа, большой ассортимент и доступ к
                личному кабинету.
              </p>

              <div className="mt-4 inline-flex rounded-full px-4 py-2 text-sm font-medium pc-pill-button-soft">
                Доставка по Ташкенту и Узбекистану
              </div>
            </div>
          </div>
        </section>

        <section className="pc-section-padding px-4 pt-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {homeCategoryChips.map((chip, index) => (
              <Link
                key={chip}
                href="/catalog"
                className={index === 0 ? "pc-chip-active whitespace-nowrap rounded-full px-4 py-3 text-sm font-medium" : "pc-chip whitespace-nowrap rounded-full px-4 py-3 text-sm font-medium"}
              >
                {chip}
              </Link>
            ))}
          </div>
        </section>

        <section className="pc-section-padding px-4 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="pc-title text-[26px] font-bold">Popular Products</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="pc-card-strong block rounded-[28px] p-4"
              >
                <div className="pc-soft-icon flex h-24 items-center justify-center rounded-[22px] text-4xl">
                  {product.icon}
                </div>

                <div className="mt-3 inline-flex rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                  {product.badge}
                </div>

                <h4 className="mt-3 text-[18px] font-semibold leading-6 tracking-[-0.02em]">
                  {product.title}
                </h4>

                <div className="mt-3 text-[22px] font-bold tracking-[-0.03em]">
                  {product.price}
                </div>

                <div className="mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold pc-pill-button">
                  Add to cart
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pc-section-padding px-4 pb-32 pt-5">
          <div className="pc-warning rounded-[26px] p-4 text-[15px] leading-7">
            <div className="mb-1 font-semibold">Важно</div>
            Перед применением проконсультируйтесь с врачом. Самолечение может быть
            опасным для здоровья.
          </div>
        </section>

        <BottomNav />
      </div>
    </main>
  );
}