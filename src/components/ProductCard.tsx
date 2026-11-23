"use client";

import Image from "next/image";
import Link from "next/link";
import { categoryName, formatPrice, productName, type Product } from "@/lib/catalog";
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

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden bg-cream-deep sm:aspect-[4/5]">
        <Image
          src={product.image}
          alt={productName(product, lang)}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
          {categoryName(product.categorySlug, lang)}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-display text-[17px] font-bold leading-snug text-pine transition hover:text-pine-mid sm:text-lg">
            {productName(product, lang)}
          </h3>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="whitespace-nowrap font-display text-lg font-bold text-pine">{formatPrice(product.price, lang)}</span>
            {product.compare && (
              <span className="text-[13px] text-ink-soft line-through">{formatPrice(product.compare, lang)}</span>
            )}
          </p>
          <button
            type="button"
            onClick={() =>
              addItem({
                slug: product.slug,
                name: productName(product, lang),
                price: product.price,
                colour: product.colours[0]?.name ?? "",
                size: product.sizes[0] ?? "M",
                image: product.image,
              })
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine text-white shadow-[var(--shadow-button)] transition hover:scale-105 hover:bg-pine-mid"
            aria-label={`${t("addToBag")} — ${productName(product, lang)}`}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          </button>
        </div>
      </div>
    </article>
  );
}
