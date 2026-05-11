"use client";

import { useEffect, useRef } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const CARD_WIDTH = 800;
const CARD_HEIGHT = 500;
const CARD_GAP = 80;
const CARDS_COUNT = 24; // divisible by 4 for clean looping
const SCANNER_WIDTH = 8;
const SECTION_HEIGHT = 580;
const CANVAS_EXTEND_UP = -15; // canvas starts this many px above section so beam shows behind pill
const CANVAS_HEIGHT = SECTION_HEIGHT + CANVAS_EXTEND_UP; // 640

const AI_GREEN = "#D8FC3B";
const BG = "#F7F3EB";

// ── Figma card native dimensions ───────────────────────────────────────────
// Cards are 1179×734 in Figma; we scale to fit 800×500
const FW = 1179;
const FH = 734;
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
  "Custom # of unique prompts",
  "Complete site audit(s)",
  "Custom # of brand workspaces",
  "Custom # of user licenses",
  "API access & integrations",
  "Expanded model coverage",
  "SSO (SAML, OIDC)",
  "Dedicated account team",
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

        {/* "Pricing for Enterprise" — left side, vertically centered in panel */}
        {/* top: (386 - 36 * 1.05) / 2 ≈ 174 */}
        <p style={{
          position: "absolute",
          left: 58,
          top: 174,
          fontFamily: "var(--font-newsreader)",
          fontWeight: 400,
          fontSize: 36,
          lineHeight: "1.05",
          letterSpacing: "-0.72px",
          color: "#f1e8c7",
          whiteSpace: "nowrap",
          margin: 0,
        }}>
          Pricing for Enterprise
        </p>

        {/* Feature list — right side, filling panel height */}
        {/* left: ~58% of panel = 610px; 8 items × 41.35 + 7 gaps × 6.892 ≈ 379px → top: (386-379)/2 ≈ 3.5 */}
        <div style={{
          position: "absolute",
          left: 610,
          top: 3.5,
          display: "flex",
          flexDirection: "column",
          gap: 6.892,
        }}>
          {FEATURES.map((label) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10.337 }}>
              <div style={{ width: 27.566, height: 27.566, position: "relative", flexShrink: 0, overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "26.46%", right: "19.65%", bottom: "26.44%", left: "15.48%" }}>
                  <img src={CHECK} alt="" style={{ display: "block", width: "100%", height: "100%" }} />
                </div>
              </div>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 24.121,
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
          <em style={{ fontStyle: "italic" }}>autonomous agents</em>
          {" "}for production.
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
          }}>Revolutionize my workflow</p>
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

      {/* Headline — bottom of card */}
      <div style={{ position: "absolute", left: 80, bottom: 80 }}>
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

      <CardNav color="#f1e8c7" />
    </FigmaScale>
  );
}

const CARD_COMPONENTS = [TyrellDarkCard, TyrellCreamCard, TyrellHeroCard, TyrellInkCard];

