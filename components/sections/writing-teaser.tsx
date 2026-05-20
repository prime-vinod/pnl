import { getAllPosts } from "@/lib/mdx";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/components/ui/link";

export async function WritingTeaser() {
  const posts = (await getAllPosts()).slice(0, 3);
  return (
    <section className="px-[5vw] py-[12vh]">
      <Reveal>
        <div className="mb-8 flex items-end justify-between border-b border-line pb-6">
          <h2 className="font-display text-[clamp(36px,5vw,72px)] font-black leading-none tracking-tight">Writing.</h2>
          <Link href="/writing" className="font-mono text-xs uppercase tracking-widest">All →</Link>
        </div>
      </Reveal>
      <ul className="divide-y divide-line">
        {posts.map((p) => (
          <li key={p.slug} className="py-6">
            <Link href={`/writing/${p.slug}`} className="flex items-baseline justify-between gap-6">
              <span className="font-display text-2xl">{p.title}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">{p.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
