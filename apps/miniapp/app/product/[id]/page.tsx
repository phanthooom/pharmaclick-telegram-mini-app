import Link from "next/link";
import { notFound } from "next/navigation";
import { BottomNav } from "../../../components/bottom-nav";
import { getProductById } from "../../../lib/pharmaclick-data";

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) notFound();

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
                    <Link href="/catalog" className="text-sm font-semibold text-[var(--text-secondary)]">
                        Закрыть
                    </Link>

                    <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
                        PharmaClick
                    </div>
                    <h1 className="pc-title mt-2 text-[34px] font-bold leading-[0.98]">
                        Здравствуйте,
                        <br />
                        Sanjarkhuja
                    </h1>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        Mini App открыт внутри Telegram
                    </p>

                    <div className="mt-4 pc-card rounded-[24px] px-4 py-4 text-[16px] text-[var(--text-secondary)]">
                        🔎 Поиск по лекарствам, витаминам, косметике и товарам аптек
                    </div>
                </header>

                <section className="pc-section-padding px-4 pt-4">
                    <div className="pc-card-strong rounded-[30px] p-4">
                        <div className="pc-soft-icon flex h-44 items-center justify-center rounded-[26px] text-7xl">
                            {product.icon}
                        </div>

                        <div className="mt-4 flex items-start justify-between gap-3">
                            <div>
                                <div className="mb-2 inline-flex rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                    {product.badge}
                                </div>
                                <h2 className="pc-title text-[30px] font-bold leading-[1.02]">
                                    {product.title}
                                </h2>
                            </div>

                            <div className="rounded-[20px] bg-[var(--brand-primary-soft)] px-4 py-3 text-right">
                                <div className="text-[11px] text-[var(--text-secondary)]">Цена</div>
                                <div className="text-[24px] font-bold">{product.price}</div>
                            </div>
                        </div>

                        <div className="mt-3 text-sm text-[var(--text-secondary)]">
                            {product.brand}
                            {product.dosage ? ` • ${product.dosage}` : ""}
                        </div>

                        <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">
                            {product.description}
                        </p>

                        <button className="mt-5 w-full rounded-[22px] px-4 py-4 text-sm font-semibold pc-pill-button">
                            Добавить в корзину
                        </button>
                    </div>
                </section>

                <section className="pc-section-padding px-4 pb-32 pt-4">
                    <div className="pc-warning rounded-[26px] p-4 text-[15px] leading-7">
                        <div className="mb-1 inline-flex rounded-full bg-[rgba(255,191,0,0.16)] px-3 py-1 text-xs font-semibold">
                            ВАЖНО
                        </div>
                        <div className="mt-2">
                            Перед применением проконсультируйтесь с врачом. Самолечение может быть
                            опасным для вашего здоровья.
                        </div>
                    </div>
                </section>

                <BottomNav />
            </div>
        </main>
    );
}