"use client";

// Baraa — single blog post (client part: language-aware rendering).
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, blogBody, blogDate, blogTitle, type BlogPost } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";

export function BlogPostClient({ post }: { post: BlogPost }) {
  const { lang, t } = useLanguage();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="text-sm font-semibold text-pine hover:underline">
        ← {t("blogBack")}
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gold">{blogDate(post, lang)}</p>
      <h1 className="mt-2 font-display text-4xl font-bold leading-snug text-pine">{blogTitle(post, lang)}</h1>
      <div className="relative mt-6 overflow-hidden rounded-[24px] shadow-[0_14px_36px_rgba(11,61,46,0.12)]">
        <Image src={post.image} alt={blogTitle(post, lang)} width={900} height={560} className="aspect-[16/10] w-full object-cover" />
      </div>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink">
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
              className="rounded-[20px] bg-surface p-4 font-display font-bold text-pine shadow-sm transition hover:shadow-md"
            >
              {blogTitle(p, lang)} →
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
