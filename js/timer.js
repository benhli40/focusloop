// timer.js – Handles the Pomodoro countdown
import { loadSettings } from './storage.js';

let defaultDuration = loadSettings().duration || 25;
let timeLeft = defaultDuration * 60; // ← now dynamic
let timerDisplay, startBtn, pauseBtn, resetBtn;
let timerInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  timerDisplay = document.getElementById("timer-display");
  startBtn = document.getElementById("start-timer");
  pauseBtn = document.getElementById("pause-timer");
  resetBtn = document.getElementById("reset-timer");

  updateTimerDisplay();

  if (startBtn) startBtn.addEventListener("click", startTimer);
  if (pauseBtn) pauseBtn.addEventListener("click", pauseTimer);
  if (resetBtn) resetBtn.addEventListener("click", resetTimer);
});

function startTimer() {
  if (timerInterval) return; // Already running

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      emitSessionEnded();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = 25 * 60;
  updateTimerDisplay();
}

// Format time as mm:ss
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateTimerDisplay() {
  if (timerDisplay) {
    timerDisplay.textContent = formatTime(timeLeft);
  }
}

function emitSessionEnded() {
  const event = new CustomEvent("session-ended", {
    detail: {
      completedAt: new Date().toISOString()
    }
  });
  window.dispatchEvent(event);
}