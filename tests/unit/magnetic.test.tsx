import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Magnetic } from "@/components/motion/magnetic";

describe("Magnetic", () => {
  it("renders children", () => {
    render(
      <Magnetic>
        <span>btn</span>
      </Magnetic>,
    );
    expect(screen.getByText("btn")).toBeInTheDocument();
  });
});
