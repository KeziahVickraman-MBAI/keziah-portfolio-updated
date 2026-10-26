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

// ── Course row ─────────────────────────────────────────────────────────────
// Courses with content link to their own page; the rest show a placeholder.

function CourseRow({ course }: { course: Course }) {
  if (!hasPortfolioContent(course)) {
    return (
      <li className="ai-row">
        <h3 className="ai-row-title">{course.title}</h3>
        <span className="ai-row-soon">Coming soon</span>
      </li>
    );
  }

  return (
    <li>
      <Link href={`/ai/${course.id}`} className="ai-row ai-row--link">
        <h3 className="ai-row-title">{course.title}</h3>
        <span className="ai-row-cta">
          View course <span aria-hidden="true" className="ai-row-arrow">→</span>
        </span>
      </Link>
    </li>
  );
}

// ── Course group ───────────────────────────────────────────────────────────

function CourseGroupList({ group }: { group: CourseGroup }) {
  const headingId = `${group.id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={`ai-group ai-group--${group.accent}`}
    >
      <h2 id={headingId} className="ai-group-title">
        {group.title}
      </h2>
      <p className="ai-group-meta">
        {group.label}
        {group.period && (
          <>
            {" · "}
            {group.period.dates}
            {group.period.status && <> · {group.period.status.toLowerCase()}</>}
          </>
        )}
      </p>
      <ul className="ai-rows">
        {group.courses.map((course) => (
          <CourseRow key={course.id} course={course} />
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
          max-width: 1180px;
          margin: 0 auto;
          padding: 104px 40px 64px;
          background: var(--bg);
        }
        .ai-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(2.4rem, 4vw, 3.25rem);
          line-height: 1.1;
          color: var(--accent);
        }
        .ai-intro {
          margin-top: 8px;
          max-width: 60ch;
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--subtle);
        }
        .ai-groups {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px 64px;
        }

        /* each group: a heading, one line of context, a ruled list */
        .ai-group--gold { --ai-accent: var(--accent); }
        .ai-group--teal { --ai-accent: var(--accent2); }
        .ai-group-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.25;
          color: var(--text);
        }
        .ai-group-meta {
          margin-top: 4px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--subtle);
        }
        .ai-rows {
          list-style: none;
          margin-top: 16px;
          border-top: 1px solid var(--ai-accent);
        }
        .ai-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 2px;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
        }
        .ai-row-title {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          color: var(--text);
        }
        .ai-row-soon,
        .ai-row-cta {
          flex-shrink: 0;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          white-space: nowrap;
        }
        .ai-row-soon { color: var(--subtle); }
        .ai-row-cta { color: var(--ai-accent); }
        .ai-row-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .ai-row--link .ai-row-title { transition: color 0.2s ease; }
        .ai-row--link:hover .ai-row-title { color: var(--ai-accent); }
        .ai-row--link:hover .ai-row-arrow { transform: translateX(4px); }
        .ai-row--link:focus-visible {
          outline: 2px solid var(--ai-accent);
          outline-offset: 2px;
          border-radius: 2px;
        }

        @media (max-width: 860px) {
          .ai-groups { grid-template-columns: minmax(0, 1fr); gap: 36px; }
        }
        @media (max-width: 640px) {
          .ai-page { padding: 92px 16px 48px; }
          .ai-groups { margin-top: 28px; }
          .ai-row { padding: 12px 0; }
          .ai-row-title { font-size: 13.5px; }
        }
      `}</style>

      <header className="animate-fade-up">
        <h1 className="ai-title">AI</h1>
        <p className="ai-intro">
          Exploring AI through professional learning and the SMU Master of
          Science in Business AI.
        </p>
      </header>

      <div className="ai-groups">
        {COURSE_GROUPS.map((group) => (
          <CourseGroupList key={group.id} group={group} />
        ))}
      </div>
    </main>
  );
}
