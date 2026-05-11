"use client";

import { useEffect, useRef } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const CARD_WIDTH = 800;
const CARD_HEIGHT = 500;
const CARD_GAP = 80;
const CARDS_COUNT = 24; // divisible by 4 for clean looping
const SCANNER_WIDTH = 8;
const SECTION_HEIGHT = 580;

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
      <div style={{ position: "absolute", inset: 0, background: "#242220", borderRadius: 66 }} />

      {/* Holographic photo panel — translated to show right half on card left */}
      <div style={{
        position: "absolute",
        left: -522,
        top: 0,
        width: 1045,
        height: 386,
        background: "#000",
        borderRadius: 38,
        overflow: "hidden",
      }}>
        <img
          src={PHOTO_HOLO}
          alt=""
          style={{
            position: "absolute",
            bottom: -87.73,
            left: 0,
            width: 1166.785,
            height: 782.546,
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
        <p style={{
          position: "absolute",
          left: 58 + 522,
          top: 174,
          fontFamily: "var(--font-newsreader)",
          fontWeight: 400,
          fontSize: 36,
          lineHeight: 1.05,
          letterSpacing: -0.72,
          color: "#f1e8c7",
          whiteSpace: "nowrap",
          margin: 0,
        }}>
          Pricing for Enterprise
        </p>
      </div>

      {/* Tyrell logo */}
      <div style={{ position: "absolute", left: 58, top: 48, width: 257.94, height: 95.03, overflow: "hidden" }}>
        <img src={LOGO_DARK} alt="Tyrell" style={{ position: "absolute", inset: "0 0 -5.23% 0", width: "100%", height: "105.23%" }} />
      </div>

      {/* Feature list — right side */}
      <div style={{ position: "absolute", left: 560, top: 80, display: "flex", flexDirection: "column", gap: 6.892 }}>
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

      <CardNav color="#f1e8c7" />
    </FigmaScale>
  );
}

