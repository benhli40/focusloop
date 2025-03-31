// settings.js – Customize focus session duration

import { loadSettings, saveSettings } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
  const durationInput = document.getElementById("session-duration");
  const saveBtn = document.getElementById("save-settings");

  const currentSettings = loadSettings();
  if (currentSettings.duration) {
    durationInput.value = currentSettings.duration;
  }

  saveBtn.addEventListener("click", () => {
    const newDuration = parseInt(durationInput.value);
    if (isNaN(newDuration) || newDuration <= 0) {
      alert("Please enter a valid duration in minutes.");
      return;
    }

    saveSettings({ duration: newDuration });
    alert("✅ Settings saved!");
  });
});
