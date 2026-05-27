import { getAllPosts } from "@/lib/mdx";
import { Link } from "@/components/ui/link";

export const metadata = { title: "Writing" };

export default async function WritingPage() {
  const posts = await getAllPosts();
  const total = String(posts.length).padStart(2, "0");

  return (
    <section className="mx-auto max-w-7xl px-[5vw] pt-[18vh] pb-[12vh]">
      <h1 className="font-display text-[clamp(48px,9vw,140px)] font-black leading-[0.9] tracking-[-0.04em]">
        WRITING.
        <span className="block text-ink-dim">/ notes &amp; essays</span>
      </h1>

      <ul className="mt-16 divide-y divide-line border-t border-line">
        {posts.map((p, i) => {
          const idx = String(i + 1).padStart(2, "0");
          return (
            <li key={p.slug}>
              <Link href={`/writing/${p.slug}`} className="group block py-8 md:grid md:grid-cols-12 md:items-baseline md:gap-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim md:col-span-2">
                  <span className="text-ink">{idx}</span>
                  <span className="mx-2 opacity-40">/</span>
                  <span>{total}</span>
                </div>
                <div className="mt-2 md:col-span-7 md:mt-0">
                  <div className="font-display text-2xl leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {p.title}
                  </div>
                  {p.description ? (
                    <p className="mt-2 max-w-lg text-sm text-ink-dim">{p.description}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-dim">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink-dim md:col-span-2 md:mt-0 md:text-right">
                  {p.date}
                </div>
                <div className="hidden text-right text-ink-dim transition-transform duration-300 group-hover:translate-x-1 md:col-span-1 md:block">
                  →
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
