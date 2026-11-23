"use client";

// Baraa — single blog post (client part: language-aware rendering).
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, blogBody, blogDate, blogTitle, type BlogPost } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export function BlogPostClient({ post }: { post: BlogPost }) {
  const { lang, t } = useLanguage();
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <Link
        href="/blog"
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
        {t("blogBack")}
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gold">{blogDate(post, lang)}</p>
      <h1 className="mt-2 font-display text-3xl font-bold leading-snug text-pine sm:text-4xl">
        {blogTitle(post, lang)}
      </h1>
      <div className="relative mt-6 overflow-hidden rounded-[28px] shadow-[var(--shadow-hero)]">
        <Image src={post.image} alt={blogTitle(post, lang)} width={900} height={560} className="aspect-[16/10] w-full object-cover" />
      </div>
      <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink">
        {blogBody(post, lang).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="mt-10 border-t border-black/10 pt-6">
        <h2 className="font-display text-2xl font-bold text-pine">{t("readMore")}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {BLOG_POSTS.filter((p) => p.slug !== post.slug).map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card card-hover block p-4 font-display font-bold leading-snug text-pine"
            >
              {blogTitle(p, lang)} →
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
