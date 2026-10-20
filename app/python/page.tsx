"use client";

import Image from "next/image";
import { useState, Fragment, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface PlotItem {
  src: string;
  alt: string;
}

interface ModuleSubsection {
  label: string;
  description: string;
  insight: string;
}

interface ModuleData {
  id: string;
  number: string;
  title: string;
  tools: string[];
  description?: string;
  insight?: string;
  subsections?: ModuleSubsection[];
  plots: PlotItem[];
  codeUrl?: string;
  notebookUrl?: string;
}

// ── Module data ────────────────────────────────────────────────────────────

const MODULES: ModuleData[] = [
  {
    id: "m1",
    number: "M1",
    title: "Customer Segmentation and Personalization",
    tools: ["numpy", "pandas", "scikit-learn", "matplotlib", "seaborn"],
    description:
      "Applied K-Means clustering to Singapore bank credit card customer data. Used the Elbow Method and Silhouette Scores to determine optimal k=3. Reduced dimensions with PCA to visualise clusters in 2D. Profiled each segment by income, visit frequency, and six survey attitude variables to build actionable customer personas.",
    insight:
      "Cluster 0 — high income customers who love shopping but rarely visit the bank, likely using digital channels. Cluster 1 — lower income customers who dislike shopping but visit the bank most frequently. The segmentation revealed that branch visit frequency is inversely correlated with income — the customers you see least are often your most digitally engaged.",
    plots: [
      { src: "/images/python/dddm_m1_elbow.png", alt: "Elbow Method for optimal k selection" },
      { src: "/images/python/dddm_m1_ss.png", alt: "Silhouette Scores for cluster evaluation" },
      { src: "/images/python/dddm_m1_kmeanscluster.png", alt: "K-Means clusters visualised via PCA" },
      { src: "/images/python/dddm_m1_segementation.png", alt: "Customer segmentation profile by cluster" },
    ],
    codeUrl: "https://github.com/KeziahVickraman/dddm-python/tree/main/module1_assessment",
  },
  {
    id: "m2",
    number: "M2",
    title: "Supervised ML for CLV, Attrition & Marketing",
    tools: ["pandas", "scikit-learn", "mlxtend"],
    subsections: [
      {
        label: "Association Rule Mining",
        description:
          "Applied Association Rule Mining to Apple Store transaction data using the Apriori algorithm. Encoded transactions into a binary pivot table, then mined frequent itemsets and computed lift, leverage, and conviction metrics to identify high-value product pairings for cross-selling strategy.",
        insight:
          "High lift alone is not enough — conviction is the better metric for cross-selling because it measures how much more likely the consequent is to occur given the antecedent, beyond what chance would predict. iPhone → AirPods had both high confidence and high conviction, making it the strongest bundle candidate.",
      },
      {
        label: "Regression & Feature Selection",
        description:
          "Built three linear regression models to predict customer annual spend using RFE feature selection — comparing 7, 6, 5, and 3 features. Evaluated using RMSE on a held-out test set.",
        insight:
          "The 6-feature model outperformed the full 7-feature model — age was the dropped variable. Removing a noisy predictor improved generalisation. More features is not always better; RFE forces you to be honest about what actually predicts the outcome.",
      },
    ],
    plots: [],
    codeUrl: "https://github.com/KeziahVickraman/dddm-python/tree/main/module2_assessment",
  },
  {
    id: "m3",
    number: "M3",
    title: "Program Evaluation and Causal Inference",
    tools: ["statsmodels", "scikit-learn", "lets-plot", "stargazer"],
    description:
      "Four causal inference designs in one module. DiD on worker's compensation policy to test moral hazard. RDD on a tutoring program using kernel-weighted local linear regression. Synthetic Control to estimate West Germany's GDP counterfactual post-reunification. PSM and IPW to estimate the causal effect of manager training on employee engagement.",
    insight:
      "The tutoring program raised exit exam scores by approximately 14 percentage points — but only for students near the 70-point threshold. The RDD isolates this local average treatment effect cleanly. For the DiD, high-earning workers spent ~1.2 weeks longer on unemployment benefits after the policy change — a statistically significant moral hazard effect that survived sensitivity analysis across four model specifications.",
    plots: [
      { src: "/images/python/dddm_m3_rdd.png", alt: "RDD — tutoring program exit exam scores near threshold" },
      { src: "/images/python/dddm_m3_sc.png", alt: "Synthetic Control — West Germany GDP counterfactual" },
      { src: "/images/python/dddm_m3_qualitymatching.png", alt: "PSM matching quality diagnostics" },
    ],
    codeUrl: "https://github.com/KeziahVickraman/dddm-python/tree/main/module3_assessment",
    notebookUrl: "/notebooks/module3_assessment_econometrics_dddm25.html",
  },
  {
    id: "m4",
    number: "M4",
    title: "Algorithmic Trading and Computational Finance",
    tools: ["yfinance", "pandas", "numpy", "lets-plot"],
    description:
      "Built three rule-based trading strategies on TSLA over a 10-year horizon — Momentum Strategy A (binary buy/short-sell based on 22 vs 120-day SMA crossover), Momentum Strategy B (buy/hold/sell with three states), and a Mean Reversion strategy using Bollinger Bands (42-day SMA ± 2 standard deviations). Compared cumulative returns of all three against a passive buy-and-hold benchmark.",
    insight:
      "For TSLA, the passive buy-and-hold strategy substantially outperformed all three rule-based strategies. TSLA's returns are driven by long, volatile growth regimes — frequent signal-based exits cause momentum strategies to miss extended compounding periods. Mean reversion performed worst — TSLA is not a mean-reverting stock.",
    plots: [
      { src: "/images/python/dddm_m4_comparison.png", alt: "Cumulative returns comparison — all strategies vs buy-and-hold" },
    ],
    codeUrl: "https://github.com/KeziahVickraman/dddm-python/tree/main/module4_assessment",
    notebookUrl: "/notebooks/module4_assessment_algotrading_dddm25.html",
  },
  {
    id: "m5",
    number: "M5",
    title: "NLP, Sentiment Analysis & Applied LLMs",
    tools: ["nltk", "scikit-learn", "lets-plot", "ollama", "llama3.1"],
    description:
      "Two tracks. First, ran VADER Sentiment Intensity Analysis on Glassdoor employee reviews for Amazon, Apple, and Microsoft — analysing pros and cons separately, computing compound scores, and building correlation matrices between sentiment and star ratings. Second, used a locally-run LLaMA 3.1 model via Ollama to generate structured JSON datasets on cancer survival rates and historical wars, then visualised them with LetsPlot.",
    insight:
      "Apple led in both overall rating and positive sentiment in pros reviews. Amazon showed the most negative compound scores in cons. The LLM-generated cancer survival data revealed a clear two-tier split — prostate and thyroid cancers maintain high survival rates across 20 years, while pancreatic and lung cancers lose most survival probability within the first 5 years. The LLM as a data engine — not just a chatbot — was the real lesson here.",
    plots: [
      { src: "/images/python/dddm_m5_cancer_research_llm.png", alt: "LLM-generated cancer survival rate visualisation" },
      { src: "/images/python/dddm_m5_war_better_viz.png", alt: "Historical wars data — improved visualisation" },
      { src: "/images/python/dddm_m5_war_viz.png", alt: "Historical wars data — initial visualisation" },
    ],
    codeUrl: "https://github.com/KeziahVickraman/dddm-python/tree/main/module5_assessment",
    notebookUrl: "/notebooks/module5_assessment_nlp_dddm25.html",
  },
  {
    id: "m6",
    number: "M6",
    title: "End-to-End Business Analytics for Decision-Making",
    tools: ["scikit-learn", "networkx", "statsmodels", "lets-plot", "ollama", "yfinance", "pydantic"],
    description:
      "Five integrated questions drawing from all six modules. Built a cosine similarity talent matching system with LLaMA-generated industry classifications and a NetworkX graph. Applied PSM+IPW to estimate the causal effect of digital marketing training on sales. Ran DiD on Trump's Liberation Day tariff announcement using yfinance stock data and LLaMA-classified supply chain profiles. Discovered cointegrated stock pairs (MS vs GS) via Affinity Propagation clustering and backtested a mean-reversion pairs trading strategy. Built a Structural Topic Model on hotel reviews using LLaMA with Pydantic schemas.",
    insight:
      "Affinity Propagation outperformed K-Means with a higher silhouette score, and MS vs GS were confirmed cointegrated (p < 0.05). The backtest showed profitable periods during spread divergence, but sensitivity analysis revealed performance is highly sensitive to the lookback window — 22 days was optimal. For the tariffs DiD, the estimated effect was small and statistically insignificant across most specifications — Liberation Day didn't produce a measurable differential impact beyond the broad market crash both groups experienced.",
    plots: [
      { src: "/images/python/dddm_m6_network.png", alt: "NetworkX talent matching graph" },
      { src: "/images/python/dddm_m6_pairstradingec.png", alt: "Pairs trading backtest — MS vs GS spread" },
      { src: "/images/python/dddm_m6_trumpliberation.png", alt: "DiD — Liberation Day tariff impact on stocks" },
    ],
    codeUrl: "https://github.com/KeziahVickraman/dddm-python/tree/main/module6_assessment",
    notebookUrl: "/notebooks/module6_assessment_llmintegration_dddm25.html",
  },
];

// ── Lightbox ───────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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

// ── Interactive plots modal ────────────────────────────────────────────────

interface ModalTab {
  label: string;
  src: string;
}

interface ModalConfig {
  moduleId: string;
  title: string;
  notebookUrl: string;
  tabs: ModalTab[];
}

const MODAL_CONFIGS: ModalConfig[] = [
  {
    moduleId: "m3",
    title: "M3 · Program Evaluation and Causal Inference",
    notebookUrl: "/notebooks/module3_assessment_econometrics_dddm25.html",
    tabs: [
      { label: "RDD — Tutoring Effect", src: "/notebooks/m3_rdd_interactive.html" },
      { label: "Synthetic Control — German Reunification", src: "/notebooks/m3_sc_interactive.html" },
    ],
  },
  {
    moduleId: "m4",
    title: "M4 · Algorithmic Trading and Computational Finance",
    notebookUrl: "/notebooks/module4_assessment_algotrading_dddm25.html",
    tabs: [
      { label: "Cumulative Returns Comparison", src: "/notebooks/m4_cumreturns_interactive.html" },
    ],
  },
  {
    moduleId: "m5",
    title: "M5 · NLP, Sentiment Analysis & Applied LLMs",
    notebookUrl: "/notebooks/module5_assessment_nlp_dddm25.html",
    tabs: [
      { label: "Cancer Survival Rates", src: "/notebooks/m5_cancerresearch_interactive.html" },
      { label: "Historical Wars — Bubble Chart", src: "/notebooks/m5_warresearch_interactive.html" },
      { label: "Historical Wars — Timeline", src: "/notebooks/m5_warsviz_interactive.html" },
    ],
  },
  {
    moduleId: "m6",
    title: "M6 · End-to-End Business Analytics for Decision-Making",
    notebookUrl: "/notebooks/module6_assessment_llmintegration_dddm25.html",
    tabs: [
      { label: "Cosine Similarity Network", src: "/notebooks/m6_cosinesimilarity_network_interactive.html" },
      { label: "Affinity Propagation Clusters", src: "/notebooks/m6_APplot_interactive.html" },
      { label: "Sector AP Clusters", src: "/notebooks/m6_sector_APplot_interactive.html" },
      { label: "Pairs Trading Equity Curve", src: "/notebooks/m6_pairstradingec_interactive.html" },
      { label: "Liberation Day Tariffs", src: "/notebooks/m6_liberationday_interactive.html" },
    ],
  },
];

function InteractivePlotsModal({
  config,
  activeTab,
  onTabChange,
  onClose,
}: {
  config: ModalConfig;
  activeTab: number;
  onTabChange: (i: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const currentSrc = config.tabs[activeTab]?.src ?? config.tabs[0].src;
  const showTabs = config.tabs.length > 1;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "95vw",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          {/* Title — left */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "11px",
              letterSpacing: "1px",
              color: "#f0ede6",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {config.title}
          </span>

          {/* Tab pills — center */}
          {showTabs && (
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                justifyContent: "center",
                flex: 1,
              }}
            >
              {config.tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => onTabChange(i)}
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "10px",
                    letterSpacing: "0.5px",
                    padding: "4px 10px",
                    borderRadius: "3px",
                    border: "1px solid var(--accent)",
                    background: i === activeTab ? "var(--accent)" : "transparent",
                    color: i === activeTab ? "#0f0f0f" : "var(--accent)",
                    cursor: "none",
                    whiteSpace: "nowrap",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Actions — right */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
            <a
              href={config.notebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "1px",
                color: "#4ecdc4",
                border: "1px solid #4ecdc4",
                padding: "5px 12px",
                borderRadius: "3px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View Full Notebook →
            </a>
            <button
              onClick={onClose}
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                letterSpacing: "1px",
                color: "#f0ede6",
                background: "transparent",
                border: "1px solid rgba(240,237,230,0.4)",
                padding: "5px 12px",
                borderRadius: "3px",
                cursor: "none",
                whiteSpace: "nowrap",
              }}
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* iframe */}
        <iframe
          src={currentSrc}
          style={{
            width: "100%",
            flex: 1,
            border: "none",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

// ── Plot grid ──────────────────────────────────────────────────────────────

function PlotGrid({
  plots,
  onImageClick,
}: {
  plots: PlotItem[];
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
  onOpenNotebook,
}: {
  module: ModuleData;
  isExpanded: boolean;
  onToggle: () => void;
  onImageClick: (src: string, alt: string) => void;
  onOpenNotebook?: () => void;
}) {
  const hasPlots = module.plots.length > 0;

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

      {/* Single description + insight */}
      {!module.subsections && module.description && (
        <>
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
          {module.insight && (
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
          )}
        </>
      )}

      {/* Multi-subsection layout (M2) */}
      {module.subsections && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "22px" }}>
          {module.subsections.map((sub) => (
            <div key={sub.label}>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "10px",
                }}
              >
                {sub.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "13px",
                  lineHeight: 1.85,
                  color: "var(--text)",
                  marginBottom: "14px",
                }}
              >
                {sub.description}
              </p>
              <div
                style={{
                  background: "var(--raised)",
                  padding: "8px",
                  borderRadius: "6px",
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
                  {sub.insight}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions row */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        {hasPlots && (
          <button className="r-toggle" onClick={onToggle} aria-expanded={isExpanded}>
            {isExpanded ? "▴ Hide plots" : "▾ Show plots"}
          </button>
        )}
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
        {onOpenNotebook && (
          <button className="r-btn-notebook" onClick={onOpenNotebook}>
            View Interactive Plots →
          </button>
        )}
      </div>

      {/* Plots */}
      {hasPlots && isExpanded && (
        <PlotGrid plots={module.plots} onImageClick={onImageClick} />
      )}
    </article>
  );
}

// ── Interlude ──────────────────────────────────────────────────────────────

function Interlude() {
  return (
    <aside
      id="interlude"
      style={{
        background: "var(--interlude)",
        borderLeft: "3px solid var(--accent2)",
        borderRadius: "0 6px 6px 0",
        padding: "36px 40px",
        marginBottom: "12px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "var(--accent2)",
          marginBottom: "6px",
        }}
      >
        Going Beyond Scratching the Surface in AI Research
      </p>
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10px",
          letterSpacing: "2px",
          color: "var(--muted)",
          marginBottom: "28px",
        }}
      >
        A prelude to Modules 5 and 6
      </p>

      {[
        "Before M5 and M6, my relationship with NLP was comfortable but shallow. I knew LDA. I knew tokenisation, stop words, sentiment lexicons, topic modelling. I thought that was the thing — that was 'doing NLP.'",
        "Then I had to actually integrate a locally-run LLaMA model into an analytical pipeline and everything I thought I knew got quietly humbled.",
        "The thing that stuck with me most wasn't the model. It was the JSON schema. I didn't realise how much work goes into making an LLM output something your code can actually use — not just text that looks right, but structured, parseable, validated output. The schema isn't just formatting. It's error flagging built in. It's the contract between your model and your system. Break the schema, break the pipeline. And suddenly you understand why every AI product you use is built on exactly this premise — the chat interface is the surface, the schema is the architecture underneath.",
        "The other thing was context engineering. Everyone talks about prompt engineering like it's just about wording your question nicely. But what I learnt here is that the context you build around a prompt — the schema, the constraints, the system role, the structured output format — that's where the real design happens. The prompt is the surface. The context is the architecture.",
        "Then came Pydantic. Defining HotelTopicGroup and HotelTopicResult as typed schemas — with field descriptions that the model actually reads as part of its instruction — made me realise that prompt engineering and software engineering are converging. You're not writing prompts anymore. You're writing contracts between a language model and a system.",
        "I went into M5 knowing how to analyse text. I came out of M6 understanding how AI products are actually built. That gap was bigger than I expected — and crossing it felt like the real learning.",
      ].map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "13px",
            lineHeight: 1.85,
            color: "var(--text)",
            marginBottom: i < 5 ? "18px" : 0,
          }}
        >
          {para}
        </p>
      ))}
    </aside>
  );
}

