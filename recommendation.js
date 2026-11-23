"use strict";

const slides = [...document.querySelectorAll(".slide")];
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const progress = document.querySelector("#progress");
let current = 0;

function show(index) {
  if (index < 0 || index >= slides.length || index === current) return;
  slides[current].hidden = true;
  current = index;
  const slide = slides[current];
  slide.hidden = false;
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  progress.textContent = `${current + 1} / ${slides.length}`;
  history.replaceState(null, "", `#${slide.id}`);
  slide.querySelector("h1").focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

const restored = slides.findIndex((slide) => location.hash === `#${slide.id}`);
if (restored > 0) show(restored);

previous.addEventListener("click", () => show(current - 1));
next.addEventListener("click", () => show(current + 1));
document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey ||
      event.target.closest("input, textarea, select, [contenteditable]")) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    show(current + (event.key === "ArrowRight" ? 1 : -1));
  }
});

const form = document.querySelector("#ratings");
const fields = [...form.querySelectorAll("input")];
const outputs = [...document.querySelectorAll(".metric dd")];
const status = document.querySelector("#rating-status");

function cosine(a, b) {
  const magnitude = Math.hypot(...a) * Math.hypot(...b);
  return magnitude > 0 && Number.isFinite(magnitude)
    ? a.reduce((sum, value, i) => sum + value * b[i], 0) / magnitude
    : NaN;
}

function display(values, message = "") {
  outputs.forEach((output, index) => {
    output.textContent = values ? values[index].toFixed(2) : "—";
  });
  status.textContent = message;
}

function recalculate() {
  const values = [];
  let valid = true;
  for (const field of fields) {
    const value = field.value.trim();
    const accepted = /^[1-5]$/.test(value);
    field.setAttribute("aria-invalid", String(!accepted));
    document.getElementById(field.getAttribute("aria-describedby")).hidden = accepted;
    valid &&= accepted;
    values.push(Number(value));
  }
  if (!valid) {
    display(null, "計算暫停：請修正評分欄位。");
    return;
  }
  const [rA, rB, boA, boB, boC, qingA, qingB, qingC] = values;
  const target = [boC, qingC];
  const wA = cosine([boA, qingA], target);
  const wB = cosine([boB, qingB], target);
  const numerator = rA * wA + rB * wB;
  const denominator = Math.abs(wA) + Math.abs(wB);
  const result = [wA, wB, numerator, denominator, numerator / denominator];
  if (denominator <= 0 || !result.every(Number.isFinite)) {
    display(null, "目前無法計算。可以重設評分後再試。");
    return;
  }
  display(result);
}

form.addEventListener("input", recalculate);
form.addEventListener("submit", (event) => event.preventDefault());
form.addEventListener("reset", () => queueMicrotask(recalculate));
recalculate();
