export type Category = {
    id: string;
    title: string;
    icon: string;
};

export type Product = {
    id: string;
    title: string;
    price: string;
    badge: string;
    categoryId: string;
    icon: string;
    brand: string;
    dosage?: string;
    description: string;
};

export const categories: Category[] = [
    { id: "cosmetics", title: "Косметика", icon: "🧴" },
    { id: "medicines", title: "Лекарства", icon: "💊" },
    { id: "vitamins", title: "Витамины и БАДы", icon: "🍋" },
    { id: "intimate", title: "Интимные средства", icon: "🩺" },
    { id: "medical", title: "Медицинские изделия", icon: "🩹" },
    { id: "ortho", title: "Ортопедия", icon: "🦴" },
    { id: "mom-baby", title: "Мама и малыш", icon: "🍼" },
    { id: "hygiene", title: "Гигиена", icon: "🪥" },
    { id: "devices", title: "Медтехника", icon: "🩻" },
    { id: "natural", title: "Натуральная косметика", icon: "🌿" },
];

export const homeCategoryChips = [
    "Лекарства",
    "Витамины",
    "Красота",
    "Интимные",
];

export const products: Product[] = [
    {
        id: "paracetamol-500",
        title: "Парацетамол 500 мг",
        price: "15 000 сум",
        badge: "OTC",
        categoryId: "medicines",
        icon: "💊",
        brand: "PharmaClick",
        dosage: "500 мг",
        description:
            "Безрецептурный препарат для симптоматического облегчения боли и снижения температуры.",
    },
    {
        id: "vitamin-c-1000",
        title: "Витамин C 1000",
        price: "15 000 сум",
        badge: "Популярное",
        categoryId: "vitamins",
        icon: "🍋",
        brand: "VitaPlus",
        dosage: "1000 мг",
        description:
            "Ежедневная поддержка иммунитета и бодрости в удобном формате.",
    },
    {
        id: "automatic-tonometer",
        title: "Автоматический тонометр",
        price: "450 000 сум",
        badge: "Хит",
        categoryId: "devices",
        icon: "🩺",
        brand: "MedCare",
        description:
            "Электронный тонометр для домашнего контроля давления, удобный и точный.",
    },
    {
        id: "baby-cream",
        title: "Детский крем Soft Baby",
        price: "38 000 сум",
        badge: "Мама и малыш",
        categoryId: "mom-baby",
        icon: "🍼",
        brand: "SoftBaby",
        description:
            "Мягкий ежедневный уход за чувствительной детской кожей.",
    },
    {
        id: "hydra-serum",
        title: "Hydra Face Serum",
        price: "129 000 сум",
        badge: "Косметика",
        categoryId: "cosmetics",
        icon: "🧴",
        brand: "DermaGlow",
        description:
            "Сыворотка для глубокого увлажнения, сияния и бархатистой текстуры кожи.",
    },
];

export const quickLinks = [
    { title: "Филиалы", subtitle: "Ближайшие аптеки", icon: "📍" },
    { title: "Лицензии", subtitle: "Сертификаты", icon: "📄" },
    { title: "FAQ", subtitle: "Частые вопросы", icon: "❓" },
    { title: "Помощь", subtitle: "Как оформить заказ", icon: "💬" },
];

export function getProductById(id: string) {
    return products.find((item) => item.id === id);
}

export function getProductsByCategory(categoryId: string) {
    return products.filter((item) => item.categoryId === categoryId);
}