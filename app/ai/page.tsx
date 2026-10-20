import type { Metadata } from "next";
import Image from "next/image";
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

function CourseCard({ course }: { course: Course }) {
  const showContent = hasPortfolioContent(course);

  return (
    <li className="ai-card">
      <h3 className="ai-card-title">{course.title}</h3>

      {!showContent && <p className="ai-card-status">Portfolio content coming soon</p>}

      {course.overview && <p className="ai-card-text">{course.overview}</p>}

      {course.built?.length ? (
        <section className="ai-card-section">
          <h4 className="ai-card-label">What I built</h4>
          <ul className="ai-card-list">
            {course.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {course.learned?.length ? (
        <section className="ai-card-section">
          <h4 className="ai-card-label">What I learned</h4>
          <ul className="ai-card-list">
            {course.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {course.exercise && (
        <section className="ai-exercise">
          <h4 className="ai-card-label">{course.exercise.label}</h4>
          <p className="ai-card-text">{course.exercise.summary}</p>
          <ul className="ai-exercise-links">
            {course.exercise.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ai-exercise-link"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.screenshots?.length ? (
        <div className="ai-card-shots">
          {course.screenshots.map((shot) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={800}
              height={500}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
          ))}
        </div>
      ) : null}

      {course.links?.length ? (
        <div className="ai-card-links">
          {course.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ai-card-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
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
        .ai-card-text,
        .ai-card-list {
          font-size: 13px;
          line-height: 1.75;
          color: var(--text);
          margin-top: 12px;
        }
        .ai-card-list {
          list-style: disc;
          padding-left: 18px;
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ai-card-list li::marker { color: var(--ai-panel-accent); }
        .ai-exercise {
          margin-top: 20px;
          padding: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
        }
        .ai-exercise .ai-card-text { margin-top: 8px; }
        .ai-exercise-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 14px;
        }
        .ai-exercise-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.5px;
          line-height: 1.4;
          color: var(--ai-panel-accent);
          border: 1px solid var(--ai-panel-accent);
          border-radius: 3px;
          padding: 10px 12px;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .ai-exercise-link:hover {
          background: var(--ai-panel-accent);
          color: var(--bg);
        }
        .ai-exercise-link:focus-visible,
        .ai-card-link:focus-visible {
          outline: 2px solid var(--ai-panel-accent);
          outline-offset: 3px;
        }
        .ai-card-section { margin-top: 16px; }
        .ai-card-label {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ai-panel-accent);
        }
        .ai-card-shots {
          display: grid;
          gap: 8px;
          margin-top: 16px;
        }
        .ai-card-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }
        .ai-card-link {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: var(--ai-panel-accent);
          border: 1px solid var(--ai-panel-accent);
          border-radius: 3px;
          padding: 5px 12px;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .ai-card-link:hover { opacity: 0.8; }
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
