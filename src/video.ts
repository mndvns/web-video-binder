import { first } from "./constants";
import debug from "./debug";
import { rate } from "./rate";
import { select } from "./utils";

/**
 * Set rates for video elements on screen.
 * - timeout: when to give up checking for videos. If 0, it never stop checking.
 * - freq: the ms gap between checks.
 */
const timeout = 0;
const freq = 500;

export function videoRatesInitialUpdate() {
  const videos = select<HTMLVideoElement>("video");
  if (videos.length) return updateVideosRates(videos, rate);
  if (timeout === 0) return setTimeout(videoRatesInitialUpdate, freq);
  if (timeout < Date.now() - first) setTimeout(videoRatesInitialUpdate, freq);
}

/**
 * Update rates of all videos.
 */
export function updateVideosRates(videos: HTMLVideoElement[], rate: number) {
  debug("updateVideoRates", videos);
  videos.forEach((video) => {
    video.playbackRate = rate;
  });
}
