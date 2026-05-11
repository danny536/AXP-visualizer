"use client";

import { useEffect, useRef, useState } from "react";

const ROWS = 5;
const COLS = 17;

type Cell = {
  active: boolean;
  intensity: number;
  delay: number;
};

type Props = {
  isAnimating: boolean;
};

export default function FilterGrid({ isAnimating }: Props) {
  const [cells, setCells] = useState<Cell[][]>(() =>
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, (_, colIdx) => ({
        active: false,
        intensity: Math.random(),
        delay: colIdx * 60 + Math.random() * 200,
      }))
    )
  );
  const frameRef = useRef(0);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAnimating) return;

    function tick() {
      frameRef.current++;
      setCells((prev) =>
        prev.map((row, r) =>
          row.map((cell, c) => {
            // Wave from left to right through the grid
            const wave = Math.sin(
              (frameRef.current / 30) * Math.PI - (c / COLS) * Math.PI * 2
            );
            const rowWave = Math.sin(r / ROWS + frameRef.current / 50);
            return {
              ...cell,
              intensity: Math.max(0, Math.min(1, (wave + rowWave * 0.4 + 1) / 2)),
            };
          })
        )
      );
      animRef.current = setTimeout(tick, 50);
    }

    tick();
    return () => {
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, [isAnimating]);

  return (
    <div className="flex flex-col gap-0.5 select-none">
      {cells.map((row, r) => (
        <div key={r} className="flex gap-0.5">
          {row.map((cell, c) => {
            const isCenter = c >= 6 && c <= 10;
            const baseOpacity = isCenter ? 0.3 + cell.intensity * 0.6 : 0.05 + cell.intensity * 0.35;
            return (
              <div
                key={c}
                className="rounded-[2px] transition-all"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: isCenter
                    ? `rgba(216, 252, 59, ${baseOpacity})`
                    : `rgba(42, 74, 234, ${baseOpacity})`,
                  transitionDuration: "150ms",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
