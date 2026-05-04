import Link from 'next/link'
import { homeCategories, homeFeaturedProducts } from '../lib/pharmaclick-data'

export default function HomePage() {
  return (
    <div className="pc-page">
      <section className="pc-hero">
        <div className="pc-hero-badge">
          ⚡ Быстрая доставка
        </div>

        <div className="pc-hero-title">
          Аптека
          <br />
          в вашем кармане
        </div>

        <div className="pc-hero-text">
          Более 1000 препаратов с доставкой по Ташкенту и Узбекистану.
        </div>

        <Link href="/catalog" className="pc-primary-btn">
          Смотреть каталог →
        </Link>
      </section>

      <section className="pc-section">
        <div className="pc-horizontal-scroll">
          <div className="pc-badge-card">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div className="pc-logo-pill" style={{ width: 36, height: 36 }}>✓</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>Оригиналы</div>
                <div style={{ fontSize: 11, color: 'var(--neutral-500)' }}>
                  Только сертифицированные
                </div>
              </div>
            </div>
          </div>

          <div className="pc-badge-card">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div className="pc-logo-pill" style={{ width: 36, height: 36 }}>⏱</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>30 минут</div>
                <div style={{ fontSize: 11, color: 'var(--neutral-500)' }}>
                  Быстрая доставка
                </div>
              </div>
            </div>
          </div>

          <div className="pc-badge-card">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div className="pc-logo-pill" style={{ width: 36, height: 36 }}>🛡</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>Лицензия</div>
                <div style={{ fontSize: 11, color: 'var(--neutral-500)' }}>
                  Фармацевтическая
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-section-title-row">
          <div className="pc-section-title">Категории</div>
          <Link href="/catalog" className="pc-link-button">Все</Link>
        </div>

        <div className="pc-horizontal-scroll">
          {homeCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog?category=${category.slug}`}
              className="pc-category-chip"
            >
              {category.icon} {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-section-title-row">
          <div className="pc-section-title">Рекомендуем</div>
          <Link href="/catalog" className="pc-link-button">Все</Link>
        </div>

        <div className="pc-grid">
          {homeFeaturedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="pc-card">
              <div className="pc-card-image">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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