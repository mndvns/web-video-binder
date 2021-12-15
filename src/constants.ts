import { setRate } from "./rate";
import { select } from "./utils";

// Get start time. Useful for timeouts.
export const START_TIME = Date.now();

// The number of ms between keydown events.
// When this value is lower, keydown events fire quicker.
export const KEY_REPEAT_SPEED = 50;

export const SPEED_CHANGE = 1/3; // .67 sec
export const SPEED_CHANGE_FINE = 1/10; // .1 sec
export const SPEED_CHANGE_TINY = 1/40; // .025 sec

export const VERY_SHORT_JUMP = 3000; // 3 sec
export const SHORT_JUMP = 10000; // 10 sec
export const MEDIUM_JUMP = 60000; // 1 min
export const LONG_JUMP = 300000; // 5 mins

// TODO This feels like a kinda dumb way of doing things
// prettier-ignore
export const CHARS = {
  KeyA: "A", KeyB: "B", KeyC: "C", KeyD: "D", KeyE: "E", KeyF: "F", KeyG: "G",
  KeyH: "H", KeyI: "I", KeyJ: "J", KeyK: "K", KeyL: "L", KeyM: "M", KeyN: "N",
  KeyO: "O", KeyP: "P", KeyQ: "Q", KeyR: "R", KeyS: "S", KeyT: "T", KeyU: "U",
  KeyV: "V", KeyW: "W", KeyX: "X", KeyY: "Y", KeyZ: "Z",
  Digit0: "0", Digit1: "1", Digit2: "2", Digit3: "3", Digit4: "4",
  Digit5: "5", Digit6: "6", Digit7: "7", Digit8: "8", Digit9: "9",
  ArrowLeft: "←", ArrowUp: "↑", ArrowRight: "→", ArrowDown: "↓",
};

export const KEYID_BOUND_FNS: Record<string, () => void> = {
  "⌥↑": () => setRate(select<HTMLVideoElement>("video"), SPEED_CHANGE_TINY),
  "⌥↓": () => setRate(select<HTMLVideoElement>("video"), SPEED_CHANGE_TINY * -1),
  "⌥⇧↑": () => setRate(select<HTMLVideoElement>("video"), SPEED_CHANGE_FINE),
  "⌥⇧↓": () => setRate(select<HTMLVideoElement>("video"), SPEED_CHANGE_FINE * -1),
  "⌘⌥⇧↑": () => setRate(select<HTMLVideoElement>("video"), SPEED_CHANGE),
  "⌘⌥⇧↓": () => setRate(select<HTMLVideoElement>("video"), SPEED_CHANGE * -1),

  // "→": () => setTime(select<HTMLVideoElement>("video"), veryShortJump),
  // "←": () => setTime(select<HTMLVideoElement>("video"), veryShortJump * -1),
  // "⌥→": () => setTime(select<HTMLVideoElement>("video"), shortJump),
  // "⌥←": () => setTime(select<HTMLVideoElement>("video"), shortJump * -1),
  // "⌘⌥→": () => setTime(select<HTMLVideoElement>("video"), mediumJump),
  // "⌘⌥←": () => setTime(select<HTMLVideoElement>("video"), mediumJump * -1),
  // "⌘⇧⌥→": () => setTime(select<HTMLVideoElement>("video"), longJump),
  // "⌘⇧⌥←": () => setTime(select<HTMLVideoElement>("video"), longJump * -1),

  // ⌘ ⇧ ⌥ ^
  // ← ↑ → ↓
};
