"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Scale ring on interactive element hover
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label")
      ) {
        ring?.classList.add("cursor-ring--hover");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label")
      ) {
        ring?.classList.remove("cursor-ring--hover");
      }
    };

    const tick = () => {
      // Dot snaps instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // Ring follows with easing (lerp)
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Gold dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      {/* Teal ring — follows with delay, scales on hover */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid var(--accent2)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0.6,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease, border-color 0.2s ease",
          willChange: "transform",
        }}
      />
      <style>{`
        .cursor-ring--hover {
          width: 48px !important;
          height: 48px !important;
          opacity: 0.9 !important;
          border-color: var(--accent) !important;
        }
      `}</style>
    </>
  );
}
