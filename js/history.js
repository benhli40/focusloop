// history.js – Load and display past reflections

import { loadReflections } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("history-list");
  const data = loadReflections();

  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = "<p>No sessions found yet. Start your first focus session!</p>";
    return;
  }

  const ul = document.createElement("ul");
  ul.classList.add("reflection-list");

  data.reverse().forEach(entry => {
    const li = document.createElement("li");
    const date = new Date(entry.time);
    li.innerHTML = `
      <strong>${date.toLocaleString()}</strong><br>
      <span>${entry.note}</span>
    `;
    ul.appendChild(li);
  });

  container.appendChild(ul);
});