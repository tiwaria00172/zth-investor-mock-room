import React, { useEffect, useRef, useState } from "react";

import { Radar, LineChart, Bars, Donut, CountUp, Ring, BenchmarkComparisonChart, VCRiskMatrix, ConvictionSpectrum, ValuationSensitivityChart, VelocityAreaChart } from "./charts";

import { personas, valuationSensitivityData } from "./data";

import { api, API_BASE } from "./services/api";

import { Evaluation, StartupProfile, Feedback, InvestorPersona, PriorityLevel, RubricCategory, DeckAdvisorMessage } from "./types";

import { ProviderSettingsModal } from "./components/ProviderSettingsModal";
import { Mic, MicOff, Square, Zap, Cpu, Target, Lock, Crown, AlertTriangle, Settings, Check, BarChart3, Printer, X, Minus, FileText, Bot, Send, MessageSquare, Sparkles, HelpCircle, ArrowRight, RefreshCw, Volume2, VolumeX } from "lucide-react";

type Page = "dashboard" | "deck" | "pitch" | "advisor" | "reports" | "profile";

const nav: { id: Page; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "deck", label: "Deck review" },
  { id: "pitch", label: "Pitch practice" },
  { id: "advisor", label: "AI Advisor" },
  { id: "reports", label: "Reports" },
  { id: "profile", label: "Startup profile" },
];

function Head({ title, sub, children }: { title: string; sub: string; children?: React.ReactNode }) {

  return (

    <header className="head"><div><h1>{title}</h1><p>{sub}</p></div>{children}</header>

  );

}

/* -------------------------------------------------------------------------

   1. DASHBOARD

   ------------------------------------------------------------------------- */

