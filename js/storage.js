export function saveReflection(session) {
  const key = "focusloop_sessions";
  const data = JSON.parse(localStorage.getItem(key)) || [];
  data.push(session);
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadReflections() {
  const key = "focusloop_sessions";
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function loadSettings() {
  return JSON.parse(localStorage.getItem("focusloop_settings")) || { duration: 25 };
}

export function saveSettings(settings) {
  localStorage.setItem("focusloop_settings", JSON.stringify(settings));
}

export function loadTheme() {
  return localStorage.getItem("focusloop_theme") || "light";
}

export function saveTheme(theme) {
  localStorage.setItem("focusloop_theme", theme);
}