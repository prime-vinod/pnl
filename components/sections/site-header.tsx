import { Link } from "@/components/ui/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileNav } from "@/components/sections/mobile-nav";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[5vw] py-5 backdrop-blur-sm">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
      <Link href="/" className="font-display text-base font-black tracking-tight sm:text-lg">VINOD SUTHAR</Link>
      <nav aria-label="Primary" className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest sm:gap-8">
        <div className="hidden items-center gap-4 sm:flex sm:gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
        <ThemeToggle />
        <MobileNav items={navItems} />
      </nav>
    </header>
  );
}
