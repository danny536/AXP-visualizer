"use client";

import { useEffect, useRef } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const CARD_WIDTH = 800;
const CARD_HEIGHT = 500;
const CARD_GAP = 80;
const CARDS_COUNT = 24; // divisible by 6 for clean looping
const SCANNER_WIDTH = 8;
const SECTION_HEIGHT = 580;
const CANVAS_EXTEND_UP = -15; // canvas starts this many px above section so beam shows behind pill
const CANVAS_HEIGHT = SECTION_HEIGHT + CANVAS_EXTEND_UP; // 640

const AI_GREEN = "#D8FC3B";
const BG = "#F7F3EB";

// ── Figma card native dimensions ───────────────────────────────────────────
// Cards are 1179×734 in Figma; we scale to fit 800×500
const FW = 1179;
const FH = 737;
const FS = CARD_WIDTH / FW; // ≈ 0.6785

// ── Local image paths (downloaded to /public/tyrell/) ─────────────────────
const LOGO_DARK  = "/tyrell/logo-dark.svg";  // cream #F1E8C7 — dark/hero/ink cards
const LOGO_LIGHT = "/tyrell/logo-light.svg"; // dark #242220 — cream card
const PHOTO_HOLO = "/tyrell/photo-holo.png"; // atmospheric blue photo
const CHECK      = "/tyrell/check.svg";      // checkmark icon
const TEX_CREAM  = "/tyrell/tex-cream.png";  // cream paper texture
const TEX_HERO       = "/tyrell/tex-hero.png";   // hero atmospheric texture
const PHOTO_GERONIMO = "/tyrell/photo-geronimo.png"; // warm orange/teal photo

const FEATURES = [
  "Autonomous agent deployments",
  "Multi-model orchestration",
  "AI-optimized content delivery",
  "Off-world infrastructure support",
  "Real-time decision intelligence",
  "Mission-critical security",
  "Enterprise governance layer",
  "Dedicated deployment team",
];

// ── Shared nav ─────────────────────────────────────────────────────────────
function CardNav({ color }: { color: string }) {
  return (
    <div style={{ position: "absolute", right: 60, top: 44, display: "flex", gap: 40 }}>
      {["PRODUCTS", "ABOUT", "CONTACT"].map((item) => (
        <span key={item} style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontWeight: 400,
          fontSize: 21,
          letterSpacing: -0.42,
          color,
          whiteSpace: "nowrap",
        }}>{item}</span>
      ))}
    </div>
  );
}

// ── Wrapper: renders Figma content at native size, scaled into card ─────────
function FigmaScale({ children, bg = "transparent" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: FW,
      height: FH,
      transform: `scale(${FS})`,
      transformOrigin: "top left",
      position: "absolute",
      top: 0,
      left: 0,
      background: bg,
    }}>
      {children}
    </div>
  );
}

// ── Card 1 — Tyrell Dark (Enterprise Pricing) ────────────────────────────
function TyrellDarkCard() {
  return (
    <FigmaScale bg="#242220">
      {/* Dark background */}
      <div style={{ position: "absolute", inset: 0, background: "#242220" }} />

      {/* Tyrell logo */}
      <div style={{ position: "absolute", left: 58, top: 48, width: 257.94, height: 95.03, overflow: "hidden" }}>
        <img src={LOGO_DARK} alt="Tyrell" style={{ position: "absolute", inset: "0 0 -5.23% 0", width: "100%", height: "105.23%" }} />
      </div>

      <CardNav color="#f1e8c7" />

      {/* Photo panel — centered horizontally (67px side padding), 67px bottom padding */}
      {/* left: (1179 - 1045) / 2 = 67, top: 734 - 386 - 67 = 281 */}
      <div style={{
        position: "absolute",
        left: 67,
        top: 281,
        width: 1045,
        height: 386,
        background: "#000",
        borderRadius: 38,
        overflow: "hidden",
      }}>
        {/* Holo photo fills panel */}
        <img
          src={PHOTO_HOLO}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
            pointerEvents: "none",
          }}
        />

        {/* "Documentation" — top-left of image panel */}
        <div style={{ position: "absolute", left: 44, top: 36 }}>
          <p style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: "1.05",
            letterSpacing: "-0.2px",
            color: "#f1e8c7",
            whiteSpace: "nowrap",
            margin: 0,
          }}>Documentation</p>
        </div>

        {/* Feature list — right side, filling panel height */}
        <div style={{
          position: "absolute",
          left: 570,
          top: 36,
          display: "flex",
          flexDirection: "column",
          gap: 6.892,
        }}>
          {FEATURES.map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontWeight: 400,
                fontSize: 20,
                lineHeight: "41.35px",
                color: "rgba(241,232,199,0.45)",
                flexShrink: 0,
                width: 28,
              }}>{String(i + 1).padStart(2, "0")}</span>
              <p style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontWeight: 400,
                fontSize: 20,
                lineHeight: "41.35px",
                color: "#f1e8c7",
                whiteSpace: "nowrap",
                margin: 0,
              }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </FigmaScale>
  );
}

// ── Card 2 — Tyrell Cream (200x Growth) ─────────────────────────────────
function TyrellCreamCard() {
  return (
    <FigmaScale bg="#f1e8c7">
      {/* Cream base */}
      <div style={{ position: "absolute", inset: 0, background: "#f1e8c7" }} />
      {/* Texture overlay */}
      <img
        src={TEX_CREAM}
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "bottom",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div style={{ position: "absolute", left: 58, top: 48, width: 257.94, height: 100, overflow: "hidden" }}>
        <img src={LOGO_LIGHT} alt="Tyrell" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "top left" }} />
      </div>

      {/* 200x / growth YOY — bottom-left */}
      <div style={{ position: "absolute", left: 80, bottom: 96 }}>
        <p style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontWeight: 500,
          fontSize: 80,
          letterSpacing: -1.6,
          lineHeight: 0.9,
          color: "#242220",
          margin: 0,
        }}>200x</p>
        <p style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontWeight: 400,
          fontSize: 40,
          letterSpacing: -0.8,
          lineHeight: 0.9,
          color: "#242220",
          margin: "12px 0 0",
        }}>growth YOY</p>
      </div>

      {/* ── Case study column — right, starts halfway ── */}
      <div style={{ position: "absolute", left: 580, bottom: 96, width: 541, padding: "0 58px 0 0" }}>
        {/* Body */}
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 26, fontWeight: 400, color: "#1D1107", lineHeight: 1.45, letterSpacing: -0.52, margin: "0 0 32px" }}>
          How Tyrell Nexus Systems scaled autonomous agents across 40,000 nodes in under 5 minutes — 200x token efficiency at enterprise scale.
        </p>
        {/* Stats row */}
        <div style={{ display: "flex", gap: 40 }}>
          {[
            { val: "89%", label: "lower AI costs" },
            { val: "91%", label: "fewer hallucinations" },
            { val: "0",   label: "downtime" },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 38, fontWeight: 500, color: "#1D1107", letterSpacing: -0.8, margin: "0 0 6px" }}>{s.val}</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 20, fontWeight: 400, color: "#1D1107", lineHeight: 1.2, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <CardNav color="#242220" />
    </FigmaScale>
  );
}

