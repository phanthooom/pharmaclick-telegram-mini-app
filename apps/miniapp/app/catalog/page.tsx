import Link from "next/link";
import { BottomNav } from "../../components/bottom-nav";
import { categories, products } from "../../lib/pharmaclick-data";

export default function CatalogPage() {
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
                    <div className="mb-2 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
                        PharmaClick
                    </div>

                    <div className="mb-3 text-center text-[30px] font-bold tracking-[-0.04em]">
                        Каталог
                    </div>

                    <div className="pc-card rounded-[24px] px-4 py-4 text-[16px] text-[var(--text-secondary)]">
                        🔎 Поиск по лекарствам, витаминам, косметике и товарам аптек
                    </div>
                </header>

                <section className="pc-section-padding px-4 pt-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="pc-title text-[22px] font-bold">Категории</h2>
                        <button className="text-sm font-semibold text-[var(--brand-primary)]">
                            Все категории
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/catalog/${category.id}`}
                                className="pc-card-strong rounded-[24px] p-4 text-center"
                            >
                                <div className="mb-3 text-3xl">{category.icon}</div>
                                <div className="text-sm font-medium leading-5">{category.title}</div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="pc-section-padding px-4 pb-32 pt-5">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="pc-title text-[22px] font-bold">Рекомендуем</h2>
                    </div>

                    <div className="space-y-3">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="pc-card-strong block rounded-[28px] p-4"
                            >
                                <div className="flex gap-4">
                                    <div className="pc-soft-icon flex h-24 w-24 shrink-0 items-center justify-center rounded-[22px] text-4xl">
                                        {product.icon}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 inline-flex rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                            {product.badge}
                                        </div>

                                        <h3 className="text-[18px] font-semibold leading-6 tracking-[-0.02em]">
                                            {product.title}
                                        </h3>

                                        <div className="mt-3 text-[22px] font-bold tracking-[-0.03em]">
                                            {product.price}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <BottomNav />
            </div>
        </main>
    );
}