import { notFound } from "next/navigation";
import { getAllWork, getWork } from "@/lib/mdx";
import { MDX } from "@/components/mdx/render";
import { CaseStudyHeader } from "@/components/sections/case-study-header";
import { bumpView } from "@/lib/views";
import { Link } from "@/components/ui/link";
import { JsonLd } from "@/components/ui/json-ld";

export async function generateStaticParams() {
  const all = await getAllWork();
  return all.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = await getWork(slug);
  if (!w) return {};
  return { title: w.title, description: `${w.client} · ${w.year} · ${w.role}` };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return notFound();
  const views = await bumpView("work", work.slug);
  const all = await getAllWork();
  const idx = all.findIndex((w) => w.slug === work.slug);
  const next = all[(idx + 1) % all.length];
  return (
    <article>
      <CaseStudyHeader work={work} views={views} />
      <div className="prose mx-auto max-w-3xl px-[5vw] py-16 text-lg leading-relaxed">
        <MDX source={work.body} />
      </div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: work.title,
        creator: "Pinal Patel",
        datePublished: `${work.year}-01-01`,
      }} />
      <nav aria-label="Next project" className="border-t border-line px-[5vw] py-16">
        <div className="font-mono text-xs uppercase tracking-widest text-ink-dim">Next project</div>
        <Link href={`/work/${next!.slug}`} className="mt-2 block font-display text-[clamp(36px,6vw,96px)] font-black leading-none tracking-tight">
          {next!.title} →
        </Link>
      </nav>
    </article>
  );
}