// ── Card 3 — Tyrell Hero (Deploy autonomous agents) ───────────────────────
function TyrellHeroCard() {
  return (
    <FigmaScale bg="#f1e8c7">
      {/* Cream base */}
      <div style={{ position: "absolute", inset: 0, background: "#f1e8c7" }} />
      {/* Hero texture — full cover */}
      <img
        src={TEX_HERO}
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div style={{ position: "absolute", left: 58, top: 48, width: 257.94, height: 100, overflow: "hidden" }}>
        <img src={LOGO_DARK} alt="Tyrell" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "top left" }} />
      </div>

      {/* Headline + CTA — bottom-left */}
      <div style={{
        position: "absolute",
        left: 80,
        bottom: 80,
        width: 739,
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}>
        <p style={{
          fontFamily: "var(--font-newsreader)",
          fontWeight: 400,
          fontSize: 80,
          letterSpacing: -1.6,
          lineHeight: 0.9,
          color: "#f1e8c7",
          margin: 0,
          whiteSpace: "normal",
        }}>
          Deploy{" "}
          <em style={{ fontStyle: "italic" }}>intelligent agents</em>
          {" "}across every operation.
        </p>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          background: "#242220",
          borderRadius: 63,
          padding: "24px 48px",
          alignSelf: "flex-start",
        }}>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            fontSize: 20,
            letterSpacing: -0.2,
            color: "#f1e8c7",
            whiteSpace: "nowrap",
            margin: 0,
          }}>Deploy Nexus infrastructure</p>
        </div>
      </div>

      <CardNav color="#1d1107" />
    </FigmaScale>
  );
}

// ── Card 4 — Tyrell Ink (dark with photo) ─────────────────────────────────
function TyrellInkCard() {
  return (
    <FigmaScale bg="#1d1107">
      {/* Deep ink background */}
      <div style={{ position: "absolute", inset: 0, background: "#1d1107" }} />

      {/* Geronimo photo panel — bottom portion */}
      <div style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 1179,
        height: 420,
        overflow: "hidden",
      }}>
        <img
          src={PHOTO_GERONIMO}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            pointerEvents: "none",
            opacity: 0.85,
          }}
        />
        {/* Gradient overlay to blend into ink bg */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, #1d1107 0%, transparent 35%)",
        }} />
      </div>

      {/* Logo */}
      <div style={{ position: "absolute", left: 58, top: 48, width: 257.94, height: 100, overflow: "hidden" }}>
        <img src={LOGO_DARK} alt="Tyrell" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "top left" }} />
      </div>

      {/* Headline — aligned with spec list top */}
      <div style={{ position: "absolute", left: 80, top: 496 }}>
        <p style={{
          fontFamily: "var(--font-newsreader)",
          fontWeight: 400,
          fontSize: 72,
          letterSpacing: -1.44,
          lineHeight: 0.95,
          color: "#f1e8c7",
          margin: 0,
          whiteSpace: "normal",
          width: 700,
        }}>
          The AI-native<br /><em>growth engine.</em>
        </p>
      </div>

      {/* ── Spec list — right side, half off bottom ── */}
      <div style={{
        position: "absolute",
        right: 72,
        top: 460,
        width: 480,
        padding: "36px 36px 36px",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 26 }}>
          <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 22, fontWeight: 400, color: "#f1e8c7", letterSpacing: -0.2 }}>Product</span>
          <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 22, fontWeight: 400, color: "#f1e8c7" }}>01</span>
        </div>
        {/* Divider */}
        <div style={{ height: 1, background: "#f1e8c7", marginBottom: 26 }} />
        {/* Spec rows */}
        {[
          "Nexus agent deployment",
          "Multi-model orchestration",
          "AI content delivery",
          "Autonomous routing",
          "Off-world infrastructure",
          "Enterprise governance",
        ].map((spec) => (
          <div key={spec} style={{ marginBottom: 18 }}>
            <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 22, fontWeight: 400, color: "#f1e8c7", letterSpacing: -0.2 }}>{spec}</span>
          </div>
        ))}
      </div>

      <CardNav color="#f1e8c7" />
    </FigmaScale>
  );
}

