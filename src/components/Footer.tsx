"use client";

import Link from "next/link";
import { MosqueMark } from "./Header";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { lang, t } = useLanguage();
  return (
    <footer className="bg-pine-deep text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <MosqueMark />
            <span className="leading-tight">
              <span className="block font-display text-xl font-bold text-white">{t("storeName")}</span>
              <span className="block text-[11px] font-semibold tracking-wide">
                {lang === "ar" ? "ملابس إسلامية" : "Islamic Clothing Store"}
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed">{t("storeTagline")}</p>
        </div>

        <nav aria-label={t("footerQuickLinks")}>
          <h3 className="font-display text-base font-bold text-white">{t("footerQuickLinks")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { label: t("navHome"), href: "/" },
              { label: t("navShop"), href: "/shop" },
              { label: t("navAbout"), href: "/about" },
              { label: t("navBlog"), href: "/blog" },
              { label: t("navContact"), href: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition hover:text-gold-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footerCustomerCare")}>
          <h3 className="font-display text-base font-bold text-white">{t("footerCustomerCare")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { label: t("footerFaqs"), href: "/about" },
              { label: t("footerShippingPolicy"), href: "/about" },
              { label: t("footerReturnPolicy"), href: "/about" },
              { label: t("footerTrackOrder"), href: "/checkout" },
              { label: t("footerSupport"), href: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition hover:text-gold-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-base font-bold text-white">{t("footerFollowUs")}</h3>
          <div className="mt-4 flex gap-2.5">
            {[
              { label: "Facebook", path: "M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8Z" },
              { label: "Instagram", path: "M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Zm0-2.1a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm6.8-.3a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM12 4.2c-2.5 0-2.8 0-3.8.1a5 5 0 0 0-1.7.3 3.4 3.4 0 0 0-2 2 5 5 0 0 0-.3 1.7c-.1 1-.1 1.3-.1 3.8s0 2.8.1 3.8a5 5 0 0 0 .3 1.7 3.4 3.4 0 0 0 2 2 5 5 0 0 0 1.7.3c1 .1 1.3.1 3.8.1s2.8 0 3.8-.1a5 5 0 0 0 1.7-.3 3.4 3.4 0 0 0-2-2 5 5 0 0 0-1.7-.3c-1-.1-1.3-.1-3.8-.1Z" },
              { label: "X", path: "M17.7 4h2.6l-5.7 6.5L21.3 20h-5.3l-4.1-5.4L7.1 20H4.5l6.1-7L4.2 4h5.4l3.7 4.9L17.7 4Zm-.9 14.4h1.4L9.2 5.5H7.7l9.1 12.9Z" },
              { label: "Pinterest", path: "M12 4a8 8 0 0 0-2.9 15.4c-.1-.7-.2-1.7 0-2.4l1.2-4.9s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.5 1.9 1.9 0 3.3-2 3.3-4.8 0-2.5-1.8-4.3-4.4-4.3a4.6 4.6 0 0 0-4.8 4.6c0 .9.4 1.9.8 2.4.1.1.1.2.1.3l-.3 1.1c0 .2-.2.2-.4.1-1.2-.6-2-2.4-2-3.9 0-3.2 2.3-6.1 6.7-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.3-5.2 6.3-1 0-2-.5-2.3-1.1l-.6 2.4c-.2.9-.8 1.9-1.2 2.6A8 8 0 1 0 12 4Z" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-pine transition hover:bg-gold hover:text-pine-deep"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row">
          <p>{t("footerRights")}</p>
          <p>
            <Link href="/about" className="hover:text-gold-light">{t("footerPrivacy")}</Link>
            <span className="mx-2">|</span>
            <Link href="/about" className="hover:text-gold-light">{t("footerTerms")}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
