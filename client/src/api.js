// api.js — Frontend API helpers
// All requests go to the Express backend. In development the Vite proxy
// forwards /api/* to http://localhost:5001; in production set VITE_API_URL.

const BASE_URL = "http://localhost:5001";

/**
 * Fetch all projects from the backend.
 * Falls back gracefully if the server is unreachable.
 */
export async function fetchProjects() {
  const res = await fetch(`${BASE_URL}/api/projects`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // [{ _id, title, description, tags, liveUrl, repoUrl, featured, color }]
}

/**
 * Submit a contact-form message to the backend.
 * @param {{ name: string, email: string, message: string }} data
 */
export async function submitContact(data) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  return res.json(); // { message: "Contact saved successfully" }
}