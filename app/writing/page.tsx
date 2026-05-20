import { getAllPosts } from "@/lib/mdx";
import { Link } from "@/components/ui/link";

export const metadata = { title: "Writing" };

export default async function WritingPage() {
  const posts = await getAllPosts();
  return (
    <section className="px-[5vw] pt-[18vh] pb-[12vh]">
      <h1 className="font-display text-[clamp(48px,9vw,140px)] font-black leading-[0.9] tracking-[-0.04em]">Writing.</h1>
      <ul className="mt-16 divide-y divide-line">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/writing/${p.slug}`} className="block py-6 md:grid md:grid-cols-12 md:items-baseline md:gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-dim md:col-span-2">{p.date}</span>
              <span className="mt-1 block font-display text-2xl md:col-span-8 md:mt-0">{p.title}</span>
              <span className="hidden text-right text-ink-dim md:col-span-2 md:block">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
