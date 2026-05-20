"use client";
import { Link } from "@/components/ui/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-screen flex-col items-start justify-center px-[5vw]">
      <div className="font-mono text-xs uppercase tracking-widest text-ink-dim">500</div>
      <h1 className="mt-2 font-display text-[clamp(44px,13vw,220px)] font-black leading-[0.9] tracking-[-0.04em]">
        SOMETHING<br />BROKE.
      </h1>
      <button onClick={reset} className="mt-8 font-mono text-xs uppercase tracking-widest underline">Try again</button>
      <Link href="/" className="mt-3 font-mono text-xs uppercase tracking-widest">← Back home</Link>
    </section>
  );
}
