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
  { src: "/images/netball.jpg",       alt: "Netball"     },
];

const DESCRIPTORS = [
  "Quantitative Poet",
  "Teaching Assistant · SMU Academy",
  "MBAI Candidate · August 2026",
  "Handball Goalkeeper | Sports Fanatic",
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
        className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16
                   grid grid-cols-1 md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_440px]
                   gap-16 md:gap-10 lg:gap-20 h-full"
      >
        {/* ── Left column ── */}
        <div className="flex flex-col gap-6 justify-center">

          {/* Location / discipline label */}
          <p
            className="font-mono text-xs tracking-widest text-muted uppercase animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            Singapore · Data Science · AI · Intelligence Systems
          </p>

          {/* Name */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <h1
              className="font-display font-bold leading-none tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
            >
              <span className="text-warm block">KEZIAH</span>
              <span className="block italic text-accent">Vickraman</span>
            </h1>
          </div>

          {/* Descriptor list */}
          <ul
            className="flex flex-col gap-2 animate-fade-up"
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

          {/* Mathematical poem — directly below descriptors */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "420ms" }}
          >
            <blockquote
              className="font-display italic text-muted leading-loose"
              style={{ fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)" }}
            >
              <p>I study AI</p>
              <p>not because it excites me —</p>
              <p>but because I understand enough</p>
              <p>to know what&rsquo;s at stake:</p>
              <br />
              <p>
                <code
                  className="not-italic font-mono text-accent"
                  style={{ fontSize: "0.88em", letterSpacing: "0.01em" }}
                >
                  P(at_stake&nbsp;|&nbsp;knowledge)
                </code>
                .
              </p>
              <br />
              <p>The posterior is now().</p>
            </blockquote>
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
                sizes="(max-width: 768px) 100vw, 440px"
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
