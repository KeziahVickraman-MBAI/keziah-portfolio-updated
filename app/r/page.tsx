"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, Fragment, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface PlotItem {
  src: string;
  alt: string;
}

type PlotLayout = "single" | "side-by-side" | "triple";

interface ModuleData {
  id: string;
  number: string;
  title: string;
  tools: string[];
  description: string;
  insight: string;
  plots: PlotItem[];
  plotLayout: PlotLayout;
  codeUrl?: string;
  detailUrl?: string;
}

// ── Module data ────────────────────────────────────────────────────────────

const MODULES: ModuleData[] = [
  {
    id: "m1",
    number: "M1",
    title: "Introduction to Data Analytics",
    tools: ["tidyverse", "lubridate", "quantmod"],
    description:
      "Wrangled two real-world datasets — US medical disciplinary licensing records and Telco customer churn data. Built filtering pipelines, date extractions, and grouped summaries to answer business questions about state-level suspension patterns and customer attrition. Computed attrition probability by gender and payment method using a two-stage grouping approach.",
    insight:
      "Male customers on electronic check payment had the highest attrition probability — a finding that emerged only after properly ungrouping and re-grouping the data. Unit of analysis decisions in group_by() change everything.",
    plots: [{ src: "/images/m1_churn.png", alt: "Telco customer churn attrition analysis" }],
    plotLayout: "single",
    codeUrl: "https://github.com/KeziahVickraman/cdar-r-specialist/tree/main/module1_assessment",
  },
  {
    id: "m2",
    number: "M2",
    title: "Introduction to Data Visualization",
    tools: ["ggplot2", "ggthemes", "gridExtra", "scales"],
    description:
      "Built four publication-style charts — Google search trend lines for Airbnb, Expedia and Tripadvisor with LOESS smoothing; a salary disparity dot plot for University of Michigan professors faceted by rank and department affiliation; and a DiD visualisation of SkillsFuture credit top-ups with an annotated treatment window.",
    insight:
      "The SkillsFuture chart showed a consistent surge in course search hits in Q4 every year — suggesting government top-up timing drives public attention more than the courses themselves.",
    plots: [
      { src: "/images/m2_salary_interaction.png", alt: "Professor salary disparity by rank and department affiliation" },
      { src: "/images/m2_DiD_skillsfuture.png", alt: "DiD visualisation of SkillsFuture credit top-ups" },
    ],
    plotLayout: "side-by-side",
    codeUrl: "https://github.com/KeziahVickraman/cdar-r-specialist/tree/main/module2_assessment",
  },
  {
    id: "m3",
    number: "M3",
    title: "Web Scraping and Data Insights",
    tools: ["rvest", "tidytext", "AFINN", "NRC", "glue"],
    description:
      "Web scraping, NLP sentiment analysis, and cross-league salary comparison across three real-world datasets.",
    insight:
      "DBS received significantly higher volumes of negative emotion-coded reviews than UOB across all four sentiment categories — despite similar overall review counts. Volume alone doesn't tell the story; sentiment distribution does.",
    plots: [
      { src: "/images/m3_wages_comparison.png", alt: "Cross-league salary comparison" },
      { src: "/images/m3_reviews_AFINN.png", alt: "DBS vs UOB sentiment analysis — AFINN scores" },
    ],
    plotLayout: "side-by-side",
    codeUrl: "https://github.com/KeziahVickraman/cdar-r-specialist/tree/main/module3_assessment",
    detailUrl: "/r/m3",
  },
  {
    id: "m4",
    number: "M4",
    title: "Statistical Inference for Managerial Insights",
    tools: ["tidymodels", "ranger", "doParallel", "plotly", "DT"],
    description:
      "Built a Random Forest model to predict football player market valuations using FIFA stats. Compared base vs polynomial feature engineering recipes with 10-fold cross validation and hyperparameter tuning. Productised the final model to score a hypothetical scouted player and output a valuation gap — Undervalued, Overvalued, or Fairly Priced.",
    insight:
      "The polynomial recipe did not meaningfully outperform the base recipe after tuning. Complexity doesn't always win — and interpretability matters when you're handing a model to a scout who needs to trust it.",
    plots: [
      { src: "/images/m4_market_valuation.png", alt: "Football player market valuation model output" },
    ],
    plotLayout: "single",
    codeUrl: "https://github.com/KeziahVickraman/cdar-r-specialist/tree/main/module4_assessment",
  },
  {
    id: "m5",
    number: "M5",
    title: "A First Look at Visual Analytics (using GGPLOT2)",
    tools: ["shinydashboard", "tidymodels", "ranger"],
    description:
      "Built an interactive Shiny dashboard for stroke risk prediction. Users input clinical indicators — age, BMI, glucose level, smoking status, hypertension, heart disease history — and the app returns a real-time probability score with a colour-coded risk indicator powered by a Random Forest classifier.",
    insight:
      "Imbalanced classes are a silent killer in medical prediction models. The model looked accurate on paper but was biased toward the majority class — handling class imbalance before tuning changed the results significantly.",
    plots: [{ src: "/images/m5_shiny.png", alt: "Stroke risk prediction Shiny dashboard interface" }],
    plotLayout: "single",
    codeUrl: "https://github.com/KeziahVickraman/cdar-r-specialist/tree/main/module5_shinyapp",
  },
  {
    id: "m6",
    number: "M6",
    title: "Advancing Skillsets of Visual Analytics",
    tools: ["tidysynth", "Synth", "tidymodels", "shinydashboard"],
    description:
      "Applied synthetic control methodology to estimate Brexit's causal impact on UK GDP — constructing a synthetic UK from weighted European comparators, then measuring the gap post-2020. Also built a calendar heatmap of US birth patterns (2010–2014) and an employee turnover prediction Shiny app with interaction feature engineering.",
    insight:
      "The selective comparator model — using only economically similar European neighbours — told a sharper story than the full 52-country version. Domain knowledge in model design matters as much as the algorithm.",
    plots: [
      { src: "/images/m6_brexit.png", alt: "Brexit synthetic control analysis — UK GDP gap" },
      { src: "/images/m6_sc.png", alt: "Synthetic control method visualisation" },
      { src: "/images/m6_birthrate.png", alt: "US birth rate calendar heatmap 2010–2014" },
    ],
    plotLayout: "triple",
    codeUrl: "https://github.com/KeziahVickraman/cdar-r-specialist/tree/main/module6_assessment",
  },
];

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

