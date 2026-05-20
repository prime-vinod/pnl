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
          I&apos;m Pinal Patel — a web designer and frontend developer with 4+ years building websites and mobile apps at PrimeApps Infotech.
        </p>
        <p className="mt-4 text-lg text-ink-dim">
          I care about responsive design, reusable components, and shipping things that load fast across every browser and device.
        </p>
        <Link href="/about" className="mt-8 inline-block font-mono text-xs uppercase tracking-widest">Read more →</Link>
      </Reveal>
    </section>
  );
}