// ── Card 2 — Tyrell Cream (200x Growth) ─────────────────────────────────
function TyrellCreamCard() {
  return (
    <FigmaScale bg="#f1e8c7">
      {/* Cream base with rounded corners */}
      <div style={{ position: "absolute", inset: 0, background: "#f1e8c7", borderRadius: 66 }} />
      {/* Texture overlay */}
      <img
        src={TEX_CREAM}
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "bottom",
          borderRadius: 66,
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
      <div style={{ position: "absolute", inset: 0, background: "#f1e8c7", borderRadius: 66 }} />
      {/* Hero texture — full cover */}
      <img
        src={TEX_HERO}
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          borderRadius: 66,
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
      <div style={{ position: "absolute", inset: 0, background: "#1d1107", borderRadius: 66 }} />

      {/* Geronimo photo panel — bottom portion */}
      <div style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 1179,
        height: 420,
        borderRadius: "0 0 66px 66px",
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

      {/* Headline */}
      <div style={{ position: "absolute", left: 80, top: 160 }}>
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

// ── Code generation (AXP-flavored HTML) ────────────────────────────────────
function generateCode(width: number, height: number): string {
  const library = [
    "<!DOCTYPE html>",
    '<html lang="en">',
    "<head>",
    "  <title>Page Title | Site</title>",
    '  <meta name="description" content="Clean, AI-ready content for agent consumption.">',
    '  <meta name="robots" content="index, follow">',
    "</head>",
    "<body>",
    "<h1>Primary Headline</h1>",
    "<p>Core body copy. Semantically structured for AI agent parsing. No noise.</p>",
    "<h2>Key Features</h2>",
    "<ul>",
    "  <li>Feature one description</li>",
    "  <li>Feature two description</li>",
    "  <li>Feature three description</li>",
    "</ul>",
    "<h2>Pricing</h2>",
    "<p>Starting at $99/month. Enterprise plans available.</p>",
    "<h2>About</h2>",
    "<p>Founded 2020. Headquartered in San Francisco.</p>",
    "<nav>",
    '  <a href="/">Home</a>',
    '  <a href="/product">Product</a>',
    '  <a href="/pricing">Pricing</a>',
    '  <a href="/docs">Docs</a>',
    "</nav>",
    "</body>",
    "</html>",
    "<!-- AXP-optimized: 98.9% token reduction -->",
    "<!-- original: 123,916 tokens -->",
    "<!-- scrunched: 1,355 tokens -->",
    "<!-- scrunch.com/axp -->",
    "const SCAN_WIDTH = 8;",
    "const FADE_ZONE = 35;",
    "const MAX_TOKENS = 2500;",
    "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
    "function lerp(a, b, t) { return a + (b - a) * t; }",
    "const axp = { active: true, reduce: true };",
  ];

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
  h = SECTION_HEIGHT;

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
  fadeZone = 60;

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
    const vGrad = bctx.createLinearGradient(0, 0, 0, this.h);
    vGrad.addColorStop(0,           "rgba(0,0,0,0)");
    vGrad.addColorStop(topFade,     "rgba(0,0,0,1)");
    vGrad.addColorStop(1 - topFade, "rgba(0,0,0,1)");
    vGrad.addColorStop(1,           "rgba(0,0,0,0)");
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
    const tF = this.scanningActive ? this.scanTargetFadeZone : 60;

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

  const stateRef = useRef({
    position: 0,
    velocity: 100,
    direction: -1,
    isAnimating: true,
    isDragging: false,
    lastMouseX: 0,
    mouseVelocity: 0,
    friction: 0.96,
    minVelocity: 25,
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
      stateRef.current.containerWidth = container.offsetWidth;
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

      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect();
        const normalCard = wrapper.querySelector<HTMLElement>(".card-normal");
        const asciiCard  = wrapper.querySelector<HTMLElement>(".card-ascii");
        if (!normalCard || !asciiCard) return;

        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyScanning = true;
          const intLeft  = Math.max(scannerLeft - rect.left, 0);
          const intRight = Math.min(scannerRight - rect.left, rect.width);
          normalCard.style.setProperty("--clip-right", `${(intLeft / rect.width) * 100}%`);
          asciiCard.style.setProperty("--clip-left",   `${(intRight / rect.width) * 100}%`);

          if (!wrapper.hasAttribute("data-scanned") && intLeft > 0) {
            wrapper.setAttribute("data-scanned", "true");
            const flash = document.createElement("div");
            flash.className = "scan-effect";
            wrapper.appendChild(flash);
            setTimeout(() => flash.parentNode?.removeChild(flash), 600);
          }
        } else if (rect.right < scannerLeft) {
          normalCard.style.setProperty("--clip-right", "100%");
          asciiCard.style.setProperty("--clip-left",   "100%");
        } else {
          normalCard.style.setProperty("--clip-right", "0%");
          asciiCard.style.setProperty("--clip-left",   "0%");
          wrapper.removeAttribute("data-scanned");
        }
      });

      scanner.setScanning(anyScanning);
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

      cardLine.style.transform = `translateX(${s.position}px)`;
      updateClipping();
      s.animId = requestAnimationFrame(animate);
    }

    stateRef.current.lastTime = performance.now();
    stateRef.current.animId   = requestAnimationFrame(animate);

    requestAnimationFrame(() => {
      cardLine.style.transform = `translateX(${stateRef.current.position}px)`;
      updateClipping();
    });

    const codeInterval = setInterval(() => {
      asciiRefs.current.forEach((el) => {
        if (el && Math.random() < 0.15) {
          const { width, height } = calcCodeDimensions(CARD_WIDTH, CARD_HEIGHT);
          el.textContent = generateCode(width, height);
        }
      });
    }, 200);

    function startDrag(clientX: number) {
      const s = stateRef.current;
      s.isDragging = true; s.isAnimating = false;
      s.lastMouseX = clientX; s.mouseVelocity = 0;
      const tx = new DOMMatrix(window.getComputedStyle(cardLine).transform);
      s.position = tx.m41;
      cardLine.classList.add("dragging");
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
      cardLine.classList.remove("dragging");
      if (Math.abs(s.mouseVelocity) > s.minVelocity) {
        s.velocity = Math.abs(s.mouseVelocity);
        s.direction = s.mouseVelocity > 0 ? 1 : -1;
      } else { s.velocity = 100; }
      s.isAnimating = true;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      stateRef.current.position += e.deltaY > 0 ? 30 : -30;
    }

    const mouseMoveHandler = (e: MouseEvent) => { if (stateRef.current.isDragging) onDrag(e.clientX); };
    cardLine.addEventListener("mousedown", (e) => startDrag(e.clientX));
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", endDrag);
    cardLine.addEventListener("touchstart", (e) => { e.preventDefault(); startDrag(e.touches[0].clientX); }, { passive: false });
    document.addEventListener("touchmove", (e) => { if (stateRef.current.isDragging) { e.preventDefault(); onDrag(e.touches[0].clientX); } }, { passive: false });
    document.addEventListener("touchend", endDrag);
    cardLine.addEventListener("wheel", onWheel, { passive: false });
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
      className="relative w-full overflow-hidden"
      style={{ height: SECTION_HEIGHT, background: BG }}
    >
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
                    {generateCode(codeW, codeH)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scanner beam canvas */}
      <canvas
        ref={scannerCanvasRef}
        style={{
          position: "absolute", top: 0, left: -3,
          width: "100vw", height: SECTION_HEIGHT,
          zIndex: 15, pointerEvents: "none",
        }}
      />

      {/* Token reduction badge */}
      <div style={{
        position: "absolute", top: 16, left: "50%",
        transform: "translateX(-50%)", zIndex: 20, pointerEvents: "none",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      }}>
        <div style={{ fontFamily: "var(--font-inter)", fontSize: 10, fontWeight: 500, color: "#93886F", whiteSpace: "nowrap" }}>
          Token reduction
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 999,
          background: AI_GREEN, boxShadow: "0 0 24px rgba(216,252,59,0.35)", whiteSpace: "nowrap",
        }}>
          <span style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#597a00", fontSize: 15, fontWeight: 500 }}>-122,561</span>
          <span style={{ fontFamily: "var(--font-inter)", color: "#597a00", fontSize: 11, fontWeight: 700 }}>99% smaller</span>
        </div>
      </div>

      {/* Left label */}
      <div style={{ position: "absolute", left: 20, bottom: 16, zIndex: 20, pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 10, color: "#6E8920", letterSpacing: "0.08em" }}>← AI-optimized</span>
      </div>

      {/* Right label */}
      <div style={{ position: "absolute", right: 20, bottom: 16, zIndex: 20, pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 10, color: "#93886F", letterSpacing: "0.08em" }}>raw web →</span>
      </div>
    </section>
  );
}