// ── Card 5 — Tyrell Pricing (cream, two-plan comparison) ──────────────────────
function TyrellPricingCard() {
  const FEATURES = [
    { label: "Agent deployments",   v1: "500 / mo",      v2: "Unlimited" },
    { label: "Orchestration nodes", v1: "3",             v2: "Unlimited" },
    { label: "Infrastructure envs", v1: "1",             v2: "Custom" },
    { label: "User licenses",       v1: "Up to 5",       v2: "Unlimited" },
    { label: "Model coverage",      v1: "Standard",      v2: "Expanded" },
    { label: "API access",          v1: "Included",      v2: "Full + webhooks" },
    { label: "Support",             v1: "Email",         v2: "Dedicated team" },
  ];

  const labelX = 58;
  const v1X    = 500;
  const v2X    = 790;
  const planRowY = 291;

  return (
    <FigmaScale bg="transparent">
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #F1E8C7 0%, #F1E8C7 30%, #99B72C 58%, #84A027 75%, #67624C 100%)" }} />
      {/* Grain overlay */}
      <img src={TEX_CREAM} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, mixBlendMode: "multiply", pointerEvents: "none" }} />

      {/* Logo */}
      <div style={{ position: "absolute", left: 58, top: 48, width: 257.94, height: 100, overflow: "hidden" }}>
        <img src={LOGO_LIGHT} alt="Tyrell" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "top left" }} />
      </div>
      <CardNav color="#242220" />

      {/* Top rule */}
      <div style={{ position: "absolute", left: 58, top: 195, width: 1063, height: 1, background: "#242220", opacity: 0.18 }} />

      {/* ── Plan 01 ── */}
      <div style={{ position: "absolute", left: labelX, top: planRowY }}>
        <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 20, fontWeight: 400, color: "#242220", letterSpacing: -0.3, margin: 0 }}>Professional</p>
        <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 108, fontWeight: 500, color: "#242220", letterSpacing: -2.5, lineHeight: 0.88, margin: "14px 0 0" }}>$299</p>
      </div>

      {/* ── Plan 02 ── */}
      <div style={{ position: "absolute", left: v1X, top: planRowY }}>
        <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 20, fontWeight: 400, color: "#242220", letterSpacing: -0.3, margin: 0 }}>Enterprise</p>
        <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 108, fontWeight: 500, color: "#242220", letterSpacing: -2.5, lineHeight: 0.88, margin: "14px 0 0" }}>$2,400</p>
      </div>

      {/* Feature table rule */}
      <div style={{ position: "absolute", left: 58, top: 520, width: 1063, height: 1, background: "#242220", opacity: 0.18 }} />

      {/* Feature rows */}
      {FEATURES.map((f, i) => (
        <div key={f.label} style={{ position: "absolute", left: labelX, top: 538 + i * 34, display: "flex", width: 1063 }}>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 19, fontWeight: 400, color: "#242220", opacity: 0.5, width: v1X - labelX }}>{f.label}</span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 19, fontWeight: 500, color: "#242220", width: v2X - v1X }}>{f.v1}</span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 19, fontWeight: 500, color: "#242220" }}>{f.v2}</span>
        </div>
      ))}
    </FigmaScale>
  );
}

// ── Card 6 — Tyrell Blog (white, 3-column article grid) ──────────────────────
function TyrellBlogCard() {
  const cardTop  = 320;
  const cardH    = 478;
  const radius   = 20;

  return (
    <FigmaScale bg="transparent">
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #93886F 0%, #40362E 50%, #0F0C06 100%)" }} />
      {/* Grain overlay */}
      <img src={TEX_CREAM} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, mixBlendMode: "multiply", pointerEvents: "none" }} />

      {/* Logo */}
      <div style={{ position: "absolute", left: 58, top: 48, width: 257.94, height: 100, overflow: "hidden" }}>
        <img src={LOGO_DARK} alt="Tyrell" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "top left" }} />
      </div>
      <CardNav color="#f1e8c7" />

      {/* Top rule */}
      <div style={{ position: "absolute", left: 58, top: 195, width: 1063, height: 1, background: "#f1e8c7", opacity: 0.25 }} />

      {/* ── Article card 1 ── */}
      <div style={{ position: "absolute", left: 58, top: cardTop, width: 301, height: cardH, borderRadius: radius, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 8, right: 8, height: "calc(62% - 8px)", borderRadius: radius, overflow: "hidden" }}>
          <img src={PHOTO_GERONIMO} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* Text area */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "38%", padding: "22px 24px" }}>
          <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 13, fontWeight: 400, color: "#F1E8C7", opacity: 0.45, margin: "0 0 10px" }}>

            Nexus Platform
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 19, fontWeight: 500, color: "#F1E8C7", margin: 0, lineHeight: 1.25, letterSpacing: -0.38 }}>
            How Tyrell Nexus deploys agents at planetary scale
          </p>
        </div>
      </div>

      {/* ── Article card 2 (featured) ── */}
      <div style={{ position: "absolute", left: 379, top: cardTop, width: 420, height: cardH, borderRadius: radius, overflow: "hidden" }}>
        <img src={PHOTO_HOLO} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.6) 100%)" }} />
        {/* Date */}
        <div style={{ position: "absolute", top: 22, left: 22 }}>
          <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 13, color: "rgba(241,232,199,0.75)", fontWeight: 400 }}>Mar 18, 2025</span>
        </div>
        {/* Title */}
        <div style={{ position: "absolute", top: 72, left: 22, right: 22 }}>
          <p style={{ fontFamily: "var(--font-newsreader)", fontSize: 32, fontWeight: 400, color: "#F1E8C7", margin: 0, lineHeight: 1.08, letterSpacing: -0.64 }}>
            The Tyrell vision: autonomous intelligence at the edge
          </p>
        </div>
        {/* Play button */}
        <div style={{ position: "absolute", bottom: 26, left: 22, display: "flex", alignItems: "center", gap: 10 }}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 36, color: "rgba(241,232,199,0.9)", fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24", lineHeight: 1 }}
          >play_circle</span>
          <span style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: "rgba(241,232,199,0.9)", fontWeight: 400 }}>Watch this video</span>
        </div>
      </div>

      {/* ── Article card 3 ── */}
      <div style={{ position: "absolute", left: 819, top: cardTop, width: 302, height: cardH, borderRadius: radius, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 8, right: 8, height: "calc(62% - 8px)", borderRadius: radius, overflow: "hidden" }}>
          <img src={TEX_HERO} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        </div>
        {/* Text area */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "38%", padding: "22px 24px" }}>
          <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 13, fontWeight: 400, color: "#F1E8C7", opacity: 0.45, margin: "0 0 10px" }}>

            Off-World Ops
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 19, fontWeight: 500, color: "#F1E8C7", margin: 0, lineHeight: 1.25, letterSpacing: -0.38 }}>
            Nexus infrastructure across 12 off-world regions
          </p>
        </div>
      </div>
    </FigmaScale>
  );
}

const CARD_COMPONENTS = [TyrellDarkCard, TyrellHeroCard, TyrellPricingCard, TyrellCreamCard, TyrellBlogCard, TyrellInkCard];

