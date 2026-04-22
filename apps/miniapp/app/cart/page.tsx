import { BottomNav } from "../../components/bottom-nav";

export default function CartPage() {
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
                    <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
                        PharmaClick
                    </div>
                    <h1 className="pc-title mt-2 text-[34px] font-bold leading-[0.98]">Корзина</h1>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        Оформление заказа и доставка
                    </p>
                </header>

                <section className="pc-section-padding px-4 pt-4">
                    <div className="pc-card-strong rounded-[28px] p-5">
                        <div className="text-5xl">🛒</div>
                        <div className="mt-4 text-[24px] font-bold">Корзина пока пуста</div>
                        <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            Добавьте товары из каталога и переходите к оформлению заказа.
                        </div>
                    </div>
                </section>

                <section className="pc-section-padding px-4 pb-32 pt-4">
                    <div className="pc-card rounded-[28px] p-5">
                        <div className="text-[20px] font-bold">Что будет дальше</div>
                        <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
                            <div>• Выбор адреса или самовывоза</div>
                            <div>• Подтверждение времени доставки</div>
                            <div>• Оплата и создание заказа</div>
                        </div>
                    </div>
                </section>

                <BottomNav />
            </div>
        </main>
    );
}