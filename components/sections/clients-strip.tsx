import { Marquee } from "@/components/motion/marquee";

const items = ["React.js", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "Material UI", "Node.js", "Figma"];

export function ClientsStrip() {
  return (
    <section className="border-y border-line py-8">
      <Marquee duration={40}>
        {items.map((n) => (
          <span key={n} className="font-display text-4xl font-black tracking-tight">{n}</span>
        ))}
      </Marquee>
    </section>
  );
}
