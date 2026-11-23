"use client";

import Image from "next/image";
import Link from "next/link";
import { categoryName, formatPrice, productBadge, productName, type Product } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "./CartProvider";

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { lang, t } = useLanguage();
  const badge = productBadge(product, lang);

  return (
    <article className="group overflow-hidden rounded-[24px] bg-surface shadow-[0_6px_24px_rgba(11,61,46,0.07)] transition hover:shadow-[0_14px_36px_rgba(11,61,46,0.14)]">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-cream-deep">
        <Image
          src={product.image}
          alt={productName(product, lang)}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {badge && (
          <span className="absolute start-3 top-3 rounded-full bg-pine px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {badge}
          </span>
        )}
        {product.compareCents && (
          <span className="absolute end-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-pine-deep">
            -{Math.round((1 - product.priceCents / product.compareCents) * 100)}%
          </span>
        )}
      </Link>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
          {categoryName(product.categorySlug, lang)}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-display text-lg font-bold leading-snug text-pine transition hover:text-pine-mid">
            {productName(product, lang)}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-ink-soft">({product.reviews} {t("reviews")})</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-pine">{formatPrice(product.priceCents)}</span>
            {product.compareCents && (
              <span className="text-sm text-ink-soft line-through">{formatPrice(product.compareCents)}</span>
            )}
          </p>
          <button
            type="button"
            onClick={() =>
              addItem({
                slug: product.slug,
                name: productName(product, lang),
                priceCents: product.priceCents,
                colour: product.colours[0]?.name ?? "",
                size: product.sizes[0] ?? "M",
                image: product.image,
              })
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine text-white transition hover:bg-pine-mid"
            aria-label={`${t("addToBag")} — ${productName(product, lang)}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          </button>
        </div>
      </div>
    </article>
  );
}
