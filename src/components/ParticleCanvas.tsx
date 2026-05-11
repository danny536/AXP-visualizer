"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  isClean: boolean;
  delay: number;
};

type Props = {
  isActive: boolean;
  width: number;
  height: number;
};

const DIRTY_COLORS = [
  "#3C67F5",
  "#93C0FE",
  "#93886F",
  "#40362E",
  "#E05A44",
  "#F0A832",
  "#7B5EA7",
  "#2A9D8F",
];

const CLEAN_COLOR = "#D8FC3B";

export default function ParticleCanvas({ isActive, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const filterX = width / 2;
    const filterWidth = 80;
    const spawnRate = 3;

    function spawnParticle() {
      const isClean = false;
      const delay = Math.random() * 60;
      particlesRef.current.push({
        x: 0,
        y: Math.random() * height,
        vx: 1.2 + Math.random() * 1.8,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.5 + Math.random() * 2.5,
        color: DIRTY_COLORS[Math.floor(Math.random() * DIRTY_COLORS.length)],
        alpha: 0,
        life: 0,
        maxLife: 180 + Math.random() * 80,
        isClean,
        delay,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      frameRef.current++;

      // Clear with slight fade for trail
      ctx.clearRect(0, 0, width, height);

      // Draw filter zone (subtle gradient column)
      const grad = ctx.createLinearGradient(filterX - filterWidth, 0, filterX + filterWidth, 0);
      grad.addColorStop(0, "rgba(216,252,59,0)");
      grad.addColorStop(0.4, "rgba(216,252,59,0.04)");
      grad.addColorStop(0.5, "rgba(216,252,59,0.08)");
      grad.addColorStop(0.6, "rgba(216,252,59,0.04)");
      grad.addColorStop(1, "rgba(216,252,59,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(filterX - filterWidth, 0, filterWidth * 2, height);

      // Spawn new particles
      if (isActive && frameRef.current % spawnRate === 0) {
        if (particlesRef.current.length < 120) {
          spawnParticle();
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        if (p.delay > 0) {
          p.delay--;
          return true;
        }

        p.life++;
        const progress = p.life / p.maxLife;

        // Fade in/out
        if (progress < 0.1) {
          p.alpha = progress / 0.1;
        } else if (progress > 0.85) {
          p.alpha = (1 - progress) / 0.15;
        } else {
          p.alpha = 1;
        }

        // When crossing filter zone, transform to clean particle
        if (p.x > filterX - filterWidth && p.x < filterX + filterWidth) {
          // Slow down and "process"
          p.vx *= 0.97;
          // Particles that hit the filter mostly dissolve
          if (Math.random() < 0.015 && !p.isClean) {
            p.alpha *= 0.8;
          }
        }

        // Past filter — become clean token particle (only ~10% survive)
        if (p.x > filterX + filterWidth && !p.isClean) {
          if (Math.random() < 0.02) {
            p.isClean = true;
            p.color = CLEAN_COLOR;
            p.r = 2;
            p.vx = 1.5 + Math.random();
          } else {
            p.alpha = 0; // most particles are filtered out
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.99;

        if (p.x > width || p.life > p.maxLife || p.alpha < 0.01) return false;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, p.alpha * 0.7);
        ctx.fill();

        // Clean particles get a subtle glow
        if (p.isClean) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(CLEAN_COLOR, p.alpha * 0.15);
          ctx.fill();
        }

        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [isActive, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(255,255,255,${alpha})`;
  return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${alpha})`;
}
