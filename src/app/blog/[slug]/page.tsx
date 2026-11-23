import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "@/lib/catalog";
import { BlogPostClient } from "@/components/BlogPostClient";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
