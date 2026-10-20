import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graveyard — Keziah Vickraman",
  description: "Things I look to kill. More on this coming soon.",
};

export default function GraveyardPage() {
  return (
    <main className="gy-page">
      <style>{`
        .gy-page {
          min-height: 100vh;
          background: var(--bg);
          max-width: 700px;
          margin: 0 auto;
          padding: 120px 48px 80px;
        }
        .gy-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(48px, 7vw, 80px);
          font-style: italic;
          font-weight: 700;
          line-height: 1.1;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .gy-text {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 18px;
          font-style: italic;
          line-height: 1.6;
          color: var(--subtle);
        }
        @media (max-width: 640px) {
          .gy-page { padding: 104px 16px 64px; }
          .gy-text { font-size: 16px; }
        }
      `}</style>

      <h1 className="gy-title">Graveyard</h1>
      <p className="gy-text">Things I look to kill. More on this coming soon.</p>
    </main>
  );
}