// ── Plot grid ──────────────────────────────────────────────────────────────

function PlotGrid({
  plots,
  onImageClick,
}: {
  plots: PlotItem[];
  layout: PlotLayout;
  onImageClick: (src: string, alt: string) => void;
}) {
  return (
    <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {plots.map((p) => (
        <div key={p.src} className="plot-img-wrapper" onClick={() => onImageClick(p.src, p.alt)}>
          <Image
            src={p.src}
            alt={p.alt}
            width={1200}
            height={750}
            style={{ width: "100%", height: "auto", borderRadius: "4px", display: "block" }}
          />
          <span className="plot-img-hint">click to enlarge</span>
        </div>
      ))}
    </div>
  );
}

// ── Module card ────────────────────────────────────────────────────────────

function ModuleCard({
  module,
  isExpanded,
  onToggle,
  onImageClick,
}: {
  module: ModuleData;
  isExpanded: boolean;
  onToggle: () => void;
  onImageClick: (src: string, alt: string) => void;
}) {
  return (
    <article
      id={module.id}
      style={{
        background: "var(--panel)",
        borderLeft: "3px solid var(--accent)",
        borderRadius: "0 6px 6px 0",
        padding: "36px 40px",
        marginBottom: "12px",
      }}
    >
      {/* Module number */}
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "8px",
        }}
      >
        {module.number}
      </p>

      {/* Title */}
      <h2
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "var(--text)",
          lineHeight: 1.3,
          marginBottom: "18px",
        }}
      >
        {module.title}
      </h2>

      {/* Tool chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
        {module.tools.map((tool) => (
          <span
            key={tool}
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "11px",
              letterSpacing: "0.5px",
              color: "var(--muted)",
              background: "var(--panel)",
              padding: "3px 10px",
              borderRadius: "3px",
            }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "13px",
          lineHeight: 1.85,
          color: "var(--text)",
          marginBottom: "20px",
        }}
      >
        {module.description}
      </p>

      {/* Key insight */}
      <div
        style={{
          background: "var(--raised)",
          padding: "8px",
          borderRadius: "6px",
          marginBottom: "22px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "6px",
          }}
        >
          Key Insight
        </p>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "13px",
            lineHeight: 1.85,
            color: "var(--text)",
          }}
        >
          {module.insight}
        </p>
      </div>

      {/* Toggle + View Code + Read More row */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <button className="r-toggle" onClick={onToggle} aria-expanded={isExpanded}>
          {isExpanded ? "▴ Hide plots" : "▾ Show plots"}
        </button>
        {module.codeUrl && (
          <a
            href={module.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="r-btn-code"
          >
            View Code →
          </a>
        )}
        {module.detailUrl && (
          <Link href={module.detailUrl} className="r-btn-readmore">
            Read More →
          </Link>
        )}
      </div>

      {/* Plots */}
      {isExpanded && <PlotGrid plots={module.plots} layout={module.plotLayout} onImageClick={onImageClick} />}
    </article>
  );
}

