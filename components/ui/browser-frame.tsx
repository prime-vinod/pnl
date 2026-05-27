import type { ReactNode } from "react";

type Props = { url?: string; children: ReactNode; className?: string };

export function BrowserFrame({ url, children, className }: Props) {
  return (
    <div className={`overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ${className ?? ""}`}>
      <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 flex-1 truncate text-center font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          {url ?? "preview"}
        </span>
        <span className="size-2.5" aria-hidden />
      </div>
      <div>{children}</div>
    </div>
  );
}
