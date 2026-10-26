import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Keziah Vickraman",
  description:
    "Professional and pet projects: the Masters Career App, and an econometrics paper on the IPL Impact Player rule that I’m looking to improve.",
};

function ExternalLink({
  href,
  children,
  context,
}: {
  href: string;
  children: React.ReactNode;
  context?: string; // extra words for screen readers
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="pp-link">
      {children}
      <span className="sr-only">
        {context ? ` ${context}` : ""} (opens in a new tab)
      </span>
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <main className="pp-page">
      <style>{`
        .pp-page {
          max-width: 1180px;
          margin: 0 auto;
          padding: 104px 40px 64px;
          background: var(--bg);
        }
        .pp-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(2.4rem, 4vw, 3.25rem);
          line-height: 1.1;
          color: var(--accent);
        }
        .pp-groups {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px 64px;
          align-items: start;
        }
        .pp-group-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.25;
          color: var(--text);
        }
        .pp-group-meta {
          margin-top: 4px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--subtle);
        }
        .pp-list {
          list-style: none;
          margin-top: 16px;
          border-top: 1px solid var(--accent2);
        }
        .pp-list--gold { border-top-color: var(--accent); }
        .pp-entry {
          padding: 18px 2px;
          border-bottom: 1px solid var(--border);
        }
        .pp-entry-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: 1.2rem;
          line-height: 1.3;
          color: var(--text);
        }
        .pp-text {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text);
        }
        .pp-entry-title + .pp-text { margin-top: 6px; }
        .pp-text--muted { color: var(--subtle); }
        .pp-note {
          margin-top: 6px;
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--subtle);
        }
        .pp-links {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 20px;
          margin-top: 12px;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 13px;
        }
        .pp-link {
          color: var(--accent);
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
          transition: opacity 0.2s ease;
        }
        .pp-link:hover { opacity: 0.75; }
        .pp-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
          border-radius: 2px;
        }

        @media (max-width: 860px) {
          .pp-groups { grid-template-columns: minmax(0, 1fr); gap: 36px; }
        }
        @media (max-width: 640px) {
          .pp-page { padding: 92px 16px 48px; }
          .pp-groups { margin-top: 28px; }
          .pp-entry { padding: 16px 0; }
        }
      `}</style>

      <h1 className="pp-title animate-fade-up">Projects</h1>

      <div className="pp-groups">
        <section aria-labelledby="professional-heading">
          <h2 id="professional-heading" className="pp-group-title">
            Professional
          </h2>
          <ul className="pp-list pp-list--gold">
            <li className="pp-entry">
              <h3 className="pp-entry-title">Masters Career App</h3>
              <p className="pp-text">
                Built a career preparation app that scans GitHub repositories
                for interview questions and SKILLS.md content, bringing
                together practice questions to help users prepare for their
                target roles.
              </p>
              <p className="pp-links">
                <ExternalLink
                  href="https://smu-masters-career-app.vercel.app/"
                  context="Masters Career App"
                >
                  Explore the App <span aria-hidden="true">→</span>
                </ExternalLink>
                <ExternalLink
                  href="https://github.com/KeziahVickraman/smu-masters-career-app"
                  context="for Masters Career App on GitHub"
                >
                  View Code <span aria-hidden="true">↗</span>
                </ExternalLink>
              </p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="pet-heading">
          <h2 id="pet-heading" className="pp-group-title">
            Pet projects
          </h2>
          <p className="pp-group-meta">
            Projects I’m interested in building, out of pure interest.
          </p>
          <ul className="pp-list">
            <li className="pp-entry">
              <p className="pp-text">
                Cricket: an econometrics project exploring the IPL Impact
                Player rule —{" "}
                <ExternalLink href="https://keziahvickraman.github.io/ipl-impact-player/ipl_impact_player_paper.html">
                  live link <span aria-hidden="true">↗</span>
                </ExternalLink>
              </p>
              <p className="pp-note">
                The paper is finished; I’m now looking to make it better.
              </p>
            </li>
            <li className="pp-entry">
              <p className="pp-text pp-text--muted">
                More sports-related projects to come.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
