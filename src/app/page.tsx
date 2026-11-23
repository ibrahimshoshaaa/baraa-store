"use client";

// Baraa — home page: every section of the original design, in order.
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, PRODUCTS, BLOG_POSTS, blogExcerpt, blogTitle, categoryBlurb } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { ProductCard, Stars } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";

const TRUST = [
  { key: "trustPremium" as const, icon: "M12 2l2.4 2.4 3.4-.5 1.2 3.2 3.2 1.2-.5 3.4L24 14.1l-2.4 2.4.5 3.4-3.2 1.2-1.2 3.2-3.4-.5L12 26.2 9.6 23.8 6.2 24.3 5 21.1 1.8 19.9l.5-3.4L0 14.1l2.4-2.4-.5-3.4 3.2-1.2 1.2-3.2 3.4.5L12 2Zm-1.2 12.6 6.5-6.5 1.6 1.6-8.1 8.1-3.4-3.4 1.6-1.6 1.8 1.8Z" },
  { key: "trustShipping" as const, icon: "M3 7h11v10H3zM14 10h4l3 3v4h-7zM7 17a1.6 1.6 0 1 0 0 3.2A1.6 1.6 0 0 0 7 17Zm10 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 17 17Z" },
  { key: "trustReturns" as const, icon: "M12 3a9 9 0 1 0 9 9h-2.4A6.6 6.6 0 1 1 12 5.4c1.5 0 2.9.5 4 1.4L13.5 9.3h6.9V2.4L18 4.8A8.9 8.9 0 0 0 12 3Zm-1 5h2v5.5l4 2.4-1 1.6L11 15V8Z" },
  { key: "trustSecure" as const, icon: "M12 2 4 5.5v5.7c0 5 3.4 8.6 8 10.3 4.6-1.7 8-5.3 8-10.3V5.5L12 2Zm-1.2 14.6-3.4-3.4 1.6-1.6 1.8 1.8 4.7-4.7 1.6 1.6-6.3 6.3Z" },
];

const WHY = [
  { key: "trustPremium" as const, icon: "M12 2 19 6v6c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-4Zm0 4.2L8.5 8v4c0 3.2 1.8 5.7 3.5 6.9 1.7-1.2 3.5-3.7 3.5-6.9V8L12 6.2Z" },
  { key: "whyFast" as const, icon: "M3 7h11v10H3zM14 10h4l3 3v4h-7zM7 17a1.6 1.6 0 1 0 0 3.2A1.6 1.6 0 0 0 7 17Zm10 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 17 17Z" },
  { key: "whySupport" as const, icon: "M12 3a9 9 0 0 0-8.6 11.6L2 20l5.6-1.3A9 9 0 1 0 12 3Zm-4.6 8.2a1.2 1.2 0 1 1 2.4 0 1.2 1.2 0 0 1-2.4 0Zm4.6 0a1.2 1.2 0 1 1 2.4 0 1.2 1.2 0 0 1-2.4 0Zm4.6 0a1.2 1.2 0 1 1 2.4 0 1.2 1.2 0 0 1-2.4 0Z" },
  { key: "whySecure" as const, icon: "M12 2 4 5.5v5.7c0 5 3.4 8.6 8 10.3 4.6-1.7 8-5.3 8-10.3V5.5L12 2Zm-1.2 14.6-3.4-3.4 1.6-1.6 1.8 1.8 4.7-4.7 1.6 1.6-6.3 6.3Z" },
];

const TESTIMONIALS = [
  { quoteKey: "reviewQuote" as const, authorKey: "reviewAuthor" as const, roleKey: "reviewRole" as const },
];

