import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KineticText } from "@/components/motion/kinetic-text";
import { IntroProvider } from "@/components/motion/intro/intro-provider";

describe("KineticText", () => {
  it("renders full text accessibly", () => {
    render(<KineticText text="FRONTEND DEVELOPER." />);
    expect(screen.getByText("FRONTEND DEVELOPER.")).toBeInTheDocument();
  });

  it("keeps the full text accessible while the intro gates animation", () => {
    // First-visit: provider reports ready=false, but the sr-only copy must remain.
    window.sessionStorage.clear();
    render(
      <IntroProvider>
        <KineticText text="FRONTEND DEVELOPER." />
      </IntroProvider>,
    );
    expect(screen.getAllByText("FRONTEND DEVELOPER.").length).toBeGreaterThan(0);
  });
});
