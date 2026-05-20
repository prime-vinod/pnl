import { Link } from "@/components/ui/link";

export function ContactCTA() {
  return (
    <section className="border-t border-line px-[5vw] py-[18vh]">
      <Link href="/about#contact" className="block font-display text-[clamp(48px,13vw,220px)] font-black leading-[0.9] tracking-[-0.04em]">
        LET&apos;S BUILD →
      </Link>
      <div className="mt-12 flex flex-wrap items-center gap-8 font-mono text-xs uppercase tracking-widest text-ink-dim">
        <a href="mailto:pinalhpatel306@gmail.com">pinalhpatel306@gmail.com</a>
        <a href="tel:+919664540659">+91 96645 40659</a>
        <span>Ahmedabad, India</span>
      </div>
    </section>
  );
}
