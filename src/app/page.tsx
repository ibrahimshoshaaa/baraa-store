"use client";

// Baraa — home page: every section of the original design, in order.
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, PRODUCTS, BLOG_POSTS, blogTitle } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { ProductCard, Stars } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { MosqueMark } from "@/components/Header";

const TRUST = [
  { key: "trustPremium" as const, icon: "M12 2l2.4 2.4 3.4-.5 1.2 3.2 3.2 1.2-.5 3.4L24 14.1l-2.4 2.4.5 3.4-3.2 1.2-1.2 3.2-3.4-.5L12 26.2 9.6 23.8 6.2 24.3 5 21.1 1.8 19.9l.5-3.4L0 14.1l2.4-2.4-.5-3.4 3.2-1.2 1.2-3.2 3.4.5L12 2Zm-1.2 12.6 6.5-6.5 1.6 1.6-8.1 8.1-3.4-3.4 1.6-1.6 1.8 1.8Z" },
  { key: "trustShipping" as const, icon: "M3 7h11v10H3zM14 10h4l3 3v4h-7zM7 17a1.6 1.6 0 1 0 0 3.2A1.6 1.6 0 0 0 7 17Zm10 0a1.6 1.6 0 1 0 0 3.2A1.6 1.6 0 0 0 17 17Z" },
  { key: "trustReturns" as const, icon: "M12 3a9 9 0 1 0 9 9h-2.4A6.6 6.6 0 1 1 12 5.4c1.5 0 2.9.5 4 1.4L13.5 9.3h6.9V2.4L18 4.8A8.9 8.9 0 0 0 12 3Zm-1 5h2v5.5l4 2.4-1 1.6L11 15V8Z" },
  { key: "trustSecure" as const, icon: "M12 2 4 5.5v5.7c0 5 3.4 8.6 8 10.3 4.6-1.7 8-5.3 8-10.3V5.5L12 2Zm-1.2 14.6-3.4-3.4 1.6-1.6 1.8 1.8 4.7-4.7 1.6 1.6-6.3 6.3Z" },
];

