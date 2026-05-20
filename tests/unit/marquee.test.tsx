import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Marquee } from "@/components/motion/marquee";

describe("Marquee", () => {
  it("renders children", () => {
    render(
      <Marquee>
        <span>brand</span>
      </Marquee>,
    );
    expect(screen.getAllByText("brand").length).toBeGreaterThan(0);
  });
});
