import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntroProvider, useIntro } from "@/components/motion/intro/intro-provider";

function Probe() {
  const { ready, active } = useIntro();
  return <div data-testid="probe">{`${ready}-${active}`}</div>;
}

describe("IntroProvider", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    document.documentElement.style.overflow = "";
  });

  it("skips the intro when already seen this session", () => {
    window.sessionStorage.setItem("intro-seen", "1");
    render(
      <IntroProvider>
        <Probe />
      </IntroProvider>,
    );
    expect(screen.getByTestId("probe").textContent).toBe("true-false");
    expect(screen.queryByTestId("intro-preloader")).toBeNull();
  });

  it("plays the intro on a first visit and locks scroll", () => {
    render(
      <IntroProvider>
        <Probe />
      </IntroProvider>,
    );
    expect(screen.getByTestId("intro-preloader")).toBeInTheDocument();
    expect(screen.getByTestId("probe").textContent).toBe("false-true");
    expect(document.documentElement.style.overflow).toBe("hidden");
  });
});
