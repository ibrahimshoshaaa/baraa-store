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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/shop" className="text-sm font-semibold text-pine hover:underline">
        ← {t("productBack")}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[32px] bg-cream-deep shadow-[0_14px_36px_rgba(11,61,46,0.12)]">
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
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            {categoryName(product.categorySlug, lang)}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-pine sm:text-4xl">{productName(product, lang)}</h1>
          <div className="mt-3 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm text-ink-soft">
              {product.rating} ({product.reviews} {t("reviews")})
            </span>
          </div>
          <p className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-pine">{formatPrice(product.price, lang)}</span>
            {product.compare && (
              <span className="text-lg text-ink-soft line-through">{formatPrice(product.compare, lang)}</span>
            )}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{productDescription(product, lang)}</p>
          <p className="mt-3 text-sm font-semibold text-pine">✓ {t("inStock")}</p>

          <div className="mt-7">
            <p className="text-sm font-bold">
              {t("color")}: <span className="font-medium text-ink-soft">{colourName(product.colours.find((c) => c.name === colour) ?? product.colours[0], lang)}</span>
            </p>
            <div className="mt-2 flex gap-2">
              {product.colours.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColour(c.name)}
                  aria-label={colourName(c, lang)}
                  aria-pressed={colour === c.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                    colour === c.name ? "border-pine" : "border-black/10"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-bold">{t("size")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-12 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    size === s ? "bg-pine text-white" : "bg-surface text-ink hover:bg-pine/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-black/10 bg-white">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-12 w-11 items-center justify-center text-lg"
              >
                −
              </button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-12 w-11 items-center justify-center text-lg"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 rounded-full bg-pine px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-pine-mid"
            >
              {t("addToBag")} — {formatPrice(product.price * qty, lang)}
            </button>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 text-center text-xs font-semibold">
            <span className="rounded-2xl bg-surface p-3 shadow-sm">{t("trustShipping")}</span>
            <span className="rounded-2xl bg-surface p-3 shadow-sm">{t("trustReturns")}</span>
            <span className="rounded-2xl bg-surface p-3 shadow-sm">{t("cashOnDelivery")}</span>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-center font-display text-3xl font-bold text-pine">{t("relatedProducts")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
