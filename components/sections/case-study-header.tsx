import Image from "next/image";
import type { Work } from "@/lib/mdx";
import { BrowserFrame } from "@/components/ui/browser-frame";

export function CaseStudyHeader({ work, views }: { work: Work; views: number }) {
  return (
    <header className="mx-auto max-w-7xl px-[5vw] pt-[18vh]">
      <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest text-ink-dim">
        <span>{work.client}</span>
        <span>{work.year}</span>
        <span>{work.role}</span>
        {views > 0 && <span>{views.toLocaleString()} views</span>}
      </div>
      <h1 className="mt-4 font-display text-[clamp(48px,9vw,140px)] font-black leading-[0.9] tracking-[-0.04em]">
        {work.title}
      </h1>
      <BrowserFrame url={work.url ?? `${work.slug}.app`} className="mt-12">
        <Image
          src={work.cover}
          alt={work.title}
          width={1920}
          height={1080}
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
    </header>
  );
}