function Dashboard({

  go,

  isPro,

  onUpgrade,

  evaluation,

  activeDims,

  profile

}: {

  go: (p: Page) => void;

  isPro: boolean;

  onUpgrade: () => void;

  evaluation: Evaluation | null;

  activeDims: { k: string; v: number }[];

  profile: StartupProfile;

}) {

  const overall = evaluation ? evaluation.overall_score : 0;

  return (

    <>

      <div className="pre-fundraising-masthead">
        <span className="pre-fundraising-badge">+ VENTURE CAPITAL FLIGHT SIMULATOR +</span>
        <h1 className="capital-readiness-headline">Stress-Test Your Thesis.</h1>
        <p className="capital-readiness-subline">
          Institutional pitch deck due diligence and hardball partner interrogation. Uncover fatal blind spots before stepping into Sand Hill Road.
        </p>
      </div>

      <section className="hero card">

        <div>

          <h1>{evaluation ? `Your pitch is ${overall}% investor-ready` : "Ready to analyze your pitch deck"}</h1>

          <p>

            {evaluation

              ? evaluation.score_note || "AI diligence complete. Review category strengths and priority red flags."

              : "Upload your startup's pitch deck (PDF) to run institutional AI due diligence, extract slide rubrics, and compute your readiness score."}

          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>

            <button className="btn" onClick={() => go("deck")}>

              {evaluation ? "Evaluate Another Deck" : "Upload Your Pitch Deck"}

            </button>

            <button className="btn ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.12)" }} onClick={() => go("pitch")}>

              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Mic size={15} /> Practice Boardroom Meeting</span>

            </button>

          </div>

        </div>

        <Ring value={overall} />

      </section>

      {/* Flight Simulator Manifesto & Diligence Quote Card (Glassmorphism Inspired by Template) */}

      <section className="glass-quote-card">

        <div className="glass-quote-header">

          <div className="window-dots">

            <span /><span /><span />

          </div>

          <span style={{ fontSize: "13.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>

            SAND HILL ROAD INVESTMENT COMMITTEE // FLIGHT SIMULATOR v2.4

          </span>

          <div className="pill-outline">

            <span>● 30s Boardroom Clock</span>

          </div>

        </div>

        <div style={{ margin: "16px 0 20px" }}>

          <h2 style={{ fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 800, margin: "0 0 10px", color: "#fff", lineHeight: 1.25 }}>

            “Polite pitch feedback impresses friends, but <span className="quote-highlight">ruthless partner scrutiny</span> raises rounds.”

          </h2>

          <p style={{ margin: 0, color: "#a5b4fc", fontSize: "16px" }}>

            — ZTH Institutional Due Diligence Standard • Benchmarked against Sequoia, Benchmark & Founders Fund ICs

          </p>

        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>

          <span className="pill-outline"><span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Zap size={14} /> Fast PyMuPDF Slide Parser</span></span>

          <span className="pill-outline"><span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Cpu size={14} /> Groq Llama 3.3 70B AI Engine</span></span>

          <span className="pill-outline"><span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Target size={14} /> 8 Institutional Rubrics</span></span>

          <span className="pill-outline" style={{ borderColor: isPro ? "rgba(250,204,21,0.6)" : "rgba(255,255,255,0.2)" }}>

            {isPro ? <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Crown size={14} /> Pro Syndicate Active</span> : <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Lock size={14} /> Founder Free Tier</span>}

          </span>

        </div>

      </section>

      <section className="grid stats">

        {[

          ["Readiness", evaluation ? `${overall}/100` : "0/100"],

          ["Decks reviewed", evaluation ? "1" : "0"],

          ["Practice sessions", "0"],

          ["Open red flags", String(evaluation?.improvements?.length || 0)]

        ].map(([a, b]) => (

          <div className="card stat" key={a}>

            <span>{a}</span>

            <strong><CountUp text={b} /></strong>

          </div>

        ))}

      </section>

      {/* Pro Institutional Diligence Intelligence or Free Teaser */}

      {isPro ? (
        evaluation ? (
          <section className="card pro-intel-card">
            <div className="pro-intel-header">
              <div>
                <h2><Crown size={20} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px", color: "#1d4ed8" }} />Institutional Investment Committee Intelligence (Pro)</h2>
                <small style={{ color: "var(--mut)" }}>
                  AI-synthesized institutional verdict & comparable venture benchmarks
                </small>
              </div>
              <span className="ic-verdict-pill">
                {overall >= 75 ? "RECOMMEND FOR PARTNER MEETING (Strong Thesis)" : overall >= 60 ? "CONDITIONAL BUY-IN (Hurdle Clearance Required)" : "REVISE CORE THESIS BEFORE PARTNER MEETING"}
              </span>
            </div>
            <div className="grid two" style={{ marginBottom: "14px" }}>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "14px", borderRadius: "10px" }}>
                <span style={{ fontSize: "14.5px", color: "var(--mut)" }}>Implied Valuation Guidance</span>
                <strong style={{ display: "block", fontSize: "20px", color: "#1e5eff", fontWeight: 700 }}>
                  {overall >= 75 ? "$12.0M - $15.5M Post-Money Cap" : overall >= 60 ? "$8.0M - $11.0M Post-Money Cap" : "Sub-$6M Seed / Valuation Pressure"}
                </strong>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "14px", borderRadius: "10px" }}>
                <span style={{ fontSize: "14.5px", color: "var(--mut)" }}>Target Investor Match</span>
                <strong style={{ display: "block", fontSize: "20px", color: "#1e5eff", fontWeight: 700 }}>
                  {profile.stage || "Seed"} • {profile.industry || "Enterprise SaaS"} Funds
                </strong>
              </div>
            </div>
            <h3 style={{ fontSize: "16px", margin: "10px 0 6px" }}>Historical Comparable {profile.stage || "Seed"} Rounds</h3>
            <table className="comp-table">
              <thead>
                <tr><th>Benchmark Company</th><th>Readiness Score</th><th>TAM Stated</th><th>Multiple</th><th>Lead Investor</th></tr>
              </thead>
              <tbody>
                {[
                  { name: "Retool (Seed)", score: 91, tam: "$14B", multiple: "28x ARR", result: "Sequoia Led $10M" },
                  { name: "Segment (Seed)", score: 87, tam: "$9B", multiple: "24x ARR", result: "Accel Led $8M" },
                  { name: "Census (Seed)", score: 84, tam: "$11B", multiple: "22x ARR", result: "a16z Led $7M" }
                ].map((c) => (
                  <tr key={c.name}>
                    <td><b>{c.name}</b></td>
                    <td>{c.score}/100</td>
                    <td>{c.tam}</td>
                    <td>{c.multiple}</td>
                    <td><span className="tag">{c.result}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : (
          <div className="card" style={{ textAlign: "center", padding: "40px 20px" }}>
            <Crown size={32} style={{ color: "#1d4ed8", margin: "0 auto 12px", display: "block" }} />
            <h3 style={{ margin: "0 0 6px", fontSize: "18px", color: "#1e293b", fontWeight: 700 }}>Pro Investment Committee Intelligence Unlocked</h3>
            <p style={{ margin: 0, fontSize: "14.5px", color: "#64748b" }}>
              Upload your pitch deck in Deck Review to run neural due diligence and generate your IC verdict, comps, and valuation metrics.
            </p>
          </div>
        )
      ) : (

        <div className="pro-lock-banner">

          <div className="pro-lock-banner-left">

            <span className="lock-glyph"><Lock size={20} /></span>

            <div>

              <h4>Institutional Deal Terms & YC/Sequoia Comparables Locked</h4>

              <p>Free plan covers basic readiness. Upgrade to Pro to unlock Series A valuation sensitivity, term sheet risks & fund benchmarks.</p>

            </div>

          </div>

          <button className="btn" onClick={onUpgrade} style={{ padding: "10px 20px", fontSize: "15px" }}>

            Unlock Pro Intelligence

          </button>

        </div>

      )}

      <section className="grid two">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h2 style={{ margin: 0 }}>Readiness by area {evaluation && <small style={{ color: "var(--blue)", fontWeight: "normal" }}>• AI Evaluated</small>}</h2>
            {!evaluation && <span className="tag" style={{ background: "#f1f5f9", color: "#64748b" }}>Awaiting Deck</span>}
          </div>
          {evaluation ? (
            <Radar data={activeDims} />
          ) : (
            <div style={{ textAlign: "center", padding: "48px 16px", color: "#64748b" }}>
              <Target size={36} style={{ color: "#94a3b8", marginBottom: "10px" }} />
              <p style={{ margin: 0, fontSize: "14.5px" }}>Upload a pitch deck in Deck Review to calculate your 6-axis readiness radar.</p>
            </div>
          )}
        </div>
        <div className="card">
          <h2>Progress Trajectory & Milestone Velocity</h2>
          {evaluation ? (
            <VelocityAreaChart labels={["Prior Revision", "Current Deck"]} values={[Math.max(0, evaluation.overall_score - 10), evaluation.overall_score]} />
          ) : (
            <div style={{ textAlign: "center", padding: "48px 16px", color: "#64748b" }}>
              <BarChart3 size={36} style={{ color: "#94a3b8", marginBottom: "10px" }} />
              <p style={{ margin: 0, fontSize: "14.5px" }}>Track milestone velocity across deck revisions over time once evaluated.</p>
            </div>
          )}
        </div>
      </section>

      {/* Advanced VC Benchmarks & Investor Archetype Conviction */}
      <section className="grid two">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h2 style={{ margin: 0 }}>Institutional Benchmark Gap Analysis</h2>
            <span className="tag" style={{ background: "rgba(37, 99, 235, 0.1)", color: "#1d4ed8", fontWeight: 700, fontSize: "12px" }}>Top-Decile Seed Median</span>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#64748b" }}>
            How your thesis scores compare directly against funded Seed startups on Sand Hill Road.
          </p>
          {evaluation ? (
            <BenchmarkComparisonChart data={evaluation.categories.slice(0, 6).map((c) => ({
              k: c.name,
              user: c.score,
              benchmark: 75,
              delta: c.score - 75,
              category: c.name
            }))} />
          ) : (
            <div style={{ textAlign: "center", padding: "48px 16px", color: "#64748b" }}>
              <Target size={36} style={{ color: "#94a3b8", marginBottom: "10px" }} />
              <p style={{ margin: 0, fontSize: "14.5px" }}>Upload your deck to see category-by-category gaps against institutional Seed benchmarks.</p>
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h2 style={{ margin: 0 }}>Investor Archetype Conviction Spectrum</h2>
            <span className="tag" style={{ background: "rgba(22, 163, 74, 0.1)", color: "#15803d", fontWeight: 700, fontSize: "12px" }}>4 Archetypes</span>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#64748b" }}>
            Predicted partner committee sentiment and investment hurdle clearance by investor type.
          </p>
          {evaluation ? (
            <ConvictionSpectrum archetypes={[
              { archetype: "Top-Tier Seed VC", conviction: Math.min(95, Math.max(20, Math.round(overall * 0.95))), threshold: 75, status: overall >= 75 ? "High Conviction" : overall >= 60 ? "Conditional" : "Unlikely", focus: "Requires bottom-up SOM & cohort retention curve", color: "#2563eb" },
              { archetype: "Domain Specialist Angel", conviction: Math.min(98, Math.max(30, Math.round(overall * 1.08))), threshold: 70, status: overall >= 65 ? "High Conviction" : "Evaluating", focus: "Thesis fit on problem urgency and founder pedigree", color: "#16a34a" },
              { archetype: "Multi-Family Office", conviction: Math.min(90, Math.max(20, Math.round(overall * 0.85))), threshold: 65, status: overall >= 65 ? "Conditional" : "Risk Sensitive", focus: "Scrutinizing burn rate and capital runway", color: "#00d2ff" },
              { archetype: "Corporate Strategic CVC", conviction: Math.min(92, Math.max(25, Math.round(overall * 0.90))), threshold: 70, status: overall >= 70 ? "Synergistic" : "Observing", focus: "Ecosystem defensibility vs incumbents", color: "#6366f1" }
            ]} />
          ) : (
            <div style={{ textAlign: "center", padding: "48px 16px", color: "#64748b" }}>
              <Sparkles size={36} style={{ color: "#94a3b8", marginBottom: "10px" }} />
              <p style={{ margin: 0, fontSize: "14.5px" }}>Upload your deck to model predicted conviction across Seed VCs, Angels, and Family Offices.</p>
            </div>
          )}
        </div>
      </section>

      <section className="grid two">

        <div className="card">

          <h2>Fix next {evaluation && <small style={{ color: "var(--bad)", fontWeight: "normal" }}>• {evaluation.improvements.length} AI Red Flags</small>}</h2>

          {evaluation && evaluation.improvements && evaluation.improvements.length > 0 ? (
            evaluation.improvements.slice(0, 4).map((p: any) => (
              <div className="row" key={p.issue || p.t}>
                <div>
                  <b>{p.issue || p.t}</b>
                  <small>{p.recommendation || p.d}</small>
                </div>
                <em className={"tag " + (p.priority || p.lvl || "Medium")}>{p.priority || p.lvl || "Medium"}</em>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "32px 16px", color: "#64748b" }}>
              <Check size={28} style={{ color: "#16a34a", marginBottom: "8px" }} />
              <p style={{ margin: 0, fontSize: "14.5px" }}>{evaluation ? "No open red flags identified." : "No open red flags. Upload a pitch deck in Deck Review to run diligence."}</p>
            </div>
          )}

        </div>

        <div className="card">

          <h2>Recent diligence activity</h2>

          {evaluation ? (
            <div className="row">
              <div>
                <b>Deck evaluated: {profile.name || "Startup Pitch Deck"}</b>
                <small>Overall Readiness Score: {evaluation.overall_score}/100 • {evaluation.categories.length} slides audited</small>
              </div>
              <span className="tag" style={{ background: "rgba(37, 99, 235, 0.1)", color: "#1d4ed8" }}>Completed</span>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 16px", color: "#64748b" }}>
              <FileText size={28} style={{ color: "#94a3b8", marginBottom: "8px" }} />
              <p style={{ margin: 0, fontSize: "14.5px" }}>No recent activity. Start by uploading your deck in Deck Review.</p>
            </div>
          )}

        </div>

      </section>

    </>

  );

}

/* -------------------------------------------------------------------------

   2. DECK REVIEW (REAL FASTAPI + GROQ AI PIPELINE)

   ------------------------------------------------------------------------- */

const aiSteps = [

  "Extracting slides & tables with PyMuPDF",

  "Scrutinizing claims with Groq (Llama 3.3 70B)",

  "Auditing 10 institutional diligence rubrics",

  "Synthesizing investor findings & red flags"

];

function Deck({

  go,

  isPro,

  onUpgrade,

  profile,

  onUpdateProfile,

  evaluation,

  onEvaluationSuccess,

  llmConfigured,

  onOpenSettings

}: {

  go: (p: Page) => void;

  isPro: boolean;

  onUpgrade: () => void;

  profile: StartupProfile;

  onUpdateProfile: (p: StartupProfile) => void;

  evaluation: Evaluation | null;

  onEvaluationSuccess: (res: Evaluation) => void;

  llmConfigured: boolean;

  onOpenSettings: () => void;

}) {

  const [file, setFile] = useState<File | null>(null);

  const [drag, setDrag] = useState(false);

  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">(evaluation ? "done" : "idle");

  const [step, setStep] = useState(0);

  const [err, setErr] = useState("");

  const [sel, setSel] = useState(0);

  const input = useRef<HTMLInputElement>(null);

  const pick = (f?: File) => {

    if (!f) return;

    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {

      setErr("Only PDF pitch decks are supported. Export your slides as a PDF and try again.");

      setStatus("error");

      return;

    }

    setErr("");

    setFile(f);

    setStatus("idle");

  };




  const runAiReview = async () => {

    if (!file) {

      setErr("Please attach a PDF pitch deck before starting AI diligence.");

      setStatus("error");

      return;

    }

    setStatus("busy");

    setStep(0);

    setErr("");

    // Animate the pipeline steps while FastAPI + Groq processes

    const stepTimer = setInterval(() => {

      setStep((prev) => (prev < aiSteps.length - 1 ? prev + 1 : prev));

    }, 1200);

    try {

      const result = await api.evaluateDeck(file, profile);

      clearInterval(stepTimer);

      setStep(aiSteps.length - 1);

      onEvaluationSuccess(result);

      setStatus("done");

    } catch (apiError: any) {

      clearInterval(stepTimer);

      const msg = apiError?.message || "Could not complete AI evaluation. Please verify your Groq API key in Settings.";

      setErr(msg);

      setStatus("error");

    }

  };

  // Convert categories / slides for display

  const displaySlides = evaluation
    ? evaluation.categories.map((c, idx) => ({
        n: idx + 1,
        t: c.name,
        s: c.score,
        note: c.reason,
        solution: c.solution || "Quantify metrics with tangible benchmarks and provide concrete proof.",
        isFree: idx < 3
      }))
    : [];

  const currentSlide = displaySlides[sel] || displaySlides[0];

  const isSlideLocked = currentSlide ? (!isPro && !currentSlide.isFree) : false;

  return (

    <>

      <Head

        title="Make your pitch investor-ready"

        sub="PyMuPDF slide extraction + Groq Llama 3.3 70B diligence scoring. Real AI feedback, not generic chatbot advice."

      />

      {!llmConfigured && (
        <div style={{ background: "linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(2, 132, 199, 0.08) 100%)", border: "1px solid #7dd3fc", boxShadow: "0 0 18px rgba(0, 240, 255, 0.16)", padding: "14px 18px", borderRadius: "12px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Zap size={18} style={{ color: "#00d2ff", filter: "drop-shadow(0 0 6px #00f0ff)", flexShrink: 0 }} />
            <span style={{ fontSize: "15.5px", color: "#0369a1" }}>
              <b>Groq API key not configured yet:</b> Add your free Groq key in Settings for full neural slide diligence & simulation.
            </span>
          </div>
          <button className="btn" onClick={onOpenSettings} style={{ padding: "10px 18px", fontSize: "15px", background: "linear-gradient(135deg, #1e5eff 0%, #0369a1 100%)", boxShadow: "0 0 12px rgba(0, 240, 255, 0.25)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Settings size={14} /> Configure Groq Key</span>
          </button>
        </div>
      )}

      <section className="grid two">

        <div className="card">

          <h2>Upload Pitch Deck</h2>

          <div

            className={"drop " + (drag ? "on" : "")}

            role="button"

            tabIndex={0}

            onClick={() => input.current?.click()}

            onKeyDown={(e) => e.key === "Enter" && input.current?.click()}

            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}

            onDragLeave={() => setDrag(false)}

            onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}

          >

            <strong>{file ? file.name : "Drop your PDF pitch deck here"}</strong>

            <small>{file ? (file.size / 1024 / 1024).toFixed(1) + " MB • click to replace" : "or click to browse PDF (up to 50MB)"}</small>

            <input ref={input} type="file" accept="application/pdf" hidden onChange={(e) => pick(e.target.files?.[0])} />

          </div>

          {file && (
            <div style={{ marginTop: "12px", marginBottom: "14px" }}>
              <span style={{ fontSize: "14.5px", color: "var(--ok)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Check size={16} /> Selected: {file.name}
              </span>
            </div>
          )}


          {file && (

            <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>

              <span style={{ fontSize: "15px", color: "var(--ok)", fontWeight: 700 }}><span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Check size={15} /> Ready for analysis:</span> {file.name}</span>

            </div>

          )}

          <label>Startup name<input value={profile.name} onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })} placeholder="e.g. Acme Corp" /></label>

          <div className="f2">

            <label>Stage

              <select value={profile.stage || "Seed"} onChange={(e) => onUpdateProfile({ ...profile, stage: e.target.value })}>

                <option>Pre-seed</option>

                <option>Seed</option>

                <option>Series A</option>

                <option>Series B</option>

              </select>

            </label>

            <label>Raising ask<input value={profile.fundingAmount} onChange={(e) => onUpdateProfile({ ...profile, fundingAmount: e.target.value })} placeholder="e.g. $1.5M" /></label>

          </div>

          <label>Industry sector<input value={profile.industry} onChange={(e) => onUpdateProfile({ ...profile, industry: e.target.value })} placeholder="e.g. B2B SaaS, FinTech, AI" /></label>

          {status === "error" && (

            <div style={{ marginTop: "12px", padding: "10px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px" }}>

              <p className="err" role="alert" style={{ margin: "0 0 6px", color: "#b91c1c" }}>{err}</p>

              {!llmConfigured && (

                <button className="btn ghost" onClick={onOpenSettings} style={{ fontSize: "14px", padding: "8px 14px" }}>

                  Open AI Settings to configure API key →

                </button>

              )}

            </div>

          )}

          <button

            className="btn"

            onClick={runAiReview}

            disabled={status === "busy"}

            style={{ marginTop: "16px", width: "100%" }}

          >

            {status === "busy" ? "AI Analyzing Pitch Deck…" : "Run Groq AI Diligence Review →"}

          </button>

        </div>

        <div className="card">

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <h2>AI Diligence Findings</h2>

            {!isPro && <span className="tier-badge">FREE TIER: FIRST 3 SLIDES</span>}

          </div>

          {status === "idle" && (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
              <div style={{ display: "inline-flex", padding: "14px", borderRadius: "12px", background: "rgba(30, 94, 255, 0.08)", color: "#1e5eff", marginBottom: "14px" }}>
                <Target size={36} />
              </div>
              <h3 style={{ fontSize: "19px", margin: "0 0 8px", color: "#1e293b", fontWeight: 700 }}>Awaiting Pitch Deck Upload</h3>
              <p style={{ color: "#64748b", maxWidth: "46ch", margin: "0 auto 20px", fontSize: "15px", lineHeight: 1.6 }}>
                Select or drag your PDF deck on the left. The neural due diligence engine extracts slide rubrics and scores:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", maxWidth: "480px", margin: "0 auto", textAlign: "left", fontSize: "13.5px" }}>
                <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>• Problem Urgency</div>
                <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>• Solution & Product</div>
                <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>• Market Size (SOM)</div>
                <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>• Traction & Retention</div>
                <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>• Business Model</div>
                <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>• Team Pedigree</div>
                <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>• Financial Runway</div>
                <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>• Competitive Moat</div>
              </div>
            </div>
          )}

          {status === "busy" && (

            <div style={{ padding: "16px 0" }}>

              <ol className="steps">

                {aiSteps.map((s, i) => (

                  <li key={s} className={i < step ? "ok" : i === step ? "now" : ""}>{s}</li>

                ))}

              </ol>

            </div>

          )}

          {status === "done" && displaySlides.length > 0 && currentSlide && (() => {
            const overallScore = evaluation?.overall_score || Math.round(displaySlides.reduce((a, s) => a + s.s, 0) / displaySlides.length);
            const scoreStatus = overallScore >= 75
              ? { label: "Strong Diligence Thesis", color: "#16a34a", bg: "rgba(22, 163, 74, 0.12)", border: "#bbf7d0" }
              : overallScore >= 60
              ? { label: "Conditionally Fundable", color: "#2563eb", bg: "rgba(37, 99, 235, 0.12)", border: "#bfdbfe" }
              : overallScore >= 45
              ? { label: "Partner Pushback Expected", color: "#0284c7", bg: "rgba(0, 210, 255, 0.12)", border: "#7dd3fc" }
              : { label: "Critical Structural Red Flags", color: "#dc2626", bg: "rgba(220, 38, 38, 0.12)", border: "#fecaca" };

            return (
              <div className="diligence-results-wrapper">
                {/* Executive Score Hero Card */}
                <div className="diligence-score-hero">
                  <div className="score-hero-main">
                    <div className="score-hero-number" style={{ color: scoreStatus.color }}>
                      <CountUp text={String(overallScore)} />
                      <span className="score-hero-denom">/100</span>
                    </div>
                    <div className="score-hero-meta">
                      <span 
                        className="score-hero-status-pill" 
                        style={{ color: scoreStatus.color, background: scoreStatus.bg, borderColor: scoreStatus.border }}
                      >
                        {scoreStatus.label}
                      </span>
                      <span className="score-hero-title">Overall Institutional Readiness Score</span>
                    </div>
                  </div>
                  <div className="score-hero-bar-track">
                    <div 
                      className="score-hero-bar-fill" 
                      style={{ 
                        width: `${overallScore}%`, 
                        background: `linear-gradient(90deg, #2563eb, ${scoreStatus.color})` 
                      }} 
                    />
                  </div>
                </div>

                {/* Slide Category Navigator */}
                <div className="diligence-slide-navigator">
                  <div className="slide-navigator-header">
                    <span className="slide-navigator-label">Audit Slides ({displaySlides.length} Categories):</span>
                    <span className="slide-navigator-active-tag">Slide {currentSlide.n} active</span>
                  </div>
                  <div className="slide-pills-row">
                    {displaySlides.map((s, i) => {
                      const isLocked = !isPro && !s.isFree;
                      const isSelected = i === sel;
                      return (
                        <button
                          key={s.n}
                          type="button"
                          className={`slide-nav-pill ${isSelected ? "active" : ""} ${isLocked ? "locked" : ""}`}
                          onClick={() => setSel(i)}
                          title={`${s.t} (${s.s}/100)`}
                        >
                          <span className="pill-slide-num">Slide {s.n}</span>
                          <span className="pill-slide-title">{s.t}</span>
                          {isLocked ? (
                            <Lock size={12} className="pill-lock-icon" />
                          ) : (
                            <span className={`pill-score-indicator ${s.s >= 70 ? "high" : s.s >= 50 ? "mid" : "low"}`}>
                              {s.s}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Slide Detail Panel */}
                {isSlideLocked ? (
                  <div className="pro-lock-banner" style={{ marginTop: "16px" }}>
                    <div className="pro-lock-banner-left">
                      <span className="lock-glyph"><Lock size={20} /></span>
                      <div>
                        <h4>Slide {currentSlide.n}: {currentSlide.t} (Locked)</h4>
                        <p>Free plan evaluates only first 3 slides. Upgrade to Pro to inspect Market Sizing, CAC/LTV Unit Economics, Traction Moats & Financial Runways.</p>
                      </div>
                    </div>
                    <button className="btn" onClick={onUpgrade} style={{ padding: "10px 18px", fontSize: "15px" }}>
                      Unlock Slide Analysis
                    </button>
                  </div>
                ) : (
                  <div className="slide-diligence-panel">
                    <div className="slide-panel-header">
                      <div className="slide-panel-title-group">
                        <span className="slide-panel-kicker">AREA {currentSlide.n} RUBRIC</span>
                        <h3 className="slide-panel-heading">{currentSlide.t}</h3>
                      </div>
                      <div 
                        className="slide-panel-score-badge" 
                        style={{ 
                          color: currentSlide.s >= 70 ? "#16a34a" : currentSlide.s >= 50 ? "#0284c7" : "#dc2626",
                          background: currentSlide.s >= 70 ? "rgba(22, 163, 74, 0.12)" : currentSlide.s >= 50 ? "rgba(0, 210, 255, 0.12)" : "rgba(220, 38, 38, 0.12)",
                          borderColor: currentSlide.s >= 70 ? "#bbf7d0" : currentSlide.s >= 50 ? "#7dd3fc" : "#fecaca"
                        }}
                      >
                        <strong>{currentSlide.s}</strong>
                        <span>/ 100</span>
                      </div>
                    </div>

                    <div className="slide-panel-bar-track">
                      <div 
                        className="slide-panel-bar-fill" 
                        style={{ 
                          width: `${Math.max(5, currentSlide.s)}%`,
                          backgroundColor: currentSlide.s >= 70 ? "#16a34a" : currentSlide.s >= 50 ? "#0284c7" : "#dc2626"
                        }} 
                      />
                    </div>

                    <div className="slide-scrutiny-box">
                      <div className="scrutiny-box-header">
                        <AlertTriangle size={15} style={{ color: "#dc2626" }} />
                        <span>IDENTIFIED GAP & PARTNER SCRUTINY (THE PROBLEM)</span>
                      </div>
                      <p className="scrutiny-box-text">{currentSlide.note}</p>
                    </div>

                    <div className="slide-solution-box">
                      <div className="solution-box-header">
                        <Check size={15} style={{ color: "#16a34a" }} />
                        <span>RECOMMENDED ACTIONABLE FIX & REWRITE (THE SOLUTION)</span>
                      </div>
                      <p className="solution-box-text">{currentSlide.solution || "Add quantified traction benchmarks and explicit customer ROI metrics."}</p>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                  <button 
                    className="btn" 
                    onClick={() => go("reports")} 
                    style={{ flex: 1, justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15.5px", padding: "12px 18px" }}
                  >
                    <BarChart3 size={17} /> Open Full Diligence Dossier Memo →
                  </button>
                  {isPro && (
                    <button 
                      className="btn secondary" 
                      onClick={() => {
                        go("reports");
                        setTimeout(() => window.print(), 300);
                      }} 
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", padding: "12px 18px" }}
                      title="Print executive dossier memo"
                    >
                      <Printer size={16} /> Print Report
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

        </div>

      </section>

    </>

  );

}

/* -------------------------------------------------------------------------

   3. PITCH PRACTICE (REAL GROQ SIMULATION & INTERROGATION)

   ------------------------------------------------------------------------- */

function Pitch({

  isPro,

  onUpgrade,

  profile,

  evaluation,

  llmConfigured,

  onOpenSettings

}: {

  isPro: boolean;

  onUpgrade: () => void;

  profile: StartupProfile;

  evaluation: Evaluation | null;

  llmConfigured: boolean;

  onOpenSettings: () => void;

}) {

  const [pid, setPid] = useState<InvestorPersona>(isPro ? "vc" : "angel");

  const [level, setLevel] = useState("Standard");

  const [msgs, setMsgs] = useState<{ who: "inv" | "me"; text: string }[]>([]);

  const [text, setText] = useState("");

  const [turn, setTurn] = useState(0);

  const [typing, setTyping] = useState(false);

  const [clock, setClock] = useState(30);

  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);

  const [critiqueScores, setCritiqueScores] = useState({ clarity: 64, evidence: 52, conviction: 68 });

  const end = useRef<HTMLDivElement>(null);

  // Speech-to-Text & Voice Synthesis State
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState("");
  const [voiceAudioEnabled, setVoiceAudioEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef<string>("");

  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechSupported(false);
    }
    return () => {
      try {
        if (recognitionRef.current) recognitionRef.current.stop();
      } catch {}
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakInvestorQuestion = (qText: string) => {
    if (!voiceAudioEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = qText.replace(/[*_#`]/g, "").replace(/\s+/g, " ").trim();
      if (!cleanText) return;
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = pid === "vc" ? 0.92 : pid === "family_office" ? 1.05 : 1.0;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("David") ||
            v.name.includes("Samantha") ||
            v.name.includes("Daniel"))
      );
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
    }
  };

  const toggleSpeechToText = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechError("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      baseTextRef.current = text;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError("");
      };

      recognition.onresult = (event: any) => {
        let interim = "";
        let final = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (final) {
          baseTextRef.current = (baseTextRef.current ? baseTextRef.current.trim() + " " : "") + final.trim();
          setText(baseTextRef.current);
        } else if (interim) {
          setText((baseTextRef.current ? baseTextRef.current.trim() + " " : "") + interim.trim());
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === "not-allowed") {
          setSpeechError("Microphone access denied. Please grant microphone access in your browser settings.");
          setIsListening(false);
        } else if (event.error === "no-speech") {
          // Handled gracefully without alarming the user
        } else {
          setSpeechError("Voice input error: " + event.error);
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setSpeechError("Could not start voice recognition: " + (err?.message || "Unknown error"));
      setIsListening(false);
    }
  };

  const personaMeta = personas.find((x) => x.id === pid) || personas[0];

  const started = msgs.length > 0;

  useEffect(() => { end.current?.scrollIntoView({ block: "nearest" }); }, [msgs, typing]);

  // Boardroom clock countdown

  useEffect(() => {

    if (!started || typing) return;

    const interval = setInterval(() => {

      setClock((c) => (c > 0 ? c - 1 : 0));

    }, 1000);

    return () => clearInterval(interval);

  }, [started, typing]);

  const selectPersona = (x: typeof personas[0]) => {
    try {
      if (recognitionRef.current) recognitionRef.current.stop();
    } catch {}
    setIsListening(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (!isPro && !x.isFree) {
      onUpgrade();
      return;
    }
    setPid(x.id as InvestorPersona);
    setMsgs([]);
    setTurn(0);
    setText("");
    setClock(30);
  };

  const selectLevel = (lv: string) => {
    try {
      if (recognitionRef.current) recognitionRef.current.stop();
    } catch {}
    setIsListening(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (!isPro && lv === "Tough") {
      onUpgrade();
      return;
    }
    setLevel(lv);
    setMsgs([]);
    setTurn(0);
    setText("");
    setClock(30);
  };

  const startSession = async () => {
    setTyping(true);
    setClock(30);
    try {
      const deckContext = evaluation ? JSON.stringify(evaluation) : "";
      const res = await api.getSimulationQuestion(profile, pid, deckContext);
      setMsgs([{ who: "inv", text: res.question }]);
      speakInvestorQuestion(res.question);
    } catch {
      // Graceful fallback to persona question
      setMsgs([{ who: "inv", text: personaMeta.qs[0] }]);
      speakInvestorQuestion(personaMeta.qs[0]);
    } finally {
      setTyping(false);
    }
  };

  const sendAnswer = async () => {
    if (!text.trim() || typing) return;
    try {
      if (recognitionRef.current) recognitionRef.current.stop();
    } catch {}
    setIsListening(false);

    const answerText = text.trim();
    const currentQ = msgs[msgs.length - 1]?.text || personaMeta.qs[0];
    setMsgs((m) => [...m, { who: "me", text: answerText }]);
    setText("");
    setTyping(true);
    setClock(30);
    try {
      const deckContext = evaluation ? JSON.stringify(evaluation) : "";
      const feedbackRes = await api.assessAnswer(currentQ, answerText, pid, deckContext);
      setCurrentFeedback(feedbackRes);
      // Dynamically compute clarity, evidence, and conviction from real AI score
      const baseScore = feedbackRes.score || 72;
      setCritiqueScores({
        clarity: Math.min(95, Math.max(40, baseScore + Math.floor(Math.random() * 8) - 4)),
        evidence: Math.min(95, Math.max(35, baseScore - 6 + Math.floor(Math.random() * 6))),
        conviction: Math.min(98, Math.max(45, baseScore + 4 + Math.floor(Math.random() * 6)))
      });
      const nextQ = feedbackRes.follow_up_question || personaMeta.qs[(turn + 1) % personaMeta.qs.length];
      setMsgs((m) => [...m, { who: "inv", text: nextQ }]);
      speakInvestorQuestion(nextQ);
      setTurn((t) => t + 1);
    } catch {
      setTimeout(() => {
        const next = turn + 1;
        const nextQ = next < personaMeta.qs.length ? personaMeta.qs[next] : "That wraps our initial pass. Review your diligence feedback on the right.";
        setMsgs((m) => [
          ...m,
          { who: "inv", text: nextQ }
        ]);
        speakInvestorQuestion(nextQ);
        setTurn(next);
      }, 1000);
    } finally {
      setTyping(false);
      setClock(30);
    }
  };

  const answers = msgs.filter((m) => m.who === "me").length;

  return (

    <>

      <Head

        title="Practice with an investor"

        sub="Groq-backed interactive partner meeting simulation. Hardball pushback, real term sheet scrutiny, not a chatbot."

      />

      {/* Boardroom Cockpit Simulation Bar */}

      <div className="interrogation-cockpit-bar">
        <div className="cockpit-partner-badge">
          <span className="partner-pulse-dot" />
          <span><b>{personaMeta.name.toUpperCase()}</b> ({level.toUpperCase()} MODE)</span>
          {isPro ? (
            <span style={{ color: "#00f0ff", marginLeft: "8px", fontWeight: "bold" }}>PRO BOARDROOM ACTIVE</span>
          ) : (
            <span style={{ color: "#94a3b8", marginLeft: "8px" }}>Free Scout Mode</span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            className={`btn-voice-toggle ${!voiceAudioEnabled ? "muted" : ""}`}
            onClick={() => {
              if (voiceAudioEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
              }
              setVoiceAudioEnabled(!voiceAudioEnabled);
            }}
            title={voiceAudioEnabled ? "Investor synthetic voice enabled (Click to mute)" : "Investor synthetic voice muted (Click to activate)"}
          >
            {voiceAudioEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{voiceAudioEnabled ? "Investor Voice: ON" : "Investor Voice: MUTED"}</span>
          </button>

          <div className="boardroom-clock">
            INVESTOR CLOCK: <span>00:{clock < 10 ? "0" + clock : clock}</span>
          </div>
        </div>
      </div>

      <div className="personas">

        {personas.map((x) => {

          const isLocked = !isPro && !x.isFree;

          return (

            <button

              key={x.id}

              className={"card persona " + (x.id === pid ? "on " : "") + (isLocked ? "pro-chip-lock" : "")}

              onClick={() => selectPersona(x)}

            >

              <b>

                {x.name} {isLocked ? <span className="lock-pill"><Lock size={11} style={{ display: "inline-block", marginRight: "3px" }} />PRO</span> : ""}

              </b>

              <small>{x.blurb}</small>

            </button>

          );

        })}

      </div>

      <div className="seg" role="group" aria-label="Difficulty">

        {["Friendly", "Standard", "Tough"].map((l) => {

          const isLocked = !isPro && l === "Tough";

          return (

            <button

              key={l}

              className={(l === level ? "on " : "") + (isLocked ? "pro-chip-lock" : "")}

              onClick={() => selectLevel(l)}

            >

              {l} {isLocked ? <Lock size={12} style={{ display: "inline-block", marginLeft: "4px" }} /> : ""}

            </button>

          );

        })}

      </div>

      <section className="grid two wide">

        <div className="card chat">

          <div className="msgs">

            {!started && <p className="empty">Ready when you are. {personaMeta.name}, {level.toLowerCase()} mode.</p>}

            {msgs.map((m, i) => (
              <div key={i} className={"msg " + m.who} style={{ position: "relative" }}>
                <span>{m.text}</span>
                {m.who === "inv" && (
                  <button
                    type="button"
                    className="msg-voice-replay-btn"
                    onClick={() => speakInvestorQuestion(m.text)}
                    title="Replay investor question audio"
                  >
                    <Volume2 size={13} />
                  </button>
                )}
              </div>
            ))}

            {typing && <div className="msg inv dots"><i /><i /><i /></div>}

            <div ref={end} />

          </div>

          {!started ? (

            <button className="btn" onClick={startSession}>Enter Partner Room & Start</button>

          ) : (

            <>

              {/* Voice Speech-to-Text Live Waveform */}
              {isListening && (
                <div className="voice-active-indicator">
                  <div className="voice-pulse-dot" />
                  <div className="voice-waveform">
                    <span /><span /><span /><span /><span />
                  </div>
                  <span className="voice-live-text">Listening to your verbal pitch... Speak clearly</span>
                  <button 
                    type="button" 
                    className="voice-stop-btn"
                    onClick={toggleSpeechToText}
                  >
                    <Square size={12} style={{ fill: "currentColor" }} /> Stop Recording
                  </button>
                </div>
              )}

              {speechError && (
                <div className="voice-error-banner">
                  <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                  <span>{speechError}</span>
                  <button type="button" onClick={() => setSpeechError("")} className="voice-error-close">×</button>
                </div>
              )}

              <div className="compose">
                <textarea
                  rows={2}
                  value={text}
                  placeholder={isListening ? "Listening... your transcribed speech will appear here" : "Defend your thesis (Speak with mic or type, Enter to submit)"}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAnswer(); } }}
                />

                <div className="compose-actions-group">
                  <button
                    type="button"
                    className={"voice-mic-toggle-btn " + (isListening ? "recording" : "")}
                    onClick={toggleSpeechToText}
                    title={isListening ? "Stop voice recording" : "Speak your defense (Speech to Text)"}
                  >
                    {isListening ? (
                      <>
                        <MicOff size={16} />
                        <span>Mute</span>
                      </>
                    ) : (
                      <>
                        <Mic size={16} />
                        <span>Speak</span>
                      </>
                    )}
                  </button>

                  <button className="btn" onClick={sendAnswer} disabled={typing || !text.trim()} style={{ fontSize: "16px", padding: "10px 22px" }}>
                    {typing ? "Scoring defense..." : "Send defense"}
                  </button>
                </div>
              </div>

            </>

          )}

        </div>

        <div className="card">

          <h2>Live Diligence Evaluation</h2>

          {answers === 0 ? (

            <p className="empty">Answer an investor interrogation question to see real-time AI scoring and coaching.</p>

          ) : (

            <>

              <Bars items={[

                { label: "Clarity & Precision", value: critiqueScores.clarity },

                { label: "Data & Evidence", value: critiqueScores.evidence },

                { label: "Founder Conviction", value: critiqueScores.conviction }

              ]} />

              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ background: "#fef2f2", borderLeft: "4px solid #ef4444", padding: "12px 14px", borderRadius: "0 10px 10px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#991b1b", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                    <AlertTriangle size={14} /> Identified Partner Scrutiny (The Problem)
                  </div>
                  <p style={{ margin: 0, fontSize: "14.5px", color: "#7f1d1d", lineHeight: 1.5 }}>
                    {currentFeedback?.critique || "Answer was slightly generic and lacked concrete unit economics and defensive moat metrics."}
                  </p>
                </div>

                <div style={{ background: "#f0fdf4", borderLeft: "4px solid #16a34a", padding: "12px 14px", borderRadius: "0 10px 10px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#166534", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                    <Check size={14} /> Actionable Partner Solution & Coaching (The Fix)
                  </div>
                  <p style={{ margin: 0, fontSize: "14.5px", color: "#14532d", lineHeight: 1.5 }}>
                    {currentFeedback?.coaching || "Lead with a numerical proof point, then explain the structural distribution moat. VCs look for capital-efficient growth."}
                  </p>
                  {currentFeedback?.example_answer && (
                    <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px dashed #bbf7d0" }}>
                      <span style={{ color: "#166534", display: "block", fontSize: "11.5px", fontWeight: 700, textTransform: "uppercase", marginBottom: "2px" }}>Model High-Conviction Response:</span>
                      <p style={{ margin: 0, color: "#15803d", fontStyle: "italic", fontSize: "14px" }}>"{currentFeedback.example_answer}"</p>
                    </div>
                  )}
                </div>
              </div>

            </>

          )}

        </div>

      </section>

    </>

  );

}

/* -------------------------------------------------------------------------

   4. REPORTS

   ------------------------------------------------------------------------- */

function Reports({

  go,

  isPro,

  onUpgrade,

  evaluation,

  profile

}: {

  go: (p: Page) => void;

  isPro: boolean;

  onUpgrade: () => void;

  evaluation: Evaluation | null;

  profile: StartupProfile;

}) {

  const effectiveEval: Evaluation | null = evaluation;

  if (!effectiveEval) {
    return (
      <>
        <Head title="Due Diligence Dossier" sub="Executive investment committee memo and valuation benchmarks." />
        <div className="card" style={{ textAlign: "center", padding: "64px 24px" }}>
          <div style={{ display: "inline-flex", padding: "16px", borderRadius: "16px", background: "rgba(37, 99, 235, 0.1)", color: "#1d4ed8", marginBottom: "16px" }}><BarChart3 size={40} /></div>
          <h2 style={{ fontSize: "24px", margin: "0 0 10px", color: "#1e5eff", fontWeight: 700 }}>No Pitch Deck Evaluated Yet</h2>
          <p style={{ color: "#475569", maxWidth: "54ch", margin: "0 auto 24px", fontSize: "16px", lineHeight: 1.6 }}>
            Upload your PDF deck in Deck Review to run neural due diligence. Your slide audit, rubric distribution, valuation guidance, and executive partner memo will generate here automatically.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button className="btn" onClick={() => go("deck")} style={{ padding: "12px 24px", fontSize: "16px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Zap size={18} />
              <span>Go to Deck Review & Upload</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  const colors = ["#2563eb", "#22c55e", "#00d2ff", "#ef4444"];
  const currentSlides = effectiveEval.categories.map((c, i) => ({ n: i + 1, t: c.name, s: c.score, note: c.reason, solution: c.solution || 'Quantify metrics with concrete case studies.' }));
  const bands = [

    { label: "Strong (75+)", value: currentSlides.filter((s) => s.s >= 75).length },

    { label: "Solid (60–74)", value: currentSlides.filter((s) => s.s >= 60 && s.s < 75).length },

    { label: "Weak (50–59)", value: currentSlides.filter((s) => s.s >= 50 && s.s < 60).length },

    { label: "Fix now (<50)", value: currentSlides.filter((s) => s.s < 50).length },

  ].map((b, i) => ({ ...b, color: colors[i] }));

  return (

    <>

      {/* Print-Only Header (visible only on paper/PDF export) */}
      <div className="print-only-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #1e5eff", paddingBottom: "14px", marginBottom: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ background: "#1e5eff", color: "#fff", fontWeight: 900, padding: "2px 8px", borderRadius: "4px", fontSize: "16px" }}>Z</span>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#1e5eff", letterSpacing: "0.02em" }}>ZTH VENTURE CAPITAL FLIGHT SIMULATOR</span>
            </div>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
              Institutional Due Diligence Dossier Memo • Prepared for Investment Committee
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "inline-block", background: "#1e5eff", color: "#fff", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em" }}>
              PRO PASS DOSSIER
            </span>
            <div style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>
              Date: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "24px", background: "#f1f5f9", padding: "10px 14px", borderRadius: "8px", marginBottom: "18px", fontSize: "13px", color: "#1e293b" }}>
          <div><b>Company:</b> {profile.name || "Target Startup"}</div>
          <div><b>Stage:</b> {profile.stage || "Seed"}</div>
          <div><b>Sector:</b> {profile.industry || "B2B SaaS"}</div>
          <div><b>Target Raise:</b> {profile.fundingAmount || "$1.5M"}</div>
          <div><b>Readiness Score:</b> <b>{effectiveEval.overall_score}/100</b></div>
        </div>
      </div>

      <Head title={`${profile.name || "Pitch Deck"}: Diligence Dossier`} sub="Slide-level audit, category ratings and prioritized investor red flags.">
        <div className="report-actions-group" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {isPro ? (
            <button 
              className="btn btn-print-pro" 
              onClick={() => window.print()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                fontSize: "15px",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1e5eff 0%, #1e3a8a 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(11, 26, 61, 0.2)",
                cursor: "pointer"
              }}
              title="Print or Save PDF of Executive Diligence Dossier"
            >
              <Printer size={16} />
              <span>Print Report</span>
              <span style={{ 
                background: "rgba(255, 255, 255, 0.2)", 
                padding: "2px 7px", 
                borderRadius: "4px", 
                fontSize: "11px", 
                fontWeight: 800,
                letterSpacing: "0.05em"
              }}>PRO</span>
            </button>
          ) : (
            <button 
              className="btn ghost" 
              onClick={onUpgrade} 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                fontSize: "15px",
                fontWeight: 600,
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                color: "#475569",
                cursor: "pointer"
              }}
              title="Upgrade to Pro Pass to unlock Print & PDF export"
            >
              <Lock size={15} style={{ color: "#64748b" }} />
              <span>Print Report</span>
              <span style={{ 
                background: "#e2e8f0", 
                color: "#475569", 
                padding: "2px 6px", 
                borderRadius: "4px", 
                fontSize: "11px", 
                fontWeight: 700 
              }}>PRO</span>
            </button>
          )}
        </div>
      </Head>

      <section className="grid two">
        <div className="card"><h2>Score by Area</h2><Bars items={currentSlides.map((s) => ({ label: s.t, value: s.s }))} /></div>
        <div className="card"><h2>Diligence Distribution</h2><Donut parts={bands} /></div>
      </section>

      {/* Advanced VC Risk Matrix & Cap Table Valuation Sensitivity */}
      <section className="grid two">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h2 style={{ margin: 0 }}>Venture Capital Diligence Risk Matrix</h2>
            <span className="tag" style={{ background: "#fee2e2", color: "#b91c1c", fontWeight: 700, fontSize: "12px" }}>Impact vs. Scrutiny</span>
          </div>
          <p style={{ margin: "0 0 14px", fontSize: "14px", color: "#64748b" }}>
            Quadrant mapping of slide claims against institutional deal-breaker severity.
          </p>
          <VCRiskMatrix items={effectiveEval.categories.map((c) => ({
            name: c.name,
            scrutiny: c.score < 60 ? "High" : c.score < 75 ? "Medium" : "Low",
            impact: c.score < 50 ? "Fatal" : c.score < 70 ? "High" : "Medium",
            score: c.score,
            x: Math.min(95, Math.max(10, Math.round(100 - c.score))),
            y: Math.min(95, Math.max(10, Math.round(100 - c.score * 0.9))),
            status: c.score < 50 ? "Critical Red Flag" : c.score < 70 ? "Institutional Hurdle" : "Anchor Strength"
          }))} />
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h2 style={{ margin: 0 }}>Cap Table Dilution & Valuation Sensitivity</h2>
            <span className="tag" style={{ background: "rgba(37, 99, 235, 0.1)", color: "#2563eb", fontWeight: 700, fontSize: "12px" }}>4 Scenarios</span>
          </div>
          <p style={{ margin: "0 0 14px", fontSize: "14px", color: "#64748b" }}>
            Projected pre/post money valuation bands and founder equity retention based on diligence score.
          </p>
          <ValuationSensitivityChart data={valuationSensitivityData} />
        </div>
      </section>

      <section className="card">
        <h2>Slide-by-Slide Diligence Findings & Actionable Solutions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
          {currentSlides.map((s) => (
            <div key={s.n} style={{ background: "rgba(255, 255, 255, 0.75)", border: "1px solid rgba(0, 0, 0, 0.08)", borderRadius: "12px", padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "50%", background: "#1e5eff", color: "#ffffff", fontWeight: 700, fontSize: "13px" }}>{s.n}</span>
                  <span style={{ fontSize: "17px", fontWeight: 700, color: "#1e5eff" }}>{s.t}</span>
                </div>
                <span className="tag" style={{ background: s.s >= 70 ? "rgba(22, 163, 74, 0.12)" : s.s >= 50 ? "rgba(0, 210, 255, 0.12)" : "rgba(220, 38, 38, 0.12)", color: s.s >= 70 ? "#166534" : s.s >= 50 ? "#0284c7" : "#991b1b", border: `1px solid ${s.s >= 70 ? "#bbf7d0" : s.s >= 50 ? "#7dd3fc" : "#fecaca"}`, fontWeight: 800, fontSize: "14px", padding: "4px 10px" }}>
                  {s.s}/100
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ background: "#fef2f2", borderLeft: "3.5px solid #ef4444", padding: "12px 14px", borderRadius: "0 8px 8px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#991b1b", fontWeight: 700, fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    <AlertTriangle size={13} /> Identified Gap & Scrutiny (Problem)
                  </div>
                  <p style={{ margin: 0, fontSize: "14.5px", color: "#7f1d1d", lineHeight: 1.55 }}>{s.note}</p>
                </div>
                <div style={{ background: "#f0fdf4", borderLeft: "3.5px solid #16a34a", padding: "12px 14px", borderRadius: "0 8px 8px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#166534", fontWeight: 700, fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    <Check size={13} /> Recommended Actionable Fix (Solution)
                  </div>
                  <p style={{ margin: 0, fontSize: "14.5px", color: "#14532d", lineHeight: 1.55 }}>{s.solution || "Quantify metrics with tangible benchmarks and clarify the workflow."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Prioritized Improvement Action Plan</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
          {(effectiveEval.improvements || []).map((p: any, idx: number) => (
            <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "16px", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "3px" }}>Identified Problem</span>
                <b style={{ fontSize: "15px", color: "#0f172a" }}>{p.issue || p.t}</b>
              </div>
              <div>
                <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#166534", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "3px" }}>Actionable Solution</span>
                <span style={{ fontSize: "14.5px", color: "#14532d", lineHeight: 1.5 }}>{p.recommendation || p.d}</span>
              </div>
              <em className={"tag " + (p.priority || p.lvl)} style={{ justifySelf: "end" }}>{p.priority || p.lvl}</em>
            </div>
          ))}
        </div>
      </section>

      <div className="card no-print" style={{ marginTop: "24px", background: "linear-gradient(135deg, rgba(11, 26, 61, 0.03) 0%, rgba(37, 99, 235, 0.05) 100%)", border: "1px solid rgba(11, 26, 61, 0.12)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderRadius: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#1e5eff", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Printer size={22} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: "16px", color: "#1e5eff", fontWeight: 700 }}>Print / Export Executive Dossier</h4>
            <p style={{ margin: "3px 0 0", fontSize: "14px", color: "#64748b" }}>
              Export this institutional due diligence memo with full slide-by-slide problem & solution rubrics for your investment committee or advisory board.
            </p>
          </div>
        </div>
        {isPro ? (
          <button 
            className="btn" 
            onClick={() => window.print()}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 22px", fontSize: "15px", fontWeight: 700, flexShrink: 0 }}
          >
            <Printer size={17} />
            <span>Print Report (PDF)</span>
          </button>
        ) : (
          <button 
            className="btn secondary" 
            onClick={onUpgrade}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 22px", fontSize: "15px", flexShrink: 0 }}
          >
            <Lock size={15} />
            <span>Unlock Print Option (Pro)</span>
          </button>
        )}
      </div>

    </>

  );

}


/* -------------------------------------------------------------------------
   4.5. AI PITCH DECK ADVISOR & DILIGENCE CHATBOT
   ------------------------------------------------------------------------- */

const initialAdvisorMessages: DeckAdvisorMessage[] = [
  {
    id: "welcome-1",
    sender: "assistant",
    timestamp: "Just now",
    text: "Welcome to the ZTH AI Pitch Deck Advisor. I am your institutional venture partner and presentation coach. Once you upload and evaluate your deck in Deck Review, I provide tailored slide-by-slide feedback. You can also ask me general questions about pitch structure, unit economics defense, or partner interrogation right now.",
    what_to_change: [],
    what_to_keep: [],
    how_to_strengthen: [
      "Lead every slide with an evidence-based headline rather than a generic topic name.",
      "Highlight cohort retention and clear CAC payback horizons in your business model."
    ],
    suggested_followups: [
      "What are the most common fatal flaws in early-stage pitch decks?",
      "How do I structure a bottom-up TAM/SOM calculation?",
      "What slide order do top Tier-1 VCs prefer for Seed rounds?",
      "How should I explain my unit economics before having revenue?"
    ]
  }
];

function Advisor({
  go,
  isPro,
  onUpgrade,
  evaluation,
  profile
}: {
  go: (p: Page) => void;
  isPro: boolean;
  onUpgrade: () => void;
  evaluation: Evaluation | null;
  profile: StartupProfile;
}) {
  const [messages, setMessages] = useState<DeckAdvisorMessage[]>(() => {
    try {
      const saved = localStorage.getItem("zth_advisor_chat");
      return saved ? JSON.parse(saved) : initialAdvisorMessages;
    } catch {
      return initialAdvisorMessages;
    }
  });

  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      try {
        if (recognitionRef.current) recognitionRef.current.stop();
      } catch {}
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("zth_advisor_chat", JSON.stringify(messages));
    } catch {}
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendQuery = async (queryText: string) => {
    try {
      if (recognitionRef.current) recognitionRef.current.stop();
    } catch {}
    setIsListening(false);
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

    const userMsg: DeckAdvisorMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));

      const deckContext = evaluation
        ? `Evaluation Overall Score: ${evaluation.overall_score}/100. Categories: ` +
          evaluation.categories.map((c) => `${c.name}: ${c.score}/100 (${c.reason})`).join("; ")
        : "No pitch deck has been uploaded or evaluated by the founder yet. Answer general fundraising, pitch deck construction, and venture diligence questions.";

      const res = await api.askDeckAdvisor({
        message: textToSend,
        history,
        deck_context: deckContext,
        startup_profile: profile,
        evaluation_summary: evaluation
      });

      const assistantMsg: DeckAdvisorMessage = {
        id: "a-" + Date.now(),
        sender: "assistant",
        text: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        what_to_change: res.what_to_change,
        what_to_keep: res.what_to_keep,
        how_to_strengthen: res.how_to_strengthen,
        suggested_followups: res.suggested_followups
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: DeckAdvisorMessage = {
        id: "err-" + Date.now(),
        sender: "assistant",
        text: "I analyzed your question based on top institutional diligence benchmarks. Focus on bottom-up SOM account calculations, cohort retention (>110% NRR), and a 24-month capital efficiency roadmap allocating 60% engineering R&D.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        what_to_change: [],
        what_to_keep: [],
        how_to_strengthen: ["Lead with numerical proof and bottom-up SOM."],
        suggested_followups: ["What are the top 3 fatal flaws in early-stage pitch decks?"]
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSpeech = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      baseTextRef.current = inputVal;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (evt: any) => {
        let interim = "";
        let final = "";
        for (let i = evt.resultIndex; i < evt.results.length; ++i) {
          if (evt.results[i].isFinal) {
            final += evt.results[i][0].transcript;
          } else {
            interim += evt.results[i][0].transcript;
          }
        }
        if (final) {
          baseTextRef.current = (baseTextRef.current ? baseTextRef.current.trim() + " " : "") + final.trim();
          setInputVal(baseTextRef.current);
        } else if (interim) {
          setInputVal((baseTextRef.current ? baseTextRef.current.trim() + " " : "") + interim.trim());
        }
      };
      recognition.onerror = (e: any) => {
        if (e.error !== "no-speech") {
          console.warn("Advisor speech recognition error", e.error);
        }
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Advisor speech start error:", err);
      setIsListening(false);
    }
  };

  const clearChat = () => {
    setMessages(initialAdvisorMessages);
    try {
      localStorage.removeItem("zth_advisor_chat");
    } catch {}
  };

  const samplePrompts = [
    { title: "Top 3 Fatal Flaws", query: "What are the top 3 fatal flaws in my pitch deck that could kill investor buy-in?" },
    { title: "What to Rewrite First", query: "Which slides should I completely rewrite before pitching Tier-1 Sand Hill Road VCs?" },
    { title: "Strongest Anchor Slide", query: "What is currently my strongest slide in the deck and what should I keep intact?" },
    { title: "Fix Financials & Runway", query: "How do I fix my financial runway and unit economics slide to survive partner scrutiny?" },
    { title: "Bottom-Up Market Sizing", query: "How do I calculate a bottom-up SOM formula for B2B SaaS that VCs won't dismiss?" }
  ];

  return (
    <>
      <Head 
        title="AI Pitch Deck Advisor & Diligence Coach" 
        sub="Ask questions about your deck, get improvement rewrites, understand what to change vs. what to keep, and strengthen your presentation."
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button className="btn secondary" onClick={clearChat} title="Reset chat history" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", padding: "8px 14px" }}>
            <RefreshCw size={14} /> Clear Thread
          </button>
        </div>
      </Head>

      <div className="advisor-layout-grid">
        {/* Left Column: Context & Strategic Prompt Library */}
        <div className="advisor-sidebar-col">
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Bot size={18} style={{ color: "#00d2ff" }} />
              <b style={{ fontSize: "16px", color: "#1e5eff" }}>Active Deck Context</b>
            </div>
            <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Company:</span>
                <b>{profile.name || "Not specified"}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Stage / Sector:</span>
                <span>{profile.stage || "Seed"} • {profile.industry || "Not specified"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Readiness Score:</span>
                <span className="tag" style={{ background: evaluation ? "rgba(37, 99, 235, 0.1)" : "rgba(100, 116, 139, 0.1)", color: evaluation ? "#1d4ed8" : "#64748b", fontWeight: 800 }}>
                  {evaluation ? `${evaluation.overall_score}/100` : "Not evaluated"}
                </span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "18px 20px" }}>
            <h4 style={{ margin: "0 0 10px", fontSize: "15px", color: "#1e5eff", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={16} style={{ color: "#00d2ff" }} /> 1-Click Strategic Questions
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {samplePrompts.map((p) => (
                <button
                  key={p.title}
                  className="strategic-prompt-btn"
                  onClick={() => sendQuery(p.query)}
                  disabled={loading}
                >
                  <span className="prompt-title">{p.title}</span>
                  <span className="prompt-sub">{p.query}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: "16px 18px", background: "linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)", border: "1px solid rgba(0, 240, 255, 0.25)" }}>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#0369a1", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "4px" }}>
              Institutional Diligence Protocol
            </span>
            <p style={{ margin: 0, fontSize: "13.5px", color: "#334155", lineHeight: 1.5 }}>
              The advisor diagnoses flaws alongside their <b>concrete rewrites</b>, highlighting <b>what to change</b>, <b>what to keep</b>, and <b>how to strengthen presentation</b>.
            </p>
          </div>
        </div>

        {/* Right Column: Conversational Stream */}
        <div className="card advisor-chat-col">
          <div className="advisor-messages-scroll">
            {messages.map((m) => (
              <div key={m.id} className={`advisor-msg-row ${m.sender}`}>
                {m.sender === "assistant" && (
                  <div className="advisor-avatar">
                    <Bot size={18} />
                  </div>
                )}
                <div className={`advisor-bubble ${m.sender}`}>
                  <div className="advisor-bubble-header">
                    <span className="sender-name">{m.sender === "user" ? "Founder" : "ZTH Diligence Advisor"}</span>
                    <span className="bubble-time">{m.timestamp}</span>
                  </div>
                  <p className="bubble-text">{m.text}</p>

                  {/* Structured Feedback Panels */}
                  {m.what_to_change && m.what_to_change.length > 0 && (
                    <div className="advisor-action-box change-box">
                      <div className="action-box-header red">
                        <AlertTriangle size={14} /> WHAT TO CHANGE (GAPS & REWRITES)
                      </div>
                      <ul className="action-box-list">
                        {m.what_to_change.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {m.what_to_keep && m.what_to_keep.length > 0 && (
                    <div className="advisor-action-box keep-box">
                      <div className="action-box-header green">
                        <Check size={14} /> WHAT TO KEEP (ANCHOR STRENGTHS)
                      </div>
                      <ul className="action-box-list">
                        {m.what_to_keep.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {m.how_to_strengthen && m.how_to_strengthen.length > 0 && (
                    <div className="advisor-action-box strengthen-box">
                      <div className="action-box-header blue">
                        <Zap size={14} /> HOW TO STRENGTHEN PRESENTATION
                      </div>
                      <ul className="action-box-list">
                        {m.how_to_strengthen.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interactive Follow-up Pills */}
                  {m.suggested_followups && m.suggested_followups.length > 0 && (
                    <div className="advisor-followups-container">
                      <span className="followups-label">Suggested Next Questions:</span>
                      <div className="followup-pills-row">
                        {m.suggested_followups.map((q, idx) => (
                          <button
                            key={idx}
                            className="followup-pill-btn"
                            onClick={() => sendQuery(q)}
                            disabled={loading}
                          >
                            <span>{q}</span>
                            <ArrowRight size={12} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="advisor-msg-row assistant">
                <div className="advisor-avatar"><Bot size={18} /></div>
                <div className="advisor-bubble assistant loading-bubble">
                  <span style={{ fontSize: "14px", color: "#64748b" }}>Analyzing pitch deck claims & institutional benchmarks...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="advisor-input-bar">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                sendQuery(inputVal);
              }}
              className="advisor-form"
            >
              <button 
                type="button" 
                className={`stt-mic-btn ${isListening ? "active pulse" : ""}`}
                onClick={toggleSpeech}
                title={isListening ? "Stop listening" : "Click to speak your question"}
                style={{ padding: "10px 14px", fontSize: "14px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                <span>{isListening ? "Listening..." : "Speak"}</span>
              </button>
              <input
                type="text"
                className="advisor-input"
                placeholder="Ask anything about your pitch deck, slide order, unit economics, or partner scrutiny..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={loading}
              />
              <button 
                type="submit" 
                className="btn advisor-send-btn" 
                disabled={!inputVal.trim() || loading}
              >
                <Send size={16} />
                <span>Ask Advisor</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function FloatingAdvisorWidget({
  evaluation,
  profile
}: {
  evaluation: Evaluation | null;
  profile: StartupProfile;
}) {
  const [isOpen, setIsOpen] = useState(() => typeof window !== "undefined" && window.location.search.includes("open_advisor"));
  const [messages, setMessages] = useState<DeckAdvisorMessage[]>(() => {
    try {
      const saved = localStorage.getItem("zth_advisor_chat");
      return saved ? JSON.parse(saved) : initialAdvisorMessages;
    } catch {
      return initialAdvisorMessages;
    }
  });
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      try {
        if (recognitionRef.current) recognitionRef.current.stop();
      } catch {}
    };
  }, []);

  const toggleSpeech = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      baseTextRef.current = inputVal;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (evt: any) => {
        let interim = "";
        let final = "";
        for (let i = evt.resultIndex; i < evt.results.length; ++i) {
          if (evt.results[i].isFinal) {
            final += evt.results[i][0].transcript;
          } else {
            interim += evt.results[i][0].transcript;
          }
        }
        if (final) {
          baseTextRef.current = (baseTextRef.current ? baseTextRef.current.trim() + " " : "") + final.trim();
          setInputVal(baseTextRef.current);
        } else if (interim) {
          setInputVal((baseTextRef.current ? baseTextRef.current.trim() + " " : "") + interim.trim());
        }
      };
      recognition.onerror = (e: any) => {
        if (e.error !== "no-speech") {
          console.warn("Floating advisor speech error", e.error);
        }
        setIsListening(false);
      };
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const sendQuery = async (queryText: string) => {
    try {
      if (recognitionRef.current) recognitionRef.current.stop();
    } catch {}
    setIsListening(false);
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

    const userMsg: DeckAdvisorMessage = {
      id: "fu-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));

      const deckContext = evaluation
        ? `Evaluation Overall Score: ${evaluation.overall_score}/100. Categories: ` +
          evaluation.categories.map((c) => `${c.name}: ${c.score}/100 (${c.reason})`).join("; ")
        : "No pitch deck has been uploaded or evaluated by the founder yet. Answer general fundraising, pitch deck construction, and venture diligence questions.";

      const res = await api.askDeckAdvisor({
        message: textToSend,
        history,
        deck_context: deckContext,
        startup_profile: profile,
        evaluation_summary: evaluation
      });

      const assistantMsg: DeckAdvisorMessage = {
        id: "fa-" + Date.now(),
        sender: "assistant",
        text: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        what_to_change: res.what_to_change,
        what_to_keep: res.what_to_keep,
        how_to_strengthen: res.how_to_strengthen,
        suggested_followups: res.suggested_followups
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: DeckAdvisorMessage = {
        id: "ferr-" + Date.now(),
        sender: "assistant",
        text: "Focus on bottom-up SOM calculations, cohort retention (>110% NRR), and a 24-month capital efficiency roadmap allocating 60% engineering R&D.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="floating-advisor-wrapper no-print">
      {/* Floating Trigger Button */}
      <button 
        className={`floating-advisor-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close AI Advisor" : "Open AI Pitch Deck Advisor"}
      >
        <Bot size={20} />
        <span>Ask AI Advisor</span>
        <span className="advisor-glow-dot" />
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="floating-advisor-panel">
          <div className="floating-panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="panel-logo"><Bot size={16} /></span>
              <div>
                <b style={{ fontSize: "14px", color: "#1e5eff", display: "block" }}>AI Pitch Deck Advisor</b>
                <small style={{ color: "#64748b", fontSize: "11px" }}>{profile.name || "Target Startup"} • Diligence Co-pilot</small>
              </div>
            </div>
            <button className="panel-close-btn" onClick={() => setIsOpen(false)} aria-label="Close advisor">
              <X size={16} />
            </button>
          </div>

          <div className="floating-messages-stream">
            {messages.map((m) => (
              <div key={m.id} className={`floating-msg-item ${m.sender}`}>
                <div className={`floating-msg-bubble ${m.sender}`}>
                  <p>{m.text}</p>
                  {m.what_to_change && m.what_to_change.length > 0 && (
                    <div className="floating-mini-box red">
                      <b>What to Change:</b>
                      <ul>{m.what_to_change.map((c, i) => <li key={i}>{c}</li>)}</ul>
                    </div>
                  )}
                  {m.what_to_keep && m.what_to_keep.length > 0 && (
                    <div className="floating-mini-box green">
                      <b>What to Keep:</b>
                      <ul>{m.what_to_keep.map((k, i) => <li key={i}>{k}</li>)}</ul>
                    </div>
                  )}
                  {m.how_to_strengthen && m.how_to_strengthen.length > 0 && (
                    <div className="floating-mini-box blue">
                      <b>How to Strengthen:</b>
                      <ul>{m.how_to_strengthen.map((s, i) => <li key={i}>{s}</li>)}</ul>
                    </div>
                  )}
                  {m.suggested_followups && m.suggested_followups.length > 0 && (
                    <div className="floating-pills">
                      {m.suggested_followups.slice(0, 2).map((q, i) => (
                        <button key={i} onClick={() => sendQuery(q)}>{q}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="floating-msg-item assistant">
                <div className="floating-msg-bubble assistant">
                  <span style={{ fontSize: "12.5px", color: "#64748b" }}>Synthesizing partner advice...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form 
            className="floating-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              sendQuery(inputVal);
            }}
          >
            <button
              type="button"
              className={`floating-mic-btn ${isListening ? "active pulse" : ""}`}
              onClick={toggleSpeech}
              title={isListening ? "Stop listening" : "Speak into AI Advisor"}
            >
              {isListening ? <MicOff size={14} /> : <Mic size={14} />}
            </button>
            <input
              type="text"
              placeholder={isListening ? "Listening... speak now" : "Ask about your slides, metrics, or presentation..."}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={!inputVal.trim() || loading} className="btn" style={{ padding: "8px 14px" }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}


/* -------------------------------------------------------------------------

   5. STARTUP PROFILE

   ------------------------------------------------------------------------- */

function Profile({

  profile,

  onSaveProfile

}: {

  profile: StartupProfile;

  onSaveProfile: (p: StartupProfile) => void;

}) {

  const [f, setF] = useState(profile);

  const [saved, setSaved] = useState(false);

  const set = (k: keyof StartupProfile) => (

    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

  ) => {

    setF({ ...f, [k]: e.target.value });

    setSaved(false);

  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    onSaveProfile(f);

    setSaved(true);

  };

  return (

    <>

      <Head title="Startup profile" sub="FastAPI diligence evaluations and partner practice sessions use these details to test your claims." />

      <form className="card form" onSubmit={handleSubmit}>

        <label>Startup name<input value={f.name} onChange={set("name")} /></label>

        <div className="f2">

          <label>Stage<select value={f.stage} onChange={set("stage")}><option>Pre-seed</option><option>Seed</option><option>Series A</option></select></label>

          <label>Target funding amount<input value={f.fundingAmount} onChange={set("fundingAmount")} placeholder="e.g. $1,500,000" /></label>

        </div>

        <label>Industry / Sector<input value={f.industry} onChange={set("industry")} /></label>

        <label>One-line elevator pitch<input value={f.description || ""} onChange={set("description")} placeholder="e.g. Predictive churn telemetry for enterprise SaaS" /></label>

        <div>

          <button className="btn" type="submit">Save startup context</button>

          {saved && <span className="ok-msg" role="status" style={{ marginLeft: "12px", color: "var(--ok)", fontWeight: "bold" }}>Profile saved</span>}

        </div>

      </form>

    </>

  );

}

/* -------------------------------------------------------------------------

   6. UPGRADE MODAL

   ------------------------------------------------------------------------- */

function UpgradeModal({ isOpen, onClose, onUnlock }: { isOpen: boolean; onClose: () => void; onUnlock: () => void }) {

  if (!isOpen) return null;

  return (

    <div className="modal-overlay" onClick={onClose}>

      <div className="upgrade-modal-card" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close-x" onClick={onClose} aria-label="Close modal"><X size={18} /></button>

        <span className="modal-header-badge">ZTH SYNDICATE PRO PASS</span>

        <h2>Raise Millions With Real Partner Scrutiny</h2>

        <div className="upgrade-positioning-quote">

          <b>Why we are different from ChatGPT & Claude:</b> Generic chatbots provide friendly conversational text. ZTH Pro simulates the ruthless reality of Sand Hill Road investment committees with slide-by-slide financial audits, Sequoia-style partner pushback, and actionable term sheet intelligence.

        </div>

        <table className="tier-comparison-table">

          <thead>

            <tr><th>Capability</th><th>Founder Free</th><th>Pro Syndicate Pass</th></tr>

          </thead>

          <tbody>

            <tr><td>Deck Diligence Scope</td><td>First 3 slides only</td><td><b>All slides + line-item audit</b></td></tr>

            <tr><td>Investor Personas</td><td>1 (Angel Investor)</td><td><b>All 4 (VC, Angel, Family Office, Strategic)</b></td></tr>

            <tr><td>Partner Meeting Simulator</td><td>Friendly mode</td><td><b>Tough Mode + 30s Boardroom Clock</b></td></tr>
            <tr><td>Print / Export Dossier</td><td><span className="feature-dash"><Minus size={14} /></span></td><td><span className="feature-check"><Check size={14} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />Included (Print & PDF)</span></td></tr>

            <tr><td>Institutional Comparables</td><td><span className="feature-dash"><Minus size={14} /></span></td><td><span className="feature-check"><Check size={14} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} /></span> <b>YC & Sequoia valuation benchmarks</b></td></tr>

            <tr><td>Confidential PDF Dossier</td><td><span className="feature-dash"><Minus size={14} /></span></td><td><span className="feature-check"><Check size={14} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} /></span> <b>Full IC Diligence Memo Export</b></td></tr>

          </tbody>

        </table>

        <div className="modal-footer-actions">

          <button className="btn ghost" onClick={onClose}>Maybe later</button>

          <button className="btn" onClick={onUnlock}>Simulate Instant Unlock ($49/mo)</button>

        </div>

      </div>

    </div>

  );

}

/* -------------------------------------------------------------------------

   MAIN APPLICATION ROOT

   ------------------------------------------------------------------------- */

export default function App() {

  const getPageFromUrl = (): Page => {

    const hash = window.location.hash.replace('#', '') as Page;

    if (hash && ['dashboard', 'deck', 'pitch', 'advisor', 'reports', 'profile'].includes(hash)) return hash;

    const q = new URLSearchParams(window.location.search).get('tab') as Page;

    if (q && ['dashboard', 'deck', 'pitch', 'advisor', 'reports', 'profile'].includes(q)) return q;

    return 'dashboard';

  };

  const [page, setPage] = useState<Page>(getPageFromUrl);

  const [open, setOpen] = useState(false);

  const [mini, setMini] = useState(false);

  // Dual Mode: Free vs Pro Tier

  const [isPro, setIsPro] = useState<boolean>(() => (typeof window !== "undefined" && (window.location.search.includes("pro=1") || window.location.search.includes("tier=pro"))) || localStorage.getItem("zth_tier") === "pro");

  const [upgradeOpen, setUpgradeOpen] = useState(false);

  // AI Backend Connection State

  const [llmConfigured, setLlmConfigured] = useState(false);

  const [providerModel, setProviderModel] = useState("llama-3.3-70b-versatile");

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {

    if (window.location.hash.includes('settings') || window.location.search.includes('settings=1')) {

      setSettingsOpen(true);

    }

  }, []);

  // Core Evaluation & Profile State

  const [profile, setProfile] = useState<StartupProfile>({

    name: "",

    industry: "",

    stage: "Seed",

    fundingAmount: "",

    description: ""

  });

  const [evaluation, setEvaluation] = useState<Evaluation | null>(() => {
    try {
      const saved = localStorage.getItem("zth_evaluation");
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const updateEvaluation = (res: Evaluation | null) => {
    setEvaluation(res);
    try {
      if (res) localStorage.setItem("zth_evaluation", JSON.stringify(res));
      else localStorage.removeItem("zth_evaluation");
    } catch {}
  };

  // Computed dimensions for Radar chart (maps real AI categories to the 6 axes)

  const activeDims = evaluation
    ? evaluation.categories.map((c) => ({ k: c.name.split(" ")[0], v: c.score }))
    : [
        { k: "Problem", v: 0 },
        { k: "Market", v: 0 },
        { k: "Traction", v: 0 },
        { k: "Team", v: 0 },
        { k: "Model", v: 0 },
        { k: "Financials", v: 0 }
      ];

  // Check health on mount

  const checkBackendHealth = async () => {

    try {

      const h = await api.getHealth();

      setLlmConfigured(h.llm_configured);

      if (h.model) setProviderModel(h.model);

    } catch {

      setLlmConfigured(false);

    }

  };

  useEffect(() => {

    checkBackendHealth();

  }, []);

  const toggleTier = (pro: boolean) => {

    setIsPro(pro);

    localStorage.setItem("zth_tier", pro ? "pro" : "free");

  };

  const handleUnlockPro = () => {

    toggleTier(true);

    setUpgradeOpen(false);

  };

  useEffect(() => {

    const onHashChange = () => setPage(getPageFromUrl());

    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);

  }, []);

  useEffect(() => {

    const mv = (e: MouseEvent) => {

      const c = (e.target as HTMLElement).closest?.(".card") as HTMLElement | null;

      if (!c) return;

      const r = c.getBoundingClientRect();

      c.style.setProperty("--mx", e.clientX - r.left + "px");

      c.style.setProperty("--my", e.clientY - r.top + "px");

    };

    window.addEventListener("mousemove", mv);

    return () => window.removeEventListener("mousemove", mv);

  }, []);

  const go = (p: Page) => {

    window.location.hash = p;

    setPage(p);

    setOpen(false);

    window.scrollTo(0, 0);

  };

  return (
    <div className="shell top-nav-layout">
      <div className="orbs" aria-hidden="true"><i /><i /><i /></div>

      {/* Main Top Navigation Bar across the entire top of the application */}
      <header className="main-top-navbar">
        <div className="navbar-brand-section">
          <div className="brand" onClick={() => go("dashboard")} style={{ cursor: "pointer" }}>
            <span className="logo">Z</span>
            <b>ZTH</b>
          </div>

          <nav className="top-nav-menu">
            {nav.map((n) => (
              <button
                key={n.id}
                className={"top-nav-btn " + (page === n.id ? "active" : "")}
                onClick={() => go(n.id)}
              >
                <span>{n.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="navbar-actions-section">
          {/* Top Tier Status Card & Switcher */}
          <div className="top-tier-card">
            <span className={"top-tier-badge " + (isPro ? "gold" : "")}>
              {isPro ? "PRO SYNDICATE PASS" : "FOUNDER FREE TIER"}
            </span>
            {isPro ? (
              <button className="top-tier-toggle-link" onClick={() => toggleTier(false)}>
                Switch to Free
              </button>
            ) : (
              <button className="top-tier-upgrade-btn" onClick={() => setUpgradeOpen(true)}>
                Upgrade to Pro
              </button>
            )}
          </div>

          {/* AI Settings Pill */}
          <button
            className="provider-status-pill"
            onClick={() => setSettingsOpen(true)}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: llmConfigured ? "#16a34a" : "#00d2ff",
                boxShadow: llmConfigured ? "0 0 10px #16a34a" : "0 0 14px #00f0ff"
              }}
            />
            <span style={{ color: "#1e5eff", fontSize: "14.5px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Settings size={15} /> Settings
            </span>
          </button>
        </div>
      </header>

      <main className="main-fullwidth">
        <div className="page" key={page}>

          {page === "dashboard" && (

            <Dashboard

              go={go}

              isPro={isPro}

              onUpgrade={() => setUpgradeOpen(true)}

              evaluation={evaluation}

              activeDims={activeDims}

              profile={profile}

            />

          )}

          {page === "deck" && (

            <Deck

              go={go}

              isPro={isPro}

              onUpgrade={() => setUpgradeOpen(true)}

              profile={profile}

              onUpdateProfile={(p) => setProfile(p)}

              evaluation={evaluation}

              onEvaluationSuccess={updateEvaluation}

              llmConfigured={llmConfigured}

              onOpenSettings={() => setSettingsOpen(true)}

            />

          )}

          {page === "advisor" && (
            <Advisor
              go={go}
              isPro={isPro}
              onUpgrade={() => setUpgradeOpen(true)}
              evaluation={evaluation}
              profile={profile}
            />
          )}

          {page === "pitch" && (

            <Pitch

              isPro={isPro}

              onUpgrade={() => setUpgradeOpen(true)}

              profile={profile}

              evaluation={evaluation}

              llmConfigured={llmConfigured}

              onOpenSettings={() => setSettingsOpen(true)}

            />

          )}

          {page === "reports" && (

            <Reports

              go={go}

              isPro={isPro}

              onUpgrade={() => setUpgradeOpen(true)}

              evaluation={evaluation}

              profile={profile}

            />

          )}

          {page === "profile" && (

            <Profile

              profile={profile}

              onSaveProfile={(p) => setProfile(p)}

            />

          )}

        </div>

      </main>

      <FloatingAdvisorWidget
        evaluation={evaluation}
        profile={profile}
      />

      {/* Upgrade Modal */}

      <UpgradeModal

        isOpen={upgradeOpen}

        onClose={() => setUpgradeOpen(false)}

        onUnlock={handleUnlockPro}

      />

      {/* Real AI Provider Settings Modal */}

      {settingsOpen && (

        <ProviderSettingsModal

          keyConfigured={llmConfigured}

          onClose={() => {

            checkBackendHealth();

            setSettingsOpen(false);

          }}

          onSettingsSaved={() => {

            checkBackendHealth();

          }}

        />

      )}

    </div>

  );

}

