import Link from "next/link";
import {
    HeartIcon,
    PhoneIcon,
    PinIcon,
    ShieldCheckIcon,
    TagIcon,
    TruckIcon,
    UserIcon,
} from "../../components/ui-icons";

const aboutItems = [
    { Icon: ShieldCheckIcon, title: "Лицензированная аптека", subtitle: "Все препараты сертифицированы" },
    { Icon: TruckIcon, title: "Быстрая доставка", subtitle: "Доставка за 30–60 минут" },
    { Icon: TagIcon, title: "Честные цены", subtitle: "Цены как в обычной аптеке" },
];

const userFields = [
    { Icon: UserIcon, label: "Имя", value: "Санжар" },
    { Icon: PhoneIcon, label: "Телефон", value: "+998997878778" },
    { Icon: PinIcon, label: "Адрес", value: "Ададавл" },
];

export default function ProfilePage() {
    return (
        <div className="pc-page" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Личные данные */}
            <section style={{ background: "white", borderRadius: 24, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "16px", borderBottom: "1px solid var(--border-soft)",
                }}>
                    <span style={{ fontSize: 18, fontWeight: 800 }}>Личные данные</span>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--brand-primary)", fontSize: 14, fontWeight: 700 }}>
                        Изменить
                    </button>
                </div>
                {userFields.map(({ Icon, label, value }, i) => (
                    <div key={label} style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "13px 16px",
                        borderBottom: i < userFields.length - 1 ? "1px solid var(--border-soft)" : "none",
                    }}>
                        <Icon width={20} height={20} style={{ color: "var(--neutral-400)", flexShrink: 0 }} />
                        <div>
                            <div style={{ fontSize: 11, color: "var(--neutral-500)" }}>{label}</div>
                            <div style={{ fontSize: 15, fontWeight: 600 }}>{value}</div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Сохранённые */}
            <section style={{ background: "white", borderRadius: 24, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "16px", borderBottom: "1px solid var(--border-soft)",
                }}>
                    <HeartIcon width={20} height={20} fill="#ef4444" stroke="none" />
                    <span style={{ fontSize: 18, fontWeight: 800 }}>Сохранённые</span>
                </div>
                <div style={{ padding: "28px 16px", textAlign: "center" }}>
                    <p style={{ color: "var(--neutral-500)", fontSize: 14, margin: 0 }}>Нет сохранённых товаров</p>
                    <Link href="/catalog" style={{
                        color: "var(--brand-primary)", fontSize: 14, fontWeight: 700,
                        display: "inline-block", marginTop: 8,
                    }}>
                        Перейти в каталог →
                    </Link>
                </div>
            </section>

            {/* О PharmaClick */}
            <section style={{ background: "white", borderRadius: 24, boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
                <div style={{ padding: "16px", borderBottom: "1px solid var(--border-soft)" }}>
                    <span style={{ fontSize: 18, fontWeight: 800 }}>О PharmaClick</span>
                </div>
                {aboutItems.map(({ Icon, title, subtitle }, i) => (
                    <div key={title} style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "13px 16px",
                        borderBottom: i < aboutItems.length - 1 ? "1px solid var(--border-soft)" : "none",
                    }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 14,
                            background: "var(--green-50)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--green-700)", flexShrink: 0,
                        }}>
                            <Icon width={22} height={22} />
                        </div>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
                            <div style={{ fontSize: 12, color: "var(--neutral-500)", marginTop: 2 }}>{subtitle}</div>
                        </div>
                    </div>
                ))}
            </section>

        </div>
    );
}
