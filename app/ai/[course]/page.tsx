import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCourse,
  getCoursesWithContent,
  type CourseProject,
  type CourseSection,
} from "../courses";
import { Toolchain } from "./Toolchain";

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
        .aic-toc {
          margin-top: 28px;
          padding: 18px 20px;
          border: 1px solid var(--border);
          border-radius: 6px;
        }
        .aic-toc ol {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .aic-toc a {
          display: inline-flex;
          gap: 12px;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          line-height: 1.6;
          color: var(--subtle);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .aic-toc a:hover { color: var(--aic-accent); }
        .aic-num {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          color: var(--aic-accent);
          flex-shrink: 0;
        }
        .aic-numbered { scroll-margin-top: 96px; }
        .aic-section-title {
          display: flex;
          align-items: baseline;
          gap: 14px;
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: clamp(1.25rem, 2.4vw, 1.5rem);
          line-height: 1.3;
          color: var(--text);
        }
        .aic-section-title .aic-num {
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 1px;
        }
        .aic-context {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--subtle);
          margin-top: 10px;
        }
        .aic-continues {
          margin-top: 20px;
          font-size: 13px;
          line-height: 1.7;
          color: var(--subtle);
        }
        .aic-inline-link {
          color: var(--aic-accent);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .aic-toc a:focus-visible,
        .aic-inline-link:focus-visible {
          outline: 2px solid var(--aic-accent);
          outline-offset: 3px;
          border-radius: 2px;
        }
        .aic-hint {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.5px;
          color: var(--subtle);
          margin-top: 8px;
        }
        .aic-reflection {
          font-family: var(--font-playfair), Georgia, serif;
          font-style: italic;
          font-size: 17px;
          line-height: 1.7;
          color: var(--text);
          margin-top: 14px;
        }
        /* Project callout: accent-tinted panel with a solid accent button */
        .aic-project {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px 24px;
          margin-top: 24px;
          padding: 20px 22px;
          border: 1px solid var(--aic-accent);
          border-radius: 6px;
          background: color-mix(in srgb, var(--aic-accent) 12%, var(--panel));
        }
        /* lighter tint in light mode keeps accent text above 4.5:1 */
        :root[data-theme="light"] .aic-project {
          background: color-mix(in srgb, var(--aic-accent) 6%, var(--panel));
        }
        .aic-section > .aic-project:first-child { margin-top: 0; }
        .aic-project-label {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--aic-accent);
        }
        .aic-project-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: clamp(1.25rem, 2.4vw, 1.5rem);
          line-height: 1.3;
          color: var(--text);
          margin-top: 4px;
        }
        .aic-project-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--bg);
          background: var(--aic-accent);
          border: 1px solid var(--aic-accent);
          border-radius: 3px;
          padding: 12px 18px;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .aic-project-link:hover {
          background: transparent;
          color: var(--aic-accent);
        }
        .aic-project-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .aic-project-link:hover .aic-project-arrow { transform: translateX(4px); }

        /* ── Toolchain loop ── */
        .aic-section--toolchain { background: var(--surface); }
        .tc { margin-top: 20px; }
        .tc-loop {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 22px;
        }
        .tc-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--panel);
          border: 1px solid var(--border);
          border-top: 2px solid var(--border);
          border-radius: 4px;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .tc-stage--active {
          border-color: var(--aic-accent);
          background: var(--raised);
        }
        /* arrow to the next stage */
        .tc-stage:not(:last-child)::after {
          content: "→" / "";
          position: absolute;
          right: -17px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 13px;
          color: var(--subtle);
        }
        .tc-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 14px 14px 6px;
          color: inherit;
          font: inherit;
          cursor: inherit;
          border-radius: 4px 4px 0 0;
        }
        .tc-num {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 1px;
          color: var(--aic-accent);
        }
        .tc-name {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 1.15rem;
          line-height: 1.25;
          color: var(--text);
        }
        .tc-tool {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.5px;
          color: var(--aic-accent);
        }
        .tc-desc {
          padding: 4px 14px 14px;
          font-size: 12px;
          line-height: 1.6;
          color: var(--subtle);
        }
        .tc-stage--active .tc-desc { color: var(--text); }
        .tc-btn:hover .tc-name { color: var(--aic-accent); }
        .tc-btn:focus-visible,
        .tc-step:focus-visible,
        .aic-project-link:focus-visible {
          outline: 2px solid var(--aic-accent);
          outline-offset: 3px;
        }
        /* U-shaped connector from the last stage back to the first */
        .tc-return {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 10%;
        }
        .tc-return-line {
          align-self: stretch;
          height: 18px;
          border: 1px dashed var(--aic-accent);
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .tc-return-label {
          margin-top: 8px;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.5px;
          color: var(--aic-accent);
        }
        .tc-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .tc-status {
          flex: 1;
          text-align: center;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          line-height: 1.6;
          color: var(--subtle);
        }
        .tc-step {
          flex-shrink: 0;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--aic-accent);
          background: none;
          border: 1px solid var(--aic-accent);
          border-radius: 3px;
          padding: 8px 12px;
          cursor: inherit;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .tc-step:hover {
          background: var(--aic-accent);
          color: var(--bg);
        }
        @media (max-width: 900px) {
          .tc-loop { grid-template-columns: 1fr; gap: 26px; }
          .tc-stage:not(:last-child)::after {
            content: "↓" / "";
            right: auto;
            left: 50%;
            top: auto;
            bottom: -22px;
            transform: translateX(-50%);
          }
          .tc-return-line { display: none; }
          .tc-return { margin: 14px 0 0; }
          .tc-controls { flex-wrap: wrap; }
          .tc-status { order: -1; flex-basis: 100%; }
          .tc-step { flex: 1; }
        }

        @media (max-width: 640px) {
          .aic-page { padding: 104px 16px 64px; }
          .aic-section { padding: 22px 18px; }
          .aic-toc { padding: 14px 16px; }
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

      {course.sections?.length ? (
        <>
          <nav className="aic-toc" aria-label="On this page">
            <ol>
              {course.sections.map((section, i) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span className="aic-num">{pad(i + 1)}</span>{" "}
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {course.sections.map((section, i) => (
            <NumberedSection
              key={section.id}
              section={section}
              number={i + 1}
              allSections={course.sections!}
            />
          ))}
        </>
      ) : null}

      {course.toolchain && (
        <section
          className="aic-section aic-section--toolchain"
          aria-labelledby="toolchain-heading"
        >
          <h2 id="toolchain-heading" className="aic-label">
            {course.toolchain.label}
          </h2>
          <p className="aic-hint">
            An iterative loop. Select a stage, or step through it.
          </p>
          <Toolchain stages={course.toolchain.stages} />
          {course.project && (
            <ProjectCallout project={course.project} headingLevel="h3" />
          )}
        </section>
      )}

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

      {course.reflection && (
        <section className="aic-section" aria-labelledby="reflection-heading">
          <h2 id="reflection-heading" className="aic-label">
            {course.reflection.label}
          </h2>
          <p className="aic-reflection">{course.reflection.text}</p>
        </section>
      )}

      {/* Shown inside the toolchain when there is one, otherwise on its own */}
      {course.project && !course.toolchain && (
        <section className="aic-section" aria-labelledby="project-heading">
          <ProjectCallout project={course.project} headingLevel="h2" />
        </section>
      )}

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

const pad = (n: number) => String(n).padStart(2, "0");

function ProjectCallout({
  project,
  headingLevel: Heading,
}: {
  project: CourseProject;
  headingLevel: "h2" | "h3";
}) {
  return (
    <div className="aic-project">
      <div>
        <p className="aic-project-label">Project</p>
        <Heading id="project-heading" className="aic-project-title">
          {project.title}
        </Heading>
      </div>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="aic-project-link"
      >
        {project.linkText} <span aria-hidden="true" className="aic-project-arrow">→</span>
        <span className="sr-only"> {project.title} (opens in a new tab)</span>
      </a>
    </div>
  );
}

function NumberedSection({
  section,
  number,
  allSections,
}: {
  section: CourseSection;
  number: number;
  allSections: CourseSection[];
}) {
  const headingId = `${section.id}-heading`;
  const nextIndex = section.continuesIn
    ? allSections.findIndex((s) => s.id === section.continuesIn!.sectionId)
    : -1;

  return (
    <section
      id={section.id}
      className="aic-section aic-numbered"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="aic-section-title">
        <span className="aic-num">{pad(number)}</span>{" "}
        {section.title}
      </h2>
      {section.context && <p className="aic-context">{section.context}</p>}
      {section.description && <p className="aic-text">{section.description}</p>}

      {section.contribution && (
        <p className="aic-setup">
          <span className="aic-setup-label">My contribution</span>
          <span>{section.contribution}</span>
        </p>
      )}

      {section.learned?.length ? (
        <>
          <h3 className="aic-sublabel">What I learned</h3>
          <ul className="aic-list">
            {section.learned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      {section.links?.length ? (
        <>
          <h3 className="aic-sublabel">Linked work</h3>
          <ExternalLinks links={section.links} />
        </>
      ) : null}

      {section.continuesIn && nextIndex >= 0 && (
        <p className="aic-continues">
          {section.continuesIn.text}{" "}
          <a href={`#${section.continuesIn.sectionId}`} className="aic-inline-link">
            section {pad(nextIndex + 1)}: {allSections[nextIndex].title}
          </a>
          .
        </p>
      )}
    </section>
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
