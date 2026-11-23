"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { categoryName, formatPrice, productName, type Product } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "./CartProvider";

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          fill={i <= Math.round(rating) ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { lang, t } = useLanguage();

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden bg-sand">
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
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-pine text-white transition hover:bg-pine-mid"
            aria-label={`${t("addToBag")} — ${productName(product, lang)}`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
