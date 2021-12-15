import { attempt } from "./utils";

export const modalEl = document.createElement("div");
modalEl.className = "minuz-modal";
attempt(() => document.body.appendChild(modalEl));

export const modalStyle = document.createElement("style");
attempt(() => document.head.appendChild(modalStyle));
modalStyle.innerHTML = `
.minuz-modal {
  align-items: center;
  background: white;
  border-radius: 100px;
  border: 1px solid black;
  box-sizing: border-box;
  bottom: 12px;
  color: black;
  cursor: default;
  display: flex;
  font-size: 18px;
  font-weight: 800;
  flex: 1;
  height: 36px;
  justify-content: center;
  opacity: 0;
  padding: 1rem;
  position: fixed;
  pointer-events: none;
  right: 12px;
  visibility: hidden;
  width: 60px;
  z-index: 10000;
}
.minuz-modal span {
  bottom: 7px;
  position: absolute;
}
`;

/**
 * Set the inner modal text to a value.
 */
const fadeOutDelay = 1250;
const fadeInDuration = 150;
const fadeOutDuration = 1000;
let updatedAt = 0;
let inProgress = 0;
export function setModal(value: any) {
  modalEl.innerHTML = `<span>${value.toString().replace(/^0/, "")}</span>`;
  updatedAt = Date.now();
  if (inProgress) clearTimeout(inProgress);
  modalEl.style.transition = `opacity ${fadeInDuration}ms linear`;
  modalEl.style.opacity = "1";
  modalEl.style.visibility = "visible";
  modalEl.style.pointerEvents = "auto";
  inProgress = setTimeout(() => {
    modalEl.style.transition = `opacity ${fadeOutDuration}ms linear`;
    modalEl.style.opacity = "0";
    inProgress = setTimeout(() => {
      delete modalEl.style.transition;
      delete modalEl.style.opacity;
      delete modalEl.style.visibility;
      delete modalEl.style.pointerEvents;
    }, fadeOutDuration);
  }, fadeOutDelay)
}
