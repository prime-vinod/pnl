import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/mdx";
import { MDX } from "@/components/mdx/render";
import { bumpView } from "@/lib/views";
import { JsonLd } from "@/components/ui/json-ld";
import { Link } from "@/components/ui/link";

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

function readingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();
  const views = await bumpView("post", post.slug);
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const next = all[(idx + 1) % all.length];
  const minutes = readingTime(post.body);

  return (
    <article>
      <header className="mx-auto max-w-5xl px-[5vw] pt-[18vh]">
        <Link href="/writing" className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
          ← Writing
        </Link>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
          <span>{post.date}</span>
          <span>{minutes} min read</span>
          {views > 0 && <span>{views.toLocaleString()} views</span>}
        </div>
        <h1 className="mt-4 font-display text-[clamp(36px,6vw,84px)] font-black leading-[1.02] tracking-[-0.025em]">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-6 max-w-2xl font-display text-xl leading-snug text-ink-dim md:text-2xl">
            {post.description}
          </p>
        ) : null}
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-[5vw] py-16 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Published</div>
              <div className="mt-1 font-display text-base">{post.date}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Reading time</div>
              <div className="mt-1 font-display text-base">{minutes} min</div>
            </div>
            {post.tags.length > 0 && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Tags</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span key={t} className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
        <div className="prose lg:col-span-8 lg:col-start-5 lg:-mt-2">
          <MDX source={post.body} />
        </div>
      </div>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        description: post.description,
      }} />

      {all.length > 1 && (
        <nav aria-label="Next post" className="border-t border-line px-[5vw] py-16">
          <div className="mx-auto max-w-7xl">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-dim">Next post</div>
            <Link href={`/writing/${next!.slug}`} className="mt-2 block font-display text-[clamp(28px,5vw,72px)] font-black leading-[1.05] tracking-tight">
              {next!.title} →
            </Link>
          </div>
        </nav>
      )}
    </article>
  );
}
