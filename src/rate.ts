import { setModal } from "./modal";
import { updateVideosRates } from "./video";

/**
 * Retrieve stored video play rate.
 */
export let rate = parseFloat((localStorage.getItem("playbackRate") || "1").toString()) || 1;

/**
 * Set the rate value
 */
export function setRate(videos: HTMLVideoElement[], change: number) {
  rate = rate + change;
  // If rate is a float, keep rate decimal rounded.
  if (rate % 1) rate = Math.round(rate * 1000) / 1000;
  localStorage.setItem("playbackRate", rate.toString());
  updateVideosRates(videos, rate);
  setModal(rate);
}