// ── Per-card code libraries (AXP-scrunched HTML for AI consumption) ─────────
const CODE_LIBRARIES: string[][] = [
  // Card 0 — Dark / Documentation
  [
    "<h1>Tyrell Nexus — Documentation</h1>",
    "<p>Everything you need to deploy and operate",
    "Nexus-class agent infrastructure at scale.</p>",
    "",
    "<h2>01. Nexus Agent Deployment</h2>",
    "<p>Spin up autonomous agents across any",
    "environment in under 5 minutes. No code,",
    "no DevOps, no engineering overhead.</p>",
    "",
    "<h2>02. Multi-Model Orchestration</h2>",
    "<p>Route tasks intelligently across GPT-4,",
    "Claude, Gemini, and custom models.",
    "One API. Full observability.</p>",
    "",
    "<h2>03. AI Content Delivery</h2>",
    "<p>Serve token-light, semantically rich",
    "pages directly to AI consumers.",
    "Sub-15ms p99. Zero config.</p>",
    "",
    "<h2>04. Off-World Infrastructure Support</h2>",
    "<p>Built for hostile, distributed, and",
    "air-gapped environments. 99.99% uptime",
    "SLA across all regions.</p>",
    "",
    "<h2>05. Real-Time Decision Intelligence</h2>",
    "<p>Live signal routing with sub-12ms",
    "agent response time at p50.</p>",
    "",
    "<h2>06. Mission-Critical Security</h2>",
    "<p>SOC 2 Type II. Zero knowledge retention.",
    "SAML, OIDC, and custom SSO supported.</p>",
    "",
    "<h2>07. Enterprise Governance Layer</h2>",
    "<p>Audit logs, role-based access, and",
    "compliance tooling built in by default.</p>",
    "",
    "<h2>08. Dedicated Deployment Team</h2>",
    "<p>A Tyrell engineer joins your onboarding.",
    "White-glove setup. Ongoing support.</p>",
    "",
  ],
  // Card 1 — Hero / Homepage (index matches CARD_COMPONENTS[1])
  [
    "<h1>Deploy intelligent agents</h1>",
    "<h1>across every operation.</h1>",
    "",
    "<p>Tyrell Nexus Systems. Enterprise AI",
    "infrastructure for the age of autonomous",
    "operations. Live in under 5 minutes.</p>",
    "",
    "<a href='/deploy'>Deploy Nexus infrastructure</a>",
    "",
    "<nav>",
    "  <a href='/products'>Products</a>",
    "  <a href='/about'>About</a>",
    "  <a href='/contact'>Contact</a>",
    "</nav>",
    "",
    "<h2>Built for planetary scale</h2>",
    "",
    "<h3>Nexus agent deployment</h3>",
    "<p>Spin up autonomous agents across any",
    "environment in under 5 minutes. No code,",
    "no DevOps, no overhead.</p>",
    "",
    "<h3>Multi-model orchestration</h3>",
    "<p>Route tasks across GPT-4, Claude,",
    "Gemini, and custom endpoints.",
    "One API. Full observability.</p>",
    "",
    "<h3>Off-world infrastructure</h3>",
    "<p>Built for hostile, distributed, and",
    "air-gapped environments. 99.99% uptime",
    "SLA across all regions.</p>",
    "",
    "<h3>Real-time decision intelligence</h3>",
    "<p>Live signal routing with sub-12ms",
    "agent response time at p50. Zero",
    "knowledge retention by default.</p>",
    "",
    "<h2>Performance</h2>",
    "<ul>",
    "  <li>200x token efficiency</li>",
    "  <li>99.99% uptime SLA</li>",
    "  <li>Deploy in under 5 minutes</li>",
    "  <li>40,000+ nodes activated</li>",
    "  <li>89% lower AI costs</li>",
    "  <li>91% fewer hallucinations</li>",
    "</ul>",
    "",
    "<footer>",
    "  <p>Tyrell Nexus Systems &copy; 2025</p>",
    "  <a href='/privacy'>Privacy</a>",
    "  <a href='/terms'>Terms</a>",
    "  <a href='/status'>Status</a>",
    "</footer>",
  ],
  // Card 2 — Pricing (index matches CARD_COMPONENTS[2])
  [
    "<h1>Tyrell Nexus — Pricing</h1>",
    "<p>Two plans for teams of every scale.",
    "Start lean. Expand to the off-world.</p>",
    "",
    "<h2>Professional — $299 / mo</h2>",
    "<p>For growing teams deploying Nexus",
    "agents for the first time.</p>",
    "<ul>",
    "  <li>Agent deployments: 500 / mo</li>",
    "  <li>Orchestration nodes: 3</li>",
    "  <li>Infrastructure envs: 1</li>",
    "  <li>User licenses: Up to 5</li>",
    "  <li>Model coverage: Standard</li>",
    "  <li>API access: Included</li>",
    "  <li>Support: Email</li>",
    "</ul>",
    "",
    "<h2>Enterprise — $2,400 / mo</h2>",
    "<p>For organizations running Nexus",
    "agents at planetary scale.</p>",
    "<ul>",
    "  <li>Agent deployments: Unlimited</li>",
    "  <li>Orchestration nodes: Unlimited</li>",
    "  <li>Infrastructure envs: Custom</li>",
    "  <li>User licenses: Unlimited</li>",
    "  <li>Model coverage: Expanded</li>",
    "  <li>API access: Full + webhooks</li>",
    "  <li>Support: Dedicated team</li>",
    "</ul>",
    "",
  ],
  // Card 3 — Cream / Case Study
  [
    "<h1>Case Study: Tyrell Nexus Systems</h1>",
    "<p>How Tyrell Nexus Systems scaled autonomous",
    "agents across 40,000 nodes in under 5 minutes",
    "— 200x token efficiency at enterprise scale.</p>",
    "",
    "<h2>The Challenge</h2>",
    "<p>Tyrell Nexus operated across 12 off-world",
    "regions with fragmented AI infrastructure.",
    "Legacy crawlers consumed 40x more tokens",
    "than necessary, inflating costs and",
    "degrading agent response fidelity.</p>",
    "",
    "<h2>The Solution</h2>",
    "<p>Tyrell deployed Nexus-class agent",
    "infrastructure with AXP edge delivery.",
    "Zero configuration. No engineering team",
    "required. Live in under 5 minutes.</p>",
    "",
    "<h2>Results</h2>",
    "<ul>",
    "  <li>89% lower AI infrastructure costs</li>",
    "  <li>91% fewer agent hallucinations</li>",
    "  <li>200x token efficiency improvement</li>",
    "  <li>0 downtime during rollout</li>",
    "  <li>40,000 nodes activated in 5 min</li>",
    "</ul>",
    "",
  ],
  // Card 4 — Ink / Infrastructure page
  [
    "<h1>The AI-Native Growth Engine</h1>",
    "<p>Built from the ground up for the age of",
    "autonomous agents. AXP is the infrastructure",
    "layer powering AI-first enterprises.</p>",
    "",
    "<h2>Why AI-Native Architecture</h2>",
    "<p>Traditional web infrastructure was built for",
    "humans — full of visual chrome, navigation",
    "elements, and rendering overhead. AXP strips",
    "all of that and delivers pure semantic signal",
    "at sub-millisecond latency.</p>",
    "",
    "<h2>Core Architecture</h2>",
    "<ul>",
    "  <li>Edge-deployed semantic compression</li>",
    "  <li>Sub-millisecond agent pipeline</li>",
    "  <li>Zero-copy content transformation</li>",
    "  <li>Distributed model routing fabric</li>",
    "  <li>Cryptographic agent identity layer</li>",
    "  <li>Immutable audit log</li>",
    "  <li>Real-time token metering</li>",
    "  <li>Adaptive content versioning</li>",
    "</ul>",
    "",
    "<h2>Security and Compliance</h2>",
    "<p>SOC 2 Type II certified. Zero data",
    "retention by default. End-to-end encryption.",
    "RBAC for all agent permissions. GDPR and",
    "HIPAA compliant deployment modes available.</p>",
    "",
    "<h2>Performance Benchmarks</h2>",
    "<p>99.99% uptime. 12ms p50 latency.",
    "200x token efficiency over crawlers.",
    "3ms cold start (p95). 99.4% semantic",
    "fidelity vs. original content.</p>",
    "",
    "<h2>Supported Regions</h2>",
    "<p>",
    "- North America (us-east-1, us-west-2)",
    "- Europe (eu-west-1, eu-central-1)",
    "- Asia Pacific (ap-southeast-1)",
    "- Middle East (me-south-1)",
    "- Private cloud on request",
    "</p>",
    "",
    "<h2>Deployment Options</h2>",
    "<p>Managed cloud, private cloud, or",
    "on-premise. Kubernetes-native. Terraform",
    "and Pulumi modules available.</p>",
    "",
  ],
  // Card 5 — Blog (index matches CARD_COMPONENTS[5])
  [
    "<h1>Tyrell Nexus — Blog</h1>",
    "",
    "<article>",
    "<h2>How Tyrell Nexus deploys agents",
    "at planetary scale</h2>",
    "<p>Mar 18, 2025 · Nexus Platform</p>",
    "<p>Inside the Tyrell orchestration layer:",
    "how Nexus-class agents coordinate across",
    "40,000 nodes with sub-12ms latency.</p>",
    "</article>",
    "",
    "<article>",
    "<h2>The Tyrell vision: autonomous",
    "intelligence at the edge</h2>",
    "<p>Mar 18, 2025 · Video</p>",
    "<p>Tyrell co-founder on building the first",
    "AI-native enterprise infrastructure —",
    "and why off-world ops demand it.</p>",
    "</article>",
    "",
    "<article>",
    "<h2>Nexus infrastructure across",
    "12 off-world regions</h2>",
    "<p>Off-World Ops · Mar 5, 2025</p>",
    "<p>How Tyrell Nexus maintains 99.99% uptime",
    "across hostile environments — zero",
    "human intervention required.</p>",
    "</article>",
    "",
  ],
];

