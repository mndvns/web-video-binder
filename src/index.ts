import * as Debug from "debug";

const debug = Debug("sv");

const el = document.createElement("div");
el.className = "sv-modal";
const style = document.createElement("style");
attempt(() => document.head.appendChild(style));
style.innerHTML = `
.sv-modal {
  background: white;
  border-radius: 2px;
  border: 1px solid black;
  bottom: 1rem;
  color: black;
  height: 200px;
  position: fixed;
  right: 1rem;
  width: 200px;
  z-index: 10000;
}`;

debug("el", el);

// Get locally stored video playrate.
let rate = getRate();

// Get start time. It"s used to measure timeouts.
const first = Date.now();

// `keyRepeatSpeed` is the number of ms between keydown events.
// When this value is lower, keydown events fire quicker.
const keyRepeatSpeed = 75;

// `mediumSpeedChangePerc` is the percentage to change speeds.
const mediumSpeedChangePerc = 10;
// `fineSpeedChangePerc` is the percentage to change fine speeds.
const fineSpeedChangePerc = 0.025;

// prettier-ignore
const CHARS = {
  KeyA: "A", KeyB: "B", KeyC: "C", KeyD: "D", KeyE: "E", KeyF: "F", KeyG: "G",
  KeyH: "H", KeyI: "I", KeyJ: "J", KeyK: "K", KeyL: "L", KeyM: "M", KeyN: "N",
  KeyO: "O", KeyP: "P", KeyQ: "Q", KeyR: "R", KeyS: "S", KeyT: "T", KeyU: "U",
  KeyV: "V", KeyW: "W", KeyX: "X", KeyY: "Y", KeyZ: "Z",
  Digit0: "0", Digit1: "1", Digit2: "2", Digit3: "3", Digit4: "4",
  Digit5: "5", Digit6: "6", Digit7: "7", Digit8: "8", Digit9: "9",
  ArrowLeft: "←", ArrowUp: "↑", ArrowRight: "→", ArrowDown: "↓",
};

const KEYID_BOUND_FNS: Record<string, () => void> = {
  "⌥⇧↑": () => setRate(select<HTMLVideoElement>("video"), mediumSpeedChangePerc),
  "⌥⇧↓": () => setRate(select<HTMLVideoElement>("video"), mediumSpeedChangePerc * -1),
  "⌥↑": () => setRate(select<HTMLVideoElement>("video"), fineSpeedChangePerc),
  "⌥↓": () => setRate(select<HTMLVideoElement>("video"), fineSpeedChangePerc * -1)
  // ^ ⌥ ⇧
  // ← ↑ → ↓
};

// Set rates for video elements on screen.
// - timeout: when to give up checking for videos. If 0, it never stop checking.
// - freq: the ms gap between checks.
const timeout = 0;
const freq = 500;

(function setVideoRates() {
  const videos = select<HTMLVideoElement>("video");
  if (videos.length) return updateVideosRates(videos);
  if (timeout === 0) return setTimeout(setVideoRates, freq);
  if (timeout < Date.now() - first) setTimeout(setVideoRates, freq);
})();

document.addEventListener("keydown", onKeydown);

const debug_onKeydown = debug.extend("onKeydown");
function onKeydown(e: KeyboardEvent) {
  const char = CHARS[e.code];
  debug_onKeydown("char", char);

  // If no char bound, bail.
  if (!char) return clearBindingLastPressed();

  let keyId = "";
  if (e.metaKey) keyId += "⌘";
  if (e.ctrlKey) keyId += "^";
  if (e.altKey) keyId += "⌥";
  if (e.shiftKey) keyId += "⇧";
  keyId += char;
  debug_onKeydown("keyId", keyId);

  const boundFn = KEYID_BOUND_FNS[keyId];
  // If nothing bound, bail.
  if (!boundFn) return clearBindingLastPressed();
  debug_onKeydown("boundFn", boundFn);

  // If we made it this far, keep event from bubbling.
  e.preventDefault();

  // If we"re still within the window of keyrepeat debounce wait, bail.
  if (keyId === bindingLastPressedKeyId && Date.now() + keyRepeatSpeed > bindingLastPressedAt) return;

  // Trigger bound function.
  boundFn();

  // Display the rate inside the modal
  el.innerHTML = `
  <div class="sv-modal">
    <h1>${rate}</h1>
  </div>
  `;
}

// Retrieve stored rate.
function getRate() {
  return parseFloat((localStorage.getItem("playbackRate") || "1").toString()) || 1;
}

// Set rate to absolute number.
function updateRate(newRate: number) {
  rate = newRate;
  if (rate % 1) rate = Math.round(rate * 1000) / 1000;
  debug("updateRate", rate);
  localStorage.setItem("playbackRate", rate.toString());
}

// Make a relative change to the rate.
function setRate(videos: HTMLVideoElement[], change: number) {
  // If rate is a float, keep rate decimal rounded.
  updateRate(rate + change);
  updateVideosRates(videos);
}

function updateVideosRates(videos: HTMLVideoElement[]) {
  debug("updateVideoRates", videos);
  videos.forEach((video) => {
    video.playbackRate = rate;
  });
}

let bindingLastPressedAt: number;
let bindingLastPressedKeyId: string;
function clearBindingLastPressed() {
  bindingLastPressedAt = 0;
  bindingLastPressedKeyId = "";
}

/**
 * Repeatedly attempt to call `fn`.
 * @param fn - Function to call on each attempt.
 * @param timeout - ms from initial attempt that, once exceeded, triggers bail. 0 continues forever.
 * @param every - ms to wait between attempts.
 */
function attempt(fn: () => void, timeout = 1000, every = 100) {
  const start = Date.now();
  (function loop() {
    try {
      fn();
    } catch (error) {
      if (timeout && start + timeout < Date.now()) throw error;
      setTimeout(loop, every);
    }
  })();
}

// Selects all elements with selector.
function select<T extends Element>(selector: string) {
  return Array.from(document.querySelectorAll(selector)) as T[];
}
