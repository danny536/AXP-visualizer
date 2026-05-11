const features = [
  {
    icon: "monitor",
    title: "Agent Traffic",
    description: "Track bot traffic by AI model, page views, and bot type.",
    color: "#2A4AEA",
  },
  {
    icon: "search",
    title: "Site Audit",
    description: "Know how AI agents view your site and what to fix.",
    color: "#2A4AEA",
  },
  {
    icon: "article",
    title: "Content Optimizer",
    description: "Get actionable fixes to improve content discovery and accuracy.",
    color: "#6E8920",
  },
  {
    icon: "rocket",
    title: "AI Delivery",
    description: "Ship token-light pages for AI consumption—no code required.",
    color: "#D8FC3B",
  },
];

function Icon({ name, color }: { name: string; color: string }) {
  const style = { color };
  if (name === "monitor") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={style}>
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={style}>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "article") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={style}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={style}>
      <path d="M12 2L8 8H4l6 6-2 8 4-4 4 4-2-8 6-6h-4L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {features.map((f) => (
        <div
          key={f.title}
          className="feature-card flex flex-col gap-3 p-4 rounded-2xl bg-white/60 border border-white/80"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: f.color === "#D8FC3B" ? "#D8FC3B" : `${f.color}15` }}
          >
            <Icon name={f.icon} color={f.color === "#D8FC3B" ? "#597a00" : f.color} />
          </div>
          <div>
            <div
              className="text-sm font-semibold text-ink mb-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {f.title}
            </div>
            <div
              className="text-xs text-earth leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {f.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
