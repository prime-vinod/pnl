import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/components/ui/link";

export function AboutTeaser() {
  return (
    <section className="grid grid-cols-1 gap-12 px-[5vw] py-[12vh] md:grid-cols-12">
      <Reveal className="md:col-span-5">
        <div className="aspect-square w-full bg-surface" />
      </Reveal>
      <Reveal className="md:col-span-7 md:pt-8" delay={0.1}>
        <h2 className="font-display text-[clamp(36px,5vw,72px)] font-black leading-none tracking-tight">About.</h2>
        <p className="mt-6 text-lg text-ink-dim">
          I&apos;m Vinod Suthar — a software developer with 3+ years building scalable backend systems, AI-powered platforms, and full-stack products at PrimeApps Infotech, Ahmedabad.
        </p>
        <p className="mt-4 text-lg text-ink-dim">
          I&apos;ve shipped production systems ranging from CRM email clients and BullMQ queue infrastructure to LLM certificate verification, RAG pipelines, MCP servers, ATS job scrapers, and no-code website builders — all at enterprise scale.
        </p>
        <Link href="/about" className="mt-8 inline-block font-mono text-xs uppercase tracking-widest">Read more →</Link>
      </Reveal>
    </section>
  );
}