// ── Per-card stats (used by badge + metadata comments) ────────────────────────
const CARD_STATS = [
  { pct: 98.9, original: 123916, scrunched: 1355  }, // Dark
  { pct: 97.2, original: 141200, scrunched: 3940  }, // Hero
  { pct: 96.4, original:  88720, scrunched: 3180  }, // Pricing
  { pct: 93.6, original:  98432, scrunched: 6300  }, // Cream
  { pct: 94.1, original: 107800, scrunched: 6360  }, // Blog
  { pct: 95.8, original: 115040, scrunched: 4840  }, // Ink
];

// ── AXP metadata comment blocks (right column) ────────────────────────────────
const CARD_URLS = [
  "tyrellnexus.com/documentation", // Dark
  "tyrellnexus.com",               // Hero (home)
  "tyrellnexus.com/pricing",       // Pricing
  "tyrellnexus.com/case-study",    // Cream
  "tyrellnexus.com/blog",          // Blog
  "tyrellnexus.com/product",       // Ink
];
const META_BLOCKS = CARD_STATS.map((s, i) => [
  `<!-- AXP-optimized: ${s.pct}% token reduction -->`,
  `<!-- original: ${s.original.toLocaleString("en-US")} tokens -->`,
  `<!-- scrunched: ${s.scrunched.toLocaleString("en-US")} tokens -->`,
  `<!-- ${CARD_URLS[i]} -->`,
]);

// ── Code generation (AXP-scrunched HTML per card type) ───────────────────────
function generateCode(cardType = 0): string {
  const library = CODE_LIBRARIES[cardType % CODE_LIBRARIES.length];
  return library.join("\n");
}

function generateMeta(cardType = 0): string {
  return META_BLOCKS[cardType % META_BLOCKS.length].join("\n");
}

// ── Pixel colors — 80% AI Green, 20% warm neutral ─────────────────────────
const PIXEL_COLORS = [
  "#D8FC3B", "#D8FC3B", "#D8FC3B", "#D8FC3B",
  "#F1E8C7",
];

// ── Scanner Beam ───────────────────────────────────────────────────────────
class ScannerBeam {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  beamCanvas: HTMLCanvasElement;
  beamCtx: CanvasRenderingContext2D;
  w = 0;
  h = CANVAS_HEIGHT;

  particles: Array<{
    x: number; y: number; vx: number; vy: number;
    r: number; alpha: number; life: number;
    startX: number; twinkleSpeed: number; twinkleAmount: number; time: number;
    color: string;
  }> = [];
  count = 0;
  maxParticles = 600;
  intensity = 0.8;
  lightBarX = 0;
  lightBarWidth = 3;
  fadeZone = 12;

  scanTargetIntensity = 1.8;
  scanTargetParticles = 2000;
  scanTargetFadeZone = 35;

