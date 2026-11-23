"use client";

// Baraa — checkout: cart summary + COD form. Generates an order code and
// stores the order in sessionStorage for the thank-you page.
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, formatPrice, getProduct, productName } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/components/CartProvider";

function orderCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `B-${out.slice(0, 4)}-${out.slice(4)}`;
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError(t("requiredField"));
      return;
    }
    const code = orderCode();
    try {
      sessionStorage.setItem(
        "baraa-order",
        JSON.stringify({ code, name: name.trim(), total, count: items.reduce((s, i) => s + i.quantity, 0) }),
      );
    } catch {
      // ignore
    }
    clear();
    router.push(`/thank-you?code=${code}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="section-title">{t("checkoutTitle")}</h1>
        <p className="section-sub">{t("checkoutEmpty")}</p>
        <Link href="/shop" className="btn btn-primary mt-7">
          {t("checkoutGoShop")} →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="section-title text-center">{t("checkoutTitle")}</h1>
      <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-5">
        <form onSubmit={placeOrder} className="lg:col-span-3">
          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-pine">{t("yourDetails")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold">{t("fullName")} *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("fullNamePlaceholder")}
                  className="input mt-1.5"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">{t("phone")} *</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  className="input mt-1.5"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">{t("city")} *</span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input mt-1.5"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold">{t("address")} *</span>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t("addressPlaceholder")}
                  rows={2}
                  className="input mt-1.5"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold">{t("notes")}</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("notesPlaceholder")}
                  rows={2}
                  className="input mt-1.5"
                />
              </label>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-[24px] bg-pine p-6 text-white shadow-[var(--shadow-card)]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <circle cx="12" cy="12" r="2.5" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
            </span>
            <div>
              <h2 className="font-display text-xl font-bold">{t("cashOnDelivery")}</h2>
              <p className="mt-1 text-sm leading-relaxed text-white/80">{t("codNote")}</p>
            </div>
          </div>

          {error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

          <button
            type="submit"
            className="btn btn-gold mt-6 w-full text-base"
            style={{ minHeight: 56 }}
          >
            {t("placeOrder")} — {formatPrice(total, lang)}
          </button>
        </form>

        <aside className="lg:col-span-2">
          <div className="card p-6 sm:p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-bold text-pine">{t("orderSummary")}</h2>
            <ul className="mt-4 divide-y divide-black/5">
              {items.map((item) => {
                const product = getProduct(item.slug);
                const displayName = product ? productName(product, lang) : item.name;
                return (
                  <li key={`${item.slug}-${item.colour}-${item.size}`} className="flex gap-3 py-3">
                    <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                      <Image src={item.image} alt="" fill className="object-cover" sizes="48px" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-bold leading-snug">{displayName}</p>
                      <p className="text-xs text-ink-soft">
                        {item.colour} · {t("size")} {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-pine">{formatPrice(item.price * item.quantity, lang)}</p>
                  </li>
                );
              })}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-black/5 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t("subtotal")}</dt>
                <dd className="font-semibold">{formatPrice(subtotal, lang)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t("shipping")}</dt>
                <dd className="font-semibold">{shipping === 0 ? t("free") : formatPrice(shipping, lang)}</dd>
              </div>
              <div className="flex justify-between border-t border-black/5 pt-3 text-base">
                <dt className="font-bold">{t("total")}</dt>
                <dd className="font-display text-xl font-bold text-pine">{formatPrice(total, lang)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
