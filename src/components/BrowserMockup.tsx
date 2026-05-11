"use client";

import type { Website } from "@/data/websites";
import HumanView from "./HumanView";
import AgentView from "./AgentView";

type Props = {
  site: Website;
};

export default function BrowserMockup({ site }: Props) {
  return (
    <div
      className="relative w-full rounded-[24px] overflow-hidden browser-shadow"
      style={{
        background: "#e2dfd9",
        aspectRatio: "16/9",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center justify-between h-10 px-4 bg-[#e8e5e0] border-b border-black/10">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>

        {/* URL bar */}
        <div
          className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white/50"
          style={{ minWidth: 180 }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" opacity="0.4">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 3c-2.5 3-4 5.4-4 9s1.5 6 4 9M12 3c2.5 3 4 5.4 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span
            className="text-[11px] text-ink/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {site.domain}
          </span>
        </div>

        {/* Spacer */}
        <div className="w-14" />
      </div>

      {/* Content area — split view */}
      <div className="flex relative" style={{ height: "calc(100% - 40px)" }}>
        {/* Human view — left half */}
        <div className="w-1/2 h-full overflow-hidden relative">
          <HumanView site={site} />
        </div>

        {/* AXP Divider */}
        <div className="relative flex-none w-0 flex items-center justify-center z-10">
          <div
            className="absolute top-0 bottom-0 w-[2px] glow-divider"
            style={{ background: "#D8FC3B", left: -1 }}
          />
          {/* AXP badge on the divider */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 text-[7px] font-bold tracking-widest uppercase py-1 px-2 rounded-full"
            style={{
              background: "#D8FC3B",
              color: "#597a00",
              fontFamily: "var(--font-ibm-plex-mono)",
              whiteSpace: "nowrap",
              boxShadow: "0 0 16px rgba(216,252,59,0.5)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "translateX(-50%) translateY(-50%) rotate(180deg)",
            }}
          >
            AXP
          </div>
        </div>

        {/* Agent view — right half */}
        <div className="w-1/2 h-full overflow-hidden">
          <AgentView site={site} />
        </div>

        {/* Left gradient fade */}
        <div
          className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none z-5"
          style={{
            background: "linear-gradient(to right, rgba(226,223,217,0.3), transparent)",
          }}
        />
        {/* Right gradient fade */}
        <div
          className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none z-5"
          style={{
            background: "linear-gradient(to left, rgba(226,223,217,0.3), transparent)",
          }}
        />

        {/* AI green gradient overlay on right side near divider */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: "50%",
            width: 120,
            background: "linear-gradient(to right, rgba(216,252,59,0.08), transparent)",
          }}
        />
      </div>
    </div>
  );
}
