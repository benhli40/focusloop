// script.js – Handles navigation and theme toggling

import { loadTheme, saveTheme } from './storage.js';

const viewContainer = document.getElementById("view");

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("toggle-theme");

  // === 1. Apply saved theme ===
  const theme = loadTheme();
  document.body.classList.toggle("dark", theme === "dark");

  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === "dark" ? "☀️ Light" : "🌓 Dark";
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      const newTheme = isDark ? "dark" : "light";
      saveTheme(newTheme);
      themeToggleBtn.textContent = isDark ? "☀️ Light" : "🌓 Dark";
    });
  }

  // === 2. Load view from URL or default to 'home' ===
  const view = new URLSearchParams(window.location.search).get("view") || "home";
  loadView(view);
});

// === 3. Load HTML snippets into main view ===
export async function loadView(viewName) {
  try {
    const res = await fetch(`./snippets/${viewName}.html`);
    if (!res.ok) throw new Error("View not found");

    const html = await res.text();
    viewContainer.innerHTML = html;

    // Dynamically load associated scripts
    switch (viewName) {
      case "session":
        import("./timer.js");
        import("./reflection.js");
        break;
      case "history":
        import("./history.js");
        break;
      case "settings":
        import("./settings.js");
        break;
      default:
        break;
    }

    // Update browser URL
    const url = new URL(window.location);
    url.searchParams.set("view", viewName);
    window.history.pushState({}, "", url);
  } catch (err) {
    console.error("Error loading view:", err);
    viewContainer.innerHTML = `<p class="error">View not found: ${viewName}</p>`;
  }
}

// === 4. Global navigation handler for buttons ===
window.navigate = loadView;

// === 5. Handle browser back/forward button navigation ===
window.addEventListener("popstate", () => {
  const view = new URLSearchParams(window.location.search).get("view") || "home";
  loadView(view);
});