// ── Personal application (after M3) ───────────────────────────────────────

function PersonalApplication({
  isExpanded,
  onToggle,
  onImageClick,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onImageClick: (src: string, alt: string) => void;
}) {
  return (
    <aside
      style={{
        background: "var(--panel)",
        borderLeft: "3px solid var(--accent)",
        border: "1px solid var(--border)",
        borderLeftColor: "var(--accent)",
        borderLeftWidth: "3px",
        borderRadius: "0 6px 6px 0",
        padding: "24px 32px",
        marginBottom: "12px",
        marginLeft: "24px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
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
          fontFamily: "var(--font-jetbrains)",
          fontSize: "13px",
          lineHeight: 1.85,
          color: "var(--text)",
          marginBottom: "20px",
        }}
      >
        I took the scraping skills from M3 and applied them to something I actually care about — WNBA Finals data from Wikipedia. The question: have Finals games gotten more competitive over time?
      </p>

      <button className="r-toggle" onClick={onToggle} aria-expanded={isExpanded}>
        {isExpanded ? "▴ Hide plot" : "▾ Show plot"}
      </button>

      {isExpanded && (
        <div style={{ marginTop: "28px" }}>
          <div
            className="plot-img-wrapper"
            onClick={() => onImageClick("/images/wnba_margins.png", "WNBA Finals margins of winning across the decades")}
            style={{ marginBottom: "14px" }}
          >
            <Image
              src="/images/wnba_margins.png"
              alt="WNBA Finals margins of winning across the decades"
              width={1200}
              height={700}
              style={{ width: "100%", height: "auto", borderRadius: "4px", display: "block" }}
            />
            <span className="plot-img-hint">click to enlarge</span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "11px",
              fontStyle: "italic",
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            Margins of Winning for WNBA Finals teams across the decades: 1990s to present. Lollipop chart with decade
            facets and mean margin benchmarks. The shift to a best-of-5 format in 2005 coincides with increasing
            margins — but the story is more nuanced than that.
          </p>
        </div>
      )}
    </aside>
  );
}

// ── Capstone ───────────────────────────────────────────────────────────────

