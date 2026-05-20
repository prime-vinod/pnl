import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";

// Drive useIntro so a future regression that makes Template branch its element
// type on `active` (true -> false) would remount children and fail this guard.
const intro = vi.hoisted(() => ({ value: { ready: true, active: false } }));
vi.mock("@/components/motion/intro/intro-provider", () => ({
  useIntro: () => intro.value,
}));

import Template from "@/app/template";

describe("Template", () => {
  beforeEach(() => {
    intro.value = { ready: true, active: false };
  });

  it("does not remount its children across the intro lifecycle (no replayed entrance)", () => {
    // Simulate the intro running...
    intro.value = { ready: false, active: true };
    const { rerender, getByTestId } = render(
      <Template>
        <span data-testid="child">x</span>
      </Template>,
    );
    const first = getByTestId("child");

    // ...then finishing (active flips back to false). The wrapper must keep the
    // same element type so children are not remounted and the entrance is not
    // replayed.
    intro.value = { ready: true, active: false };
    rerender(
      <Template>
        <span data-testid="child">x</span>
      </Template>,
    );

    expect(getByTestId("child")).toBe(first); // same DOM node => no remount
  });

  it("renders its children", () => {
    const { getByTestId } = render(
      <Template>
        <span data-testid="child">x</span>
      </Template>,
    );
    expect(getByTestId("child")).toBeInTheDocument();
  });
});