const WHY = [
  { key: "trustPremium" as const, icon: "M12 2 19 6v6c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-4Zm0 4.2L8.5 8v4c0 3.2 1.8 5.7 3.5 6.9 1.7-1.2 3.5-3.7 3.5-6.9V8L12 6.2Z" },
  { key: "whyFast" as const, icon: "M3 7h11v10H3zM14 10h4l3 3v4h-7zM7 17a1.6 1.6 0 1 0 0 3.2A1.6 1.6 0 0 0 7 17Zm10 0a1.6 1.6 0 1 0 0 3.2A1.6 1.6 0 0 0 17 17Z" },
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
      {/* Hero — split 2-column layout like the reference design, on every
          screen. The image bleeds to the right edge of the container and
          spans the full hero height (navbar → trust bar); a gradient mask
          dissolves its left/top edges into the cream background. The text
          column overlaps slightly into the faded edge. Headline is an
          oversized 3-line stack: Islamic / Clothing / for Every You. */}
      <section className="mx-auto grid max-w-6xl grid-cols-[1.05fr_0.95fr] items-center gap-2 pb-0 pl-4 pr-0 sm:gap-4 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center lg:-mr-6">
          <p className="text-[11px] font-semibold tracking-wide text-pine-mid sm:text-[13px]">{t("heroEyebrow")}</p>
          <h1 className="mt-2 font-display text-[1.9rem] font-bold leading-[1.05] text-pine sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">{t("heroTitleA1")}</span>
            <span className="block">{t("heroTitleA2")}</span>
            <span className="block italic text-gold">{t("heroTitleB")}</span>
          </h1>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-soft sm:text-lg">
            {t("heroSub")}
          </p>
          <div className="mt-4 sm:mt-6">
            <Link href="/shop" className="btn btn-primary">
              {t("shopNow")} →
            </Link>
          </div>
        </div>
        <div className="relative hero-img-mask">
          {/* Art direction: the full tall portrait on phones, the 4:5 crop
              (arch + hanger + kurta, like the design) on tablet/desktop. */}
          <Image
            src="/images/hero-kurta.jpg"
            alt={t("heroTitleA1") + " " + t("heroTitleA2")}
            width={1120}
            height={2240}
            className="block h-auto w-full sm:hidden"
            priority
          />
          <Image
            src="/images/hero-kurta-hero.jpg"
            alt={t("heroTitleA1") + " " + t("heroTitleA2")}
            width={1120}
            height={1400}
            className="hidden h-auto w-full sm:block"
            priority
          />
        </div>
      </section>

      {/* Trust strip — floating card overlapping the hero bottom edge, like
          the design; 2x2 on mobile, one row of 4 on desktop. */}
      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 pb-2 sm:-mt-12">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-black/5 bg-black/5 shadow-[var(--shadow-card)] sm:grid-cols-4">
          {TRUST.map((item) => (
            <div key={item.key} className="flex items-center gap-3 bg-surface px-4 py-4">
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
      <section className="section pb-0 text-center">
        <p className="eyebrow justify-center">{t("categoriesEyebrow")}</p>
        <h2 className="section-title mt-3">{t("categoriesTitle")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-5 sm:gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="card card-hover group overflow-hidden text-start"
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
              <span className="block p-3">
                <span className="block font-display text-sm font-bold text-pine sm:text-base">
                  {lang === "ar" ? c.nameAr : c.name}
                </span>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/shop" className="btn btn-primary mt-8">
          {t("browseAllCategories")} →
        </Link>
      </section>

      {/* Featured products */}
      <section className="section pb-0 text-center">
        <p className="eyebrow justify-center">{t("featuredEyebrow")}</p>
        <h2 className="section-title mt-3">{t("featuredTitle")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 text-start sm:mt-10 sm:gap-5 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <Link href="/shop" className="btn btn-primary mt-8">
          {t("viewMoreProducts")} →
        </Link>
      </section>

      {/* Dark green banner — mosque photo on the left, text on the right */}
      <section className="section pb-0">
        <div className="flex flex-col overflow-hidden rounded-[28px] bg-pine shadow-[var(--shadow-hero)] sm:flex-row">
          <div className="relative min-h-[220px] sm:w-2/5">
            <Image
              src="/images/mosque.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <h2 className="font-display text-3xl font-bold leading-snug sm:text-4xl">{t("bannerTitle")}</h2>
            <p className="mt-3 max-w-md leading-relaxed text-white/80">{t("bannerSub")}</p>
            <Link href="/shop" className="btn btn-gold mt-7">
              {t("exploreCollection")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="section pb-0">
        <div className="card flex flex-col items-center gap-5 p-6 sm:flex-row sm:justify-between sm:gap-8 sm:p-8">
          <div className="flex items-center gap-4 text-center sm:text-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/15">
              <MosqueMark className="h-9 w-9" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold text-pine">{t("newsletterTitle")}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t("newsletterSub")}</p>
            </div>
          </div>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section grid items-center gap-10 pb-0 lg:grid-cols-2">
        <div>
          <p className="eyebrow eyebrow-start">{t("whyEyebrow")}</p>
          <h2 className="section-title mt-3">{t("whyTitle")}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {WHY.map((item) => (
              <div
                key={item.key}
                className="card flex flex-col items-center p-4 text-center sm:p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine/10 text-pine">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                </span>
                <p className="mt-3 text-[13px] font-bold leading-snug">{t(item.key)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[28px] shadow-[var(--shadow-hero)]">
          <Image
            src="/images/man-thobe.jpg"
            alt={t("whyTitle")}
            width={900}
            height={1000}
            className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
          />
        </div>
      </section>

      {/* Special offer banner — arch photo left, lanterns right (desktop);
          on mobile the photos become full-width bands above and below the text */}
      <section className="section pb-0">
        <div className="relative overflow-hidden rounded-[28px] bg-pine text-center text-white ring-1 ring-inset ring-gold/25">
          <div className="relative h-40 sm:hidden">
            <Image src="/images/mosque.jpg" alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-y-0 start-0 hidden w-1/4 sm:block">
            <Image src="/images/mosque.jpg" alt="" fill className="object-cover" sizes="25vw" />
          </div>
          <div className="absolute inset-y-0 end-0 hidden w-1/4 sm:block">
            <Image src="/images/lantern.jpg" alt="" fill className="object-cover" sizes="25vw" />
          </div>
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold-light">
              {t("offerEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-[2.5rem] font-bold leading-none sm:text-5xl">
              {t("offerTitle")}
            </h2>
            <p className="mt-3 text-lg text-white/85">{t("offerSub")}</p>
            <Link href="/shop" className="btn btn-gold mt-7">
              {t("shopNow")} →
            </Link>
          </div>
          <div className="relative h-40 sm:hidden">
            <Image src="/images/lantern.jpg" alt="" fill className="object-cover" sizes="100vw" />
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section pb-0 text-center">
        <p className="eyebrow justify-center">{t("blogEyebrow")}</p>
        <h2 className="section-title mt-3">{t("blogTitle")}</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 text-start sm:mt-10 sm:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="card card-hover group overflow-hidden">
              <Link
                href={`/blog/${post.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-cream-deep"
              >
                <Image
                  src={post.image}
                  alt={blogTitle(post, lang)}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Link>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-snug text-pine">
                  <Link href={`/blog/${post.slug}`} className="transition hover:text-pine-mid">
                    {blogTitle(post, lang)}
                  </Link>
                </h3>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-pine transition hover:text-gold"
                >
                  {t("readMore")} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section pb-0 text-center">
        <p className="eyebrow justify-center">{t("reviewsEyebrow")}</p>
        <h2 className="section-title mt-3">{t("reviewsTitle")}</h2>
        <div className="card relative mx-auto mt-8 max-w-2xl p-7 text-center sm:mt-10 sm:p-10">
          <span className="font-display text-5xl leading-none text-gold" aria-hidden="true">
            “
          </span>
          <p className="-mt-3 font-display text-xl font-semibold leading-relaxed text-pine sm:text-2xl">
            {t(current.quoteKey)}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40">
                <Image
                  src="/images/avatar-ahmed.jpg"
                  alt={t(current.authorKey)}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </span>
              <span className="text-start">
                <span className="block font-bold">{t(current.authorKey)}</span>
                <span className="block text-sm text-ink-soft">{t(current.roleKey)}</span>
              </span>
            </div>
            <Stars rating={5} />
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition ${
                  testimonial % 3 === i ? "w-7 bg-gold" : "w-2.5 bg-black/15"
                }`}
              />
            ))}
          </div>
          {/* Arrows: side buttons on desktop, a row below the dots on mobile */}
          <div className="mt-6 flex items-center justify-center gap-3 sm:contents">
            <button
              type="button"
              onClick={() => setTestimonial((v) => (v + 2) % 3)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-lg font-bold text-pine shadow-md transition hover:bg-pine hover:text-white max-sm:static sm:absolute sm:-start-5 sm:top-1/2 sm:-translate-y-1/2"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setTestimonial((v) => (v + 1) % 3)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-lg font-bold text-pine shadow-md transition hover:bg-pine hover:text-white max-sm:static sm:absolute sm:-end-5 sm:top-1/2 sm:-translate-y-1/2"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Join our community */}
      <section className="section">
        <div className="relative overflow-hidden rounded-[28px] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <Image src="/images/mosque-dusk.jpg" alt="" fill className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-pine/70 via-pine/80 to-pine-deep/90"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("joinTitle")}</h2>
            <p className="mt-3 leading-relaxed text-white/85">{t("joinSub")}</p>
            <div className="mx-auto mt-7 max-w-md">
              <NewsletterForm dark />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
