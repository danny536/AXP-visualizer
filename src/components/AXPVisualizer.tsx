"use client";

import CardStreamSection from "./CardStreamSection";
import FeatureCards from "./FeatureCards";

export default function AXPVisualizer() {

  return (
    <div className="bg-grid min-h-screen flex flex-col" style={{ backgroundColor: "#F7F3EB" }}>

{/* ── Hero text ── */}
      <div
        className="flex flex-col sm:flex-row items-start"
        style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "64px 120px 48px", gap: 160 }}
      >
        {/* Left — headline, fixed width so right column can grow independently */}
        <div style={{ flex: "0 0 535px", minWidth: 0 }}>
          <p
            style={{ fontFamily: "var(--font-inter)", color: "#93886F", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}
          >
            AXP
          </p>
          <h1
            style={{ fontFamily: "var(--font-newsreader)", color: "#1D1107", fontSize: 48, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.96px", margin: 0 }}
          >
            Your site isn&apos;t built for AI.<br />
            <em style={{ fontStyle: "italic" }}>Now it can be.</em>
          </h1>
        </div>

        {/* Right — description + CTA */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 28, paddingTop: 33 }}>
          <p
            style={{ fontFamily: "var(--font-inter)", color: "#1D1107", fontSize: 18, lineHeight: 1.5, letterSpacing: "-0.36px", fontWeight: 400, margin: 0 }}
          >
            Agent Experience Platform (AXP) detects AI agents at the edge and serves them AI optimized content—all without disrupting the human experience.
          </p>
          <a
            href="https://scrunch.com"
            style={{ display: "inline-flex", alignItems: "center", alignSelf: "flex-start", padding: "12px 24px", borderRadius: 30, background: "#2B4BEB", color: "#FBF9F6", fontFamily: "var(--font-inter)", fontSize: 16, fontWeight: 500, letterSpacing: "-0.16px", textDecoration: "none" }}
          >
            Explore AXP
          </a>
        </div>
      </div>

      {/* ── Card Stream + Scanner (dark hero section) ── */}
      <CardStreamSection />

      {/* ── Feature cards ── */}
      <div className="px-10 pb-10" style={{ paddingTop: 100 }}>
        <FeatureCards />
      </div>

      {/* ── Footer spacer ── */}
      <footer className="mt-auto px-6 py-4" style={{ borderTop: "1px solid rgba(29,17,7,0.07)" }} />
    </div>
  );
}
