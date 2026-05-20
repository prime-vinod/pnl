"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { JSX } from "react";

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  stagger?: number;
  className?: string;
};

export function KineticText({ text, as = "h1", stagger = 0.04, className }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as as "h1"];
  if (reduced) return <Tag className={className}>{text}</Tag>;
  const words = text.split(" ");
  let charIndex = 0;
  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          const node = (
            <span key={wi} className="inline-block whitespace-nowrap">
              {Array.from(word).map((c) => {
                const i = charIndex++;
                return (
                  <motion.span
                    key={i}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {c}
                  </motion.span>
                );
              })}
            </span>
          );
          charIndex++; // account for the space separating words
          return wi < words.length - 1 ? [node, " "] : node;
        })}
      </span>
    </Tag>
  );
}
