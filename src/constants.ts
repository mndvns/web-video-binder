import { setRate } from "./rate";
import { select } from "./utils";

// Get start time. It"s used to measure timeouts.
export const first = Date.now();

// `keyRepeatSpeed` is the number of ms between keydown events.
// When this value is lower, keydown events fire quicker.
export const KEY_REPEAT_SPEED = 50;

// `mediumSpeedChangePerc` is the percentage to change speeds.
export const mediumSpeedChangePerc = 10;
// `fineSpeedChangePerc` is the percentage to change fine speeds.
export const fineSpeedChangePerc = 0.025;

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
  "⌥⇧↑": () => setRate(select<HTMLVideoElement>("video"), mediumSpeedChangePerc),
  "⌥⇧↓": () => setRate(select<HTMLVideoElement>("video"), mediumSpeedChangePerc * -1),
  "⌥↑": () => setRate(select<HTMLVideoElement>("video"), fineSpeedChangePerc),
  "⌥↓": () => setRate(select<HTMLVideoElement>("video"), fineSpeedChangePerc * -1)
  // ^ ⌥ ⇧
  // ← ↑ → ↓
};
