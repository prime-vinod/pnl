import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/magnetic";
import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & { variant?: "solid" | "outline" };

export function Button({ className, variant = "solid", children, ...rest }: Props) {
  return (
    <Magnetic className="inline-block">
      <button
        {...rest}
        className={cn(
          "group inline-flex items-center gap-2 rounded-lg px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors",
          variant === "solid" && "bg-ink text-bg hover:bg-accent hover:text-bg",
          variant === "outline" && "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-bg",
          className
        )}
      >
        {children}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </Magnetic>
  );
}
