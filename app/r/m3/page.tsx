"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// ── Lightbox ───────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: "6px",
          boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
          cursor: "default",
          display: "block",
        }}
      />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

type Tab = "salary" | "sentiment";

export default function M3Page() {
  const [activeTab, setActiveTab] = useState<Tab>("salary");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "88px", paddingBottom: "80px" }}>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}

      <style>{`
        .m3-plot-wrapper {
          position: relative;
          display: block;
          cursor: zoom-in;
          border-radius: 4px;
          overflow: hidden;
        }
        .m3-plot-hint {
          position: absolute;
          bottom: 10px;
          right: 12px;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #fff;
          background: rgba(0,0,0,0.55);
          padding: 3px 8px;
          border-radius: 3px;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .m3-plot-wrapper:hover .m3-plot-hint { opacity: 1; }
        .m3-tab-active {
          background: var(--accent);
          color: var(--bg);
          border: 1px solid var(--accent);
        }
        .m3-tab-inactive {
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
        }
        .m3-tab-inactive:hover {
          background: rgba(232, 197, 71, 0.08);
        }
      `}</style>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── Back link ── */}
        <Link
          href="/r"
          style={{
            fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
            fontSize: "12px",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "0.5px",
            display: "inline-block",
            marginBottom: "32px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          ← R Specialist
        </Link>

        {/* ── Page header ── */}
        <header style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "12px",
            }}
          >
            M3
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: "var(--text)",
              lineHeight: 1.2,
              marginBottom: "18px",
            }}
          >
            Web Scraping and Data Insights
          </h1>
          {/* Tools row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {["rvest", "tidytext", "AFINN", "NRC", "quantmod", "glue"].map((tool) => (
              <span
                key={tool}
                style={{
                  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                  fontSize: "11px",
                  letterSpacing: "0.5px",
                  color: "var(--muted)",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </header>

        {/* ── Toggle ── */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "40px" }}>
          {(
            [
              { key: "salary", label: "EPL vs NBA Salary" },
              { key: "sentiment", label: "DBS vs UOB Sentiment" },
            ] as { key: Tab; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={activeTab === key ? "m3-tab-active" : "m3-tab-inactive"}
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "11px",
                letterSpacing: "0.5px",
                padding: "7px 18px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {activeTab === "salary" && (
          <section
            style={{
              background: "var(--panel)",
              borderLeft: "3px solid var(--accent)",
              borderRadius: "0 6px 6px 0",
              padding: "36px 40px",
              marginBottom: "32px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "16px",
              }}
            >
              What I Did
            </p>
            <p
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "13px",
                lineHeight: 1.85,
                color: "var(--text)",
                marginBottom: "28px",
              }}
            >
              Compared EPL and NBA player wages per minute in USD — converting GBP salaries using live FX rates from
              quantmod to make an apples-to-apples comparison across leagues. Visualised wage distributions by position
              using jitter-boxplots with notched confidence intervals and mean error bars, revealing structural
              differences in how the two leagues pay players across roles.
            </p>

            {/* Plot */}
            <div
              className="m3-plot-wrapper"
              onClick={() => openLightbox("/images/m3_wages_comparison.png", "EPL vs NBA wages per minute by position")}
              style={{ marginBottom: "28px" }}
            >
              <Image
                src="/images/m3_wages_comparison.png"
                alt="EPL vs NBA wages per minute by position"
                width={1200}
                height={750}
                style={{ width: "100%", height: "auto", borderRadius: "4px", display: "block" }}
              />
              <span className="m3-plot-hint">click to enlarge</span>
            </div>

            {/* Key Insight */}
            <p
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "12px",
              }}
            >
              Key Insight
            </p>
            <blockquote
              style={{
                borderLeft: "2px solid var(--accent)",
                paddingLeft: "18px",
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "var(--text)",
                }}
              >
                &ldquo;NBA players earn dramatically more per minute than EPL players across every position — but the
                spread within NBA positions is enormous. A Point Guard at the top earns multiples of the median,
                suggesting superstar economics dominate NBA pay structures in a way EPL doesn&rsquo;t mirror. The
                notched boxplots make the confidence intervals around medians visible — the EPL distributions are
                tighter, the NBA ones are wild.&rdquo;
              </p>
            </blockquote>
          </section>
        )}

        {activeTab === "sentiment" && (
          <section
            style={{
              background: "var(--panel)",
              borderLeft: "3px solid var(--accent)",
              borderRadius: "0 6px 6px 0",
              padding: "36px 40px",
              marginBottom: "32px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "16px",
              }}
            >
              What I Did
            </p>
            <p
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "13px",
                lineHeight: 1.85,
                color: "var(--text)",
                marginBottom: "28px",
              }}
            >
              Built a modularised paginated Trustpilot scraper with progress bars and deduplication logic to collect
              reviews for DBS and UOB across multiple pages. Ran AFINN sentiment scoring on hotel reviews to surface the
              worst-rated stay, then applied NRC lexicon analysis to compare anger, fear, disgust and sadness
              distributions between both banks. Wrote a custom text cleaning function to handle duplicate lead
              paragraphs that Trustpilot injects into scraped review blocks.
            </p>

            {/* Plot */}
            <div
              className="m3-plot-wrapper"
              onClick={() => openLightbox("/images/m3_reviews_AFINN.png", "AFINN sentiment scoring — DBS vs UOB Trustpilot reviews")}
              style={{ marginBottom: "28px" }}
            >
              <Image
                src="/images/m3_reviews_AFINN.png"
                alt="AFINN sentiment scoring — DBS vs UOB Trustpilot reviews"
                width={1200}
                height={750}
                style={{ width: "100%", height: "auto", borderRadius: "4px", display: "block" }}
              />
              <span className="m3-plot-hint">click to enlarge</span>
            </div>

            {/* Key Insight */}
            <p
              style={{
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "12px",
              }}
            >
              Key Insight
            </p>
            <blockquote
              style={{
                borderLeft: "2px solid var(--accent)",
                paddingLeft: "18px",
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "var(--text)",
                }}
              >
                &ldquo;DBS received significantly higher volumes of negative emotion-coded reviews than UOB across all
                four sentiment categories — despite similar overall review counts. Anger was the dominant negative
                emotion for DBS, suggesting frustrated rather than merely disappointed customers. Volume alone
                doesn&rsquo;t tell the story; sentiment distribution does.&rdquo;
              </p>
            </blockquote>
          </section>
        )}

        {/* ── Personal Application ── */}
        <aside
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--accent)",
            borderRadius: "0 6px 6px 0",
            padding: "32px 40px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "14px",
            }}
          >
            Personal Application · Beyond the Assessment
          </p>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
              fontSize: "13px",
              lineHeight: 1.85,
              color: "var(--text)",
              marginBottom: "24px",
            }}
          >
            I took the scraping skills from M3 and applied them to something I actually care about — WNBA Finals data
            from Wikipedia. The question: have Finals games gotten more competitive over time?
          </p>

          <div
            className="m3-plot-wrapper"
            onClick={() => openLightbox("/images/wnba_margins.png", "WNBA Finals margins of winning across the decades")}
            style={{ marginBottom: "16px" }}
          >
            <Image
              src="/images/wnba_margins.png"
              alt="WNBA Finals margins of winning across the decades"
              width={1200}
              height={700}
              style={{ width: "100%", height: "auto", borderRadius: "4px", display: "block" }}
            />
            <span className="m3-plot-hint">click to enlarge</span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
              fontSize: "11px",
              fontStyle: "italic",
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            Margins of Winning for WNBA Finals teams across the decades: 1990s to present. The shift to a best-of-5
            format in 2005 coincides with increasing margins — but the story is more nuanced than that.
          </p>
        </aside>

      </div>
    </main>
  );
}
