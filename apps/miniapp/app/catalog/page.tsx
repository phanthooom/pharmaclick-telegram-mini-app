import Link from 'next/link'
import { ProductCardImage } from '../../components/product-card-image'
import { BabyIcon, LeafIcon, PillIcon, PlusCircleIcon, SearchIcon, SparkleIcon } from '../../components/ui-icons'
import { homeCategories, homeFeaturedProducts } from '../../lib/pharmaclick-data'

const categoryIcons = {
    pill: PillIcon,
    leaf: LeafIcon,
    plus: PlusCircleIcon,
    baby: BabyIcon,
    sparkle: SparkleIcon,
} as const

export default function CatalogPage() {
    return (
        <div className="pc-page">
            <section className="pc-section">
                <div className="pc-search-bar">
                    <span style={{ display: 'inline-flex' }}>
                        <SearchIcon width={18} height={18} />
                    </span>
                    <input
                        className="pc-search-input"
                        type="text"
                        placeholder="Поиск по лекарствам, витаминам и товарам аптек"
                    />
                    <button
                        type="button"
                        className="pc-primary-btn"
                        style={{
                            marginTop: 0,
                            height: 38,
                            padding: '0 14px',
                            fontSize: 13,
                            flexShrink: 0,
                        }}
                    >
                        Найти
                    </button>
                </div>
            </section>

            <section className="pc-section">
                <div className="pc-section-title-row">
                    <div className="pc-section-title">Категории</div>
                </div>

                <div className="pc-horizontal-scroll">
                    {homeCategories.map((category) => {
                        const Icon = categoryIcons[category.icon]
                        return (
                            <Link
                                key={category.slug}
                                href={`/catalog?category=${category.slug}`}
                                className="pc-category-chip"
                            >
                                <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: 6 }}>
                                    <Icon width={14} height={14} />
                                </span>
                                {category.name}
                            </Link>
                        )
                    })}
                </div>
            </section>

            <section className="pc-section">
                <div className="pc-section-title-row">
                    <div className="pc-section-title">Популярные товары</div>
                </div>

                <div className="pc-grid">
                    {homeFeaturedProducts.map((product, index) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="pc-card"
                        >
                            <div className="pc-card-image">
                                <ProductCardImage
                                    src={product.image}
                                    alt={product.name}
                                    priority={index < 2}
                                />
                            </div>

                            <div className="pc-card-body">
                                <div className="pc-card-title">{product.name}</div>
                                <div className="pc-card-price">{product.price}</div>
                                <div
                                    className="pc-card-btn"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    В корзину
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}