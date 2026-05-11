"use client";

import CardStreamSection from "./CardStreamSection";
import FeatureCards from "./FeatureCards";

export default function AXPVisualizer() {

  return (
    <div className="bg-grid min-h-screen flex flex-col" style={{ backgroundColor: "#F7F3EB" }}>

      {/* ── Header ── */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(29,17,7,0.07)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-inter)", color: "#1D1107" }}
          >
            scrunch
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: "#D8FC3B",
              color: "#597a00",
              fontFamily: "var(--font-ibm-plex-mono)",
            }}
          >
            AXP
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-6">
          {["Platform", "Monitoring", "Insights", "Pricing"].map((item) => (
            <span
              key={item}
              className="text-sm cursor-pointer transition-colors"
              style={{ fontFamily: "var(--font-inter)", color: "#93886F" }}
            >
              {item}
            </span>
          ))}
        </nav>

        <a
          href="https://scrunch.com"
          className="text-sm font-medium px-4 py-2 rounded-full"
          style={{
            background: "#2A4AEA",
            color: "white",
            fontFamily: "var(--font-inter)",
          }}
        >
          Start free trial
        </a>
      </header>

      {/* ── Hero text ── */}
      <div className="px-6 pt-10 pb-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{
            background: "rgba(42,74,234,0.08)",
            color: "#2A4AEA",
            fontFamily: "var(--font-inter)",
          }}
        >
          Agent Experience Platform
        </div>
        <h1
          className="text-4xl sm:text-5xl font-normal leading-tight mb-3"
          style={{ fontFamily: "var(--font-newsreader)", color: "#1D1107" }}
        >
          Your website...{" "}
          <em style={{ fontFamily: "var(--font-newsreader)" }}>scrunched</em>
          {" "}for AI traffic
        </h1>
        <p
          className="text-base max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-inter)", color: "#93886F" }}
        >
          Watch the AXP scanner transform any website — stripping noise,
          preserving meaning, cutting tokens by 99%.
          <br />
          <span className="text-xs opacity-70">Drag the stream. Scroll to explore.</span>
        </p>
      </div>

      {/* ── Card Stream + Scanner (dark hero section) ── */}
      <CardStreamSection />

      {/* ── Feature cards ── */}
      <div className="px-6 pb-10">
        <div
          className="text-xs text-center mb-4 font-medium"
          style={{ fontFamily: "var(--font-inter)", color: "#93886F" }}
        >
          Part of the Scrunch Agent Experience Platform
        </div>
        <FeatureCards />
      </div>

      {/* ── Footer ── */}
      <footer
        className="mt-auto px-6 py-4 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(29,17,7,0.07)" }}
      >
        <span
          style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "#93886F" }}
        >
          © 2025 Scrunch. Built with AXP.
        </span>
        <a
          href="https://scrunch.com"
          style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "#2A4AEA" }}
        >
          scrunch.com →
        </a>
      </footer>
    </div>
  );
}