  scanningActive = false;
  currentIntensity: number;
  currentMaxParticles: number;
  currentFadeZone: number;
  currentGlowIntensity = 1;
  transitionSpeed = 0.05;

  animId = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.beamCanvas = document.createElement("canvas");
    this.beamCtx = this.beamCanvas.getContext("2d")!;
    this.currentIntensity = this.intensity;
    this.currentMaxParticles = this.maxParticles;
    this.currentFadeZone = this.fadeZone;
    this.resize();
    this.initParticles();
  }

  resize() {
    this.w = window.innerWidth;
    this.lightBarX = this.w / 2;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.beamCanvas.width = this.w;
    this.beamCanvas.height = this.h;
  }

  rnd(min: number, max: number) { return Math.random() * (max - min) + min; }

  makeParticle() {
    const ir = this.intensity / 0.8;
    const speedMul = 1 + (ir - 1) * 1.2;
    const sizeMul  = 1 + (ir - 1) * 0.7;
    const color = PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)];
    const p = {
      x: this.lightBarX + this.rnd(-this.lightBarWidth / 2, this.lightBarWidth / 2),
      y: this.rnd(0, this.h),
      vx: this.rnd(0.3, 1.2) * speedMul,
      vy: this.rnd(-0.2, 0.2) * speedMul,
      r: this.rnd(0.6, 2.0) * sizeMul,
      alpha: this.rnd(0.5, 0.9),
      life: 1.0,
      startX: 0,
      twinkleSpeed: this.rnd(0.02, 0.08) * speedMul,
      twinkleAmount: this.rnd(0.05, 0.2),
      time: 0,
      color,
    };
    p.startX = p.x;
    return p;
  }

  initParticles() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.count++;
      this.particles[this.count] = this.makeParticle();
    }
  }

  updateParticle(p: ScannerBeam["particles"][number]) {
    p.x += p.vx;
    p.y += p.vy;
    p.time++;
    const orig = p.alpha;
    p.alpha = orig * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
    p.life -= this.rnd(0.004, 0.02);
    if (p.x > this.w + 10 || p.life <= 0) Object.assign(p, this.makeParticle());
  }

  drawParticle(p: ScannerBeam["particles"][number]) {
    if (p.life <= 0) return;
    const size = Math.max(1, Math.round(p.r * 1.4));
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = p.color;
    this.ctx.fillRect(Math.round(p.x - size / 2), Math.round(p.y - size / 2), size, size);
  }

  drawBeam() {
    const bctx = this.beamCtx;
    const lx = this.lightBarX;
    const lw = this.lightBarWidth;

    const targetGlow = this.scanningActive ? 3.5 : 1;
    this.currentGlowIntensity += (targetGlow - this.currentGlowIntensity) * this.transitionSpeed;
    const gi = this.currentGlowIntensity;

    bctx.clearRect(0, 0, this.w, this.h);
    bctx.globalCompositeOperation = "source-over";
    bctx.globalAlpha = 1;

    const core = bctx.createLinearGradient(lx - lw * 4, 0, lx + lw * 4, 0);
    core.addColorStop(0,   "rgba(216,252,59,0)");
    core.addColorStop(0.4, `rgba(216,252,59,${0.9 * gi})`);
    core.addColorStop(0.5, `rgba(230,255,80,${1.0 * gi})`);
    core.addColorStop(0.6, `rgba(216,252,59,${0.9 * gi})`);
    core.addColorStop(1,   "rgba(216,252,59,0)");
    bctx.fillStyle = core;
    bctx.fillRect(lx - lw * 4, 0, lw * 8, this.h);

    const g1 = bctx.createLinearGradient(lx - lw * 10, 0, lx + lw * 10, 0);
    g1.addColorStop(0,   "rgba(216,252,59,0)");
    g1.addColorStop(0.5, `rgba(216,252,59,${0.18 * gi})`);
    g1.addColorStop(1,   "rgba(216,252,59,0)");
    bctx.fillStyle = g1;
    bctx.fillRect(lx - lw * 10, 0, lw * 20, this.h);

    const g2 = bctx.createLinearGradient(lx - lw * 20, 0, lx + lw * 20, 0);
    g2.addColorStop(0,   "rgba(216,252,59,0)");
    g2.addColorStop(0.5, `rgba(216,252,59,${0.06 * gi})`);
    g2.addColorStop(1,   "rgba(216,252,59,0)");
    bctx.fillStyle = g2;
    bctx.fillRect(lx - lw * 20, 0, lw * 40, this.h);

    const topFade = this.currentFadeZone / this.h;
    // Bottom fade starts 15px lower than symmetric, making the beam longer at bottom
    const bottomFadeStart = Math.min((this.h - this.currentFadeZone + 15) / this.h, 1);
    const vGrad = bctx.createLinearGradient(0, 0, 0, this.h);
    vGrad.addColorStop(0,               "rgba(0,0,0,0)");
    vGrad.addColorStop(topFade,         "rgba(0,0,0,1)");
    vGrad.addColorStop(bottomFadeStart, "rgba(0,0,0,1)");
    vGrad.addColorStop(1,               "rgba(0,0,0,0)");
    bctx.globalCompositeOperation = "destination-in";
    bctx.fillStyle = vGrad;
    bctx.fillRect(0, 0, this.w, this.h);

    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(this.beamCanvas, 0, 0);
  }

  render() {
    const tI = this.scanningActive ? this.scanTargetIntensity : 0.8;
    const tP = this.scanningActive ? this.scanTargetParticles : 600;
    const tF = this.scanningActive ? this.scanTargetFadeZone : 12;

    this.currentIntensity     += (tI - this.currentIntensity)     * this.transitionSpeed;
    this.currentMaxParticles  += (tP - this.currentMaxParticles)  * this.transitionSpeed;
    this.currentFadeZone      += (tF - this.currentFadeZone)      * this.transitionSpeed;

    this.intensity   = this.currentIntensity;
    this.maxParticles = Math.floor(this.currentMaxParticles);
    this.fadeZone    = this.currentFadeZone;

    this.ctx.clearRect(0, 0, this.w, this.h);
    this.drawBeam();

    this.ctx.globalCompositeOperation = "source-over";
    for (let i = 1; i <= this.count; i++) {
      if (this.particles[i]) {
        this.updateParticle(this.particles[i]);
        this.drawParticle(this.particles[i]);
      }
    }

    const ir = this.intensity / 0.8;
    if (Math.random() < this.intensity && this.count < this.maxParticles) {
      this.count++; this.particles[this.count] = this.makeParticle();
    }
    if (ir > 1.1 && Math.random() < (ir - 1.0) * 1.2 && this.count < this.maxParticles) {
      this.count++; this.particles[this.count] = this.makeParticle();
    }
    if (ir > 1.5 && Math.random() < (ir - 1.5) * 1.8 && this.count < this.maxParticles) {
      this.count++; this.particles[this.count] = this.makeParticle();
    }
    if (this.count > this.maxParticles + 200) {
      const trim = Math.min(15, this.count - this.maxParticles);
      for (let i = 0; i < trim; i++) delete this.particles[this.count - i];
      this.count -= trim;
    }
  }

  start() {
    const loop = () => { this.render(); this.animId = requestAnimationFrame(loop); };
    this.animId = requestAnimationFrame(loop);
  }
  stop()  { cancelAnimationFrame(this.animId); }
  setScanning(active: boolean) { this.scanningActive = active; }
  onResize() { this.resize(); }
}

