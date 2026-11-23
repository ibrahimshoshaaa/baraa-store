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
        <h1 className="mt-3 font-display text-4xl font-bold text-pine sm:text-5xl">{t("blogListTitle")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t("blogListSub")}</p>
      </header>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-[24px] bg-surface shadow-[0_6px_24px_rgba(11,61,46,0.07)] transition hover:shadow-[0_14px_36px_rgba(11,61,46,0.14)]"
          >
            <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-cream-deep">
              <Image src={post.image} alt={blogTitle(post, lang)} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
            </Link>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{blogDate(post, lang)}</p>
              <h2 className="mt-2 font-display text-xl font-bold leading-snug text-pine">
                <Link href={`/blog/${post.slug}`} className="hover:text-pine-mid">
                  {blogTitle(post, lang)}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{blogExcerpt(post, lang)}</p>
              <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-bold text-pine hover:text-gold">
                {t("readMore")} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
