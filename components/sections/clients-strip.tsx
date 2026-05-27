import { DraggableStrip } from "@/components/motion/draggable-strip";

const items = ["NestJS", "Node.js", "TypeScript", "MongoDB", "Redis", "RabbitMQ", "Next.js", "React", "MCP Server", "LLM / RAG", "BullMQ", "Payload CMS", "Stripe", "AWS SES", "Merge API"];

export function ClientsStrip() {
  return (
    <section className="border-y border-line py-8">
      <DraggableStrip items={items} />
    </section>
  );
}