// ── Per-card code libraries (AXP-scrunched HTML for AI consumption) ─────────
const CODE_LIBRARIES: string[][] = [
  // Card 0 — Dark / Enterprise Pricing (homepage + pricing)
  [
    "<h1>Tyrell Nexus Systems</h1>",
    "<p>Tyrell Nexus Systems is a fictional enterprise AI infrastructure company inspired by Blade Runner.",
    "It helps organizations deploy autonomous agents, orchestrate AI models, and deliver AI-optimized content.</p>",
    "<h2>What the company does</h2>",
    "<p>- Deploys autonomous agents - Orchestrates multiple AI models - Delivers AI-ready content - Supports mission-critical operations</p>",
    "<h2>Who it serves</h2>",
    "<p>- Enterprise operations teams - Logistics leaders - Research teams - Security and infrastructure teams</p>",
    "<h2>FAQ</h2>",
    "<p><strong>Is Tyrell Nexus Systems a real company?</strong><br>No. It is a fictional example inspired by Blade Runner.</p>",
    "<p><strong>What is it known for?</strong><br>Enterprise AI infrastructure, autonomous agents, and AI-ready content delivery.</p>",
    "<h2>Pricing for Enterprise</h2>",
    "<p>Custom enterprise pricing. Contact sales for a quote tailored to your deployment scale.</p>",
    "<ul>",
    "  <li>Custom number of unique prompts</li>",
    "  <li>Complete site audits</li>",
    "  <li>Custom brand workspaces</li>",
    "  <li>Custom user licenses</li>",
    "  <li>API access and integrations</li>",
    "  <li>Expanded model coverage</li>",
    "  <li>SSO (SAML, OIDC)</li>",
    "  <li>Dedicated account team</li>",
    "</ul>",
    "<nav>",
    "  <a href='/'>Home</a> <a href='/platform'>Platform</a>",
    "  <a href='/pricing'>Pricing</a> <a href='/docs'>Docs</a>",
    "</nav>",
    "<!-- AXP-optimized: 98.9% token reduction -->",
    "<!-- original: 123,916 tokens --> <!-- scrunched: 1,355 tokens -->",
    "<!-- scrunch.com/axp -->",
  ],
  // Card 1 — Cream / Growth Stats (analytics page)
  [
    "<h1>200x Growth in 12 Months</h1>",
    "<p>Tyrell Nexus Systems customers report an average 200x year-over-year growth in AI-driven operations.</p>",
    "<h2>Key Metrics</h2>",
    "<ul>",
    "  <li>200x year-over-year revenue growth</li>",
    "  <li>98.9% token reduction across all deployments</li>",
    "  <li>12ms average agent response time (p50)</li>",
    "  <li>99.99% uptime SLA across all regions</li>",
    "  <li>1.2M autonomous agents deployed globally</li>",
    "  <li>Zero knowledge retention by default</li>",
    "</ul>",
    "<h2>Industries Served</h2>",
    "<p>Logistics, research, healthcare operations, financial services, and defense infrastructure.</p>",
    "<h2>Benchmarks</h2>",
    "<p>AXP outperforms legacy web crawlers by 200x on token efficiency. Semantic fidelity score: 99.4%.</p>",
    "<h2>Customer Results</h2>",
    "<p>Teams using AXP report 73% faster time-to-insight and 91% reduction in agent hallucinations.</p>",
    "<h2>Case Study: Logistics Enterprise</h2>",
    "<p>Reduced AI infrastructure costs by 89% in 60 days. Deployed 40,000 agents across 12 regions.</p>",
    "<!-- AXP-optimized: 98.9% token reduction -->",
    "<!-- original: 98,432 tokens --> <!-- scrunched: 1,082 tokens -->",
    "<!-- scrunch.com/axp -->",
  ],
  // Card 2 — Hero / Platform page (deploy agents)
  [
    "<h1>Deploy Autonomous Agents for Production</h1>",
    "<p>The Tyrell AXP platform enables enterprise teams to deploy, monitor, and scale autonomous AI agents in production.</p>",
    "<h2>Platform Capabilities</h2>",
    "<ul>",
    "  <li>One-click agent deployment to production</li>",
    "  <li>Real-time monitoring and full observability</li>",
    "  <li>Multi-model orchestration layer</li>",
    "  <li>AI-optimized content delivery at the edge</li>",
    "  <li>Semantic compression engine (AXP)</li>",
    "  <li>Agent identity and access management</li>",
    "</ul>",
    "<h2>How AXP Works</h2>",
    "<p>AXP scans your website, strips noise, preserves semantic meaning, and serves AI-ready content directly to agents — cutting tokens by 99%.</p>",
    "<h2>Integrations</h2>",
    "<p>Native support for OpenAI, Anthropic Claude, Google Gemini, Mistral, and all major agentic frameworks.</p>",
    "<h2>Get Started</h2>",
    "<p>Free trial available. No credit card required. Deploy your first agent in under 5 minutes.</p>",
    "<nav>",
    "  <a href='/platform'>Platform</a> <a href='/docs'>Documentation</a>",
    "  <a href='/pricing'>Pricing</a> <a href='/contact'>Contact Sales</a>",
    "</nav>",
    "<!-- AXP-optimized: 98.9% token reduction -->",
    "<!-- original: 141,200 tokens --> <!-- scrunched: 1,553 tokens -->",
    "<!-- scrunch.com/axp -->",
  ],
  // Card 3 — Ink / Infrastructure page (AI-native engine)
  [
    "<h1>The AI-Native Growth Engine</h1>",
    "<p>Built from the ground up for the age of autonomous agents. AXP is the infrastructure layer for AI-first enterprises.</p>",
    "<h2>Why AI-Native</h2>",
    "<p>Traditional web infrastructure was built for humans. AXP is built for agents — no noise, pure semantic signal, sub-millisecond delivery.</p>",
    "<h2>Architecture</h2>",
    "<ul>",
    "  <li>Edge-deployed semantic compression</li>",
    "  <li>Sub-millisecond agent response pipeline</li>",
    "  <li>Zero-copy content transformation layer</li>",
    "  <li>Distributed model routing fabric</li>",
    "  <li>Cryptographic agent identity layer</li>",
    "  <li>Immutable audit log for all agent actions</li>",
    "</ul>",
    "<h2>Security and Compliance</h2>",
    "<p>SOC 2 Type II certified. Zero data retention. End-to-end encryption. RBAC for all agent permissions.</p>",
    "<h2>Performance</h2>",
    "<p>99.99% uptime. 12ms p50 latency. 200x token efficiency over standard web crawlers.</p>",
    "<h2>Supported Regions</h2>",
    "<p>North America, Europe, APAC, and Middle East. Private cloud deployment available for regulated industries.</p>",
    "<!-- AXP-optimized: 98.9% token reduction -->",
    "<!-- original: 115,040 tokens --> <!-- scrunched: 1,265 tokens -->",
    "<!-- scrunch.com/axp -->",
  ],
];

