export type IntroConditions = { hasSeen: boolean; reducedMotion: boolean };

/** Pure decision: the intro plays only on a first session visit with motion allowed. */
export function shouldPlayIntro({ hasSeen, reducedMotion }: IntroConditions): boolean {
  return !hasSeen && !reducedMotion;
}
