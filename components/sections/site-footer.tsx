export function SiteFooter() {
  return (
    <footer className="border-t border-line px-[5vw] py-12 font-mono text-xs uppercase tracking-widest text-ink-dim">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Vinod Suthar</span>
        <div className="flex flex-wrap items-center gap-6">
          <a href="https://github.com/vivenn" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/vinod-suthar-04b4262b0" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.youtube.com/@vivenxfilm" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.instagram.com/vivenxfilm.io/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <span>Built with Next.js · Hosted on Vercel</span>
      </div>
    </footer>
  );
}
