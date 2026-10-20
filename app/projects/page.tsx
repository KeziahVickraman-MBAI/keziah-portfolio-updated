import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Keziah Vickraman",
  description:
    "Professional and pet projects: the Masters Career App, and an econometrics paper on the IPL Impact Player rule that I’m looking to improve.",
};

export default function ProjectsPage() {
  return (
    <main className="pp-page">
      <style>{`
        .pp-page {
          min-height: 100vh;
          background: var(--bg);
          max-width: 700px;
          margin: 0 auto;
          padding: 120px 48px 80px;
        }
        .pp-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(48px, 7vw, 80px);
          font-style: italic;
          font-weight: 700;
          line-height: 1.1;
          color: var(--accent);
          margin-bottom: 40px;
        }
        .pp-heading {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent2);
          margin-bottom: 16px;
        }
        .pp-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pp-item {
          background: var(--panel);
          border-left: 3px solid var(--accent2);
          border-radius: 0 6px 6px 0;
          padding: 18px 20px;
          font-size: 14px;
          line-height: 1.7;
          color: var(--text);
        }
        .pp-item--muted { color: var(--subtle); }
        .pp-note {
          display: block;
          margin-top: 6px;
          font-size: 12px;
          color: var(--subtle);
        }
        .pp-link {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
          white-space: nowrap;
        }
        .pp-link:hover { opacity: 0.8; }
        .pp-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
          border-radius: 2px;
        }
        .pp-section + .pp-section { margin-top: 48px; }
        .pp-sub {
          font-size: 13px;
          line-height: 1.6;
          color: var(--subtle);
          margin: -8px 0 16px;
        }
        .pp-card {
          background: var(--panel);
          border-left: 3px solid var(--accent);
          border-radius: 0 6px 6px 0;
          padding: 24px;
        }
        .pp-card-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: clamp(1.25rem, 2.4vw, 1.5rem);
          line-height: 1.3;
          color: var(--text);
        }
        .pp-card-text {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.7;
          color: var(--text);
        }
        .pp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }
        .pp-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 1px;
          color: var(--accent);
          border: 1px solid var(--accent);
          border-radius: 3px;
          padding: 10px 16px;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .pp-btn:hover {
          background: var(--accent);
          color: var(--bg);
        }
        .pp-btn--primary {
          font-weight: 600;
          background: var(--accent);
          color: var(--bg);
        }
        .pp-btn--primary:hover {
          background: transparent;
          color: var(--accent);
        }
        .pp-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        @media (max-width: 640px) {
          .pp-page { padding: 104px 16px 64px; }
          .pp-card { padding: 20px 18px; }
        }
      `}</style>

      <h1 className="pp-title">Projects</h1>

      <section className="pp-section" aria-labelledby="professional-heading">
        <h2 id="professional-heading" className="pp-heading">
          Professional
        </h2>
        <article className="pp-card" aria-labelledby="career-app-heading">
          <h3 id="career-app-heading" className="pp-card-title">
            Masters Career App
          </h3>
          <p className="pp-card-text">
            Built a career preparation app that scans GitHub repositories for
            interview questions and SKILLS.md content, bringing together
            practice questions to help users prepare for their target roles.
          </p>
          <div className="pp-actions">
            <a
              href="https://smu-masters-career-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-btn pp-btn--primary"
            >
              Explore the App <span aria-hidden="true">→</span>
              <span className="sr-only"> Masters Career App (opens in a new tab)</span>
            </a>
            <a
              href="https://github.com/KeziahVickraman/smu-masters-career-app"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-btn"
            >
              View Code <span aria-hidden="true">↗</span>
              <span className="sr-only"> for Masters Career App on GitHub (opens in a new tab)</span>
            </a>
          </div>
        </article>
      </section>

      <section className="pp-section" aria-labelledby="pet-heading">
        <h2 id="pet-heading" className="pp-heading">
          Pet projects
        </h2>
        <p className="pp-sub">
          Projects I’m interested in building, out of pure interest.
        </p>
        <ul className="pp-list">
          <li className="pp-item">
            Cricket: an econometrics project exploring the IPL Impact Player
            rule —{" "}
            <a
              href="https://keziahvickraman.github.io/ipl-impact-player/ipl_impact_player_paper.html"
              target="_blank"
              rel="noopener noreferrer"
              className="pp-link"
            >
              live link <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className="pp-note">
              The paper is finished; I’m now looking to make it better.
            </span>
          </li>
          <li className="pp-item pp-item--muted">
            More sports-related projects to come.
          </li>
        </ul>
      </section>
    </main>
  );
}
