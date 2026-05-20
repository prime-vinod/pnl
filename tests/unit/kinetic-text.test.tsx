import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KineticText } from "@/components/motion/kinetic-text";

describe("KineticText", () => {
  it("renders full text accessibly", () => {
    render(<KineticText text="FRONTEND DEVELOPER." />);
    expect(screen.getByText("FRONTEND DEVELOPER.")).toBeInTheDocument();
  });
});
