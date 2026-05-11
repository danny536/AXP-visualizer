"use client";

import { useEffect, useRef, useState } from "react";
import type { Website } from "@/data/websites";

type Props = {
  site: Website;
};

// Very lightweight HTML syntax highlighter
function tokenize(line: string) {
  const parts: { text: string; color: string }[] = [];

  // Comments
  if (line.trim().startsWith("<!--")) {
    parts.push({ text: line, color: "#93886F" });
    return parts;
  }

  // Process character by character approach via regex splits
  const tagPattern = /(<\/?[\w\s="'.:/-]+\/?>|<!--.*?-->)/g;
  let last = 0;
  let match;

  while ((match = tagPattern.exec(line)) !== null) {
    if (match.index > last) {
      parts.push({ text: line.slice(last, match.index), color: "#40362E" });
    }
    const tag = match[0];
    if (tag.startsWith("<!--")) {
      parts.push({ text: tag, color: "#93886F" });
    } else {
      // Split the tag into name/attrs/values
      const innerParts = colorizeTag(tag);
      parts.push(...innerParts);
    }
    last = match.index + match[0].length;
  }

  if (last < line.length) {
    parts.push({ text: line.slice(last), color: "#40362E" });
  }

  return parts;
}

function colorizeTag(tag: string) {
  const parts: { text: string; color: string }[] = [];
  // < and > in gray
  // tag name in blue
  // attr names in green
  // attr values in amber

  const attrPattern = /(\s+[\w-]+)(="[^"]*")?/g;
  const [openBracket, rest] = [tag.slice(0, 1), tag.slice(1)];

  // Check for closing >
  const closingSlash = rest.endsWith("/>") ? "/>" : rest.endsWith(">") ? ">" : "";
  const inner = rest.slice(0, rest.length - closingSlash.length);

  parts.push({ text: openBracket, color: "#6E8920" });

  // Tag name (first word)
  const spaceIdx = inner.search(/[\s/]/);
  const tagName = spaceIdx === -1 ? inner : inner.slice(0, spaceIdx);
  const attrs = spaceIdx === -1 ? "" : inner.slice(spaceIdx);

  parts.push({ text: tagName, color: "#2A4AEA" });

  // Attributes
  let attrMatch;
  let attrLast = 0;
  while ((attrMatch = attrPattern.exec(attrs)) !== null) {
    if (attrMatch.index > attrLast) {
      parts.push({ text: attrs.slice(attrLast, attrMatch.index), color: "#565656" });
    }
    parts.push({ text: attrMatch[1], color: "#6E8920" });
    if (attrMatch[2]) {
      const [eq, ...rest2] = attrMatch[2].split("=");
      parts.push({ text: "=", color: "#40362E" });
      parts.push({ text: rest2.join("="), color: "#D97706" });
    }
    attrLast = attrMatch.index + attrMatch[0].length;
  }
  if (attrLast < attrs.length) {
    parts.push({ text: attrs.slice(attrLast), color: "#565656" });
  }

  if (closingSlash) {
    parts.push({ text: closingSlash, color: "#6E8920" });
  }

  return parts;
}

export default function AgentView({ site }: Props) {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lines = site.scrunchedHtml.split("\n");

  useEffect(() => {
    setVisibleLines(0);
    let i = 0;

    function showNext() {
      i++;
      setVisibleLines(i);
      if (i < lines.length) {
        timerRef.current = setTimeout(showNext, 35 + Math.random() * 20);
      }
    }

    timerRef.current = setTimeout(showNext, 100);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [site.id]);

  // Auto-scroll to bottom as lines appear
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto code-scroll bg-white/95 p-4 relative"
    >
      {/* "Scrunched" watermark label */}
      <div
        className="absolute top-2 right-3 text-[8px] font-medium tracking-widest uppercase opacity-40"
        style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#6E8920" }}
      >
        AXP-OPTIMIZED
      </div>

      <pre
        className="text-[10px] leading-[1.6] whitespace-pre-wrap break-words"
        style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
      >
        {lines.slice(0, visibleLines).map((line, i) => {
          const tokens = tokenize(line);
          const indent = line.match(/^(\s*)/)?.[1] ?? "";
          const indentSpan = indent ? (
            <span key="indent" style={{ color: "transparent", userSelect: "text" }}>
              {indent}
            </span>
          ) : null;

          const contentTokens = tokenize(line.trimStart());

          return (
            <div
              key={`${site.id}-${i}`}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * 0.02}s`,
                animationFillMode: "both",
              }}
            >
              <span style={{ color: "rgba(147,136,111,0.4)", fontSize: 8, paddingRight: 8, userSelect: "none" }}>
                {String(i + 1).padStart(2, " ")}
              </span>
              {indentSpan}
              {contentTokens.map((tok, ti) => (
                <span key={ti} style={{ color: tok.color }}>
                  {tok.text}
                </span>
              ))}
            </div>
          );
        })}
        {/* Blinking cursor */}
        {visibleLines < lines.length && (
          <span className="inline-block w-1.5 h-3 bg-ai-green animate-pulse" />
        )}
      </pre>
    </div>
  );
}