export default function HomePage() {
  const { lang, t } = useLanguage();
  const [testimonial, setTestimonial] = useState(0);
  const featured = PRODUCTS.slice(0, 3);
  const current = TESTIMONIALS[testimonial % TESTIMONIALS.length];

  return (
    <div className="fade-up">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-8 lg:grid-cols-2 lg:pt-14">
        <div>
          <p className="text-sm font-semibold tracking-wide text-pine-mid">{t("heroEyebrow")}</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] text-pine sm:text-6xl lg:text-7xl">
            {t("heroTitleA")}
            <span className="block italic text-gold">{t("heroTitleB")}</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{t("heroSub")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-pine px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-pine-mid"
            >
              {t("shopNow")} →
            </Link>
            <Link
              href="/about"
              className="rounded-full border-2 border-pine/20 px-8 py-3.5 text-sm font-semibold text-pine transition hover:border-pine"
            >
              {t("navAbout")}
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(11,61,46,0.18)]">
          <Image
            src="/images/hero-kurta.jpg"
            alt={t("heroTitleA")}
            width={900}
            height={1100}
            className="aspect-[4/5] w-full object-cover"
            priority
          />
          <div className="absolute bottom-4 start-4 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">{t("offerEyebrow")}</p>
            <p className="font-display text-lg font-bold text-pine">{t("offerTitle")}</p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 rounded-[24px] bg-surface p-4 shadow-[0_6px_24px_rgba(11,61,46,0.07)] sm:grid-cols-4">
          {TRUST.map((item) => (
            <div key={item.key} className="flex items-center gap-3 px-2 py-2">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine/10 text-pine">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={item.icon} />
                </svg>
              </span>
              <span className="text-sm font-semibold leading-snug">{t(item.key)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="eyebrow justify-center">{t("categoriesEyebrow")}</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-pine sm:text-4xl">{t("categoriesTitle")}</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="group overflow-hidden rounded-[24px] bg-surface text-start shadow-[0_6px_24px_rgba(11,61,46,0.07)] transition hover:shadow-[0_14px_36px_rgba(11,61,46,0.14)]"
            >
              <span className="relative block aspect-square overflow-hidden bg-cream-deep">
                <Image
                  src={c.image}
                  alt={lang === "ar" ? c.nameAr : c.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </span>
              <span className="block p-4">
                <span className="block font-display text-base font-bold text-pine">
                  {lang === "ar" ? c.nameAr : c.name}
                </span>
                <span className="mt-0.5 block text-xs text-ink-soft">{categoryBlurb(c, lang)}</span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-pine px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-pine-mid"
        >
          {t("browseAllCategories")} →
        </Link>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 pb-16 text-center">
        <p className="eyebrow justify-center">{t("featuredEyebrow")}</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-pine sm:text-4xl">{t("featuredTitle")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 text-start sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-pine px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-pine-mid"
        >
          {t("viewMoreProducts")} →
        </Link>
      </section>

      {/* Dark green banner */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-[32px] bg-pine px-6 py-14 text-center text-white shadow-[0_20px_50px_rgba(11,61,46,0.25)] sm:px-12">
          <Image
            src="/images/mosque-dusk.jpg"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-bold leading-snug sm:text-4xl">
              {t("bannerTitle")}
            </h2>
            <p className="mt-3 text-white/80">{t("bannerSub")}</p>
            <Link
              href="/shop"
              className="mt-7 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-pine-deep transition hover:bg-gold-light"
            >
              {t("exploreCollection")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col items-center gap-5 rounded-[24px] bg-surface p-6 shadow-[0_6px_24px_rgba(11,61,46,0.07)] sm:flex-row sm:justify-between sm:p-8">
          <div className="text-center sm:text-start">
            <h3 className="font-display text-2xl font-bold text-pine">{t("newsletterTitle")}</h3>
            <p className="mt-1 text-sm text-ink-soft">{t("newsletterSub")}</p>
          </div>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{t("whyEyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-snug text-pine sm:text-4xl">
            {t("whyTitle")}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {WHY.map((item) => (
              <div key={item.key} className="rounded-[20px] bg-surface p-5 shadow-[0_6px_24px_rgba(11,61,46,0.06)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine/10 text-pine">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                </span>
                <p className="mt-3 text-sm font-bold leading-snug">{t(item.key)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(11,61,46,0.18)]">
          <Image
            src="/images/man-thobe.jpg"
            alt={t("whyTitle")}
            width={900}
            height={1000}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      {/* Special offer banner */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-[32px] bg-pine px-6 py-12 text-center text-white sm:px-12">
          <Image src="/images/lantern.jpg" alt="" fill className="object-cover opacity-20" sizes="100vw" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">{t("offerEyebrow")}</p>
            <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{t("offerTitle")}</h2>
            <p className="mt-2 text-lg text-white/85">{t("offerSub")}</p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-pine-deep transition hover:bg-gold-light"
            >
              {t("shopNow")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-6xl px-4 pb-16 text-center">
        <p className="eyebrow justify-center">{t("blogEyebrow")}</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-pine sm:text-4xl">{t("blogTitle")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 text-start sm:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-[24px] bg-surface shadow-[0_6px_24px_rgba(11,61,46,0.07)] transition hover:shadow-[0_14px_36px_rgba(11,61,46,0.14)]"
            >
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-cream-deep">
                <Image src={post.image} alt={blogTitle(post, lang)} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              </Link>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-snug text-pine">
                  <Link href={`/blog/${post.slug}`} className="hover:text-pine-mid">
                    {blogTitle(post, lang)}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{blogExcerpt(post, lang)}</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-bold text-pine hover:text-gold">
                  {t("readMore")} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 pb-16 text-center">
        <p className="eyebrow justify-center">{t("reviewsEyebrow")}</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-pine sm:text-4xl">{t("reviewsTitle")}</h2>
        <div className="relative mx-auto mt-10 max-w-2xl rounded-[24px] bg-surface p-8 shadow-[0_6px_24px_rgba(11,61,46,0.07)] sm:p-10">
          <span className="font-display text-6xl leading-none text-gold" aria-hidden="true">“</span>
          <p className="-mt-4 font-display text-xl font-semibold leading-relaxed text-pine sm:text-2xl">
            {t(current.quoteKey)}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pine font-display text-lg font-bold text-gold-light">
              {t(current.authorKey).charAt(0)}
            </span>
            <span className="text-start">
              <span className="block font-bold">{t(current.authorKey)}</span>
              <span className="block text-sm text-ink-soft">{t(current.roleKey)}</span>
            </span>
          </div>
          <div className="mt-2 flex justify-center">
            <Stars rating={5} />
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition ${testimonial % 3 === i ? "w-7 bg-gold" : "w-2.5 bg-black/15"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join our community */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-[32px] bg-pine px-6 py-14 text-center text-white sm:px-12">
          <Image src="/images/mosque-dusk.jpg" alt="" fill className="object-cover opacity-30" sizes="100vw" />
          <div className="relative mx-auto max-w-xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("joinTitle")}</h2>
            <p className="mt-3 text-white/85">{t("joinSub")}</p>
            <div className="mt-7">
              <NewsletterForm dark />
            </div>
          </div>
        </div>
      </section>

      {/* Price note — keeps the design honest about currency */}
      <p className="mx-auto max-w-6xl px-4 pb-8 text-center text-xs text-ink-soft">{t("priceNote")}</p>
    </div>
  );
}
