import NextLink, { type LinkProps } from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = LinkProps & { className?: string; children: ReactNode };

export function Link({ className, children, ...rest }: Props) {
  return (
    <NextLink
      {...rest}
      className={cn(
        "relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-200 hover:after:w-full",
        className
      )}
    >
      {children}
    </NextLink>
  );
}
