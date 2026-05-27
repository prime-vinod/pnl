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
      <div className="mx-auto grid max-w-7xl gap-12 px-[5vw] py-16 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Client</div>
              <div className="mt-1 font-display text-base">{work.client}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Year</div>
              <div className="mt-1 font-display text-base">{work.year}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Role</div>
              <div className="mt-1 font-display text-base">{work.role}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">Tags</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {work.tags.map((t) => (
                  <span key={t} className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>
        <div className="prose lg:col-span-8 lg:col-start-5 lg:-mt-2">
          <MDX source={work.body} />
        </div>
      </div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: work.title,
        creator: "Vinod Suthar",
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
