import { Link } from "@/components/ui/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-start justify-center px-[5vw]">
      <div className="font-mono text-xs uppercase tracking-widest text-ink-dim">404</div>
      <h1 className="mt-2 font-display text-[clamp(56px,14vw,220px)] font-black leading-[0.9] tracking-[-0.04em]">
        NOT<br />FOUND.
      </h1>
      <Link href="/" className="mt-8 font-mono text-xs uppercase tracking-widest">← Back home</Link>
    </section>
  );
}
