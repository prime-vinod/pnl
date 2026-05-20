"use client";

import Image from "next/image";
import { useState } from "react";

export function Compare({
  before,
  after,
  alt = "",
}: {
  before: string;
  after: string;
  alt?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative my-12 aspect-video overflow-hidden rounded-lg">
      <Image src={after} alt={alt} fill className="object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before} alt={alt} fill className="object-cover" />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Reveal slider"
        className="absolute inset-x-0 bottom-4 mx-auto w-2/3 accent-accent"
      />
    </div>
  );
}
