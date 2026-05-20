import Image from "next/image";
import { getAllWork } from "@/lib/mdx";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/components/ui/link";
import { Tag } from "@/components/ui/tag";

export async function FeaturedWork() {
  const all = await getAllWork();
  const items = all.filter((w) => w.featured).slice(0, 4);
  return (
    <section className="px-[5vw] py-[12vh]">
      <Reveal>
        <div className="mb-12 flex items-end justify-between border-b border-line pb-6">
          <h2 className="font-display text-[clamp(48px,8vw,120px)] font-black leading-none tracking-[-0.04em]">SELECTED.</h2>
          <Link href="/work" className="font-mono text-xs uppercase tracking-widest">All work →</Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        {items.map((w, i) => (
          <Reveal key={w.slug} className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24"} delay={i * 0.05}>
            <Link href={`/work/${w.slug}`} className="group block">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={w.cover}
                  alt={w.title}
                  width={1600}
                  height={1000}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
                <span>{w.client} · {w.year}</span>
                <span className="flex flex-wrap gap-2">{w.tags.map((t) => <Tag key={t}>{t}</Tag>)}</span>
              </div>
              <div className="mt-2 font-display text-2xl">{w.title}</div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
