import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/mdx";
import { MDX } from "@/components/mdx/render";
import { bumpView } from "@/lib/views";
import { JsonLd } from "@/components/ui/json-ld";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return { title: p.title, description: p.description };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();
  const views = await bumpView("post", post.slug);
  return (
    <article className="mx-auto max-w-[680px] px-[5vw] pt-[18vh] pb-[12vh]">
      <div className="font-mono text-xs uppercase tracking-widest text-ink-dim">
        {post.date} {views > 0 && `· ${views.toLocaleString()} views`}
      </div>
      <h1 className="mt-3 font-display text-[clamp(36px,6vw,80px)] font-black leading-[0.95] tracking-tight">{post.title}</h1>
      <div className="prose mt-12 text-lg leading-relaxed">
        <MDX source={post.body} />
      </div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        description: post.description,
      }} />
    </article>
  );
}
