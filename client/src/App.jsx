import { useState, useEffect, useRef } from "react";
import "./styles.css";
import { fetchProjects, submitContact } from "./api.js";

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["about", "skills", "projects", "contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__logo" onClick={() => scrollTo("hero")}>
        <span className="logo-bracket">&lt;</span>
        <span className="logo-name">Shwetha.dev</span>
        <span className="logo-bracket">/&gt;</span>
      </div>
      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {links.map((l) => (
          <li key={l}>
            <button
              className={`nav-btn ${active === l ? "nav-btn--active" : ""}`}
              onClick={() => scrollTo(l)}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero">
      <div className="hero__grid-bg" aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} className="grid-dot" />
        ))}
      </div>
      <div className="hero__content">
        <p className="hero__greeting">Hello, I'm</p>
        <h1 className="hero__name">
          Shwetha<br />
          <span className="hero__name--accent">Kannan</span>
        </h1>
        <div className="hero__roles">
          <span className="role-tag">Full-Stack Developer</span>
          <span className="role-divider">·</span>
          <span className="role-tag">AI/ML Enthusiast</span>
          <span className="role-divider">·</span>
          <span className="role-tag">Tech Explorer</span>
        </div>
        <p className="hero__bio">
        I craft modern web applications focused on clean architecture
        and seamless user experience.
        </p>
        <div className="hero__cta">
          <button className="btn btn--primary" onClick={() => scrollTo("projects")}>
            View My Work
          </button>
          <button className="btn btn--ghost" onClick={() => scrollTo("contact")}>
            Get in Touch
          </button>
        </div>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="code-card">
          <div className="code-card__bar">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
            <span className="code-card__title">portfolio.js</span>
          </div>
          <pre className="code-card__body"><code>{`const developer = {
  name: "Shwetha Kannan",
  stack: ["React", "Node.js",
          "MongoDB", "Express"],
  passion: "building things
            that matter",
  available: true,
};

export default developer;`}</code></pre>
        </div>
        <div className="floating-badge badge-1">⚛ React</div>
        <div className="floating-badge badge-2">🟢 Node.js</div>
        <div className="floating-badge badge-3">🍃 MongoDB</div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: "7.8", label: "Current GPA " },
    { value: "8.2", label: "Current CGPA" },
    { value: "10+", label: "Certifications" },
    { value: "6+", label: "Projects Built" },
  ];

  return (
    <section id="about" className="section about">
      <div className="section__inner">
        <SectionHeader tag="01" title="About Me" />
        <div className="about__grid">
          <div className="about__image-wrap">
            <div className="about__avatar">
              <div className="avatar-initials">SK</div>
              <div className="avatar-ring" />
              <div className="avatar-ring avatar-ring--2" />
            </div>
            <div className="about__stats">
              {stats.map((s) => (
                <div key={s.label} className="stat-card">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about__text">
            <h3 className="about__subtitle">
            A developer passionate about building meaningful digital experiences.
            </h3>
            <p>
            I'm a Full-Stack Developer and AI-focused Computer Science student 
            based in Bengaluru,India,currently exploring modern web technologies 
            and intelligent systems.
            </p>
            <p>
            I enjoy building responsive web applications with React, 
            Node.js, and MongoDB while continuously improving my skills 
            through hands-on projects, hackathons, and real-world problem solving.
            </p>
            <p>
            Outside of coding, I enjoy exploring UI/UX design, 
            learning emerging technologies, and turning creative ideas 
            into meaningful digital experiences.
            </p>
            <div className="about__links">
              <a href="https://github.com/shwzzz09" target="_blank" rel="noreferrer" className="link-pill">🐙 GitHub</a>
              <a href="https://www.linkedin.com/in/shwetha-kannan-918709322/" target="_blank" rel="noreferrer" className="link-pill">💼 LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function SkillBar({ name, pct, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setWidth(pct); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-item__header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const categories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { name: "HTML / CSS", pct: 90, color: "var(--accent-cyan)" },
        { name: "JavaScript", pct: 75, color: "var(--accent-yellow)" },
        { name: "React.js", pct: 65, color: "var(--accent-orange)" },
        { name: "Figma / UI Design", pct: 78, color: "var(--accent-blue)" },
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Python", pct: 85, color: "var(--accent-green)" },
        { name: "Flask", pct: 75, color: "var(--accent-cyan)" },
        { name: "REST APIs", pct: 70, color: "var(--accent-purple)" },
        { name: "Node.js", pct: 65, color: "var(--accent-pink)" },
      ],
    },
    {
      title: "Database & DevOps",
      icon: "🗄️",
      skills: [
        { name: "MongoDB", pct: 65, color: "var(--accent-green)" },
        { name: "SQL", pct: 75, color: "var(--accent-blue)" },
        { name: "Scikit-learn", pct: 68, color: "var(--accent-cyan)" },
        { name: "NLP", pct: 88, color: "var(--accent-orange)" },
      ],
    },
  ];

  const techPills = [
    "React","JavaScript","Python","Flask","MongoDB","SQL",
    "Git","GitHub","Vercel","Netlify","Figma","Canva",
  ];

  return (
    <section id="skills" className="section skills">
      <div className="section__inner">
        <SectionHeader tag="02" title="Technical Skills" />
        <div className="skills__grid">
          {categories.map((cat) => (
            <div key={cat.title} className="skill-category">
              <h3 className="skill-category__title">
                <span>{cat.icon}</span> {cat.title}
              </h3>
              {cat.skills.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          ))}
        </div>
        <div className="tech-cloud">
          <p className="tech-cloud__label">Also worked with:</p>
          <div className="tech-pills">
            {techPills.map((t) => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
const FALLBACK_PROJECTS = [
  {
    _id: "1",
    title: "Internship Web-Tracker",
    description:
      "A web-based internship tracking platform inspired by Airbnb UI/UX that helps users manage applications, deadlines, and company details efficiently.",
    tags: ["React", "JavaScript", "UI/UX"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    color: "#00c8ff",
  },

  {
    _id: "2",
    title: "JoyNest",
    description:
      "An event management web application designed to simplify event planning, bookings, customization, and organization through an interactive user experience.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    color: "#a78bfa",
  },

  {
    _id: "3",
    title: "Plant Disease Detection",
    description:
      "An intelligent web-based system that detects plant diseases from uploaded leaf images and provides treatment recommendations using AI.",
    tags: ["Python", "AI", "Machine Learning"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    color: "#34d399",
  },

  {
    _id: "4",
    title: "Social Media Content Analyzer",
    description:
      "A content analysis application that performs sentiment analysis, grammar correction, engagement scoring, and hashtag optimization.",
    tags: ["Python", "NLP", "AI"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    color: "#f59e0b",
  },
];
function ProjectCard({ project, index }) {
  return (
    <div
      className="project-card"
      style={{
        "--card-accent": project.color,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="project-card__accent-bar" />

      <div className="project-card__body">
        <div className="project-card__header">
          <span className="project-index">0{index + 1}</span>

          {project.featured && (
            <span className="project-featured">★ Featured</span>
          )}
        </div>

        <h3 className="project-card__title">
          {project.title}
        </h3>

        <p className="project-card__desc">
          {project.description}
        </p>

        <div className="project-card__tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProjects()
      .then((data) => { if (data?.length) setProjects(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const tags = ["all", ...new Set(FALLBACK_PROJECTS.flatMap((p) => p.tags))];
  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="section projects">
      <div className="section__inner">
        <SectionHeader tag="03" title="Projects" />
        <div className="filter-bar">
        {["all", "React", "JavaScript", "Python", "AI"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "filter-btn--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : (
          <div className="projects__grid">
            {visible.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Message too short (min 10 chars)";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    try {
      const existing =
        JSON.parse(localStorage.getItem("messages")) || [];
    
      existing.push({
        ...form,
        date: new Date().toISOString(),
      });
    
      localStorage.setItem(
        "messages",
        JSON.stringify(existing)
      );
    
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: "📧", label: "Email", value: "shwethabeauty29@gmail.com", href: "mailto:arjun@example.com" },
    { icon: "📍", label: "Location", value: "Bengaluru, India", href: null },
    { icon: "🐙", label: "GitHub", value: "https://github.com/shwzzz09", href: "https://github.com" },
    { icon: "💼", label: "LinkedIn", value: "https://www.linkedin.com/in/shwetha-kannan-918709322/", href: "https://linkedin.com" },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="section__inner">
        <SectionHeader tag="04" title="Get In Touch" />
        <div className="contact__grid">
          <div className="contact__info">
            <h3 className="contact__heading">
              Let's build something<br />
              <span className="text-accent">great together.</span>
            </h3>
            <p className="contact__subtext">
            <p>
  Have an idea, project, or opportunity? Let’s build something 
  meaningful together.
</p>
            </p>
            <div className="contact__cards">
              {contactInfo.map((c) => (
                <a
                  key={c.label}
                  href={c.href || undefined}
                  className={`contact-info-card ${!c.href ? "no-link" : ""}`}
                  target={c.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <span className="contact-icon">{c.icon}</span>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name" name="name" type="text" placeholder="Arjun Sharma"
                value={form.name} onChange={handleChange}
                className={errors.name ? "input--error" : ""}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email" name="email" type="email" placeholder="arjun@example.com"
                value={form.email} onChange={handleChange}
                className={errors.email ? "input--error" : ""}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Tell me about your project..."
                value={form.message} onChange={handleChange}
                className={errors.message ? "input--error" : ""}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>
            <button
              type="submit"
              className={`btn btn--primary btn--full ${status === "sending" ? "btn--loading" : ""}`}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Message →"}
            </button>
            {status === "success" && (
              <div className="form-success">
                ✅ Message sent! I'll reply within 24 hours.
              </div>
            )}
            {status === "error" && (
              <div className="form-error-msg">
                ❌ Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Shwetha.dev</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} Shwetha Kannan · Built with React + Node.js + MongoDB
        </p>
        <div className="footer__links">
          <a href="https://github.com/shwzzz09" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/shwetha-kannan-918709322/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:shwethabeauty29@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
function SectionHeader({ tag, title }) {
  return (
    <div className="section-header">
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar active={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}