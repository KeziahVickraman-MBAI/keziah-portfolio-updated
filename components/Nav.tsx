import Link from "next/link";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "R", href: "/r" },
  { label: "Python", href: "/python" },
  { label: "AI", href: "/ai" },
  { label: "Grave", href: "/grave" },
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
        background: "rgba(13, 13, 13, 0.95)",
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
          <a
            href="https://github.com/KeziahVickraman"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Github
          </a>
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
      `}</style>
    </nav>
  );
}
