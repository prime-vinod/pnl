import Image from "next/image";

export function Figure({
  src,
  caption,
  fullbleed = false,
  width = 1600,
  height = 900,
}: {
  src: string;
  caption?: string;
  fullbleed?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <figure className={fullbleed ? "my-16 -mx-[5vw]" : "my-12"}>
      <Image
        src={src}
        alt={caption ?? ""}
        width={width}
        height={height}
        className="w-full h-auto rounded-lg"
      />
      {caption && (
        <figcaption className="mt-3 font-mono text-xs text-ink-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
