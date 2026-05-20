"use client";
import { useMemo, useState } from "react";
import type { Work } from "@/lib/mdx";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/components/ui/link";

const TAGS = ["all", "web", "mobile", "ui"] as const;

export function WorkIndex({ items }: { items: Work[] }) {
  const [filter, setFilter] = useState<(typeof TAGS)[number]>("all");
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.tags.includes(filter))),
    [filter, items]
  );
  return (
    <section className="px-[5vw] pt-[18vh] pb-[12vh]">
      <h1 className="font-display text-[clamp(48px,9vw,140px)] font-black leading-[0.9] tracking-[-0.04em]">
        SELECTED WORK
        <span className="block text-ink-dim">/ 2022—2026</span>
      </h1>
      <div className="my-12 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button key={t} type="button" onClick={() => setFilter(t)} className="cursor-pointer">
            <Tag active={t === filter}>{t}</Tag>
          </button>
        ))}
      </div>
      <ul className="divide-y divide-line">
        {filtered.map((w) => (
          <li key={w.slug}>
            <Link href={`/work/${w.slug}`} className="group block py-6 md:grid md:grid-cols-12 md:items-center md:gap-4">
              <span className="hidden font-mono text-xs uppercase tracking-widest text-ink-dim md:col-span-2 md:block">{w.year}</span>
              <span className="block font-display text-2xl md:col-span-4">{w.title}</span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-widest text-ink-dim md:col-span-3 md:mt-0">
                <span className="md:hidden">{w.year} · </span>{w.client}
              </span>
              <span className="mt-3 flex flex-wrap gap-1 md:col-span-2 md:mt-0">{w.tags.map((t) => <Tag key={t}>{t}</Tag>)}</span>
              <span className="hidden text-right transition-transform group-hover:translate-x-1 md:col-span-1 md:block">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
