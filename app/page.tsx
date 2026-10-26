"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CursorNote } from "@/components/CursorNote";

const PHOTOS = [
  { src: "/images/travel.jpg",        alt: "Travel"      },
  { src: "/images/personal_grad.jpg", alt: "Graduation"  },
  { src: "/images/family.jpg",        alt: "Family"      },
  { src: "/images/goat.jpg",          alt: "Goat"        },
  { src: "/images/coach.jpg",         alt: "Coaching"    },
  { src: "/images/handball.jpg",      alt: "Handball"    },
  { src: "/images/ball.jpg",           alt: "Ball"        },
];

const DESCRIPTORS = [
  "Quantitative Poet",
  "SMU MSc Masters of Business AI (MBAI) Candidate · August 2026",
  "Handball Goalkeeper | Sports Fanatic",
];

const CREDENTIALS = [
  { year: "2020–2024", desc: "BBM · SMU · Quantitative Finance + Communications Management" },
  { year: "2025–Present", desc: "Teaching Assistant · SMU Academy & SMU Masters · Python, R, Machine Learning, Causal Inference, CX/UX, Agentic AI" },
  { year: "2025", desc: "Advanced Certifications · Python · R" },
  { year: "Sep 2025 – Jul 2026", desc: "Business Analyst"},
  { year: "2026", desc: "Databricks Certified Data Analyst · AI Partner Technical Pool" },
  { year: "Present", desc: "MSc Business AI Candidate · August 2026 Intake" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PHOTOS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="hp">
      <style>{`
        /* Centred two-column page: text on the left, a framed photo and
           the timeline beside it, so most of it is visible at once. */
        .hp {
          max-width: 1180px;
          margin: 0 auto;
          padding: 104px 40px 64px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          grid-template-areas:
            "intro aside"
            "about aside";
          grid-template-rows: auto 1fr;
          gap: 0 64px;
        }
        .hp-intro { grid-area: intro; }
        .hp-about { grid-area: about; margin-top: 36px; }
        .hp-aside {
          grid-area: aside;
          align-self: start;
          position: sticky;
          top: 96px;
        }

        .hp-eyebrow {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--subtle);
        }
        .hp-name {
          margin-top: 10px;
          font-family: var(--font-playfair), Georgia, serif;
          font-weight: 700;
          font-size: clamp(2.6rem, 5vw, 4.25rem);
          line-height: 0.98;
          letter-spacing: -0.01em;
        }
        .hp-name span { display: block; }
        .hp-name-first { color: var(--text); }
        .hp-name-last { color: var(--accent); font-style: italic; }
        .hp-roles {
          list-style: none;
          margin-top: 22px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 13px;
          line-height: 1.6;
          color: var(--subtle);
        }
        .hp-roles li { display: flex; gap: 10px; }
        .hp-roles span[aria-hidden] { color: var(--accent); flex-shrink: 0; }

        .hp-heading {
          font-family: var(--font-playfair), Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 1.25rem;
          color: var(--accent);
          padding-bottom: 8px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--border);
        }
        .hp-prose p {
          max-width: 64ch;
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text);
        }
        .hp-prose p + p { margin-top: 1em; }
        .hp-prose .hp-closing { font-style: italic; color: var(--accent); }

        /* framed photo with plain dots underneath */
        .hp-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          max-height: 440px;
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          background: var(--panel);
        }
        .hp-slide {
          position: absolute;
          inset: 0;
          transition: opacity 0.7s ease;
        }
        .hp-dots {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-top: 6px;
        }
        .hp-dot {
          width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: inherit;
          border-radius: 50%;
        }
        .hp-dot::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--border);
          transition: background 0.2s ease;
        }
        .hp-dot[aria-current="true"]::before { background: var(--accent); }
        .hp-dot:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 1px;
        }

        .hp-timeline { margin-top: 20px; }
        .hp-timeline .hp-heading { margin-bottom: 4px; }
        .hp-timeline ul { list-style: none; }
        .hp-timeline li {
          display: grid;
          grid-template-columns: 142px minmax(0, 1fr);
          gap: 10px;
          padding: 7px 0;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 11.5px;
          line-height: 1.5;
        }
        .hp-timeline li:last-child { border-bottom: none; }
        .hp-year { color: var(--accent); }
        .hp-desc { color: var(--text); }

        /* Phone and narrow tablet: one column — intro, photo, about, timeline */
        @media (max-width: 959px) {
          .hp {
            padding: 92px 16px 48px;
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: "intro" "aside" "about";
            grid-template-rows: auto;
          }
          .hp-aside {
            position: static;
            margin-top: 28px;
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 0 32px;
          }
          .hp-photo { max-height: none; aspect-ratio: 4 / 3; }
          .hp-about { margin-top: 32px; }
        }
        @media (min-width: 640px) and (max-width: 959px) {
          /* tablet: photo and timeline side by side under the intro */
          .hp-aside { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; }
          .hp-photo { aspect-ratio: 4 / 5; }
          .hp-timeline { margin-top: 0; }
        }
      `}</style>

      {/* ── Name and roles ── */}
      <div className="hp-intro animate-fade-up">
        <p className="hp-eyebrow">
          Singapore · Data Science · AI/ML · Intelligence Systems
        </p>
        <h1 className="hp-name">
          <span className="hp-name-first">KEZIAH</span>
          <span className="hp-name-last">Vickraman</span>
        </h1>
        <ul className="hp-roles">
          {DESCRIPTORS.map((item) => (
            <li key={item}>
              <span aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Photo and timeline ── */}
      <aside className="hp-aside animate-fade-up" style={{ animationDelay: "120ms" }}>
        <div>
          <div className="hp-photo">
            {PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                className="hp-slide"
                style={{ opacity: i === current ? 1 : 0 }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 960px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
          <div className="hp-dots">
            {PHOTOS.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                className="hp-dot"
                onClick={() => setCurrent(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === current}
              />
            ))}
          </div>
        </div>

        <section className="hp-timeline" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="hp-heading">Timeline</h2>
          <ul>
            {CREDENTIALS.map((c) => (
              <li key={c.year + c.desc}>
                <span className="hp-year">{c.year}</span>
                <span className="hp-desc">{c.desc}</span>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* ── About ── */}
      <section
        className="hp-about animate-fade-up"
        style={{ animationDelay: "200ms" }}
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading" className="hp-heading">About</h2>
        <div className="hp-prose">
          <p>
            I sit at the intersection of quantitative rigour and human meaning — what I call being a quantitative poet.
          </p>
          <p>
            From Sep 2025 to Jul 2026, I was a Business Analyst at Unison Group, where I bridged Finance and IT on regulatory and systems projects, including Basel III reforms implementation. Beyond my core scope, I independently built and deployed internal AI agents — spanning document parsing, workflow automation, RAG-based chatbots, and email automation — bringing AI adoption into the organisation from the ground up.
          </p>
          <p>
            I also teach at SMU Academy and the SMU Masters programmes as a Teaching Assistant — covering Python, R, machine learning, causal inference, and CX/UX — because I believe the best analysts need to be able to translate and explain technicalities to anyone.
          </p>
          <p>
            Sport is not a hobby — it&rsquo;s a lens. As an ex-competitive player, I&rsquo;m drawn to the decision architectures of fast-reaction sports: how performance data can surface insights that intuition alone misses. I&rsquo;m actively exploring where AI and sports analytics intersect, bringing the same rigour I apply to financial and product problems into that space.
          </p>
          <p className="hp-closing">
            I build things that think, and I think about things that matter.
          </p>
        </div>
        <CursorNote />
      </section>
    </main>
  );
}
