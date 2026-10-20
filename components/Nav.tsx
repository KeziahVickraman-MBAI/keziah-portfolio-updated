import Link from "next/link";
import { GithubMenu } from "@/components/GithubMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "R", href: "/r" },
  { label: "Python", href: "/python" },
  { label: "AI", href: "/ai" },
  { label: "Graveyard", href: "/grave" },
  { label: "Contact", href: "/contact" },
] as const;

export function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 48px",
        borderBottom: "1px solid var(--border)",
        background: "var(--nav-bg)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Logo / Name */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--accent)",
          textDecoration: "none",
          letterSpacing: "1px",
        }}
      >
        Home
      </Link>

      {/* Nav links */}
      <ul
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className="nav-link">
              {label}
            </Link>
          </li>
        ))}
        <li>
          <GithubMenu />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>

      <style>{`
        .nav-link {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--muted);
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: var(--accent);
        }
        button.nav-link {
          background: none;
          border: none;
          padding: 0;
          cursor: inherit;
        }
        .theme-toggle {
          border: 1px solid var(--border) !important;
          border-radius: 3px;
          padding: 4px 10px !important;
        }
        .gh-menu { position: relative; }
        .gh-list {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          min-width: 260px;
          list-style: none;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        }
        .gh-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 10px 12px;
          border-radius: 4px;
          border-left: 2px solid transparent;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .gh-item:hover {
          background: var(--panel);
          border-left-color: var(--accent2);
        }
        .gh-item-label {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--subtle);
        }
        .gh-item-note { text-transform: none; letter-spacing: 0.5px; }
        .gh-item-handle {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 13px;
          color: var(--accent);
        }
      `}</style>
    </nav>
  );
}
