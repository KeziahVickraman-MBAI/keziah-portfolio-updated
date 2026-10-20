import type { Metadata } from "next";
import Link from "next/link";
import {
  COURSE_GROUPS,
  hasPortfolioContent,
  type Course,
  type CourseGroup,
} from "./courses";

export const metadata: Metadata = {
  title: "AI — Keziah Vickraman",
  description:
    "Exploring AI through professional learning and the SMU Master of Science in Business AI.",
};

// ── Course card ────────────────────────────────────────────────────────────
// Courses with content link to their own page; the rest show a placeholder.

function CourseCard({ course }: { course: Course }) {
  if (!hasPortfolioContent(course)) {
    return (
      <li className="ai-card">
        <h3 className="ai-card-title">{course.title}</h3>
        <p className="ai-card-status">Portfolio content coming soon</p>
      </li>
    );
  }

  return (
    <li>
      <Link href={`/ai/${course.id}`} className="ai-card ai-card--link">
        <h3 className="ai-card-title">{course.title}</h3>
        <p className="ai-card-cta">
          View course <span aria-hidden="true" className="ai-card-arrow">→</span>
        </p>
      </Link>
    </li>
  );
}

// ── Panel ──────────────────────────────────────────────────────────────────

function CoursePanel({ group }: { group: CourseGroup }) {
  const headingId = `${group.id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={`ai-panel ai-panel--${group.accent}`}
    >
      <p className="ai-panel-label">{group.label}</p>
      <h2 id={headingId} className="ai-panel-title">
        {group.title}
      </h2>
      <ul className="ai-card-grid">
        {group.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ul>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function AIPage() {
  return (
    <main className="ai-page">
      <style>{`
        .ai-page {
          --ai-panel-accent: var(--accent);
          --ai-soft: var(--subtle);
          min-height: 100vh;
          background: var(--bg);
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 48px 80px;
        }
        .ai-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(48px, 7vw, 80px);
          line-height: 1.1;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .ai-intro {
          font-family: var(--font-playfair), Georgia, serif;
          font-style: italic;
          font-size: 18px;
          line-height: 1.6;
          color: var(--ai-soft);
          max-width: 640px;
          margin-bottom: 56px;
        }
        .ai-panels {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 900px) {
          .ai-panels {
            grid-template-columns: 1fr 1fr;
            align-items: stretch;
          }
        }
        .ai-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-top: 2px solid var(--ai-panel-accent);
          border-radius: 6px;
          padding: 32px;
        }
        .ai-panel--gold { --ai-panel-accent: var(--accent); }
        .ai-panel--teal { --ai-panel-accent: var(--accent2); }
        .ai-panel-label {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ai-panel-accent);
          margin-bottom: 8px;
        }
        .ai-panel-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          line-height: 1.2;
          color: var(--text);
          margin-bottom: 28px;
        }
        .ai-card-grid {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ai-card {
          background: var(--panel);
          border-radius: 6px;
          border-left: 3px solid var(--ai-panel-accent);
          padding: 20px;
        }
        .ai-card-title {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.5;
          color: var(--text);
        }
        .ai-card-status {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 1px;
          color: var(--ai-soft);
          margin-top: 8px;
        }
        .ai-card--link {
          display: block;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .ai-card--link:hover { background: var(--raised); }
        .ai-card--link:focus-visible {
          outline: 2px solid var(--ai-panel-accent);
          outline-offset: 3px;
        }
        .ai-card-cta {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 1px;
          color: var(--ai-panel-accent);
          margin-top: 8px;
        }
        .ai-card-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .ai-card--link:hover .ai-card-arrow { transform: translateX(4px); }
        @media (max-width: 640px) {
          .ai-page { padding: 104px 16px 64px; }
          .ai-intro { font-size: 16px; margin-bottom: 40px; }
          .ai-panel { padding: 24px 16px; }
        }
      `}</style>

      <header className="animate-fade-up">
        <h1 className="ai-title">AI</h1>
        <p className="ai-intro">
          Exploring AI through professional learning and the SMU Master of
          Science in Business AI.
        </p>
      </header>

      <div className="ai-panels">
        {COURSE_GROUPS.map((group) => (
          <CoursePanel key={group.id} group={group} />
        ))}
      </div>
    </main>
  );
}
