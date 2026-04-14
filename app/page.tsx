"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
  { year: "2025-Present", desc: "Business Analyst"},
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
    <main className="h-screen overflow-hidden bg-bg">
      <section
        className="w-full h-full grid grid-cols-2 gap-[40px]"
      >
        {/* ── Left column ── */}
        <div className="flex flex-col overflow-y-auto pl-12 lg:pl-20 pb-10 justify-start" style={{ paddingTop: "100px" }}>

          {/* Location / discipline label */}
          <p
            className="font-mono text-xs tracking-widest text-muted uppercase animate-fade-up"
          >
            Singapore · Data Science · AI/ML · Intelligence Systems
          </p>

          {/* Name */}
          <div
            className="animate-fade-up mt-3"
            style={{ animationDelay: "120ms" }}
          >
            <h1
              className="font-display font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.75rem, 6.2vw, 5.5rem)" }}
            >
              <span className="text-warm block">KEZIAH</span>
              <span className="block italic text-accent">Vickraman</span>
            </h1>
          </div>

          {/* Descriptor list */}
          <ul
            className="flex flex-col gap-2 animate-fade-up mt-10"
            style={{ animationDelay: "260ms" }}
          >
            {DESCRIPTORS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-mono text-sm text-muted"
              >
                <span
                  className="mt-px shrink-0 text-accent"
                  aria-hidden="true"
                >
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Credentials */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "340ms", marginTop: "48px" }}
          >
            <div style={{
              background: "#2a2a2a",
              padding: "20px",
              borderRadius: "8px",
              borderLeft: "3px solid var(--accent)",
            }}>
              <p className="font-mono text-accent uppercase mb-3" style={{ fontSize: "13px", letterSpacing: "0.15em" }}>
                Timeline
              </p>
              <ul className="flex flex-col gap-1">
                {CREDENTIALS.map((c) => (
                  <li key={c.year + c.desc} className="font-mono" style={{ fontSize: "0.72rem" }}>
                    <span className="text-accent">{c.year}</span>
                    <span className="text-warm"> · {c.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* About prose */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "420ms", marginTop: "24px" }}
          >
            <div style={{
              background: "#2a2a2a",
              padding: "20px",
              borderRadius: "8px",
              borderLeft: "3px solid var(--accent)",
            }}>
            <p className="font-mono text-accent uppercase mb-3" style={{ fontSize: "13px", letterSpacing: "0.15em" }}>
              About
            </p>
            <p
              className="font-display text-warm leading-relaxed"
              style={{ fontSize: "clamp(0.88rem, 1.1vw, 1rem)", marginBottom: "1.2em" }}
            >
              I sit at the intersection of quantitative rigour and human meaning — what I call being a quantitative poet.
            </p>
            <p
              className="font-display text-warm leading-relaxed"
              style={{ fontSize: "clamp(0.88rem, 1.1vw, 1rem)", marginBottom: "1.2em" }}
            >
              By day, I&rsquo;m a Business Analyst at Unison Group, where I bridge Finance and IT on regulatory and systems projects, including Basel III reforms implementation. Beyond my core scope, I&rsquo;m independently building and deploying internal AI agents — spanning document parsing, workflow automation, RAG-based chatbots, and email automation — bringing AI adoption into the organisation from the ground up.
            </p>
            <p
              className="font-display text-warm leading-relaxed"
              style={{ fontSize: "clamp(0.88rem, 1.1vw, 1rem)", marginBottom: "1.2em" }}
            >
              I also teach at SMU Academy and the SMU Masters programmes as a Teaching Assistant — covering Python, R, machine learning, causal inference, and CX/UX — because I believe the best analysts need to be able to translate and explain technicalities to anyone.
            </p>
            <p
              className="font-display text-warm leading-relaxed"
              style={{ fontSize: "clamp(0.88rem, 1.1vw, 1rem)", marginBottom: "1.2em" }}
            >
              Sport is not a hobby — it&rsquo;s a lens. As an ex-competitive player, I&rsquo;m drawn to the decision architectures of fast-reaction sports: how performance data can surface insights that intuition alone misses. I&rsquo;m actively exploring where AI and sports analytics intersect, bringing the same rigour I apply to financial and product problems into that space.
            </p>
            <p
              className="font-display text-accent leading-relaxed italic"
              style={{ fontSize: "clamp(0.88rem, 1.1vw, 1rem)" }}
            >
              I build things that think, and I think about things that matter.
            </p>
            </div>
          </div>
        </div>

        {/* ── Right column — full-height photo carousel ── */}
        <div
          className="relative overflow-hidden animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="50vw"
                className="object-cover object-center"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Carousel dots — overlaid at bottom of photo */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to photo ${i + 1}`}
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  backgroundColor: i === current ? "var(--accent)" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
