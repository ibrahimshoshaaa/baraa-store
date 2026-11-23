"use client";

// Baraa — header: dark-green top bar, logo + nav, language toggle, search + cart.
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { useLanguage } from "@/lib/i18n";
import { CATEGORIES, PRODUCTS, categoryName, formatPrice, productName } from "@/lib/catalog";

export function MosqueMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M24 4c.9 1.6 2.2 2.9 3.6 3.6.5 1.9-.4 3.6-2 4.6 1 .9 1.6 2.2 1.6 3.6H20.8c0-1.4.6-2.7 1.6-3.6-1.6-1-2.5-2.7-2-4.6 1.4-.7 2.7-2 3.6-3.6Z"
        fill="#d4af37"
      />
      <path
        d="M10 44V26.5c0-1 .8-1.9 1.9-1.9h1.6c.6-4.6 3.4-8.6 7.4-10.8V11h6.2v2.8c4 2.2 6.8 6.2 7.4 10.8h1.6c1.1 0 1.9.9 1.9 1.9V44H10Z"
        fill="#d4af37"
      />
      <path d="M24 22.5a4 4 0 0 1 4 4v9.5h-8v-9.5a4 4 0 0 1 4-4Z" fill="#0b3d2e" />
      <path d="M14.5 32.5h3v5.5h-3zM30.5 32.5h3v5.5h-3z" fill="#0b3d2e" />
      <path d="M8 44h32v2.5H8z" fill="#d4af37" />
    </svg>
  );
}

export function LanguageToggle({ large = false }: { large?: boolean }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`flex items-center overflow-hidden rounded-full border border-black/10 font-bold ${large ? "text-sm" : "text-xs"}`}
      role="group"
      aria-label="Language / اللغة"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`${large ? "px-5 py-2.5" : "px-2 py-1.5 sm:px-2.5"} transition ${lang === "en" ? "bg-pine text-white" : "text-ink hover:bg-pine/10"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={`${large ? "px-5 py-2.5" : "px-2 py-1.5 sm:px-2.5"} transition ${lang === "ar" ? "bg-pine text-white" : "text-ink hover:bg-pine/10"}`}
      >
        عربي
      </button>
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const { count, openCart } = useCart();
  const { lang, t } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const NAV = [
    { label: t("navHome"), href: "/" },
    { label: t("navShop"), href: "/shop" },
    { label: t("navAbout"), href: "/about" },
    { label: t("navBlog"), href: "/blog" },
    { label: t("navContact"), href: "/contact" },
  ];

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const results =
    query.trim().length >= 2
      ? PRODUCTS.filter((p) => {
          const q = query.trim().toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.nameAr.includes(query.trim()) ||
            categoryName(p.categorySlug, "en").toLowerCase().includes(q) ||
            categoryName(p.categorySlug, "ar").includes(query.trim())
          );
        }).slice(0, 6)
      : [];

  function goToShopResults() {
    const q = query.trim();
    if (q.length < 1) return;
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-pine text-[11px] font-medium tracking-wide text-white/90 sm:text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 sm:justify-between sm:gap-6">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="17" r="1.6" /><circle cx="17" cy="17" r="1.6" /></svg>
            {t("topFreeShipping")}
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9" /><path d="M3 4v5h5" /></svg>
            {t("topEasyReturn")}
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" /></svg>
            {t("topTrusted")}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-black/10 bg-cream shadow-[0_2px_12px_rgba(11,61,46,0.08)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2" aria-label={t("storeName")}>
            <MosqueMark className="h-7 w-7 shrink-0 sm:h-9 sm:w-9" />
            <span className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap font-display text-lg font-bold text-pine sm:text-2xl">{t("storeName")}</span>
              <span className="hidden whitespace-nowrap text-[10px] font-semibold tracking-wide text-ink-soft min-[400px]:block sm:text-[11px]">
                {lang === "ar" ? "ملابس إسلامية" : "Islamic Clothing Store"}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-medium text-ink lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b-2 border-transparent pb-0.5 transition hover:border-gold hover:text-pine-mid"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <div className="hidden md:block">
              <LanguageToggle />
            </div>
            <button
              type="button"
              aria-label={t("search")}
              onClick={() => setSearchOpen(true)}
              className="icon-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
            <button
              type="button"
              onClick={openCart}
              className="icon-btn relative"
              aria-label={`${t("openBag")}, ${count}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
              {count > 0 && (
                <span className="absolute -end-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-pine-deep">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="icon-btn lg:hidden"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile menu" className="menu-drop border-t border-black/5 bg-surface px-4 pb-4 pt-2 lg:hidden">
            <div className="mb-1 flex items-center justify-between gap-3 border-b border-black/5 px-3 pb-3 pt-1">
              <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">Language / اللغة</span>
              <LanguageToggle large />
            </div>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-3 py-3 font-semibold transition hover:bg-cream"
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-2 border-t border-black/5 px-3 pb-2 pt-3 text-xs font-bold uppercase tracking-widest text-ink-soft">
              {t("shopByCategory")}
            </p>
            <div className="grid grid-cols-2 gap-2 px-1">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-cream px-3 py-2.5 text-center text-sm font-semibold text-ink transition hover:bg-pine hover:text-white"
                >
                  {lang === "ar" ? c.nameAr : c.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-pine-deep/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div
            className="mx-auto mt-24 w-[min(560px,calc(100%-2rem))] rounded-[28px] border border-black/5 bg-surface p-4 shadow-2xl sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-black/10 pb-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                  if (e.key === "Enter") goToShopResults();
                }}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent text-lg outline-none placeholder:text-ink-soft"
                aria-label={t("search")}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-full bg-cream px-3 py-1.5 text-sm font-semibold"
              >
                {t("searchClose")}
              </button>
            </div>
            {results.length > 0 ? (
              <>
                <ul className="max-h-80 divide-y divide-black/5 overflow-y-auto">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 py-3"
                      >
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-cream-deep">
                          <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-display font-bold">{productName(p, lang)}</span>
                          <span className="text-sm text-ink-soft">{categoryName(p.categorySlug, lang)}</span>
                        </span>
                        <span className="font-display font-bold text-pine">{formatPrice(p.price, lang)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={goToShopResults}
                  className="mt-2 w-full rounded-full bg-cream py-2.5 text-sm font-semibold"
                >
                  {t("searchSeeAll")} “{query.trim()}” →
                </button>
              </>
            ) : (
              query.trim().length >= 2 && (
                <p className="py-6 text-center text-sm text-ink-soft">{t("searchNothing")} “{query}”.</p>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
