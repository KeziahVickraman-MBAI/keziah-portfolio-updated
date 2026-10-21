"use client";

import type { SyntheticEvent } from "react";

// "Why this cursor?" disclosure for the homepage. The illustration mirrors
// the custom cursor (gold dot, teal ring) so touch users get the reference.
export function CursorNote() {
  // The homepage's left column scrolls on its own; when the note opens at the
  // bottom of it, bring the new text into view.
  const onToggle = (e: SyntheticEvent<HTMLDetailsElement>) => {
    const el = e.currentTarget;
    if (!el.open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <details className="cn" onToggle={onToggle}>
      <style>{`
        .cn { margin-top: 20px; }
        .cn-summary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          list-style: none;
          cursor: inherit;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--subtle);
          padding: 4px 2px;
          border-radius: 3px;
          transition: color 0.2s ease;
        }
        .cn-summary::-webkit-details-marker { display: none; }
        .cn-summary:hover { color: var(--accent); }
        .cn-summary:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }
        .cn-mark {
          position: relative;
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border: 1px solid var(--accent2);
          border-radius: 50%;
        }
        .cn-mark::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          transform: translate(-50%, -50%);
        }
        .cn-chevron {
          font-size: 12px;
          transition: transform 0.2s ease;
        }
        .cn[open] .cn-chevron { transform: rotate(180deg); }
        .cn-body {
          margin-top: 14px;
          padding: 18px 20px;
          background: var(--panel);
          border-left: 3px solid var(--accent2);
          border-radius: 0 8px 8px 0;
        }
        .cn-heading {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent2);
          margin-bottom: 12px;
        }
        .cn-text {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          line-height: 1.625;
          color: var(--text);
        }
        .cn-text + .cn-text { margin-top: 1.2em; }
        .cn-strong {
          font-weight: 700;
          color: var(--accent);
        }
        .cn-text--close {
          font-style: italic;
          color: var(--accent);
        }
        @media (prefers-reduced-motion: reduce) {
          .cn-chevron { transition: none; }
        }
      `}</style>

      <summary className="cn-summary">
        <span className="cn-mark" aria-hidden="true" />
        <span>Why this cursor?</span>
        <span className="cn-chevron" aria-hidden="true">
          ▾
        </span>
      </summary>

      <div className="cn-body">
        <h2 className="cn-heading">On target. Ready to adapt.</h2>
        <p className="cn-text">
          Everything here is intentional, including the cursor. It may seem
          small and subtle, but I believe details like this make all the
          difference in the world today.
        </p>
        <p className="cn-text">
          The dot represents my focus; the ring, the environment around it.
          Whatever happens around me, as I move, they realign—a small
          expression of how I approach building. As Darwin’s theory reminds
          us, survival has never been about the finest, but the{" "}
          <strong className="cn-strong">fittest</strong>.
        </p>
        <p className="cn-text">
          I care about how well an AI or ML model fits the setting where it
          operates: the people, the problem, and the constraints. When that
          environment changes and performance declines, I investigate, adapt,
          rebuild, and redeploy.
        </p>
        <p className="cn-text">
          I believe in speed and efficiency, but I have the work ethic of an
          athlete. The right path is not always the shortest one from A to B.
          Sometimes—especially in learning—it has to be tedious, hard and
          messy.
        </p>
        <p className="cn-text cn-text--close">
          Only then can true learning and transformation be achieved.
        </p>
      </div>
    </details>
  );
}
