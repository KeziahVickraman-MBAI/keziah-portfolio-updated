export default function ContactPage() {
  const rows = [
    {
      label: "Email",
      value: "keziahvickraman@gmail.com",
      href: "mailto:keziahvickraman@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "keziahvickraman",
      href: "https://www.linkedin.com/in/keziah-vickraman-385168204/",
    },
    {
      label: "GitHub · Personal",
      value: "KeziahVickraman",
      href: "https://github.com/KeziahVickraman",
    },
    {
      label: "GitHub · SMU-MBAI",
      value: "KeziahVickraman-MBAI",
      href: "https://github.com/KeziahVickraman-MBAI",
    },
    {
      label: "Location",
      value: "Singapore · Singapore Citizen",
      href: null,
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        padding: "120px 48px 80px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {/* Page header */}
      <h1
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(48px, 7vw, 80px)",
          fontStyle: "italic",
          fontWeight: 700,
          color: "var(--accent)",
          margin: "0 0 16px",
          lineHeight: 1.1,
        }}
      >
        Let&apos;s talk
      </h1>
      <p
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "18px",
          fontStyle: "italic",
          color: "var(--muted)",
          margin: "0 0 56px",
          lineHeight: 1.6,
        }}
      >
        Research collaborations, teaching opportunities, or just a good
        conversation about probability and handball.
      </p>

      {/* Contact rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {rows.map(({ label, value, href }) => (
          <div key={label} className="contact-row">
            <span className="contact-label">{label}</span>
            {href ? (
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                className="contact-value contact-link"
              >
                {value}
              </a>
            ) : (
              <span className="contact-value">{value}</span>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .contact-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: var(--panel);
          padding: 20px;
          border-radius: 6px;
          border-left: 3px solid transparent;
          transition: border-color 0.2s ease;
        }
        .contact-row:hover {
          border-left-color: var(--accent2);
        }
        .contact-label {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
        }
        .contact-value {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 14px;
          color: var(--accent);
          text-align: right;
          overflow-wrap: break-word;
        }
        @media (max-width: 480px) {
          .contact-row { padding: 16px; }
          .contact-value { font-size: 13px; }
        }
        .contact-link {
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .contact-link:hover {
          opacity: 0.8;
        }
      `}</style>
    </main>
  );
}
