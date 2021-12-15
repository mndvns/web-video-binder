import { CHARS, KEY_REPEAT_SPEED, KEYID_BOUND_FNS } from "./constants";
import debug from "./debug";

export function onKeydownListen() {
  document.addEventListener("keydown", onKeydown);
}

function onKeydown(e: KeyboardEvent) {
  const char = CHARS[e.code];

  // If no char bound, bail.
  if (!char) return clearBindingLastPressed();

  let keyId = "";
  if (e.metaKey) keyId += "⌘";
  if (e.ctrlKey) keyId += "^";
  if (e.altKey) keyId += "⌥";
  if (e.shiftKey) keyId += "⇧";
  keyId += char;

  const boundFn = KEYID_BOUND_FNS[keyId];
  // If nothing bound, bail.
  if (!boundFn) return clearBindingLastPressed();

  // If we made it this far, keep event from bubbling.
  e.preventDefault();

  debug("onKeydown", keyId, boundFn);

  // If we"re still within the window of keyrepeat debounce wait, bail.
  if (keyId === bindingLastPressedKeyId && Date.now() + KEY_REPEAT_SPEED > bindingLastPressedAt) return;

  // Trigger bound function.
  boundFn();
}

let bindingLastPressedAt: number;
let bindingLastPressedKeyId: string;
function clearBindingLastPressed() {
  bindingLastPressedAt = 0;
  bindingLastPressedKeyId = "";
}
