import { cn } from "@/lib/cn";

export function Tag({ children, active = false, className }: { children: React.ReactNode; active?: boolean; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center border-[1.5px] border-ink px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest",
      active && "bg-ink text-bg",
      className
    )}>
      {children}
    </span>
  );
}
