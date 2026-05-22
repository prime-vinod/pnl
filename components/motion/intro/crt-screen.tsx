"use client";
import { motion } from "framer-motion";

// Static fractal-noise grain, inline so there's no extra request.
const GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Faint source code that scrolls behind everything — pure "engineer at work".
const CODE = `@Injectable()
export class DeployService {
  constructor(
    private readonly redis: RedisService,
    private readonly queue: Queue<BuildJob>,
  ) {}

  async deploy(app: Portfolio): Promise<Result> {
    const span = tracer.start('deploy');
    await this.queue.add('build', { app }, { attempts: 3 });
    const ok = await this.redis.lock(app.id, 30_000);
    if (!ok) throw new ConflictException('locked');
    return { status: 'ok', region: 'bom1' };
  }
}

// agentic worker · mcp · rag pipeline
for await (const evt of stream(model, tools)) {
  if (evt.type === 'tool_call') await dispatch(evt);
}`;

// Repeat to over-fill the viewport, then render twice so a -50% scroll loops seamlessly.
const CODE_UNIT = (CODE + "\n\n").repeat(3);

/**
 * CRT-monitor backdrop for the intro: fixed scanlines + film grain + a slow
 * phosphor sweep + edge vignette. All GPU-cheap (no per-frame JS); the sweep
 * pauses when `running` is false so it stops during the dismiss wipe.
 */
export function CrtScreen({ running }: { running: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Faint scrolling source code, the deepest layer */}
      <div className="absolute inset-0 overflow-hidden">
        <pre
          className="intro-code-scroll absolute left-[4vw] top-0 m-0 whitespace-pre font-mono text-[11px] leading-[1.6]"
          style={{ color: "rgba(200, 255, 0, 0.10)" }}
        >
          {CODE_UNIT}
          {CODE_UNIT}
        </pre>
      </div>

      {/* Horizontal scanlines: a 1px dark line every 3px */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />

      {/* Slow phosphor sweep travelling down the screen */}
      {running && (
        <motion.div
          className="absolute inset-x-0 h-[22vh]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(200,255,0,0.05) 45%, rgba(200,255,0,0.07) 50%, transparent)",
          }}
          initial={{ y: "-25vh" }}
          animate={{ y: "125vh" }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        />
      )}

      {/* Edge vignette to round off the "tube" */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
