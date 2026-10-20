import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getCoursesWithContent } from "../courses";

// Only courses with portfolio content get a page; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCoursesWithContent().map((course) => ({ course: course.id }));
}

export async function generateMetadata(
  props: PageProps<"/ai/[course]">
): Promise<Metadata> {
  const { course: id } = await props.params;
  const found = getCourse(id);
  if (!found) return {};
  return {
    title: `${found.course.title} — AI — Keziah Vickraman`,
    description:
      found.course.overview ??
      `${found.course.title}: course work from ${found.group.title}.`,
  };
}

export default async function CoursePage(props: PageProps<"/ai/[course]">) {
  const { course: id } = await props.params;
  const found = getCourse(id);
  if (!found) notFound();
  const { course, group } = found;

  return (
    <main className={`aic-page aic-page--${group.accent}`}>
      <style>{`
        .aic-page {
          --aic-accent: var(--accent);
          min-height: 100vh;
          background: var(--bg);
          max-width: 900px;
          margin: 0 auto;
          padding: 120px 48px 80px;
        }
        .aic-page--teal { --aic-accent: var(--accent2); }
        .aic-back {
          display: inline-block;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.5px;
          color: var(--aic-accent);
          text-decoration: none;
          margin-bottom: 32px;
          transition: opacity 0.2s ease;
        }
        .aic-back:hover { opacity: 0.7; }
        .aic-eyebrow {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--aic-accent);
          margin-bottom: 10px;
        }
        .aic-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: clamp(2rem, 4.5vw, 3rem);
          line-height: 1.15;
          color: var(--text);
          margin-bottom: 16px;
        }
        .aic-overview {
          font-size: 14px;
          line-height: 1.75;
          color: var(--text);
          margin-bottom: 8px;
        }
        .aic-section {
          margin-top: 32px;
          padding: 28px 32px;
          border-radius: 0 6px 6px 0;
          background: var(--panel);
          border-left: 3px solid var(--aic-accent);
        }
        .aic-section--exercise {
          border-radius: 6px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-top: 2px solid var(--aic-accent);
        }
        .aic-label {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--aic-accent);
        }
        .aic-text {
          font-size: 14px;
          line-height: 1.75;
          color: var(--text);
          margin-top: 12px;
        }
        .aic-list {
          list-style: disc;
          padding-left: 18px;
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 14px;
          line-height: 1.75;
          color: var(--text);
        }
        .aic-list li::marker { color: var(--aic-accent); }
        .aic-collapse { margin-top: 20px; }
        .aic-summary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          list-style: none;
          cursor: inherit;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--subtle);
          border: 1px solid var(--border);
          border-radius: 3px;
          padding: 8px 14px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .aic-summary::-webkit-details-marker { display: none; }
        .aic-summary:hover {
          color: var(--aic-accent);
          border-color: var(--aic-accent);
        }
        .aic-summary:focus-visible {
          outline: 2px solid var(--aic-accent);
          outline-offset: 3px;
        }
        .aic-toggle-text::before { content: "Show"; }
        .aic-collapse[open] .aic-toggle-text::before { content: "Hide"; }
        .aic-chevron {
          display: inline-block;
          font-size: 12px;
          margin-left: 4px;
          transition: transform 0.2s ease;
        }
        .aic-collapse[open] .aic-chevron { transform: rotate(180deg); }
        .aic-writeup {
          margin-top: 20px;
          padding-top: 4px;
          border-top: 1px solid var(--border);
        }
        .aic-sublabel {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--subtle);
          margin-top: 28px;
        }
        .aic-sublabel + .aic-text { margin-top: 8px; }
        .aic-setup {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 6px 14px;
          margin-top: 24px;
          padding: 12px 14px;
          background: var(--panel);
          border-left: 2px solid var(--aic-accent);
          border-radius: 0 4px 4px 0;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          line-height: 1.6;
          color: var(--text);
        }
        .aic-setup-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--aic-accent);
        }
        .aic-links {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
          margin-top: 16px;
        }
        .aic-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          height: 100%;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.5px;
          line-height: 1.4;
          color: var(--aic-accent);
          border: 1px solid var(--aic-accent);
          border-radius: 3px;
          padding: 12px 14px;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .aic-link:hover {
          background: var(--aic-accent);
          color: var(--bg);
        }
        .aic-back:focus-visible,
        .aic-link:focus-visible {
          outline: 2px solid var(--aic-accent);
          outline-offset: 3px;
        }
        .aic-shots {
          display: grid;
          gap: 12px;
          margin-top: 32px;
        }
        @media (max-width: 640px) {
          .aic-page { padding: 104px 16px 64px; }
          .aic-section { padding: 22px 18px; }
        }
      `}</style>

      <Link href="/ai" className="aic-back">
        ← AI
      </Link>

      <header>
        <p className="aic-eyebrow">{group.title}</p>
        <h1 className="aic-title">{course.title}</h1>
        {course.overview && <p className="aic-overview">{course.overview}</p>}
      </header>

      {course.learned?.length ? (
        <section className="aic-section" aria-labelledby="learned-heading">
          <h2 id="learned-heading" className="aic-label">
            What I learned
          </h2>
          <ul className="aic-list">
            {course.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {course.built?.length ? (
        <section className="aic-section" aria-labelledby="built-heading">
          <h2 id="built-heading" className="aic-label">
            What I built
          </h2>
          <ul className="aic-list">
            {course.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {course.exercise && (
        <section
          className="aic-section aic-section--exercise"
          aria-labelledby="exercise-heading"
        >
          <h2 id="exercise-heading" className="aic-label">
            {course.exercise.label}
          </h2>
          <ExternalLinks links={course.exercise.links} />

          <details className="aic-collapse">
            <summary className="aic-summary">
              <span className="aic-toggle-text" aria-hidden="true" />
              <span>write-up</span>
              <span className="aic-chevron" aria-hidden="true">
                ▾
              </span>
            </summary>

            <div className="aic-writeup">
              <h3 className="aic-sublabel">Purpose</h3>
              {course.exercise.purpose.map((para) => (
                <p key={para} className="aic-text">
                  {para}
                </p>
              ))}

              {course.exercise.learned?.length ? (
                <>
                  <h3 className="aic-sublabel">What I learned</h3>
                  <ul className="aic-list">
                    {course.exercise.learned.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {course.exercise.setup && (
                <p className="aic-setup">
                  <span className="aic-setup-label">Local setup</span>
                  <span>{course.exercise.setup}</span>
                </p>
              )}

              {course.exercise.implementation && (
                <>
                  <h3 className="aic-sublabel">What the R script did</h3>
                  <p className="aic-text">{course.exercise.implementation}</p>
                </>
              )}
            </div>
          </details>
        </section>
      )}

      {course.screenshots?.length ? (
        <div className="aic-shots">
          {course.screenshots.map((shot) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={1600}
              height={1000}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
          ))}
        </div>
      ) : null}

      {course.links?.length ? (
        <section className="aic-section" aria-labelledby="links-heading">
          <h2 id="links-heading" className="aic-label">
            Links
          </h2>
          <ExternalLinks links={course.links} />
        </section>
      ) : null}
    </main>
  );
}

function ExternalLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="aic-links">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="aic-link"
          >
            <span>{link.label}</span>
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
