import { describe, it, expect } from "vitest";
import { shouldPlayIntro } from "@/components/motion/intro/should-play-intro";

describe("shouldPlayIntro", () => {
  it("plays on a first visit when motion is allowed", () => {
    expect(shouldPlayIntro({ hasSeen: false, reducedMotion: false })).toBe(true);
  });
  it("does not play once seen this session", () => {
    expect(shouldPlayIntro({ hasSeen: true, reducedMotion: false })).toBe(false);
  });
  it("does not play under reduced motion", () => {
    expect(shouldPlayIntro({ hasSeen: false, reducedMotion: true })).toBe(false);
  });
});
