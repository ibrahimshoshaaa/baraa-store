"use client";

// Baraa — blog list.
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, blogDate, blogExcerpt, blogTitle } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export default function BlogPage() {
  const { lang, t } = useLanguage();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="text-center">
        <p className="eyebrow justify-center">{t("blogEyebrow")}</p>
        <h1 className="section-title mt-3">{t("blogListTitle")}</h1>
        <p className="section-sub mx-auto max-w-xl">{t("blogListSub")}</p>
      </header>
      <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="card card-hover group overflow-hidden">
            <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-cream-deep">
              <Image
                src={post.image}
                alt={blogTitle(post, lang)}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </Link>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{blogDate(post, lang)}</p>
              <h2 className="mt-2 font-display text-xl font-bold leading-snug text-pine">
                <Link href={`/blog/${post.slug}`} className="transition hover:text-pine-mid">
                  {blogTitle(post, lang)}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{blogExcerpt(post, lang)}</p>
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
    </div>
  );
}