// ── React Component ────────────────────────────────────────────────────────
export default function CardStreamSection() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardLineRef     = useRef<HTMLDivElement>(null);
  const tokenNumRef     = useRef<HTMLSpanElement>(null);
  const percentRef      = useRef<HTMLSpanElement>(null);
  const badgeScanRef    = useRef({ currentCardKey: "", tokenCount: 0, scanComplete: false });

  const stateRef = useRef({
    position: 0,
    velocity: 188,
    direction: -1,
    isAnimating: true,
    isDragging: false,
    lastMouseX: 0,
    mouseVelocity: 0,
    friction: 0.96,
    minVelocity: 48,
    containerWidth: 0,
    cardLineWidth: 0,
    animId: 0,
    lastTime: 0,
  });

  useEffect(() => {
    const container    = containerRef.current;
    const cardLine     = cardLineRef.current;
    const scannerCanvas = scannerCanvasRef.current;
    if (!container || !cardLine || !scannerCanvas) return;

    function calcDimensions() {
      stateRef.current.containerWidth = container!.offsetWidth;
      stateRef.current.cardLineWidth  = (CARD_WIDTH + CARD_GAP) * CARDS_COUNT;
    }
    calcDimensions();

    const W = stateRef.current.containerWidth;
    stateRef.current.position = W / 2 - 1 * (CARD_WIDTH + CARD_GAP) - CARD_WIDTH * 0.15;

    const scanner = new ScannerBeam(scannerCanvas);
    scanner.start();

    function updateClipping() {
      const scannerLeft  = window.innerWidth / 2 - SCANNER_WIDTH / 2;
      const scannerRight = window.innerWidth / 2 + SCANNER_WIDTH / 2;
      let anyScanning = false;
      let maxScanProgress = 0;
      let activeScanKey = "";
      let activeCardType = 0;

      cardLine!.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper, idx) => {
        const rect = wrapper.getBoundingClientRect();
        const normalCard = wrapper.querySelector<HTMLElement>(".card-normal");
        const asciiCard  = wrapper.querySelector<HTMLElement>(".card-ascii");
        if (!normalCard || !asciiCard) return;

        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyScanning = true;
          const intLeft     = Math.max(scannerLeft - rect.left, 0);
          const intRight    = Math.min(scannerRight - rect.left, rect.width);
          const clipRightPct = (intLeft / rect.width) * 100;   // % of normal card hidden from left
          const clipLeftPct  = (intRight / rect.width) * 100;  // % of ascii card revealed

          normalCard.style.clipPath = `inset(0 0 0 ${clipRightPct}%)`;
          asciiCard.style.clipPath = `inset(0 ${100 - clipLeftPct}% 0 0)`;

          // Track max progress for token badge
          const progress = Math.min(1, intLeft / rect.width);
          if (progress > maxScanProgress) {
            maxScanProgress = progress;
            activeScanKey = `w-${idx}`;
            activeCardType = idx % CARD_COMPONENTS.length;
          }

          if (!wrapper.hasAttribute("data-scanned") && intLeft > 0) {
            wrapper.setAttribute("data-scanned", "true");
            const flash = document.createElement("div");
            flash.className = "scan-effect";
            wrapper.appendChild(flash);
            setTimeout(() => flash.parentNode?.removeChild(flash), 600);
          }
        } else if (rect.right < scannerLeft) {
          // Fully consumed — normal card hidden, ascii card fully visible
          normalCard.style.clipPath = "inset(0 0 0 100%)";
          asciiCard.style.clipPath  = "inset(0 0% 0 0)";
        } else {
          // Not yet reached — normal card fully visible, ascii hidden
          normalCard.style.clipPath = "inset(0 0 0 0%)";
          asciiCard.style.clipPath  = "inset(0 100% 0 0)";
          wrapper.removeAttribute("data-scanned");
        }
      });

      scanner.setScanning(anyScanning);

      // ── Token badge update ───────────────────────────────────────────────
      const badge = badgeScanRef.current;
      if (activeScanKey) {
        const isNew   = activeScanKey !== badge.currentCardKey;
        const isReset = !isNew && maxScanProgress < 0.05 && badge.tokenCount > 1000;

        if (isNew || isReset) {
          badge.currentCardKey = activeScanKey;
          badge.scanComplete   = false;
          badge.tokenCount     = 0;
          if (tokenNumRef.current) tokenNumRef.current.textContent = "-0";
          if (percentRef.current) percentRef.current.textContent = "0% smaller";
        }

        const stats = CARD_STATS[activeCardType];
        const targetCount = Math.round(maxScanProgress * stats.original);
        const targetPct   = Math.round(maxScanProgress * stats.pct);
        if (targetCount !== badge.tokenCount) {
          badge.tokenCount = targetCount;
          if (tokenNumRef.current) {
            tokenNumRef.current.textContent = `-${targetCount.toLocaleString("en-US")}`;
          }
          if (percentRef.current) {
            percentRef.current.textContent = `${targetPct}% smaller`;
          }
        }
      }
    }

    function animate(now: number) {
      const s = stateRef.current;
      const dt = Math.min((now - s.lastTime) / 1000, 0.05);
      s.lastTime = now;

      if (s.isAnimating && !s.isDragging) {
        if (s.velocity > s.minVelocity) s.velocity *= s.friction;
        else s.velocity = s.minVelocity;
        s.position += s.velocity * s.direction * dt;
      }

      if (s.position < -s.cardLineWidth) s.position += s.cardLineWidth;
      else if (s.position > 0) s.position -= s.cardLineWidth;

      cardLine!.style.transform = `translateX(${s.position}px)`;
      updateClipping();
      s.animId = requestAnimationFrame(animate);
    }

    stateRef.current.lastTime = performance.now();
    stateRef.current.animId   = requestAnimationFrame(animate);

    requestAnimationFrame(() => {
      cardLine!.style.transform = `translateX(${stateRef.current.position}px)`;
      updateClipping();
    });

    function startDrag(clientX: number) {
      const s = stateRef.current;
      s.isDragging = true; s.isAnimating = false;
      s.lastMouseX = clientX; s.mouseVelocity = 0;
      const tx = new DOMMatrix(window.getComputedStyle(cardLine!).transform);
      s.position = tx.m41;
      cardLine!.classList.add("dragging");
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    }
    function onDrag(clientX: number) {
      const s = stateRef.current;
      if (!s.isDragging) return;
      const dx = clientX - s.lastMouseX;
      s.position += dx; s.mouseVelocity = dx * 60; s.lastMouseX = clientX;
    }
    function endDrag() {
      const s = stateRef.current;
      if (!s.isDragging) return;
      s.isDragging = false;
      cardLine!.classList.remove("dragging");
      if (Math.abs(s.mouseVelocity) > s.minVelocity) {
        s.velocity = Math.abs(s.mouseVelocity);
        s.direction = s.mouseVelocity > 0 ? 1 : -1;
      } else { s.velocity = 100; }
      s.isAnimating = true;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
    const mouseMoveHandler = (e: MouseEvent) => { if (stateRef.current.isDragging) onDrag(e.clientX); };
    cardLine.addEventListener("mousedown", (e) => startDrag(e.clientX));
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", endDrag);
    cardLine.addEventListener("touchstart", (e) => { e.preventDefault(); startDrag(e.touches[0].clientX); }, { passive: false });
    document.addEventListener("touchmove", (e) => { if (stateRef.current.isDragging) { e.preventDefault(); onDrag(e.touches[0].clientX); } }, { passive: false });
    document.addEventListener("touchend", endDrag);
    cardLine.addEventListener("selectstart", (e) => e.preventDefault());
    cardLine.addEventListener("dragstart", (e) => e.preventDefault());

    function onResize() { calcDimensions(); scanner.onResize(); }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      scanner.stop();
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchend", endDrag);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full card-stream-section"
      style={{ height: SECTION_HEIGHT, background: BG }}
    >
      {/* Inner clip — keeps card stream from overflowing horizontally/vertically */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Card stream */}
      <div
        className="card-stream"
        style={{ zIndex: 5, height: CARD_HEIGHT, top: "50%", transform: "translateY(-50%)", position: "absolute" }}
      >
        <div className="card-line" ref={cardLineRef}>
          {Array.from({ length: CARDS_COUNT }, (_, i) => {
            const CardComp = CARD_COMPONENTS[i % CARD_COMPONENTS.length];
            return (
              <div key={i} className="card-wrapper">
                {/* Human view — Figma card */}
                <div className="card card-normal">
                  <CardComp />
                </div>
                {/* Agent view — AXP code */}
                <div className="card card-ascii">
                  {/* Fade mask wrapper covers both columns */}
                  <div style={{
                    position: "absolute", inset: 0, display: "flex",
                    WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.5) 82%, rgba(0,0,0,0.08) 100%)",
                    maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,0.5) 82%, rgba(0,0,0,0.08) 100%)",
                    animation: "glitch 0.12s infinite linear alternate-reverse",
                  }}>
                    {/* Left column: structured HTML */}
                    <div style={{
                      flex: "0 0 52%", height: "100%", overflow: "hidden",
                      fontFamily: "var(--font-ibm-plex-mono), 'Courier New', monospace",
                      fontSize: 13, lineHeight: "17px",
                      color: "rgba(29,17,7,0.62)",
                      whiteSpace: "pre-wrap", padding: "18px 8px 18px 20px",
                      boxSizing: "border-box",
                    }}>
                      {generateCode(i % CARD_COMPONENTS.length)}
                    </div>
                    {/* Right column: AXP metadata comments */}
                    <div style={{
                      flex: "0 0 48%", height: "100%", overflow: "hidden",
                      fontFamily: "var(--font-ibm-plex-mono), 'Courier New', monospace",
                      fontSize: 13, lineHeight: "17px",
                      color: "rgba(29,17,7,0.45)",
                      whiteSpace: "pre-wrap", padding: "18px 20px 18px 0",
                      boxSizing: "border-box",
                    }}>
                      {generateMeta(i % CARD_COMPONENTS.length)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>{/* end inner clip */}

      {/* Scanner beam canvas — extends CANVAS_EXTEND_UP px above section so beam shows behind pill */}
      <canvas
        ref={scannerCanvasRef}
        className="card-scanner-canvas"
        style={{
          position: "absolute", top: -CANVAS_EXTEND_UP, left: -3,
          width: "100vw", height: CANVAS_HEIGHT,
          zIndex: 15, pointerEvents: "none",
        }}
      />

      {/* Token reduction badge — pill overlaps top of cards */}
      <div style={{
        position: "absolute", top: -4, left: "50%",
        transform: "translateX(-50%)", zIndex: 20, pointerEvents: "none",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      }}>
        <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 500, color: "#93886F", whiteSpace: "nowrap" }}>
          Token reduction
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "6px 18px", borderRadius: 999,
          background: AI_GREEN, boxShadow: "0 0 24px rgba(216,252,59,0.35)", whiteSpace: "nowrap",
        }}>
          <span
            ref={tokenNumRef}
            style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#597a00", fontSize: 15, fontWeight: 500 }}
          >-0</span>
          <span
            ref={percentRef}
            style={{ fontFamily: "var(--font-inter)", color: "#597a00", fontSize: 11, fontWeight: 700 }}
          >0% smaller</span>
        </div>
      </div>

    </section>
  );
}
