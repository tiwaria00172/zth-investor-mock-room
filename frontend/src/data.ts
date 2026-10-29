// Mock data. Replace each export with an API call to your FastAPI backend later.
export const dims = [
  { k: "Problem", v: 78 }, { k: "Market", v: 64 }, { k: "Traction", v: 52 },
  { k: "Team", v: 81 }, { k: "Model", v: 60 }, { k: "Financials", v: 47 },
];
export const trend = { labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"], values: [48, 53, 57, 61, 66, 70] };
export const slides = [
  { 
    n: 1, 
    t: "Title", 
    s: 82, 
    note: "Clear one-line value proposition. Funding ask is currently omitted from the opening.",
    solution: "Add a crisp, high-conviction funding ask badge (e.g. 'Raising $1.5M Seed to scale enterprise ARR to $1M') directly below your one-line thesis.",
    isFree: true 
  },
  { 
    n: 2, 
    t: "Problem", 
    s: 78, 
    note: "Pain point is described broadly without quantifying the cost of the problem for customer teams.",
    solution: "Quantify the urgency with a verifiable financial loss metric (e.g. '$420K wasted annually per 100 engineers due to tool fragmentation').",
    isFree: true 
  },
  { 
    n: 3, 
    t: "Solution", 
    s: 70, 
    note: "Shows static product features rather than the transformative workflow outcome.",
    solution: "Replace static bullet lists with a before-and-after workflow diagram showing how customers cut manual cycle time from 6 weeks to 4 minutes.",
    isFree: true 
  },
  { 
    n: 4, 
    t: "Market size", 
    s: 55, 
    note: "TAM is top-down industry estimate only. Lacks bottom-up transactional validation.",
    solution: "Build a bottom-up formula: 42,000 ICP mid-market companies × $36K/yr average contract value = $1.51B serviceable market.",
    isFree: false 
  },
  { 
    n: 5, 
    t: "Traction", 
    s: 48, 
    note: "Totals are reported without a month-over-month time axis or retention cohort data.",
    solution: "Plot a 12-month cohort retention curve and highlight Net Revenue Retention (targeting >110%) to prove product-market fit.",
    isFree: false 
  },
  { 
    n: 6, 
    t: "Business model", 
    s: 60, 
    note: "Subscription tiers are listed, but unit economics (CAC, LTV, payback period) are missing.",
    solution: "Include your unit economics scorecard: Blended CAC ($1,800), LTV ($9,600), LTV:CAC (5.3x), and CAC Payback Horizon (7 months).",
    isFree: false 
  },
  { 
    n: 7, 
    t: "Team", 
    s: 84, 
    note: "Founder pedigree is strong, but missing key functional leadership hires required to scale.",
    solution: "State the specific VP of Enterprise Sales and Lead Infrastructure Architect hires you will unlock with this funding round.",
    isFree: false 
  },
  { 
    n: 8, 
    t: "Financials", 
    s: 45, 
    note: "No runway, milestone roadmap, or use-of-funds allocation breakdown.",
    solution: "Add a 24-month runway milestone roadmap allocating 60% engineering R&D, 25% go-to-market pipeline, and 15% operational reserve.",
    isFree: false 
  },
];
export const priorities = [
  { t: "Add bottom-up market sizing", d: "Slide 4 • raises Market by about 8 points", lvl: "High" },
  { t: "Show growth over time", d: "Slide 5 • replace totals with a monthly chart", lvl: "High" },
  { t: "Add use-of-funds breakdown", d: "Slide 8 • state runway in months", lvl: "Medium" },
  { t: "Include unit economics", d: "Slide 6 • CAC, LTV and payback period", lvl: "Medium" },
];
export const activity = [
  { t: "Deck evaluated: Seed Deck v3", w: "2 hours ago" },
  { t: "VC pitch practice: 6 questions", w: "Yesterday" },
  { t: "Profile updated: traction", w: "3 days ago" },
  { t: "Report exported: Seed Deck v2", w: "Last week" },
];
export const personas = [
  { id: "angel", name: "Angel investor", isFree: true, blurb: "Founder strength and early proof.", qs: [
    "Why are you the right team to solve this problem?",
    "What have your first customers told you that surprised you?",
    "What will you do with the first $250k?" ] },
  { id: "vc", name: "Venture capitalist", isFree: false, blurb: "Scale, market size and exit potential.", qs: [
    "How big can this company be in ten years, and what has to go right?",
    "What is your customer acquisition cost, and how does it change as you scale?",
    "Why will you win against a well-funded incumbent?" ] },
  { id: "family", name: "Family office", isFree: false, blurb: "Durability, margins and risk.", qs: [
    "How does the business perform if growth slows by half?",
    "What are your gross margins, and where do they go?",
    "What is the downside case, and how do you protect capital?" ] },
  { id: "strategic", name: "Strategic investor", isFree: false, blurb: "Partnerships and fit with their business.", qs: [
    "How would a partnership with us change your roadmap?",
    "What stops us from building this ourselves?",
    "Which of your integrations matter most to customers?" ] },
];

export const proBenchmarkData = {
  icVerdict: "RECOMMEND FOR PARTNER MEETING (Conditional on CAC payback proof)",
  impliedValuation: "$12.0M - $15.5M Post-Money Cap",
  comparables: [
    { name: "Retool (Seed)", score: 91, tam: "$14B", multiple: "28x ARR", result: "Sequoia Led $10M" },
    { name: "Segment (Seed)", score: 87, tam: "$9B", multiple: "24x ARR", result: "Accel Led $8M" },
    { name: "Census (Seed)", score: 84, tam: "$11B", multiple: "22x ARR", result: "a16z Led $7M" }
  ],
  dealTermSensitivities: [
    { term: "Option Pool Expansion", market: "10% - 15%", risk: "Low", note: "Standard founder dilution" },
    { term: "Information Rights", market: "Quarterly Board P&L", risk: "Low", note: "Standard Series Seed rights" },
    { term: "Liquidation Preference", market: "1x Non-Participating", risk: "Medium", note: "Watch for senior participation" }
  ]
};


// Institutional VC Benchmark & Risk Matrix Data for Advanced Visualizations
export const benchmarkComparisonData = [
  { k: "Problem Urgency", user: 78, benchmark: 82, delta: -4, category: "Core Thesis" },
  { k: "Market Size (SOM)", user: 64, benchmark: 76, delta: -12, category: "Addressable Scale" },
  { k: "Traction Retention", user: 52, benchmark: 72, delta: -20, category: "Capital Efficiency" },
  { k: "Founding Pedigree", user: 84, benchmark: 78, delta: +6, category: "Execution Velocity" },
  { k: "Business Model", user: 60, benchmark: 68, delta: -8, category: "Unit Economics" },
  { k: "Financial Runway", user: 45, benchmark: 66, delta: -21, category: "Burn Multiplier" },
];

export const investorArchetypeConviction = [
  { archetype: "Top-Tier Seed VC", conviction: 66, threshold: 75, status: "Conditional Buy-In", focus: "Requires bottom-up SOM & 12-month cohort retention curve", color: "#2563eb" },
  { archetype: "Domain Specialist Angel", conviction: 84, threshold: 70, status: "High Conviction", focus: "Strong thesis fit on developer productivity bottlenecks", color: "#16a34a" },
  { archetype: "Multi-Family Office", conviction: 52, threshold: 65, status: "Risk Sensitive", focus: "Skeptical on 14-month cash runway without prepayments", color: "#00d2ff" },
  { archetype: "Corporate Strategic CVC", conviction: 62, threshold: 70, status: "Observing", focus: "Assessing API ecosystem defensibility vs incumbents", color: "#6366f1" }
];

export const valuationSensitivityData = [
  { dilution: "10%", preMoney: "$13.5M", postMoney: "$15.0M", raise: "$1.5M", founderRetained: "90%", note: "Top-Decile Competitive Round" },
  { dilution: "15%", preMoney: "$8.5M", postMoney: "$10.0M", raise: "$1.5M", founderRetained: "85%", note: "Market Standard Seed Median" },
  { dilution: "20%", preMoney: "$6.0M", postMoney: "$7.5M", raise: "$1.5M", founderRetained: "80%", note: "Conservative Investment Committee" },
  { dilution: "25%", preMoney: "$4.5M", postMoney: "$6.0M", raise: "$1.5M", founderRetained: "75%", note: "High Dilution / Bridge Safe" }
];

export const riskMatrixData = [
  { name: "Financial Runway & Milestones", scrutiny: "High", impact: "Fatal", score: 45, x: 82, y: 84, status: "Critical Red Flag" },
  { name: "Traction Retention & CAC Payback", scrutiny: "High", impact: "High", score: 48, x: 74, y: 66, status: "Institutional Hurdle" },
  { name: "Market Size & Bottom-Up SOM", scrutiny: "Medium", impact: "High", score: 55, x: 56, y: 60, status: "Needs Calculation" },
  { name: "Business Model & Monetization", scrutiny: "Medium", impact: "Medium", score: 60, x: 48, y: 44, status: "Conditionally Solved" },
  { name: "Problem Definition & Urgency", scrutiny: "Low", impact: "Medium", score: 78, x: 26, y: 34, status: "Well Articulated" },
  { name: "Founding Team Pedigree", scrutiny: "Low", impact: "Fatal", score: 84, x: 18, y: 16, status: "Anchor Strength" }
];
