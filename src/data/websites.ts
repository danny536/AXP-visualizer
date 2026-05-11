export type Website = {
  id: string;
  name: string;
  domain: string;
  tagline: string;
  industry: string;
  humanTokens: number;
  agentTokens: number;
  // Human view theme
  bgGradient: string;
  heroHeadline: string;
  heroSubline: string;
  heroCta: string;
  accentColor: string;
  navItems: string[];
  // Agent view: scrunched HTML
  scrunchedHtml: string;
};

export const websites: Website[] = [
  {
    id: "tyrell-ai",
    name: "Tyrell AI",
    domain: "tyrell.ai",
    tagline: "Enterprise AI Platform",
    industry: "Technology",
    humanTokens: 123916,
    agentTokens: 1355,
    bgGradient: "from-[#0a0f2e] via-[#1a2060] to-[#0d1a4a]",
    heroHeadline: "The future of AI search",
    heroSubline: "Deploy custom agents, orchestrate multi-model pipelines, and run mission-critical AI workloads with enterprise-grade security.",
    heroCta: "Watch Demo →",
    accentColor: "#3C67F5",
    navItems: ["Platform", "Enterprise", "Pricing", "Docs", "Blog"],
    scrunchedHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Tyrell AI | Enterprise</title>
  <meta name="description" content=
    "Tyrell AI Enterprise—The future
    of AI Search. Deploy custom agents,
    orchestrate multi-model pipelines,
    and run mission-critical AI workloads
    with enterprise-grade security.">
</head>
<body>

<h1>Future of AI Search</h1>
<p>Deploy, orchestrate, and govern AGI
workloads at scale. Tyrell AI gives large
organizations the infrastructure to run
autonomous agents, multi-model pipelines,
and real-time reasoning across every layer
of the business.</p>

<h2>Multi-model orchestration</h2>
<p>Chain any combination of frontier and
open-source models in a single pipeline.
Route by cost, latency, or capability.</p>

<h2>Enterprise security</h2>
<p>SOC 2 Type II. HIPAA eligible.
Private deployment on your cloud.</p>

<h2>Agent monitoring</h2>
<p>Full observability into every agent
call, token consumed, and decision made.</p>

<nav>
  <a href="/platform">Platform</a>
  <a href="/enterprise">Enterprise</a>
  <a href="/pricing">Pricing</a>
  <a href="/docs">Docs</a>
</nav>

</body>
</html>`,
  },
  {
    id: "meridian-shop",
    name: "Meridian",
    domain: "meridian.shop",
    tagline: "Sustainable Fashion",
    industry: "E-commerce",
    humanTokens: 89432,
    agentTokens: 2108,
    bgGradient: "from-[#f5f0e8] via-[#ede4d3] to-[#e8ddc8]",
    heroHeadline: "Wear what matters",
    heroSubline: "Certified organic, carbon-neutral fashion made for people and planet. Free returns. B Corp certified.",
    heroCta: "Shop Collection →",
    accentColor: "#6E8920",
    navItems: ["New In", "Women", "Men", "Sale", "About"],
    scrunchedHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Meridian | Sustainable Fashion</title>
  <meta name="description" content=
    "Certified organic, carbon-neutral
    fashion. B Corp certified. Free
    returns on all orders.">
</head>
<body>

<h1>Wear what matters</h1>
<p>Sustainable clothing made from
certified organic materials. Every piece
is carbon-neutral and ethically produced.</p>

<h2>New Arrivals</h2>
<ul>
  <li>Organic Linen Shirt — $89</li>
  <li>Recycled Denim Jacket — $145</li>
  <li>Hemp Canvas Tote — $42</li>
  <li>Merino Wool Sweater — $128</li>
</ul>

<h2>Our commitment</h2>
<p>B Corp certified since 2019.
100% renewable energy in production.
Carbon offset on every shipment.</p>

<h2>Free returns</h2>
<p>30-day free returns. No questions asked.
Free shipping on orders over $75.</p>

<nav>
  <a href="/new">New In</a>
  <a href="/women">Women</a>
  <a href="/men">Men</a>
  <a href="/sale">Sale</a>
</nav>

</body>
</html>`,
  },
  {
    id: "northfield-bank",
    name: "Northfield",
    domain: "northfieldbank.com",
    tagline: "Personal Banking",
    industry: "Finance",
    humanTokens: 156223,
    agentTokens: 3471,
    bgGradient: "from-[#0f2340] via-[#1a3a5c] to-[#0d2035]",
    heroHeadline: "Banking built around you",
    heroSubline: "High-yield savings. No fees. FDIC insured up to $250,000. Earn 5.10% APY on your first year.",
    heroCta: "Open Account →",
    accentColor: "#93C0FE",
    navItems: ["Personal", "Business", "Invest", "Loans", "Support"],
    scrunchedHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Northfield Bank | Personal Banking</title>
  <meta name="description" content=
    "High-yield savings account. No fees.
    FDIC insured. Earn 5.10% APY.">
</head>
<body>

<h1>Banking built around you</h1>
<p>High-yield savings with no monthly fees.
FDIC insured up to $250,000.
Currently offering 5.10% APY.</p>

<h2>Account types</h2>
<ul>
  <li>High-Yield Savings — 5.10% APY</li>
  <li>Checking — No fees, no minimums</li>
  <li>Money Market — 4.85% APY</li>
  <li>CDs — 12-month at 5.25% APY</li>
</ul>

<h2>Protection</h2>
<p>FDIC insured. 256-bit encryption.
Biometric authentication. Zero-liability
fraud protection.</p>

<h2>Open an account</h2>
<p>Takes 5 minutes. No minimum deposit.
Apply online or visit any branch.</p>

<nav>
  <a href="/personal">Personal</a>
  <a href="/business">Business</a>
  <a href="/invest">Invest</a>
  <a href="/loans">Loans</a>
</nav>

</body>
</html>`,
  },
  {
    id: "luminary-media",
    name: "Luminary",
    domain: "luminarymedia.com",
    tagline: "Independent News",
    industry: "Media",
    humanTokens: 204891,
    agentTokens: 1847,
    bgGradient: "from-[#1a0a00] via-[#2d1500] to-[#1a0a00]",
    heroHeadline: "News that cuts through",
    heroSubline: "Independent journalism. No paywalls. Funded by readers, not algorithms. Covering what matters since 2018.",
    heroCta: "Read Today →",
    accentColor: "#D8FC3B",
    navItems: ["Politics", "Climate", "Tech", "Economy", "Culture"],
    scrunchedHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Luminary Media | Independent News</title>
  <meta name="description" content=
    "Independent journalism. No paywalls.
    Reader-funded. Covering politics,
    climate, tech, and economy.">
</head>
<body>

<h1>News that cuts through</h1>
<p>Independent journalism funded by readers.
No paywalls. No algorithmic bias.
Covering what matters since 2018.</p>

<h2>Top stories</h2>
<article>
  <h3>AI regulation: what the new
  framework means for startups</h3>
  <p>The EU AI Act's phase-two provisions
  take effect next quarter, reshaping
  compliance requirements for all
  companies deploying foundation models.</p>
</article>

<article>
  <h3>Climate: record ocean temperatures
  trigger coral bleaching alerts</h3>
  <p>NOAA issues fourth-ever mass bleaching
  alert as Pacific surface temps exceed
  historical averages by 2.3°C.</p>
</article>

<h2>Sections</h2>
<nav>
  <a href="/politics">Politics</a>
  <a href="/climate">Climate</a>
  <a href="/tech">Tech</a>
  <a href="/economy">Economy</a>
</nav>

</body>
</html>`,
  },
];
