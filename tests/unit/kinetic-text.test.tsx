import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KineticText } from "@/components/motion/kinetic-text";
import { IntroProvider } from "@/components/motion/intro/intro-provider";

describe("KineticText", () => {
  it("renders full text accessibly", () => {
    render(<KineticText text="SOFTWARE ENGINEER." />);
    expect(screen.getByText("SOFTWARE ENGINEER.")).toBeInTheDocument();
  });

  it("keeps the full text accessible while the intro gates animation", () => {
    // First-visit: provider reports ready=false, but the sr-only copy must remain.
    window.sessionStorage.clear();
    render(
      <IntroProvider>
        <KineticText text="SOFTWARE ENGINEER." />
      </IntroProvider>,
    );
    expect(screen.getAllByText("SOFTWARE ENGINEER.").length).toBeGreaterThan(0);
  });
});
