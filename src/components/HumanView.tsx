import type { Website } from "@/data/websites";

type Props = {
  site: Website;
};

export default function HumanView({ site }: Props) {
  const isDark =
    site.id === "tyrell-ai" ||
    site.id === "northfield-bank" ||
    site.id === "luminary-media";

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${site.bgGradient} relative overflow-hidden flex flex-col`}
    >
      {/* Nav bar */}
      <nav
        className={`flex items-center justify-between px-5 py-3 ${
          isDark ? "border-b border-white/10" : "border-b border-black/10"
        }`}
      >
        <div
          className={`font-semibold text-sm tracking-tight ${isDark ? "text-white" : "text-clay"}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {site.name}
        </div>
        <div className="flex gap-4">
          {site.navItems.slice(0, 4).map((item) => (
            <span
              key={item}
              className={`text-xs ${isDark ? "text-white/60" : "text-clay/60"}`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item}
            </span>
          ))}
        </div>
        <div
          className="text-xs px-3 py-1.5 rounded-full font-medium"
          style={{
            background: site.accentColor,
            color: isDark ? "#000" : "#fff",
            fontFamily: "var(--font-inter)",
          }}
        >
          {site.id === "meridian-shop" ? "Shop Now" : "Get Started"}
        </div>
      </nav>

      {/* Hero content */}
      <div className="flex-1 flex items-center px-6 pb-6">
        <div className="flex flex-col gap-4 max-w-[85%]">
          {/* Eyebrow */}
          <div
            className="text-[9px] font-medium tracking-widest uppercase"
            style={{
              color: site.accentColor,
              fontFamily: "var(--font-inter)",
            }}
          >
            {site.industry}
          </div>

          {/* Headline */}
          <h1
            className={`text-2xl leading-tight font-normal ${isDark ? "text-white" : "text-clay"}`}
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            The{" "}
            <em className="italic" style={{ fontFamily: "var(--font-newsreader)" }}>
              {getItalicWord(site.id)}
            </em>{" "}
            {getHeadlineRest(site.id)}
          </h1>

          {/* Sub */}
          <p
            className={`text-[10px] leading-relaxed ${isDark ? "text-white/60" : "text-clay/60"}`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {site.heroSubline.slice(0, 90)}...
          </p>

          {/* CTA */}
          <button
            className="self-start text-[10px] px-4 py-2 rounded-full border font-medium mt-1 transition-opacity"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
              color: isDark ? "white" : site.accentColor,
              fontFamily: "var(--font-inter)",
            }}
          >
            {site.heroCta}
          </button>
        </div>
      </div>

      {/* Decorative blobs */}
      <div
        className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-20 blur-3xl"
        style={{ background: site.accentColor }}
      />
      <div
        className="absolute top-8 right-4 w-24 h-24 rounded-full opacity-10 blur-2xl"
        style={{ background: isDark ? "#93C0FE" : site.accentColor }}
      />

      {/* "Complexity" visual noise — mimics all the images, tracking, widgets etc. */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex gap-0.5 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t"
            style={{
              height: `${20 + Math.sin(i * 0.8) * 16}px`,
              background: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
              alignSelf: "flex-end",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function getItalicWord(id: string) {
  const map: Record<string, string> = {
    "tyrell-ai": "future",
    "meridian-shop": "future",
    "northfield-bank": "future",
    "luminary-media": "truth",
  };
  return map[id] ?? "future";
}

function getHeadlineRest(id: string) {
  const map: Record<string, string> = {
    "tyrell-ai": "of AI search",
    "meridian-shop": "of sustainable fashion",
    "northfield-bank": "of personal banking",
    "luminary-media": "that matters",
  };
  return map[id] ?? "";
}
