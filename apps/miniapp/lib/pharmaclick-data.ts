export type Category = {
    slug: string
    name: string
    icon: 'pill' | 'leaf' | 'plus' | 'baby' | 'sparkle'
}

export type Product = {
    id: string
    title: string
    name: string
    price: string
    image: string
    icon: 'pill' | 'leaf' | 'plus' | 'sparkle'
    badge: string
    brand: string
    dosage?: string
    description: string
}

export type QuickLink = {
    title: string
    subtitle: string
    icon: 'orders' | 'favorites' | 'address' | 'support'
}

export const homeCategories: Category[] = [
    { slug: 'pain', name: 'Обезболивающие', icon: 'pill' },
    { slug: 'vitamins', name: 'Витамины', icon: 'leaf' },
    { slug: 'cold', name: 'Простуда', icon: 'plus' },
    { slug: 'kids', name: 'Детям', icon: 'baby' },
    { slug: 'care', name: 'Уход', icon: 'sparkle' },
]

export const products: Product[] = [
    {
        id: '1',
        title: 'Парацетамол 500 мг',
        name: 'Парацетамол 500 мг',
        price: '18 000 сум',
        image:
            'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=480&q=75',
        icon: 'pill',
        badge: 'Хит продаж',
        brand: 'PharmaClick',
        dosage: '10 таблеток',
        description:
            'Эффективное средство для снижения температуры и облегчения боли. Подходит для домашней аптечки и повседневного использования по рекомендации врача.',
    },
    {
        id: '2',
        title: 'Витамин C 1000 мг',
        name: 'Витамин C 1000 мг',
        price: '46 000 сум',
        image:
            'https://images.pexels.com/photos/3873141/pexels-photo-3873141.jpeg?auto=compress&cs=tinysrgb&w=480&q=75',
        icon: 'leaf',
        badge: 'Иммунитет',
        brand: 'VitaLine',
        dosage: '20 шипучих таблеток',
        description:
            'Высокая дозировка витамина C для поддержки иммунитета, тонуса и общего самочувствия. Удобный формат для ежедневного приема.',
    },
    {
        id: '3',
        title: 'Назальный спрей',
        name: 'Назальный спрей',
        price: '39 000 сум',
        image:
            'https://images.pexels.com/photos/7615574/pexels-photo-7615574.jpeg?auto=compress&cs=tinysrgb&w=480&q=75',
        icon: 'plus',
        badge: 'Для простуды',
        brand: 'NasalCare',
        dosage: '15 мл',
        description:
            'Спрей для облегчения носового дыхания и уменьшения заложенности. Подходит для использования при сезонной простуде и рините.',
    },
    {
        id: '4',
        title: 'Омега-3 комплекс',
        name: 'Омега-3 комплекс',
        price: '79 000 сум',
        image:
            'https://images.pexels.com/photos/5938244/pexels-photo-5938244.jpeg?auto=compress&cs=tinysrgb&w=480&q=75',
        icon: 'sparkle',
        badge: 'Здоровье сердца',
        brand: 'OceanPlus',
        dosage: '30 капсул',
        description:
            'Комплекс жирных кислот Омега-3 для поддержки сердечно-сосудистой системы, мозга и общего метаболического баланса.',
    },
]

export const homeFeaturedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
}))

export const categories = homeCategories

export const quickLinks: QuickLink[] = [
    {
        title: 'Мои заказы',
        subtitle: 'История и статусы',
        icon: 'orders',
    },
    {
        title: 'Избранное',
        subtitle: 'Сохранённые товары',
        icon: 'favorites',
    },
    {
        title: 'Адреса',
        subtitle: 'Доставка и самовывоз',
        icon: 'address',
    },
    {
        title: 'Поддержка',
        subtitle: 'Помощь и консультация',
        icon: 'support',
    },
]

export function getProductById(id: string): Product | undefined {
    return products.find((product) => product.id === id)
}