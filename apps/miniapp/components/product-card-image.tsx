import Image from 'next/image'

type ProductCardImageProps = {
    src: string
    alt: string
    /** Первые карточки — приоритет для LCP. */
    priority?: boolean
}

/**
 * Превью в сетке: Next Image (оптимизация + нужный размер через `sizes`).
 * Родитель: `.pc-card-image` (`position: relative`, `aspect-ratio: 1/1`).
 */
export function ProductCardImage({ src, alt, priority }: ProductCardImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 480px) 48vw, 300px"
            className="object-cover"
            loading={priority ? 'eager' : 'lazy'}
            priority={Boolean(priority)}
            quality={75}
        />
    )
}
