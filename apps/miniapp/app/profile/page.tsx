import { BottomNav } from "../../components/bottom-nav";
import { quickLinks } from "../../lib/pharmaclick-data";

export default function ProfilePage() {
    return (
        <main className="pc-shell">
            <div className="pc-frame pc-browser-frame">
                <header
                    className="pc-glass sticky top-0 z-20 border-b border-[var(--border-soft)]"
                    style={{
                        paddingTop: "calc(var(--content-safe-top) + 18px)",
                        paddingBottom: "14px",
                        paddingLeft: "max(16px, var(--content-safe-left))",
                        paddingRight: "max(16px, var(--content-safe-right))",
                    }}
                >
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
                                PharmaClick
                            </div>
                            <h1 className="pc-title text-[34px] font-bold leading-[0.98]">
                                Здравствуйте, Sanjarkhuja
                            </h1>
                            <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                +998 (78) 113-13-00
                            </p>
                        </div>

                        <div className="rounded-full bg-[var(--brand-primary-soft)] px-3 py-1.5 text-sm font-semibold text-[var(--brand-primary-strong)]">
                            RU/UZ
                        </div>
                    </div>

                    <div className="pc-hero p-5 text-white">
                        <div className="relative z-10">
                            <div className="text-[12px] uppercase tracking-[0.24em] text-white/80">
                                Онлайн-аптека с доставкой
                            </div>
                            <div className="mt-2 text-[22px] font-bold leading-[1.08]">
                                Доставка по Ташкенту и Узбекистану, удобный сервис и большой ассортимент
                            </div>
                        </div>
                    </div>
                </header>

                <section className="pc-section-padding px-4 pt-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="pc-title text-[26px] font-bold">Быстрый доступ</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {quickLinks.map((item) => (
                            <button key={item.title} className="pc-card-strong rounded-[24px] p-4 text-left">
                                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--brand-primary-soft)] text-2xl">
                                    {item.icon}
                                </div>
                                <div className="text-[18px] font-semibold">{item.title}</div>
                                <div className="mt-1 text-sm text-[var(--text-secondary)]">{item.subtitle}</div>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="pc-section-padding px-4 pb-32 pt-5">
                    <div className="pc-card-strong rounded-[28px] p-5">
                        <div className="text-[24px] font-bold">Личный кабинет</div>
                        <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            История заказов, адреса доставки, избранное, уведомления и управление профилем.
                        </div>

                        <div className="mt-5 space-y-3">
                            <button className="w-full rounded-[22px] px-4 py-4 text-sm font-semibold pc-pill-button">
                                Войти по телефону
                            </button>
                            <button className="w-full rounded-[22px] border border-[var(--border-strong)] bg-white px-4 py-4 text-sm font-semibold text-[var(--text-primary)]">
                                Мои заказы
                            </button>
                        </div>
                    </div>
                </section>

                <BottomNav />
            </div>
        </main>
    );
}