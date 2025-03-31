// reflection.js – Prompt after timer ends and save reflections

import { saveReflection } from './storage.js';

window.addEventListener("session-ended", (e) => {
  const timestamp = e.detail.completedAt;

  const reflection = prompt("🎉 Great job! What did you accomplish in this session?");
  if (reflection && reflection.trim()) {
    const sessionData = {
      time: timestamp,
      note: reflection.trim()
    };
    saveReflection(sessionData);
    alert("✅ Reflection saved!");
  } else {
    alert("⚠️ No reflection entered. Session not saved.");
  }
});