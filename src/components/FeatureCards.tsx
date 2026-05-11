const features = [
  {
    icon: "bar_chart_4_bars",
    title: "Agent Traffic",
    description: "Track bot traffic by AI model, page views, and bot type.",
  },
  {
    icon: "graph_1",
    title: "Site Maps",
    description: "Know how AI agents view your site and what to fix.",
  },
  {
    icon: "rocket_launch",
    title: "AI Delivery",
    description: "Ship token-light pages for AI consumption—no code required.",
  },
];

export default function FeatureCards() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      style={{ maxWidth: 1100, margin: "0 auto" }}
    >
      {features.map((f) => (
        <div
          key={f.title}
          className="feature-card flex flex-col gap-4 p-6 rounded-2xl bg-white"
          style={{
            boxShadow: "0 1px 3px rgba(29,17,7,0.06), 0 4px 16px rgba(29,17,7,0.06)",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 22,
              color: "#1D1107",
              fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
          >
            {f.icon}
          </span>
          <div>
            <div
              style={{ fontFamily: "var(--font-inter)", color: "#1D1107", fontSize: 14, fontWeight: 600, letterSpacing: "-0.28px", marginBottom: 4 }}
            >
              {f.title}
            </div>
            <div
              style={{ fontFamily: "var(--font-inter)", color: "#1D1107", fontSize: 14, fontWeight: 400, lineHeight: 1.5, letterSpacing: "-0.28px" }}
            >
              {f.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
