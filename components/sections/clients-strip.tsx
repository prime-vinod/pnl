import { Marquee } from "@/components/motion/marquee";

const items = ["NestJS", "Node.js", "TypeScript", "MongoDB", "Redis", "RabbitMQ", "Next.js", "React", "MCP Server", "LLM / RAG", "BullMQ", "Payload CMS", "Stripe", "AWS SES", "Merge API"];

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
