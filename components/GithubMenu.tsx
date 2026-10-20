"use client";

import { useEffect, useRef, useState } from "react";

export const GITHUB_ACCOUNTS: { label: string; note?: string; handle: string }[] = [
  { label: "Personal", note: "experiment account", handle: "KeziahVickraman" },
  { label: "SMU-MBAI account", handle: "KeziahVickraman-MBAI" },
];

export function GithubMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="gh-menu">
      <button
        type="button"
        className="nav-link gh-trigger"
        aria-expanded={open}
        aria-controls="gh-menu-list"
        onClick={() => setOpen((v) => !v)}
      >
        Github <span aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <ul id="gh-menu-list" className="gh-list">
          {GITHUB_ACCOUNTS.map(({ label, note, handle }) => (
            <li key={handle}>
              <a
                href={`https://github.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-item"
                onClick={() => setOpen(false)}
              >
                <span className="gh-item-label">
                  {label}
                  {note && <span className="gh-item-note"> ({note})</span>}
                </span>
                <span className="gh-item-handle">{handle}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
