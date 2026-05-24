import { useEffect, useRef, useState } from "react";
import heroImage from "./assets/hero.png";
import p1 from "./assets/project1.png";
import p2 from "./assets/project2.png";
import p3 from "./assets/project3.png";
import p4 from "./assets/project4.png";


/* ── hooks ─────────────────────────────────────────────────────── */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useTypewriter(words, speed = 76, pause = 2200) {
  const [text, setText] = useState(""); const [wi, setWi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const t = setTimeout(() => {
      if (!del) { setText(w.slice(0, text.length + 1)); if (text.length + 1 === w.length) setTimeout(() => setDel(true), pause); }
      else { setText(w.slice(0, text.length - 1)); if (text.length - 1 === 0) { setDel(false); setWi((wi + 1) % words.length); } }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [del, pause, speed, text, wi, words]);
  return text;
}

function Reveal({ children, delay = 0, y = 22, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

/* ── data ─────────────────────────────────────────────────────── */
const NAV_ITEMS = ["Hero", "About", "Projects", "Experience", "Contact"];

const SKILLS = {
  Frontend: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Figma", "Responsive UI"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "CRUD Systems"],
  Data: ["MongoDB", "PostgreSQL", "MySQL", "Analytics Dashboards"],
  Platform: ["Git", "Docker", "Linux", "CI/CD", "AWS", "Google Cloud"],
};

const PROJECTS = [
  {
    id: "01", featured: true,
    img: p1,
    images: [p1],
    title: "Blockchain Traceability System",
    eyebrow: "SIH Runner-Up",
    desc: "A blockchain-backed traceability product for herb supply chains, with verification flows, analytics views, batch history, and dashboard-style operational visibility.",
    stack: ["Blockchain", "React", "Node.js", "Express", "MongoDB"],
    metric: "Real-time provenance",
    live: "#", github: "https://github.com/Akshatra03",
  },
  {
    id: "02",
    img: p2,
    images: [p2],
    title: "Config-App",
    eyebrow: "Configuration platform",
    desc: "A configuration management app for dynamic settings, clean editing flows, and reliable updates across application environments.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    metric: "Environment control",
    live: "#", github: "https://github.com/Akshatra03",
  },
  {
    id: "03",
    img: p3,
    images: [p3],
    title: "Campus Connect",
    eyebrow: "Campus engagement system",
    desc: "A centralized platform for clubs, events, discovery, and student participation across campus communities.",
    stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    metric: "Event discovery",
    live: "#", github: "https://github.com/Akshatra03",
  },
  {
    id: "04",
    img: p4,
    images: [p4],
    title: "Tab Management Extension",
    eyebrow: "Chrome productivity tool",
    desc: "A browser extension for grouping, searching, and restoring tabs without breaking focus during deep work sessions.",
    stack: ["JavaScript", "Chrome APIs", "HTML", "CSS"],
    metric: "Focus workflow",
    live: "#", github: "https://github.com/Akshatra03",
  },
];
const EXPERIENCE = [
  {
    period: "2024", type: "Achievement",
    title: "SIH Runner-Up 🏆", org: "Smart India Hackathon", location: "National",
    desc: "Built and presented a blockchain-based herb traceability product with a dashboard, analytics layer, and verification workflow in a high-pressure team setting.",
    tags: ["Product Thinking", "Blockchain", "React", "Team Leadership"],
  },
  {
    period: "2022 – Present", type: "Education",
    title: "B.Tech CSE", org: "University", location: "6th Semester",
    desc: "Studying computer science with a practical focus on full-stack systems, interface quality, data structures, and scalable web products.",
    tags: ["Computer Science", "Full-Stack", "DSA", "System Design"],
  },
  {
    period: "2023 – Present", type: "Practice",
    title: "Product Engineering", org: "Self-directed", location: "Remote",
    desc: "Designing and shipping web applications from idea to implementation: interfaces, APIs, data models, deployment, and polish.",
    tags: ["MERN Stack", "Next.js", "Docker", "Cloud", "UX Systems"],
  },
];

/* Social links — icon + href only (FIX #4) */
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Akshatra03",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.912.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akshatra-sen04",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Akshatra/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:akshatsen955@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
      </svg>
    ),
  },
];

/* ── global CSS ───────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Inter+Tight:wght@500;600;700;800;900&display=swap');

:root {
  --blue: #0057ff;
  --blue-600: #0047d9;
  --ink: #070b18;
  --muted: #657084;
  --soft: #f6f9ff;
  --line: rgba(0,87,255,0.1);
  --shadow: 0 24px 70px rgba(15,23,42,0.08), 0 8px 24px rgba(0,87,255,0.06);
  --shadow-hover: 0 32px 90px rgba(15,23,42,0.12), 0 12px 36px rgba(0,87,255,0.12);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: #fff; color: var(--ink); font-family: 'Inter', system-ui, sans-serif; overflow-x: hidden; }
a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }
::selection { background: rgba(0,87,255,0.12); color: var(--ink); }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #f8fbff; }
::-webkit-scrollbar-thumb { background: #d8e5ff; border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: #9bbcff; }

@keyframes grain { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-1px,1px)} 50%{transform:translate(1px,-1px)} 75%{transform:translate(1px,1px)} }
@keyframes pulseDot { 0%,100%{box-shadow:0 0 0 5px rgba(34,197,94,0.12)} 50%{box-shadow:0 0 0 9px rgba(34,197,94,0.05)} }
@keyframes caret { 50%{ opacity: 0.15; } }
@keyframes floatSoft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

/* ── PREMIUM ANIMATIONS ─────────────────────────────────── */
@keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes scaleIn  { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
@keyframes slideRight { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
@keyframes shimmer  {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

/* Section entrance — every section fades up on first view */
.section { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }

/* Cards lift on hover with premium spring */
.journey-card, .stat-box, .skill-card, .project-card, .process-item {
  will-change: transform;
}

/* Shimmer on section headings when visible */
.section-title {
  background: linear-gradient(90deg, var(--ink) 40%, var(--blue) 50%, var(--ink) 60%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 6s linear infinite;
}
/* Override blue spans to stay blue */
.section-title .blue { -webkit-text-fill-color: var(--blue); }

/* Chip entrance stagger */
.chip { animation: scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }

/* Contact icon buttons pop in */
.social-icon-btn { animation: scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }

/* Stat box pop */
.stat-box { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

/* Process item slide in from left */
.process-item { animation: slideRight 0.6s cubic-bezier(0.16,1,0.3,1) both; }

/* Topbar entrance */
.topbar { animation: fadeIn 0.6s ease 0.1s both; }

/* Hero name shimmer override — more dramatic */
.hero h1 {
  background: linear-gradient(90deg, var(--ink) 35%, #1470ff 50%, var(--ink) 65%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 8s linear infinite;
}

/* ── TOPBAR NAVIGATION ───────────────────────────────────── */
.topbar {
  position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
  z-index: 200; width: min(calc(100% - 48px), 900px);
  height: 52px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 8px 0 20px;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0,87,255,0.1);
  border-radius: 999px;
  box-shadow: 0 8px 32px rgba(15,23,42,0.08), 0 2px 8px rgba(0,87,255,0.06);
}
.topbar-brand {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: 0.84rem; font-weight: 800; color: var(--blue); letter-spacing: 0.04em;
  white-space: nowrap;
}
.topbar-nav {
  display: flex; align-items: center; gap: 2px; list-style: none;
  background: rgba(0,87,255,0.04);
  border-radius: 999px;
  padding: 4px;
  position: relative;
}
.topbar-nav a {
  position: relative; z-index: 1;
  padding: 6px 16px;
  font-size: 0.76rem; font-weight: 600; letter-spacing: 0.02em;
  color: #6b7280; border-radius: 999px;
  transition: color 0.25s ease;
  white-space: nowrap;
}
.topbar-nav a:hover { color: var(--blue); }
.topbar-nav a.active { color: var(--blue); font-weight: 700; }
/* Sliding pill behind active item */
.topbar-nav a.active::before {
  content: '';
  position: absolute; inset: 0; z-index: -1;
  background: #fff;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(15,23,42,0.1);
  animation: pillIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes pillIn {
  from { opacity: 0; transform: scaleX(0.7); }
  to   { opacity: 1; transform: scaleX(1); }
}
.topbar-resume {
  height: 36px; padding: 0 18px;
  background: linear-gradient(180deg,#1470ff,var(--blue));
  color: #fff; border-radius: 999px;
  font-size: 0.74rem; font-weight: 700; letter-spacing: 0.04em;
  box-shadow: 0 4px 14px rgba(0,87,255,0.28);
  display: inline-flex; align-items: center; white-space: nowrap;
  transition: transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.28s;
}
.topbar-resume:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 22px rgba(0,87,255,0.32); }

/* ── LAYOUT ─────────────────────────────────────────────── */
.page-shell { padding-top: 88px; position: relative; z-index: 1; }

.section {
  position: relative;
  padding: 110px 72px;
  border-bottom: 1px solid rgba(0,87,255,0.06);
  overflow: hidden;
}
.section-inner { width: min(100%, 1100px); margin: 0 auto; position: relative; z-index: 1; }

/* ── SECTION HEADING (FIX #2) ───────────────────────────── */
.section-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.section-head__line { width: 22px; height: 1px; background: var(--blue); flex-shrink: 0; }
.section-head__label {
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--blue);
}
.section-head__num { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.14em; color: #c4cee0; }

/* (FIX #2) — BIG visible section titles */
.section-title {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(2.8rem, 5.5vw, 4.8rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin: 0 0 48px;
}
.section-title .blue, .blue { color: var(--blue); }

.body-copy { font-size: 1rem; line-height: 1.82; color: rgba(78,88,108,0.88); font-weight: 400; margin: 0; }
.eyebrow { font-size: 0.66rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blue); }

.glass {
  background: rgba(255,255,255,0.78);
  border: 1px solid rgba(255,255,255,0.82);
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
}

/* ── CHIPS ──────────────────────────────────────────────── */
.chip {
  display: inline-flex; align-items: center;
  min-height: 32px; padding: 7px 13px;
  border: 1px solid rgba(0,87,255,0.11); border-radius: 999px;
  background: rgba(255,255,255,0.82);
  box-shadow: 0 6px 18px rgba(15,23,42,0.04);
  color: #5f6c80; font-size: 0.75rem; font-weight: 600; letter-spacing: 0;
  transition: transform .25s, border-color .25s, color .25s, box-shadow .25s;
}
.chip:hover { transform: translateY(-2px); border-color: rgba(0,87,255,0.28); color: var(--blue); box-shadow: 0 10px 24px rgba(0,87,255,0.09); }

/* ── BUTTONS ─────────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 9px;
  min-height: 46px; padding: 0 22px; border-radius: 999px;
  font-size: 0.82rem; font-weight: 800; letter-spacing: 0.02em;
  border: 1px solid transparent;
  transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s, background .28s, border-color .28s, color .28s;
}
.btn:hover { transform: translateY(-2px) scale(1.015); }
.btn-primary { background: linear-gradient(180deg,#1470ff,var(--blue)); color: #fff; box-shadow: 0 16px 36px rgba(0,87,255,0.24),inset 0 1px 0 rgba(255,255,255,0.22); }
.btn-primary:hover { background: linear-gradient(180deg,#2d7eff,var(--blue-600)); box-shadow: 0 22px 48px rgba(0,87,255,0.28); }
.btn-secondary { background: rgba(255,255,255,0.78); border-color: rgba(0,87,255,0.13); color: #172033; box-shadow: 0 10px 28px rgba(15,23,42,0.06); }
.btn-secondary:hover { border-color: rgba(0,87,255,0.28); color: var(--blue); box-shadow: 0 16px 36px rgba(15,23,42,0.08); }
.btn-resume { background: transparent; border-color: rgba(0,87,255,0.22); color: var(--blue); }
.btn-resume:hover { background: rgba(0,87,255,0.05); border-color: var(--blue); box-shadow: 0 8px 24px rgba(0,87,255,0.12); }

/* ── HERO ────────────────────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex; align-items: center;
  padding-top: 80px; padding-bottom: 60px;
  background: radial-gradient(circle at 68% 28%, rgba(0,87,255,0.1), transparent 34%), linear-gradient(180deg,#fff 0%,#f8fbff 100%);
}
.hero-inner { display: grid; grid-template-columns: minmax(0,1fr) minmax(340px,0.8fr); gap: 56px; align-items: center; width: min(100%,1100px); margin: 0 auto; }
.hero-copy { max-width: 620px; }
.status-pill {
  display: inline-flex; align-items: center; gap: 10px;
  border-radius: 999px; padding: 8px 14px; margin-bottom: 24px;
  background: rgba(255,255,255,0.78); border: 1px solid rgba(0,87,255,0.12);
  box-shadow: 0 10px 24px rgba(15,23,42,0.06);
  color: #5d687a; font-size: 0.72rem; font-weight: 750; letter-spacing: 0.06em; text-transform: uppercase;
}
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: pulseDot 2.2s ease-in-out infinite; flex-shrink: 0; }
.hero h1 {
  font-family: 'Inter Tight','Inter',sans-serif;
  font-size: clamp(4rem,9vw,7.5rem);
  line-height: 0.86; font-weight: 900; letter-spacing: -0.03em;
  margin: 0 0 22px; color: var(--ink);
}
.hero-kicker {
  display: flex; align-items: center; gap: 9px; margin-bottom: 22px;
  color: var(--blue); font-size: clamp(1.1rem,2vw,1.45rem); font-weight: 700;
}
.hero-caret { width: 8px; height: 1.1em; border-radius: 999px; background: var(--blue); animation: caret 1s steps(1) infinite; flex-shrink: 0; }
.hero-lede { max-width: 52ch; font-size: 1.05rem; line-height: 1.78; color: #526075; margin-bottom: 28px; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; }
.hero-stack { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }

/* FIX #4 — social icons horizontal + icon-only */
.hero-socials {
  display: flex; align-items: center; gap: 10px;
}
.social-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 12px;
  background: rgba(255,255,255,0.82);
  border: 1px solid rgba(0,87,255,0.11);
  color: #5f6c80;
  box-shadow: 0 6px 18px rgba(15,23,42,0.05);
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), border-color .25s, color .25s, box-shadow .25s;
}
.social-icon-btn:hover {
  transform: translateY(-3px) scale(1.08);
  border-color: rgba(0,87,255,0.3);
  color: var(--blue);
  box-shadow: 0 12px 28px rgba(0,87,255,0.12);
}

/* ── HERO VISUAL ─────────────────────────────────────────── */
.hero-visual { position: relative; min-height: 600px; }
.portrait-shell {
  position: absolute; inset: 28px 20px 22px 34px;
  border-radius: 30px; padding: 10px;
  background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(229,240,255,0.72));
  box-shadow: 0 35px 100px rgba(15,23,42,0.14), 0 14px 44px rgba(0,87,255,0.1);
}
.portrait-frame {
  height: 100%; border-radius: 24px; overflow: hidden;
  position: relative; background: #f0f5ff;
  display: flex; align-items: center; justify-content: center;
}
.portrait-placeholder {
  font-family: 'Inter Tight','Inter',sans-serif;
  font-size: 5rem; font-weight: 900; color: rgba(0,87,255,0.1); letter-spacing: -0.06em;
}
.hero-panel { position: absolute; border-radius: 22px; }
.hero-panel--top { top: 2px; left: 2px; width: 220px; padding: 18px; animation: floatSoft 6s ease-in-out infinite; }
.hero-panel--bottom { right: 0; bottom: 6px; width: min(280px,75%); padding: 18px; animation: floatSoft 7s ease-in-out infinite reverse; }
.mini-label { font-size: 0.58rem; font-weight: 850; letter-spacing: 0.16em; text-transform: uppercase; color: #8a95a7; margin-bottom: 8px; }
.mini-value { font-family: 'Inter Tight','Inter',sans-serif; font-size: 1rem; font-weight: 800; line-height: 1.15; color: #111827; }
.metric-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; margin-top: 13px; }
.metric-cell { border-radius: 12px; background: rgba(0,87,255,0.055); padding: 9px; text-align: center; }
.metric-cell strong { display: block; color: var(--blue); font-size: 0.88rem; font-weight: 800; }
.metric-cell span { font-size: 0.54rem; font-weight: 750; text-transform: uppercase; color: #7a8698; }

/* ── ABOUT (FIX #3) — heading + description ABOVE skills grid ─ */
.about-header { margin-bottom: 48px; }
.about-body-text { display: grid; gap: 16px; max-width: 620px; margin-bottom: 36px; }
.about-inline-links { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 56px; }
.text-link {
  padding: 9px 16px; border-radius: 999px;
  background: rgba(0,87,255,0.055); color: var(--blue);
  font-size: 0.76rem; font-weight: 700;
  transition: background .2s, transform .2s;
}
.text-link:hover { background: rgba(0,87,255,0.11); transform: translateY(-2px); }
.skills-title {
  font-size: 0.6rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
  color: #9ca3af; margin-bottom: 24px;
  display: flex; align-items: center; gap: 12px;
}
.skills-title::after { content: ''; flex: 1; height: 1px; background: rgba(0,87,255,0.08); }
.skill-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.skill-card { border-radius: 24px; padding: 22px; }
.skill-card__cat {
  font-size: 0.7rem; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase;
  color: #172033; margin-bottom: 14px;
  display: flex; align-items: center; gap: 10px;
}
.skill-card__cat::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg,rgba(0,87,255,0.14),transparent); }

/* ── ABOUT — new layout styles ───────────────────────────── */
.about-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; margin-top: 48px; }

/* Journey cards — horizontal number + content side by side */
.journey-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 40px; }
.journey-card {
  border-radius: 20px; padding: 24px;
  background: rgba(255,255,255,0.78);
  border: 1px solid rgba(0,87,255,0.1);
  box-shadow: var(--shadow);
  display: flex; flex-direction: row; align-items: flex-start; gap: 16px;
  transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s;
}
.journey-card:hover { transform: translateY(-5px); border-color: rgba(0,87,255,0.26); box-shadow: var(--shadow-hover); }
.journey-num {
  font-family: 'Inter Tight','Inter',sans-serif;
  font-size: 1.5rem; font-weight: 900; color: rgba(0,87,255,0.18);
  letter-spacing: -0.04em; line-height: 1; flex-shrink: 0; width: 36px;
}
.journey-body {}
.journey-title { font-family: 'Inter Tight','Inter',sans-serif; font-size: 0.95rem; font-weight: 780; color: #111827; margin: 0 0 6px; line-height: 1.15; }
.journey-desc { font-size: 0.82rem; line-height: 1.6; color: rgba(15,23,42,0.62); margin: 0; }

/* Process — right column */
.about-subheading {
  font-family: 'Inter Tight','Inter',sans-serif;
  font-size: 1.1rem; font-weight: 780; letter-spacing: 0;
  margin: 0 0 20px; color: #111827;
}
.process-list { display: grid; gap: 0; }
.process-item {
  display: flex; align-items: flex-start; gap: 18px;
  padding: 20px 0; border-bottom: 1px solid rgba(0,87,255,0.06);
}
.process-item:last-child { border-bottom: none; }
.process-bubble {
  width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
  background: rgba(0,87,255,0.07); border: 1.5px solid rgba(0,87,255,0.15);
  display: flex; align-items: center; justify-content: center;
  transition: background .3s, border-color .3s, transform .3s;
}
.process-item:hover .process-bubble { background: rgba(0,87,255,0.12); border-color: rgba(0,87,255,0.3); transform: scale(1.06); }
.process-number { font-family: 'Inter Tight','Inter',sans-serif; font-size: 0.95rem; font-weight: 860; color: var(--blue); }
.process-content { padding-top: 2px; }
.process-step { font-family: 'Inter Tight','Inter',sans-serif; font-size: 0.95rem; font-weight: 760; color: #111827; margin: 0 0 4px; }
.process-desc { font-size: 0.82rem; line-height: 1.6; color: rgba(15,23,42,0.62); margin: 0; }

/* Stats row */
.about-stats-row { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 0; }
.stat-box {
  border-radius: 16px; padding: 18px 14px; text-align: center;
  background: rgba(255,255,255,0.78); border: 1px solid rgba(0,87,255,0.1);
  box-shadow: 0 6px 20px rgba(15,23,42,0.04);
  transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
}
.stat-box:hover { transform: translateY(-4px); border-color: rgba(0,87,255,0.24); box-shadow: 0 14px 36px rgba(0,87,255,0.1); }
.stat-value { font-family: 'Inter Tight','Inter',sans-serif; font-size: 1.6rem; font-weight: 860; color: var(--blue); line-height: 1; margin-bottom: 5px; }
.stat-label { font-size: 0.58rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #8a95a7; }

@media(max-width:960px){
  .about-two-col { grid-template-columns: 1fr; gap: 40px; }
  .about-stats-row { grid-template-columns: repeat(2,1fr); }
  .journey-grid { grid-template-columns: 1fr; }
}
.skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }

/* ── PROJECTS ────────────────────────────────────────────── */
.projects-lead { margin-bottom: 40px; }
.project-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 18px; align-items: stretch; }
.project-card {
  position: relative; overflow: hidden; border-radius: 26px;
  background: rgba(255,255,255,0.82);
  border: 1px solid rgba(0,87,255,0.1);
  box-shadow: var(--shadow);
  transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s;
  display: flex; flex-direction: column;
}
.project-card:hover { transform: translateY(-7px); box-shadow: var(--shadow-hover); border-color: rgba(0,87,255,0.22); }
.project-card.featured { grid-column: 1 / -1; display: grid; grid-template-columns: 1.1fr .9fr; min-height: 400px; }
.project-preview {
  position: relative; min-height: 220px;
  background: radial-gradient(circle at 22% 15%,rgba(0,87,255,0.16),transparent 34%), linear-gradient(135deg,#f8fbff,#eaf2ff);
  overflow: hidden;
  flex-shrink: 0;
}
.featured .project-preview { min-height: 100%; }
.preview-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
  z-index: 2;
}
.project-card:hover .preview-img { transform: scale(1.05); }
.preview-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(0,87,255,0.065) 1px,transparent 1px),linear-gradient(90deg,rgba(0,87,255,0.065) 1px,transparent 1px);
  background-size: 32px 32px;
  mask-image: linear-gradient(180deg,black,transparent 90%);
  -webkit-mask-image: linear-gradient(180deg,black,transparent 90%);
}
.dashboard-window {
  position: absolute; left:8%; right:8%; top:14%; bottom:12%;
  border-radius: 20px;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(255,255,255,0.9);
  box-shadow: 0 24px 64px rgba(15,23,42,0.13);
  overflow: hidden;
}
.window-bar { height: 36px; display:flex; align-items:center; gap:6px; padding:0 13px; border-bottom:1px solid rgba(0,87,255,0.07); }
.window-bar i { width:7px; height:7px; border-radius:50%; background:#bdd2ff; }
.window-body { display:grid; grid-template-columns:.82fr 1.18fr; gap:12px; padding:14px; }
.chart-card, .list-card { border-radius:14px; background:#f7faff; border:1px solid rgba(0,87,255,0.07); }
.chart-card { height:120px; position:relative; overflow:hidden; }
.chart-card::before { content:""; position:absolute; left:14px; right:14px; bottom:18px; height:68px; background:linear-gradient(135deg,transparent 18%,rgba(0,87,255,0.6) 18% 28%,transparent 28% 44%,rgba(0,87,255,0.28) 44% 54%,transparent 54%); filter:drop-shadow(0 8px 14px rgba(0,87,255,0.13)); }
.list-card { display:grid; gap:8px; padding:13px; }
.list-card span { height:9px; border-radius:999px; background:#dbe8ff; }
.list-card span:nth-child(2){width:74%}
.list-card span:nth-child(3){width:88%;background:#c8dcff}
.stat-badge { position:absolute; right:8%; bottom:8%; border-radius:14px; padding:12px 15px; box-shadow:0 16px 30px rgba(15,23,42,0.11); background:rgba(255,255,255,0.92); border:1px solid rgba(0,87,255,0.09); }
.stat-badge strong { display:block; color:var(--blue); font-size:1rem; font-weight:800; }
.stat-badge span { font-size:0.6rem; font-weight:800; text-transform:uppercase; color:#778397; }
.project-body {
  padding: 28px; display: flex; flex-direction: column;
  gap: 16px; flex: 1;
}
.project-body > div:first-child { flex: 1; }
.project-index { font-size:0.66rem; font-weight:850; letter-spacing:0.16em; color:var(--blue); margin-bottom:4px; }
.project-body h3 { font-family:'Inter Tight','Inter',sans-serif; font-size:clamp(1.3rem,2.6vw,2.3rem); line-height:1.05; letter-spacing:-0.02em; margin:8px 0 12px; }
.project-card:not(.featured) .project-body h3 { font-size:1.35rem; }
.project-tags { display:flex; flex-wrap:wrap; gap:7px; margin-bottom: 4px; }
.project-tags span { border-radius:999px; background:#f7faff; border:1px solid rgba(0,87,255,0.08); padding:5px 10px; font-size:0.64rem; font-weight:700; color:#718097; }
.project-links {
  display: flex; gap: 16px; align-items: center;
  padding-top: 14px;
  border-top: 1px solid rgba(0,87,255,0.07);
  margin-top: auto; flex-shrink: 0;
}
.project-links a { font-size:0.7rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#7a8698; transition:color .2s; }
.project-links a:first-child, .project-links a:hover { color:var(--blue); }
.dashboard-window {
  position: absolute; left:8%; right:8%; top:14%; bottom:12%;
  border-radius: 20px;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(255,255,255,0.9);
  box-shadow: 0 24px 64px rgba(15,23,42,0.13);
  overflow: hidden;
}
.window-bar { height: 36px; display:flex; align-items:center; gap:6px; padding:0 13px; border-bottom:1px solid rgba(0,87,255,0.07); }
.window-bar i { width:7px; height:7px; border-radius:50%; background:#bdd2ff; }
.window-body { display:grid; grid-template-columns:.82fr 1.18fr; gap:12px; padding:14px; }
.chart-card, .list-card { border-radius:14px; background:#f7faff; border:1px solid rgba(0,87,255,0.07); }
.chart-card { height:120px; position:relative; overflow:hidden; }
.chart-card::before { content:""; position:absolute; left:14px; right:14px; bottom:18px; height:68px; background:linear-gradient(135deg,transparent 18%,rgba(0,87,255,0.6) 18% 28%,transparent 28% 44%,rgba(0,87,255,0.28) 44% 54%,transparent 54%); filter:drop-shadow(0 8px 14px rgba(0,87,255,0.13)); }
.list-card { display:grid; gap:8px; padding:13px; }
.list-card span { height:9px; border-radius:999px; background:#dbe8ff; }
.list-card span:nth-child(2){width:74%}
.list-card span:nth-child(3){width:88%;background:#c8dcff}
.stat-badge { position:absolute; right:8%; bottom:8%; border-radius:14px; padding:12px 15px; box-shadow:0 16px 30px rgba(15,23,42,0.11); background:rgba(255,255,255,0.92); border:1px solid rgba(0,87,255,0.09); }
.stat-badge strong { display:block; color:var(--blue); font-size:1rem; font-weight:800; }
.stat-badge span { font-size:0.6rem; font-weight:800; text-transform:uppercase; color:#778397; }
.project-body { padding:28px; display:flex; flex-direction:column; justify-content:space-between; gap:22px; }
.project-index { font-size:0.66rem; font-weight:850; letter-spacing:0.16em; color:var(--blue); margin-bottom:4px; }
.project-body h3 { font-family:'Inter Tight','Inter',sans-serif; font-size:clamp(1.3rem,2.6vw,2.3rem); line-height:1.05; letter-spacing:-0.02em; margin:8px 0 12px; }
.project-card:not(.featured) .project-body h3 { font-size:1.35rem; }
.project-tags { display:flex; flex-wrap:wrap; gap:7px; }
.project-tags span { border-radius:999px; background:#f7faff; border:1px solid rgba(0,87,255,0.08); padding:5px 10px; font-size:0.64rem; font-weight:700; color:#718097; }
.project-links { display:flex; gap:16px; align-items:center; margin-top:6px; }
.project-links a { font-size:0.7rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#7a8698; transition:color .2s; }
.project-links a:first-child, .project-links a:hover { color:var(--blue); }

/* ── EXPERIENCE ───────────────────────────────────────────── */
.exp-list { display:grid; gap:0; }
.exp-row {
  display:grid; grid-template-columns:170px 1fr; gap:48px;
  padding:34px 0; position:relative;
  transition:padding-left .3s ease;
}
.exp-row::before { content:""; position:absolute; left:0; top:20px; bottom:20px; width:2px; border-radius:999px; background:var(--blue); transform:scaleY(0); transform-origin:top; transition:transform .3s ease; }
.exp-row:hover::before { transform:scaleY(1); }
.exp-row:hover { padding-left:18px; }
.exp-period { font-size:0.7rem; font-weight:750; color:#8a95a7; margin-bottom:10px; }
.exp-type { display:inline-flex; border-radius:999px; padding:5px 10px; background:rgba(0,87,255,0.07); color:var(--blue); font-size:0.6rem; font-weight:850; text-transform:uppercase; letter-spacing:0.1em; }
.exp-main h3 { font-family:'Inter Tight','Inter',sans-serif; font-size:1.3rem; font-weight:800; letter-spacing:-0.02em; margin:0 0 5px; }
.exp-org { color:var(--blue); font-weight:700; font-size:0.9rem; margin-bottom:12px; }
.soft-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(0,87,255,0.18),transparent); }

/* ── CONTACT ─────────────────────────────────────────────── */
.contact-grid { display:grid; grid-template-columns:.92fr 1fr; gap:72px; align-items:start; }
.contact-links { display:grid; gap:10px; margin-top:32px; }
.contact-link {
  display:flex; align-items:center; gap:14px;
  border-radius:16px; padding:14px 16px;
  background:rgba(255,255,255,0.78);
  border:1px solid rgba(0,87,255,0.09);
  transition:transform .25s, border-color .25s, box-shadow .25s;
}
.contact-link:hover { transform:translateY(-2px); border-color:rgba(0,87,255,0.22); box-shadow:0 12px 28px rgba(15,23,42,0.07); }
.contact-icon { width:36px; height:36px; border-radius:12px; display:grid; place-items:center; background:rgba(0,87,255,0.08); color:var(--blue); font-size:0.72rem; font-weight:850; flex-shrink:0; }
.contact-label { font-size:0.6rem; font-weight:850; letter-spacing:0.13em; text-transform:uppercase; color:#8a95a7; }
.contact-value { font-size:0.9rem; font-weight:650; color:#2d3748; word-break:break-word; }
.contact-card { border-radius:28px; padding:28px; }
.form { display:grid; gap:18px; }
.form label { display:block; font-size:0.62rem; font-weight:800; letter-spacing:0.14em; text-transform:uppercase; color:#7b8799; margin-bottom:7px; }
.input-f { width:100%; border-radius:16px; border:1px solid rgba(0,87,255,0.11); background:rgba(255,255,255,0.82); color:var(--ink); padding:13px 15px; outline:none; transition:border-color .2s,box-shadow .2s,background .2s; font-size:0.92rem; }
.input-f:focus { border-color:rgba(0,87,255,0.36); box-shadow:0 0 0 4px rgba(0,87,255,0.07); background:#fff; }
textarea.input-f { resize:vertical; min-height:130px; }

/* ── FOOTER ──────────────────────────────────────────────── */
.footer { padding:32px 72px; border-top:1px solid rgba(0,87,255,0.06); }
.footer-inner { width:min(100%,1100px); margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; color:#8a95a7; font-size:0.7rem; font-weight:700; letter-spacing:0.06em; }
.footer-inner span:last-child { color:var(--blue); letter-spacing:0.14em; }

/* ── RESPONSIVE ──────────────────────────────────────────── */
@media(max-width:1060px){
  .hero-inner,.contact-grid{grid-template-columns:1fr}
  .hero-visual{min-height:520px;max-width:520px;margin:0 auto;width:100%}
  .project-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .project-card.featured{grid-template-columns:1fr}
  .featured .project-preview{min-height:300px}
  .skill-grid{grid-template-columns:1fr}
}
@media(max-width:720px){
  .topbar{top:10px;width:calc(100% - 24px);border-radius:20px;padding:0 12px}
  .section{padding:80px 22px}
  .hero{padding-top:80px}
  .hero h1{font-size:clamp(3.4rem,16vw,4.8rem)}
  .project-grid{grid-template-columns:1fr}
  .exp-row{grid-template-columns:1fr;gap:14px}
  .footer{padding:28px 22px}
}
`;

/* ── section tag ──────────────────────────────────────────── */
function SectionTag({ label, num }) {
  return (
    <div className="section-head">
      <span className="section-head__line" />
      <span className="section-head__label">{label}</span>
      <span className="section-head__num">{num}</span>
    </div>
  );
}

/* ── TOPBAR ──────────────────────────────────────────────── */
function Topbar({ active }) {
  return (
    <header className="topbar">
      <div className="topbar-brand">Akshatra Sen.</div>
      <nav>
        <ul className="topbar-nav">
          {NAV_ITEMS.map(n => (
            <li key={n}>
              <a href={`#${n}`} className={active === n ? "active" : ""}>
                {n === "Hero" ? "Home" : n}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    <a 
  href="/resume.pdf"
  target="_blank"
  rel="noreferrer"
  className="topbar-resume"
>
  Resume
</a>
    </header>
  );
}

/* ── HERO ────────────────────────────────────────────────── */
function Hero() {
  const role = useTypewriter([
  "Full-Stack Developer",
  "Software Engineer",
  "React & Node.js Builder",
  "Product-minded Developer",
]);
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), 100); return () => clearTimeout(t); }, []);
  const a = (d, y = 20) => ({
    opacity: m ? 1 : 0,
    transform: m ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  return (
    <section id="Hero" className="section hero" style={{ paddingLeft:72, paddingRight:72 }}>
      <div className="hero-inner">
        <div className="hero-copy">
          <div style={a(60)}>
           <div className="status-pill">
  <span className="status-dot" />
  Full-Stack Developer · Open to Opportunities
</div>
          </div>
          <div style={a(140)}>
            <h1>Akshatra<br />Sen<span className="blue">.</span></h1>
          </div>
          <div style={a(210)}>
            <div className="hero-kicker">
              <span>{role}</span>
              <span className="hero-caret" />
            </div>
          </div>
          <div style={a(280)}>
           <p className="hero-lede">
  I engineer complete software systems — clean interfaces, reliable APIs, scalable databases, and production-ready deployments. I write code that ships and scales.
</p>
          </div>
          <div style={a(340)}>
            <div className="hero-stack">
              {["JavaScript","React","Node.js","Express","MongoDB","PostgreSQL"].map(t => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>
          <div style={a(400)}>
            <div className="hero-actions">
              <a href="#Projects" className="btn btn-primary">View product work</a>
              <a href="#Contact" className="btn btn-secondary">Start a conversation</a>
        <a 
  href="/resume.pdf"
  target="_blank"
  rel="noreferrer"
  className="btn btn-resume"
>
  Resume
</a>
            </div>
          </div>
          {/* FIX #4 — icon-only social buttons, horizontal */}
          <div style={a(460)}>
            <div className="hero-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="social-icon-btn" title={s.label} aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={160} className="hero-visual">
          <div className="portrait-shell">
            <div className="portrait-frame">
              <img src={heroImage} alt="Akshatra Sen" style={{width:"100%",height:"100%",objectFit:"cover"}} />
            </div>
          </div>
          <div className="hero-panel hero-panel--top glass">
            <div className="mini-label">Currently building</div>
            <div className="mini-value">Dashboards, platforms &amp; polished web apps.</div>
            <div className="metric-grid">
              <div className="metric-cell"><strong>4+</strong><span>Shipped Projects</span></div>
              <div className="metric-cell"><strong>Full</strong><span>Stack Engineer</span></div>
              <div className="metric-cell"><strong>MERN</strong><span>Core Stack</span></div>
            </div>
          </div>
          <div className="hero-panel hero-panel--bottom glass">
            <div className="mini-label">Open to</div>
            <div className="mini-value">Internships, full-time roles &amp; product teams.</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const ABOUT_STATS = [
  { value: "4+", label: "Projects Shipped" },
  { value: "SIH", label: "Runner-Up" },
  { value: "MERN", label: "Core Stack" },
  { value: "6th", label: "Sem CSE" },
];

const ABOUT_JOURNEY = [
  { num: "01", title: "Problem Solver", desc: "I break down complex workflows into elegant, scalable solutions that make sense for both users and systems." },
  { num: "02", title: "Full-Stack Builder", desc: "From pixel-perfect UIs to robust APIs, I own the entire product lifecycle from concept to deployment." },
  { num: "03", title: "Product Thinker", desc: "I balance technical excellence with real-world usability — every feature starts with the end user in mind." },
  { num: "04", title: "Quality First", desc: "Clean code, clear architecture, and maintainable systems are the foundation of every build." },
];

const PROCESS_STEPS = [
  { step: "Understand", desc: "Dive deep into requirements and user workflows before writing a line." },
  { step: "Design", desc: "Architect scalable systems and map out intuitive interactions." },
  { step: "Build", desc: "Write clean, maintainable, production-ready code with clear boundaries." },
  { step: "Polish", desc: "Refine the details until the experience feels dependable and fast." },
];

function About() {
  return (
    <section id="About" className="section">
      <div className="section-inner">

        {/* 1. Full-width: section tag + big heading */}
        <Reveal>
          <SectionTag label="About Me" num="// 01" />
         <h2 className="section-title">
  Engineering software<br />that <span className="blue">works</span>,<br />scales, and lasts.
</h2>
        </Reveal>

        {/* 2. Two-column: LEFT = description + socials + stats | RIGHT = How I Work */}
        <div className="about-two-col" style={{ marginBottom: 64 }}>

          {/* LEFT col */}
          <div>
            {/* Description paragraphs */}
            <div style={{ display:"grid", gap:14, marginBottom:28 }}>
              {[
                "Hi, I'm Akshatra Sen — a Full-Stack Software Developer and B.Tech CSE student who builds complete, production-ready web applications from the ground up.",
"I work across the entire stack: designing interfaces, building REST APIs, modelling databases, handling authentication, and deploying to cloud infrastructure.",
"I care about writing clean, maintainable code — not just making things look good, but making them work reliably at scale.",
              ].map((p, i) => (
                <Reveal key={i} delay={100 + i * 70}>
                  <p className="body-copy">{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Stats cards — 4+, SIH, MERN, 6th */}
            <Reveal delay={380}>
              <div className="about-stats-row">
                {ABOUT_STATS.map(s => (
                  <div key={s.label} className="stat-box">
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT col — How I Work */}
          <div>
            <Reveal delay={100}>
              <div className="about-subheading">How I Work</div>
            </Reveal>
            <div className="process-list">
              {PROCESS_STEPS.map((item, i) => (
                <Reveal key={item.step} delay={140 + i * 80}>
                  <div className="process-item">
                    <div className="process-bubble">
                      <span className="process-number">{i + 1}</span>
                    </div>
                    <div className="process-content">
                      <div className="process-step">{item.step}</div>
                      <p className="process-desc">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Full-width: Technical Expertise */}
        <Reveal delay={100}>
          <div className="about-subheading" style={{ marginBottom: 20 }}>Technical Expertise</div>
        </Reveal>
        <div className="skill-grid" style={{ marginBottom: 64 }}>
          {Object.entries(SKILLS).map(([cat, tags], i) => (
            <Reveal key={cat} delay={120 + i * 90}>
              <div className="skill-card glass">
                <div className="skill-card__cat">{cat}</div>
                <div className="skill-tags">
                  {tags.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 4. Full-width: My Approach journey cards */}
        <Reveal delay={100}>
          <div className="about-subheading" style={{ marginBottom: 20 }}>My Approach</div>
        </Reveal>
        <div className="journey-grid">
          {ABOUT_JOURNEY.map((item, i) => (
            <Reveal key={item.num} delay={140 + i * 80}>
              <div className="journey-card glass">
                <div className="journey-num">{item.num}</div>
                <div className="journey-body">
                  <div className="journey-title">{item.title}</div>
                  <p className="journey-desc">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── PROJECT PREVIEW ──────────────────────────────────────── */
function ProductPreview({ project }) {
  const imgs = project.images || (project.img ? [project.img] : null);

  return (
    <div className="project-preview">
      {imgs ? (
        <img src={imgs[0]} alt={project.title} className="preview-img" />
      ) : (
        <>
          <div className="preview-grid" />
          <div className="dashboard-window">
            <div className="window-bar"><i /><i /><i /></div>
            <div className="window-body">
              <div className="chart-card" />
              <div className="list-card"><span /><span /><span /><span /></div>
            </div>
          </div>
          <div className="stat-badge">
            <strong>{project.id}</strong>
            <span>{project.metric}</span>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  return (
    <article ref={ref} className={`project-card glass ${project.featured ? "featured" : ""}`}
      style={{ opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(30px)", transition:`opacity .8s cubic-bezier(.16,1,.3,1) ${index*90}ms,transform .8s cubic-bezier(.16,1,.3,1) ${index*90}ms,box-shadow .35s,border-color .35s` }}>
      <ProductPreview project={project} />
      <div className="project-body">
        <div>
          <div className="project-index">{project.id}</div>
          <div className="eyebrow">{project.eyebrow}</div>
          <h3>{project.title}</h3>
          <p className="body-copy">{project.desc}</p>
        </div>
        <div>
          <div className="project-tags">{project.stack.map(s => <span key={s}>{s}</span>)}</div>
          <div className="project-links">
            {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live</a>}
            {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── PROJECTS ────────────────────────────────────────────── */
function Projects() {
  return (
    <section id="Projects" className="section">
      <div className="section-inner">
        <Reveal><SectionTag label="Projects" num="// 02" /></Reveal>
        <div className="projects-lead">
          <Reveal delay={80}>
            <h2 className="section-title">Product work with<br />dashboard-grade polish.</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-copy" style={{ maxWidth:"56ch" }}>Selected builds framed as real product surfaces — clear hierarchy, operational logic, and interface systems that scale beyond a class demo.</p>
          </Reveal>
        </div>
        <div className="project-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ── EXPERIENCE ──────────────────────────────────────────── */
function Experience() {
  return (
    <section id="Experience" className="section">
      <div className="section-inner">
        <Reveal><SectionTag label="Experience & Achievements" num="// 03" /></Reveal>
        <Reveal delay={80}><h2 className="section-title">The work &amp; the <span className="blue">wins</span>.</h2></Reveal>
        <div className="exp-list">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.title} delay={i * 100}>
              <div>
                <div className="exp-row">
                  <div>
                    <div className="exp-period">{e.period}</div>
                    <span className="exp-type">{e.type}</span>
                  </div>
                  <div className="exp-main">
                    <h3>{e.title}</h3>
                    <div className="exp-org">{e.org} / {e.location}</div>
                    <p className="body-copy">{e.desc}</p>
                    <div className="project-tags" style={{ marginTop:14 }}>
                      {e.tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
                {i < EXPERIENCE.length - 1 && <div className="soft-divider" />}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ─────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1400);
  };

  return (
    <section id="Contact" className="section">
      <div className="section-inner contact-grid">
        <div>
          <Reveal><SectionTag label="Contact" num="// 04" /></Reveal>
          <Reveal delay={80}><h2 className="section-title">Let's build<br />something <span className="blue">useful</span>.</h2></Reveal>
          <Reveal delay={160}>
            <p className="body-copy" style={{ marginTop:20, maxWidth:"44ch" }}>
              Open to product engineering roles, internships, freelance builds, and conversations with teams making thoughtful software.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:"#526075", marginTop:16, marginBottom:20 }}>
              akshatsen955@gmail.com
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
              {SOCIALS.map((s, i) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="social-icon-btn" title={s.label} aria-label={s.label}
                  style={{ animationDelay: i * 60 + "ms" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <form onSubmit={submit} className="contact-card glass form">
            {[{id:"name",label:"Your name",type:"text",ph:"Akshatra Sen"},{id:"email",label:"Email address",type:"email",ph:"akshatra@example.com"}].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id}>{f.label}</label>
                <input id={f.id} className="input-f" type={f.type} placeholder={f.ph} value={form[f.id]} onChange={e => setForm({...form,[f.id]:e.target.value})} />
              </div>
            ))}
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" className="input-f" placeholder="Tell me about the project, role, or idea..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status==="sending"||status==="sent"}
              style={{ justifySelf:"start", opacity:status==="sending"||status==="sent"?0.65:1 }}>
              {status==="sending"?"Sending...":status==="sent"?"✓ Message sent!":"Send message"}
            </button>
            {status==="sent" && <p style={{ color:"#16a34a", fontSize:"0.86rem", fontWeight:600 }}>Thanks. I'll get back to you soon.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ── APP ──────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("Hero");
  useEffect(() => {
    const sections = NAV_ITEMS.map(n => document.getElementById(n)).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin:"-35% 0px -45% 0px", threshold:0 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Topbar active={active} />
      <main className="page-shell">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
        <footer className="footer">
          <div className="footer-inner">
            <span>Designed &amp; Built by Akshatra Sen · 2026</span>
            <span>AKSHATRA.DEV</span>
          </div>
        </footer>
      </main>
    </>
  );
}