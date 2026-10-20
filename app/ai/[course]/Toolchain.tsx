"use client";

import { useState } from "react";
import type { ToolchainStage } from "../courses";

// The workflow as a loop: every stage stays visible, the selected one is
// highlighted, and "Next" wraps from the last stage back to the first.
export function Toolchain({ stages }: { stages: ToolchainStage[] }) {
  const [active, setActive] = useState(0);
  const count = stages.length;
  const current = stages[active];
  const next = stages[(active + 1) % count];
  const isLast = active === count - 1;

  return (
    <div className="tc">
      <ol className="tc-loop">
        {stages.map((s, i) => (
          <li
            key={s.stage}
            className={`tc-stage${i === active ? " tc-stage--active" : ""}`}
          >
            <button
              type="button"
              className="tc-btn"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span className="tc-num">{String(i + 1).padStart(2, "0")}</span>{" "}
              <span className="tc-name">{s.stage}</span>{" "}
              <span className="tc-tool">{s.tool}</span>
            </button>
            <p className="tc-desc">{s.description}</p>
          </li>
        ))}
      </ol>

      <div className="tc-return" aria-hidden="true">
        <span className="tc-return-line" />
        <span className="tc-return-label">
          ↺ Loop back to {stages[0].stage} and iterate
        </span>
      </div>

      <div className="tc-controls">
        <button
          type="button"
          className="tc-step"
          onClick={() => setActive((active - 1 + count) % count)}
        >
          <span aria-hidden="true">←</span> Previous
        </button>
        <p className="tc-status" aria-live="polite">
          Stage {active + 1} of {count}: {current.stage} — {current.tool}.{" "}
          {isLast
            ? `Next: back to ${next.stage}.`
            : `Next: ${next.stage}.`}
        </p>
        <button
          type="button"
          className="tc-step"
          onClick={() => setActive((active + 1) % count)}
        >
          {isLast ? `Back to ${next.stage}` : "Next stage"}{" "}
          <span aria-hidden="true">{isLast ? "↺" : "→"}</span>
        </button>
      </div>
    </div>
  );
}
