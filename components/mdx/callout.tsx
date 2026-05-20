import type { ReactNode } from "react";

export function Callout({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-accent pl-6 font-display text-2xl leading-snug">
      {children}
    </blockquote>
  );
}
