// server.js — Express + MongoDB backend
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import Project from "./models/Project.js";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
    origin: "http://localhost:5173"
  }));
  
  app.use(express.json());

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Projects routes ───────────────────────────────────────────────────────────

// GET /api/projects — fetch all projects (sorted by creation date desc)
app.get("/api/projects", async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET /api/projects/:id — fetch a single project
app.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// POST /api/projects — create a new project (admin / seeding)
app.post("/api/projects", async (req, res) => {
  try {
    const { title, description, tags, liveUrl, repoUrl, featured, color } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "title and description are required" });
    }
    const project = await Project.create({ title, description, tags, liveUrl, repoUrl, featured, color });
    res.status(201).json(project);
  } catch (err) {
    console.error("POST /api/projects error:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// DELETE /api/projects/:id
app.delete("/api/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// ── Contact routes ─────────────────────────────────────────────────────────────

// POST /api/contact — save a contact form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name?.trim()) return res.status(400).json({ error: "Name is required" });
    if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return res.status(400).json({ error: "Valid email is required" });
    if (!message?.trim() || message.trim().length < 10)
      return res.status(400).json({ error: "Message must be at least 10 characters" });

    const contact = await Contact.create({ name: name.trim(), email: email.toLowerCase().trim(), message: message.trim() });
    res.status(201).json({ message: "Contact saved successfully", id: contact._id });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    res.status(500).json({ error: "Failed to save contact" });
  }
});

// GET /api/contacts — list all contacts (admin)
app.get("/api/contacts", async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`);
});

export default app;