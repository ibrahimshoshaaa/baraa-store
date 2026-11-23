"use client";

// Baraa — product detail: size selector, quantity, add to cart, related products.
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  categoryName,
  colourName,
  formatPrice,
  productDescription,
  productName,
  relatedProducts,
  type Product,
} from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/components/CartProvider";
import { ProductCard, Stars } from "@/components/ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const { lang, t } = useLanguage();
  const { addItem, openCart } = useCart();
  const [colour, setColour] = useState(product.colours[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "M");
  const [qty, setQty] = useState(1);
  const related = relatedProducts(product);

  function handleAdd() {
    addItem(
      {
        slug: product.slug,
        name: productName(product, lang),
        price: product.price,
        colour,
        size,
        image: product.image,
      },
      qty,
    );
    openCart();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm font-semibold text-pine transition hover:text-pine-mid"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="rtl:rotate-180"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        {t("productBack")}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative overflow-hidden rounded-[28px] bg-cream-deep shadow-[var(--shadow-hero)]">
          <Image
            src={product.image}
            alt={productName(product, lang)}
            width={900}
            height={1100}
            className="aspect-[4/3] w-full object-cover sm:aspect-[4/5]"
            priority
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            {categoryName(product.categorySlug, lang)}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-pine sm:text-4xl">
            {productName(product, lang)}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm text-ink-soft">
              {product.rating} ({product.reviews} {t("reviews")})
            </span>
          </div>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-3xl font-bold text-pine">{formatPrice(product.price, lang)}</span>
            {product.compare && (
              <span className="text-lg text-ink-soft line-through">{formatPrice(product.compare, lang)}</span>
            )}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{productDescription(product, lang)}</p>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-pine">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" aria-hidden="true" />
            {t("inStock")}
          </p>

          <hr className="my-7 border-black/8" />

          <div>
            <p className="text-sm font-bold">
              {t("color")}:{" "}
              <span className="font-medium text-ink-soft">
                {colourName(product.colours.find((c) => c.name === colour) ?? product.colours[0], lang)}
              </span>
            </p>
            <div className="mt-3 flex gap-2.5">
              {product.colours.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColour(c.name)}
                  aria-label={colourName(c, lang)}
                  aria-pressed={colour === c.name}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition ${
                    colour === c.name
                      ? "border-pine ring-2 ring-pine/25 ring-offset-2 ring-offset-cream"
                      : "border-black/10 hover:border-pine/50"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-bold">{t("size")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`flex h-11 min-w-12 items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${
                    size === s
                      ? "border-pine bg-pine text-white shadow-[var(--shadow-button)]"
                      : "border-black/10 bg-surface text-ink hover:border-pine/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-full border border-black/10 bg-white">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-12 w-11 items-center justify-center text-lg transition hover:text-pine-mid"
              >
                −
              </button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-12 w-11 items-center justify-center text-lg transition hover:text-pine-mid"
              >
                +
              </button>
            </div>
            <button type="button" onClick={handleAdd} className="btn btn-primary min-h-12 flex-1">
              {t("addToBag")} — {formatPrice(product.price * qty, lang)}
            </button>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2.5 text-center">
            {[
              { icon: "M3 7h11v10H3zM14 10h4l3 3v4h-7z", label: t("trustShipping") },
              { icon: "M12 3a9 9 0 1 0 9 9h-2.4A6.6 6.6 0 1 1 12 5.4c1.5 0 2.9.5 4 1.4L13.5 9.3h6.9V2.4L18 4.8A8.9 8.9 0 0 0 12 3Z", label: t("trustReturns") },
              { icon: "M12 2 4 5.5v5.7c0 5 3.4 8.6 8 10.3 4.6-1.7 8-5.3 8-10.3V5.5L12 2Z", label: t("cashOnDelivery") },
            ].map((b) => (
              <span key={b.label} className="flex flex-col items-center gap-1.5 rounded-[16px] bg-surface px-2 py-3.5 text-xs font-semibold leading-snug text-pine shadow-[var(--shadow-card)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={b.icon} />
                </svg>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16 text-center sm:mt-20">
        <p className="eyebrow justify-center">{t("featuredEyebrow")}</p>
        <h2 className="section-title mt-3">{t("relatedProducts")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 text-start sm:mt-10 sm:gap-5 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
