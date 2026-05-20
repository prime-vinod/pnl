import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/motion/reveal";

describe("Reveal", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <span>hello</span>
      </Reveal>,
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