const CAPSTONE_TAGS = ["DiD", "XGBoost", "tidymodels", "hoopR", "Quarto", "Shiny", "R² = 0.747"];

function Capstone() {
  return (
    <section
      id="capstone"
      style={{
        background: "var(--surface)",
        border: "2px solid var(--accent)",
        borderRadius: "8px",
        padding: "40px 44px",
        marginTop: "12px",
      }}
    >
      {/* Badge */}
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "18px",
        }}
      >
        Capstone Project
      </p>

      {/* Title */}
      <h2
        style={{
          fontFamily: "var(--font-playfair)",
          fontWeight: 700,
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          color: "var(--text)",
          lineHeight: 1.15,
          marginBottom: "10px",
        }}
      >
        Bench the Instinct
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "13px",
          letterSpacing: "0.5px",
          color: "var(--muted)",
          marginBottom: "24px",
        }}
      >
        NBA Achilles Load Management · Causal Inference + Machine Learning
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
        {CAPSTONE_TAGS.map((tag) => {
          const isMetric = tag.startsWith("R²");
          return (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "0.5px",
                color: isMetric ? "var(--accent)" : "var(--muted)",
                background: "var(--panel)",
                padding: "4px 12px",
                borderRadius: "3px",
                border: isMetric ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* Description */}
      <div
        style={{
          borderLeft: "2px solid var(--border)",
          paddingLeft: "22px",
          marginBottom: "36px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "14px",
            lineHeight: 1.9,
            color: "var(--text)",
            marginBottom: "16px",
          }}
        >
          The 2024–25 NBA season recorded 8 confirmed Achilles ruptures — nearly 6× the historical average. This
          project asks: could we have seen this coming?
        </p>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "14px",
            lineHeight: 1.9,
            color: "var(--text)",
            marginBottom: "16px",
          }}
        >
          Part 1 uses a Difference-in-Differences design to estimate whether high workload caused the spike. Part 2
          builds an XGBoost model on box score data to predict individual injury risk — with a temporal train/test
          split that honestly simulates deployment.
        </p>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "14px",
            lineHeight: 1.9,
            color: "var(--text)",
          }}
        >
          R² = 0.747 on held-out 2022–2025 data. Luka Dončić was flagged Moderate Risk from his 2024 load profile.
          He subsequently missed 22% of the 2025–26 season.
        </p>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <a
          href="https://keziahvickraman.github.io/bench-the-instinct/"
          target="_blank"
          rel="noopener noreferrer"
          className="r-btn-primary"
        >
          View Live Site →
        </a>
        <a
          href="/bench_the_instinct_paper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="r-btn-outline"
        >
          Read the Paper →
        </a>
      </div>
    </section>
  );
}

// ── Sidebar nav ────────────────────────────────────────────────────────────

const SIDEBAR_ITEMS = [
  { id: "m1", label: "M1 · Introduction to Data Analytics" },
  { id: "m2", label: "M2 · Introduction to Data Visualization" },
  { id: "m3", label: "M3 · Web Scraping and Data Insights" },
  { id: "m4", label: "M4 · Statistical Inference" },
  { id: "m5", label: "M5 · Visual Analytics" },
  { id: "m6", label: "M6 · Advancing Skillsets" },
  { id: "capstone", label: "Capstone" },
];