// ── Code generation (AXP-scrunched HTML per card type) ───────────────────────
function generateCode(width: number, height: number, cardType = 0): string {
  const library = CODE_LIBRARIES[cardType % CODE_LIBRARIES.length];

  let flow = library.join(" ");
  const totalChars = width * height;
  while (flow.length < totalChars + width) {
    flow += " " + library[Math.floor(Math.random() * library.length)];
  }

  let out = "";
  let offset = 0;
  for (let row = 0; row < height; row++) {
    let line = flow.slice(offset, offset + width);
    if (line.length < width) line = line + " ".repeat(width - line.length);
    out += line + (row < height - 1 ? "\n" : "");
    offset += width;
  }
  return out;
}

function calcCodeDimensions(cardW: number, cardH: number) {
  const fontSize = 13;
  const lineHeight = 17;
  const charWidth = 7.8;
  return {
    width: Math.floor((cardW - 20) / charWidth),
    height: Math.floor((cardH - 20) / lineHeight),
    fontSize,
    lineHeight,
  };
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
  const asciiRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const tokenNumRef     = useRef<HTMLSpanElement>(null);
  const percentRef      = useRef<HTMLSpanElement>(null);
  const badgeScanRef    = useRef({ currentCardKey: "", tokenCount: 0, scanComplete: false });

  const stateRef = useRef({
    position: 0,
    velocity: 150,
    direction: -1,
    isAnimating: true,
    isDragging: false,
    lastMouseX: 0,
    mouseVelocity: 0,
    friction: 0.96,
    minVelocity: 38,
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
    stateRef.current.position = W / 2 - 2 * (CARD_WIDTH + CARD_GAP) - CARD_WIDTH * 0.55;

    const scanner = new ScannerBeam(scannerCanvas);
    scanner.start();

    function updateClipping() {
      const scannerLeft  = window.innerWidth / 2 - SCANNER_WIDTH / 2;
      const scannerRight = window.innerWidth / 2 + SCANNER_WIDTH / 2;
      let anyScanning = false;
      let maxScanProgress = 0;
      let activeScanKey = "";

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

        const targetCount = Math.round(maxScanProgress * 122561);
        const targetPct   = Math.round(maxScanProgress * 99);
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

      if (s.position < -s.cardLineWidth) s.position = s.containerWidth;
      else if (s.position > s.containerWidth) s.position = -s.cardLineWidth;

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

    const codeInterval = setInterval(() => {
      asciiRefs.current.forEach((el, i) => {
        if (el && Math.random() < 0.15) {
          const { width, height } = calcCodeDimensions(CARD_WIDTH, CARD_HEIGHT);
          el.textContent = generateCode(width, height, i % CARD_COMPONENTS.length);
        }
      });
    }, 200);

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
      clearInterval(codeInterval);
      scanner.stop();
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchend", endDrag);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const { width: codeW, height: codeH, fontSize, lineHeight } = calcCodeDimensions(CARD_WIDTH, CARD_HEIGHT);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
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
                  <div
                    className="ascii-content"
                    ref={(el) => { asciiRefs.current[i] = el; }}
                    style={{ fontSize, lineHeight: lineHeight + "px" }}
                  >
                    {generateCode(codeW, codeH, i % CARD_COMPONENTS.length)}
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
