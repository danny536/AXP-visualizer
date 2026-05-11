"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  label: string;
  side: "human" | "agent";
  isAnimating?: boolean;
};

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export default function TokenCounter({ value, label, side, isAnimating = false }: Props) {
  const [displayed, setDisplayed] = useState(0);
  const animRef = useRef<number>(0);
  const startRef = useRef(0);
  const startValRef = useRef(0);
  const duration = 1200;

  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    startRef.current = performance.now();
    startValRef.current = displayed;

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(t);
      const current = Math.round(startValRef.current + (value - startValRef.current) * eased);
      setDisplayed(current);
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      }
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [value]);

  const isHuman = side === "human";

  return (
    <div className="flex flex-col gap-2">
      {/* Label pill */}
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          isHuman
            ? "bg-white/80 text-ink shadow-sm"
            : "bg-white/10 text-ink"
        }`}
        style={{ backdropFilter: "blur(8px)" }}
      >
        {isHuman ? (
          <HumanIcon />
        ) : (
          <AgentIcon />
        )}
        <span style={{ fontFamily: "var(--font-inter)" }}>{label}</span>
      </div>

      {/* Token count */}
      <div
        className="flex items-center justify-between px-3 py-2.5 rounded-full gap-4 shadow-sm"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 24px rgba(29,17,7,0.06)",
        }}
      >
        <span
          className="text-sm font-medium text-ink"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Tokens
        </span>
        <span
          className={`text-base font-normal tabular-nums transition-colors duration-500 ${
            isAnimating ? "text-botanic-green" : "text-ink"
          }`}
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          {displayed.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function HumanIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.7" />
      <path
        d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function AgentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <circle cx="8.5" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="15.5" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
      <path d="M8 6V4M16 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
