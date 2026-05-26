import { Link } from "@/components/ui/link";

export function ContactCTA() {
  return (
    <section className="border-t border-line px-[5vw] py-[18vh]">
      <Link href="/about#contact" className="block font-display text-[clamp(48px,13vw,220px)] font-black leading-[0.9] tracking-[-0.04em]">
        LET&apos;S BUILD →
      </Link>
      <div className="mt-12 flex flex-wrap items-center gap-8 font-mono text-xs uppercase tracking-widest text-ink-dim">
        <a href="mailto:vinodkumar850386@gmail.com">vinodkumar850386@gmail.com</a>
        <a href="tel:+918503864833">+91 85038 64833</a>
        <span>Ahmedabad, India</span>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-8 font-mono text-xs uppercase tracking-widest text-ink-dim">
        <a href="https://github.com/vivenn" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/vinod-suthar-04b4262b0" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.youtube.com/@vivenxfilm" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://www.instagram.com/vivenxfilm.io/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </section>
  );
}
