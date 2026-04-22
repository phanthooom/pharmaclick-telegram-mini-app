"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BottomNav } from "../components/bottom-nav";
import { getTelegramWebApp, initTelegramWebApp, isTelegramEnvironment } from "../lib/telegram";
import { homeCategoryChips, products } from "../lib/pharmaclick-data";

export default function HomePage() {
  const router = useRouter();

  const [isTelegram, setIsTelegram] = useState(false);
  const [username, setUsername] = useState("Гость");
  const [search, setSearch] = useState("");

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
    ? "calc(var(--content-safe-top) + 52px)"
    : "16px";

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = search.trim();
    if (value) {
      router.push(`/catalog?q=${encodeURIComponent(value)}`);
      return;
    }

    router.push("/catalog");
  };

  return (
    <main className="pc-shell">
      <div className={shellClass}>
        <header
          className="pc-glass border-b border-[var(--border-soft)]"
          style={{
            paddingTop: headerTopPadding,
            paddingBottom: "10px",
            paddingLeft: "max(16px, var(--content-safe-left))",
            paddingRight: "max(16px, var(--content-safe-right))",
          }}
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
                PharmaClick
              </div>

              <h1 className="pc-title text-[30px] font-bold leading-[0.95] sm:text-[34px]">
                Здравствуйте,
                <br />
                {username}
              </h1>

              <p className="pc-subtitle mt-2 text-[14px]">{subtitle}</p>
            </div>

            <div className="shrink-0 rounded-[18px] bg-[var(--brand-primary-soft)] px-3 py-2 text-right">
              <div className="text-[10px] leading-none text-[var(--text-secondary)]">
                Доставка
              </div>
              <div className="mt-1 text-[13px] font-semibold leading-none text-[var(--brand-primary-strong)]">
                Ташкент
              </div>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <button className="rounded-full bg-[var(--brand-primary)] px-3 py-1.5 text-[12px] font-medium text-white">
              RU
            </button>

            <button className="rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-[var(--text-secondary)] ring-1 ring-[var(--border-soft)]">
              UZ
            </button>

            <div className="ml-auto rounded-full bg-white px-3 py-1.5 text-[12px] text-[var(--text-secondary)] ring-1 ring-[var(--border-soft)]">
              +998 (78) 113-13-00
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="mt-2">
            <div className="pc-search-wrap">
              <div className="pc-search-animated flex items-center gap-3 rounded-[20px] px-3 py-2.5">
                <div className="pc-search-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary-soft)] text-[18px]">
                  🔎
                </div>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск по лекарствам, витаминам и товарам аптек"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
                />

                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-[var(--brand-primary)] px-3 py-2 text-[12px] font-semibold text-white shadow-[0_10px_20px_rgba(198,10,143,0.18)] transition hover:scale-[1.02]"
                >
                  Найти
                </button>
              </div>
            </div>
          </form>
        </header>

        <section className="pc-section-padding px-4 pt-3">
          <div className="pc-hero p-5 text-white">
            <div className="relative z-10">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">
                Online pharmacy with delivery
              </div>

              <h2 className="pc-title max-w-[240px] text-[34px] font-bold leading-[0.95]">
                Онлайн-аптека с доставкой
              </h2>

              <p className="mt-2 max-w-[290px] text-[14px] leading-6 text-white/90">
                Быстрый поиск, корзина, оформление заказа и доступ к личному кабинету.
              </p>

              <div className="mt-3 inline-flex rounded-full px-4 py-2 text-[13px] font-medium pc-pill-button-soft">
                Доставка по Ташкенту и Узбекистану
              </div>
            </div>
          </div>
        </section>

        <section className="pc-section-padding px-4 pt-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {homeCategoryChips.map((chip, index) => (
              <Link
                key={chip}
                href="/catalog"
                className={
                  index === 0
                    ? "pc-chip-active whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-medium"
                    : "pc-chip whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-medium"
                }
              >
                {chip}
              </Link>
            ))}
          </div>
        </section>

        <section className="pc-section-padding px-4 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="pc-title text-[24px] font-bold">Популярные товары</h3>
            <Link href="/catalog" className="text-[14px] font-semibold text-[var(--brand-primary)]">
              См. всё
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="pc-card-strong block rounded-[24px] p-3"
              >
                <div className="pc-soft-icon flex h-24 items-center justify-center rounded-[20px] text-4xl">
                  {product.icon}
                </div>

                <div className="mt-3 inline-flex rounded-full bg-[var(--surface-muted)] px-3 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                  {product.badge}
                </div>

                <h4 className="mt-3 line-clamp-2 text-[17px] font-semibold leading-6 tracking-[-0.02em]">
                  {product.title}
                </h4>

                <div className="mt-2 text-[20px] font-bold tracking-[-0.03em]">
                  {product.price}
                </div>

                <div className="mt-3 inline-flex rounded-full px-4 py-2 text-[13px] font-semibold pc-pill-button">
                  Add to cart
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pc-section-padding px-4 pb-32 pt-4">
          <div className="pc-warning rounded-[22px] p-4 text-[14px] leading-6">
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