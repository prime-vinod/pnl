import { KineticText } from "@/components/motion/kinetic-text";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="relative px-[5vw] pt-[18vh] pb-[12vh]">
      <Reveal delay={0}>
        <div className="font-mono text-xs uppercase tracking-widest text-ink-dim">
          <span className="inline-block h-2 w-2 rounded-full bg-accent mr-2" />
          Software Developer · Ahmedabad, India
        </div>
      </Reveal>
      <KineticText
        text="SOFTWARE DEVELOPER."
        as="h1"
        className="mt-8 font-display font-black leading-[0.9] tracking-[-0.04em] text-[clamp(44px,12vw,200px)]"
        stagger={0.04}
      />
      <Reveal delay={0.8}>
        <p className="mt-10 max-w-xl font-body text-lg text-ink-dim">
          I build high-performance backend systems, AI-powered features, and full-stack applications — from scalable APIs and real-time queues to LLM integrations and agentic workflows.
        </p>
      </Reveal>
    </section>
  );
}
