export function SiteFooter() {
  return (
    <footer className="border-t border-line px-[5vw] py-12 font-mono text-xs uppercase tracking-widest text-ink-dim">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Vinod Suthar</span>
        <span>Built with Next.js · Hosted on Vercel</span>
      </div>
    </footer>
  );
}