// ── Sidebar nav ────────────────────────────────────────────────────────────

const SIDEBAR_ITEMS = [
  { id: "m1", label: "M1 · Customer Segmentation" },
  { id: "m2", label: "M2 · Supervised ML & ARM" },
  { id: "m3", label: "M3 · Causal Inference" },
  { id: "m4", label: "M4 · Algorithmic Trading" },
  { id: "interlude", label: "Interlude" },
  { id: "m5", label: "M5 · NLP & Applied LLMs" },
  { id: "m6", label: "M6 · End-to-End Analytics" },
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

export default function PythonPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [activeSection, setActiveSection] = useState("m1");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

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

  const openModal = (id: string) => { setActiveModal(id); setActiveTab(0); };
  const closeModal = () => setActiveModal(null);

  const activeModalConfig = activeModal ? MODAL_CONFIGS.find((c) => c.moduleId === activeModal) : null;

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "88px", paddingBottom: "80px" }}>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}
      {activeModalConfig && (
        <InteractivePlotsModal
          config={activeModalConfig}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={closeModal}
        />
      )}
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
        .r-btn-notebook {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: var(--accent-bright);
          background: transparent;
          padding: 5px 12px;
          border-radius: 3px;
          text-decoration: none;
          border: 1px solid var(--accent-bright);
          transition: background 0.2s, color 0.2s;
          display: inline-block;
          cursor: none;
        }
        .r-btn-notebook:hover {
          background: var(--accent-bright);
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

      {/* ── Page header ── */}
      <header className="r-header animate-fade-up" style={{ marginBottom: "36px" }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)",
            color: "var(--accent)",
            lineHeight: 1.2,
            marginBottom: "14px",
            maxWidth: "100%",
          }}
        >
          Advanced Certificate in Business Analytics for Data-Driven Decision Making (with Python)
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
          SMU Academy · 2024 · Distinction
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
          Six modules. Real datasets. Causal inference, algorithmic trading, NLP, and LLM integration — from first principles to production thinking.
        </p>
      </header>

      <div className="r-content">
        {MODULES.map((mod) => (
          <Fragment key={mod.id}>
            <ModuleCard
              module={mod}
              isExpanded={!!expanded[mod.id]}
              onToggle={() => toggle(mod.id)}
              onImageClick={openLightbox}
              onOpenNotebook={MODAL_CONFIGS.some((c) => c.moduleId === mod.id) ? () => openModal(mod.id) : undefined}
            />
            {mod.id === "m4" && <Interlude />}
          </Fragment>
        ))}
      </div>
    </main>
  );
}