function SidebarNav({ activeId }: { activeId: string }) {
  return (
    <nav className="r-sidebar">
      <div className="r-sidebar-line" />
      <div className="r-sidebar-items">
        {SIDEBAR_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`r-sidebar-item${activeId === item.id ? " r-sidebar-item--active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function RPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [activeSection, setActiveSection] = useState("m1");

  useEffect(() => {
    const ids = SIDEBAR_ITEMS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "88px", paddingBottom: "80px" }}>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}
      <SidebarNav activeId={activeSection} />
      <style>{`
        .r-toggle {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent);
          background: none;
          border: none;
          padding: 0;
          cursor: none;
          transition: opacity 0.2s;
        }
        .r-toggle:hover { opacity: 0.7; }
        .r-btn-primary {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--accent);
          padding: 12px 24px;
          border-radius: 4px;
          text-decoration: none;
          transition: opacity 0.2s;
          display: inline-block;
        }
        .r-btn-primary:hover { opacity: 0.85; }
        .r-btn-outline {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent);
          background: transparent;
          padding: 11px 24px;
          border-radius: 4px;
          text-decoration: none;
          border: 1px solid var(--accent);
          transition: background 0.2s, color 0.2s;
          display: inline-block;
        }
        .r-btn-outline:hover {
          background: var(--accent);
          color: var(--bg);
        }
        .r-btn-code {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: var(--accent);
          background: transparent;
          padding: 5px 12px;
          border-radius: 3px;
          text-decoration: none;
          border: 1px solid var(--accent);
          transition: background 0.2s, color 0.2s;
          display: inline-block;
        }
        .r-btn-code:hover {
          background: var(--accent);
          color: var(--bg);
        }
        .r-btn-readmore {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: var(--accent2);
          background: transparent;
          padding: 5px 12px;
          border-radius: 3px;
          text-decoration: none;
          border: 1px solid var(--accent2);
          transition: background 0.2s, color 0.2s;
          display: inline-block;
        }
        .r-btn-readmore:hover {
          background: var(--accent2);
          color: var(--bg);
        }
        .plot-img-wrapper {
          position: relative;
          display: block;
          cursor: zoom-in;
          border-radius: 4px;
          overflow: hidden;
        }
        .plot-img-hint {
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
        .plot-img-wrapper:hover .plot-img-hint { opacity: 1; }
        .r-sidebar {
          position: fixed;
          left: 28px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: row;
          align-items: stretch;
        }
        .r-sidebar-line {
          width: 1px;
          background: var(--accent);
          opacity: 0.6;
          margin-right: 14px;
          align-self: stretch;
        }
        .r-sidebar-items {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .r-sidebar-item {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.4px;
          color: var(--muted);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .r-sidebar-item:hover { color: var(--accent); }
        .r-sidebar-item--active { color: var(--accent); }
        @media (max-width: 1080px) {
          .r-sidebar { display: none; }
        }
        .r-header {
          padding: 0 48px;
        }
        .r-content {
          padding: 0 48px;
        }
        @media (min-width: 1081px) {
          .r-content {
            padding-left: 300px;
            padding-right: 48px;
          }
        }
      `}</style>

      {/* ── Page header — full viewport width, no sidebar indent ── */}
      <header className="r-header animate-fade-up" style={{ marginBottom: "36px" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              color: "var(--accent)",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            Certified Data Analyst (R) Specialist
          </h1>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "12px",
              letterSpacing: "2px",
              color: "var(--muted)",
              marginBottom: "22px",
            }}
          >
            SMU Academy · 2025 · Distinction
          </p>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "14px",
              lineHeight: 1.75,
              color: "var(--text)",
              maxWidth: "100%",
            }}
          >
            Six modules. Real datasets. Real Analysis. Ultimately culminated to one capstone that predicted an NBA injury before it happened.
          </p>
      </header>

      <div className="r-content">

        {/* ── Module cards ── */}
        {MODULES.map((mod) => (
          <Fragment key={mod.id}>
            <ModuleCard
              module={mod}
              isExpanded={!!expanded[mod.id]}
              onToggle={() => toggle(mod.id)}
              onImageClick={openLightbox}
            />
            {mod.id === "m3" && (
              <PersonalApplication
                isExpanded={!!expanded["wnba"]}
                onToggle={() => toggle("wnba")}
                onImageClick={openLightbox}
              />
            )}
          </Fragment>
        ))}

        {/* ── Capstone ── */}
        <Capstone />

      </div>
    </main>
  );
}
