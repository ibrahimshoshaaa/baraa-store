"use client";

// Baraa — sliding cart drawer. Slides from the right in LTR, from the left in RTL.
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FREE_SHIPPING_THRESHOLD, formatPrice, getProduct, productName } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "./CartProvider";

export function BagDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem, subtotal } = useCart();
  const { lang, t } = useLanguage();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const isRtl = lang === "ar";

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`drawer-backdrop fixed inset-0 z-50 bg-pine-deep/50 backdrop-blur-sm ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label={t("yourBag")}
        aria-hidden={!isOpen}
        className={`drawer fixed top-0 z-[60] flex h-full w-[min(420px,100%)] flex-col bg-surface shadow-2xl ${
          isRtl ? "left-0" : "right-0"
        }`}
        style={{ translate: isOpen ? "0 0" : isRtl ? "-100% 0" : "100% 0" }}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-pine">
            {t("yourBag")}
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-gold px-1.5 text-xs font-bold text-pine-deep">
              {count}
            </span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t("searchClose")}
            className="icon-btn bg-cream text-lg leading-none"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-display text-xl font-bold text-pine">{t("bagEmpty")}</p>
            <p className="text-sm text-ink-soft">{t("bagEmptySub")}</p>
            <Link href="/shop" onClick={closeCart} className="btn btn-primary mt-2">
              {t("shopNow")} →
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-black/5 overflow-y-auto px-5">
              {items.map((item) => {
                const product = getProduct(item.slug);
                const name = product ? productName(product, lang) : item.name;
                return (
                  <li key={`${item.slug}-${item.colour}-${item.size}`} className="flex gap-3 py-4">
                    <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-2xl bg-cream-deep">
                      <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
                    </span>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display font-bold leading-snug text-pine">{name}</p>
                          <p className="mt-0.5 text-xs text-ink-soft">
                            {item.colour} · {t("size")} {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug, item.colour, item.size)}
                          aria-label={`Remove ${name}`}
                          className="text-lg leading-none text-ink-soft transition hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-black/10">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.slug, item.colour, item.size, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-base"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.slug, item.colour, item.size, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center text-base"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-display font-bold text-pine">
                          {formatPrice(item.price * item.quantity, lang)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-black/5 px-5 py-4">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <p className="rounded-2xl bg-pine/10 px-4 py-2.5 text-center text-sm font-semibold text-pine">
                  {t("freeShippingUnlocked")}
                </p>
              ) : (
                <div className="rounded-2xl bg-cream px-4 py-3">
                  <p className="text-center text-sm text-ink-soft">
                    {t("freeShippingMore")
                      .split("{amount}")
                      .reduce<ReactNode[]>((acc, part, i, arr) => {
                        acc.push(part);
                        if (i < arr.length - 1) {
                          acc.push(
                            <strong key={i} className="text-pine">
                              {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal, lang)}
                            </strong>,
                          );
                        }
                        return acc;
                      }, [])}
                  </p>
                  <div
                    className="mt-2.5 h-2 overflow-hidden rounded-full bg-pine/10"
                    role="progressbar"
                    aria-valuenow={Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">{t("subtotal")}</span>
                <span className="font-display text-xl font-bold text-pine">{formatPrice(subtotal, lang)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">{t("shippingNote")}</p>
              <Link href="/checkout" onClick={closeCart} className="btn btn-primary mt-4 w-full">
                {t("checkout")} →
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 w-full py-2 text-center text-sm font-semibold text-pine transition hover:text-pine-mid"
              >
                {t("continueShopping")}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
