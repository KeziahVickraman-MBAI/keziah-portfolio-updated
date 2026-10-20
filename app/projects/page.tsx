import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Keziah Vickraman",
  description:
    "Projects I’m interested in building, including improving my econometrics paper on the IPL Impact Player rule.",
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
        @media (max-width: 640px) {
          .pp-page { padding: 104px 16px 64px; }
        }
      `}</style>

      <h1 className="pp-title">Projects</h1>

      <section aria-labelledby="interested-heading">
        <h2 id="interested-heading" className="pp-heading">
          Projects I’m interested in building
        </h2>
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
