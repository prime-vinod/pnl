import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Preloader } from "@/components/motion/intro/preloader";

describe("Preloader", () => {
  it("renders an accessible, decorative overlay containing the name", () => {
    render(<Preloader onReveal={vi.fn()} onDone={vi.fn()} />);
    const overlay = screen.getByTestId("intro-preloader");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay.textContent).toContain("VINOD SUTHAR");
  });
});
