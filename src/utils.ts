/**
 * Repeatedly attempt to call `fn`.
 * @param fn - Function to call on each attempt.
 * @param timeout - ms from initial attempt that, once exceeded, triggers bail. 0 continues forever.
 * @param every - ms to wait between attempts.
 */
export function attempt(fn: () => void, timeout = 1000, every = 100) {
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

/**
 * Selects all elements with selector.
 */
export function select<T extends Element>(selector: string) {
  return Array.from(document.querySelectorAll(selector)) as T[];
}
