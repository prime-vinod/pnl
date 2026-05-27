import Image from "next/image";
import { getAllWork } from "@/lib/mdx";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/components/ui/link";
import { Tag } from "@/components/ui/tag";
import { BrowserFrame } from "@/components/ui/browser-frame";

const FEATURED_LIMIT = 4;

export async function FeaturedWork() {
  const all = await getAllWork();
  const items = all.filter((w) => w.featured).slice(0, FEATURED_LIMIT);
  const total = String(items.length).padStart(2, "0");

  return (
    <section className="px-[5vw] py-[12vh]">
      <Reveal>
        <div className="mb-12 flex items-end justify-between border-b border-line pb-6">
          <h2 className="font-display text-[clamp(48px,8vw,120px)] font-black leading-none tracking-[-0.04em]">SELECTED.</h2>
          <Link href="/work" className="font-mono text-xs uppercase tracking-widest">All work →</Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        {items.map((w, i) => {
          const index = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={w.slug} className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24"} delay={i * 0.05}>
              <Link href={`/work/${w.slug}`} className="group block">
                <BrowserFrame url={w.url ?? `${w.slug}.app`} className="transition-transform duration-500 group-hover:-translate-y-1">
                  <Image
                    src={w.cover}
                    alt={w.title}
                    width={1600}
                    height={1000}
                    priority={i === 0}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </BrowserFrame>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
                  <span>
                    <span className="text-ink">{index}</span>
                    <span className="mx-2 opacity-50">/</span>
                    <span>{total}</span>
                    <span className="mx-2 opacity-50">·</span>
                    <span>{w.client} · {w.year}</span>
                  </span>
                  <span className="flex flex-wrap gap-2">{w.tags.map((t) => <Tag key={t}>{t}</Tag>)}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2 font-display text-3xl leading-tight tracking-tight md:text-4xl">
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{w.title}</span>
                  <span aria-hidden className="translate-x-[-4px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                </div>
                {w.excerpt ? (
                  <p className="mt-2 max-w-md text-sm text-ink-dim">{w.excerpt}</p>
                ) : null}
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
