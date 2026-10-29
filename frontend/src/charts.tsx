import { useEffect, useState } from "react";

export function Radar({ data }: { data: { k: string; v: number }[] }) {
  const [h, setH] = useState<number | null>(null);
  const c = 150, r = 105, n = data.length;
  const pt = (i: number, f: number): [number, number] => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + Math.cos(a) * r * f, c + Math.sin(a) * r * f];
  };
  const poly = data.map((d, i) => pt(i, d.v / 100).join(",")).join(" ");
  return (
    <div className="chart">
      <svg viewBox="0 0 300 300" role="img" aria-label="Readiness radar chart">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon key={f} className="grid" points={data.map((_, i) => pt(i, f).join(",")).join(" ")} />
        ))}
        {data.map((_, i) => <line key={i} className="grid" x1={c} y1={c} x2={pt(i, 1)[0]} y2={pt(i, 1)[1]} />)}
        <polygon className="radar-fill" points={poly} />
        {data.map((d, i) => {
          const [x, y] = pt(i, d.v / 100), [lx, ly] = pt(i, 1.2);
          return (
            <g key={d.k} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)}>
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="lbl">{d.k}</text>
              <circle cx={x} cy={y} r={h === i ? 7 : 4.5} className="dot" />
            </g>
          );
        })}
      </svg>
      <div className="readout">{h === null ? "Hover a point for its score" : `${data[h].k}: ${data[h].v}/100`}</div>
    </div>
  );
}

export function LineChart({ labels, values }: { labels: string[]; values: number[] }) {
  const [h, setH] = useState<number | null>(null);
  const W = 320, H = 150, p = 24;
  const xy = (i: number, v: number): [number, number] => [p + (i * (W - 2 * p)) / (values.length - 1), H - p - (v / 100) * (H - 2 * p)];
  const pts = values.map((v, i) => xy(i, v));
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Readiness over time">
        {[0, 50, 100].map((g) => <line key={g} className="grid" x1={p} x2={W - p} y1={xy(0, g)[1]} y2={xy(0, g)[1]} />)}
        <polyline className="line" pathLength={1} points={pts.map((q) => q.join(",")).join(" ")} />
        {pts.map(([x, y], i) => (
          <g key={i} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)}>
            <circle cx={x} cy={y} r={h === i ? 7 : 4.5} className="dot" />
            <text x={x} y={H - 6} textAnchor="middle" className="lbl">{labels[i]}</text>
          </g>
        ))}
      </svg>
      <div className="readout">{h === null ? "Hover a point" : `${labels[h]}: ${values[h]}/100`}</div>
    </div>
  );
}

export function Bars({ items }: { items: { label: string; value: number }[] }) {
  return (
    <div className="bars">
      {items.map((b) => (
        <div className="bar-row" key={b.label} title={`${b.label}: ${b.value}`}>
          <span>{b.label}</span>
          <div className="track"><div className={"fill " + (b.value < 55 ? "warn" : "")} style={{ width: b.value + "%" }} /></div>
          <b>{b.value}</b>
        </div>
      ))}
    </div>
  );
}

export function Donut({ parts }: { parts: { label: string; value: number; color: string }[] }) {
  const [h, setH] = useState<number | null>(null);
  const total = parts.reduce((a, b) => a + b.value, 0), R = 52, C = 2 * Math.PI * R;
  let off = 0;
  return (
    <div className="chart donut">
      <svg viewBox="0 0 140 140" role="img" aria-label="Score distribution">
        {parts.map((p, i) => {
          const len = (p.value / total) * C, el = (
            <circle key={p.label} cx="70" cy="70" r={R} fill="none" stroke={p.color} strokeWidth={h === i ? 18 : 14}
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} transform="rotate(-90 70 70)"
              onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)} />
          );
          off += len; return el;
        })}
        <text x="70" y="70" textAnchor="middle" dominantBaseline="middle" className="big">{h === null ? total : parts[h].value}</text>
      </svg>
      <ul className="legend">{parts.map((p) => <li key={p.label}><i style={{ background: p.color }} />{p.label} <b>{p.value}</b></li>)}</ul>
    </div>
  );
}

export function CountUp({ text }: { text: string }) {
  const m = text.match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const [v, setV] = useState(target);
  useEffect(() => {
    if (!m) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return <>{m ? v + m[2] : text}</>;
}

export function Ring({ value }: { value: number }) {
  const R = 62, C = 2 * Math.PI * R;
  return (
    <div className="ring" role="img" aria-label={`Readiness ${value} out of 100`}>
      <svg viewBox="0 0 160 160">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={R} className="ring-bg" />
        <circle 
          cx="80" 
          cy="80" 
          r={R} 
          className="ring-fg" 
          stroke="url(#rg)"
          strokeDasharray={C} 
          strokeDashoffset={C * (1 - value / 100)} 
          transform="rotate(-90 80 80)" 
        />
      </svg>
      <div className="ring-n"><span><CountUp text={String(value)} /></span><small>of 100</small></div>
    </div>
  );
}


/* =========================================================================
   ADVANCED VENTURE CAPITAL VISUALIZATIONS
   ========================================================================= */

export function BenchmarkComparisonChart({ data }: { data: { k: string; user: number; benchmark: number; delta: number; category: string }[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="benchmark-chart-container">
      <div className="benchmark-chart-legend">
        <div className="legend-item"><span className="legend-dot user-dot" /><b>Your Startup</b></div>
        <div className="legend-item"><span className="legend-dot benchmark-dot" /><span>Top-Decile VC Median</span></div>
      </div>
      <div className="benchmark-chart-rows">
        {data.map((item, idx) => {
          const isPos = item.delta >= 0;
          const isHovered = hoveredIdx === idx;
          return (
            <div 
              key={item.k} 
              className={`benchmark-row ${isHovered ? "active" : ""}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="benchmark-row-header">
                <span className="benchmark-category-tag">{item.category}</span>
                <span className="benchmark-label">{item.k}</span>
                <span className={`benchmark-delta-badge ${isPos ? "positive" : "negative"}`}>
                  {isPos ? `+${item.delta} pts` : `${item.delta} pts`}
                </span>
              </div>
              <div className="benchmark-bars-wrapper">
                <div className="benchmark-dual-track">
                  {/* User Bar */}
                  <div 
                    className="benchmark-bar user-bar" 
                    style={{ width: `${item.user}%` }}
                    title={`Your Score: ${item.user}/100`}
                  >
                    <span className="bar-val">{item.user}</span>
                  </div>
                  {/* Benchmark Marker Line */}
                  <div 
                    className="benchmark-marker" 
                    style={{ left: `${item.benchmark}%` }}
                    title={`Top-Decile VC Benchmark: ${item.benchmark}/100`}
                  >
                    <div className="marker-pin" />
                    <span className="marker-label">{item.benchmark}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {hoveredIdx !== null && (
        <div className="benchmark-hover-tip">
          <b>{data[hoveredIdx].k}:</b> Your score is <b>{data[hoveredIdx].user}</b> vs. Top-Decile VC threshold of <b>{data[hoveredIdx].benchmark}</b> ({data[hoveredIdx].delta >= 0 ? `+${data[hoveredIdx].delta} pts ahead` : `${Math.abs(data[hoveredIdx].delta)} pts below target`}).
        </div>
      )}
    </div>
  );
}

export function VCRiskMatrix({ items }: { items: { name: string; scrutiny: string; impact: string; score: number; x: number; y: number; status: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="vc-risk-matrix-container">
      <div className="matrix-top-notice">
        <span className="matrix-badge red">KILL ZONE: Fatal Scrutiny</span>
        <span className="matrix-badge green">CLEARED: Anchor Thesis</span>
      </div>
      <div className="matrix-svg-wrapper">
        <svg viewBox="0 0 400 240" className="matrix-svg" role="img" aria-label="VC Risk Matrix">
          <defs>
            <linearGradient id="matrixBgGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#f0fdf4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f0f9ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fef2f2" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="killZoneGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fee2e2" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fecaca" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Background grid quadrant */}
          <rect x="30" y="20" width="340" height="180" rx="8" fill="url(#matrixBgGrad)" stroke="#e2e8f0" strokeWidth="1" />
          
          {/* Top-Right Kill Zone highlight */}
          <rect x="200" y="20" width="170" height="90" rx="0" fill="url(#killZoneGrad)" stroke="#fca5a5" strokeWidth="1" strokeDasharray="3 3" />
          <text x="285" y="40" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="700" letterSpacing="0.06em">FATAL SCRUTINY ZONE</text>

          {/* Axis lines */}
          <line x1="200" y1="20" x2="200" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="30" y1="110" x2="370" y2="110" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

          {/* Axis Labels */}
          <text x="30" y="14" fill="#64748b" fontSize="10.5" fontWeight="600">▲ THESIS IMPACT (Fatal)</text>
          <text x="30" y="214" fill="#94a3b8" fontSize="9.5">Operational</text>
          <text x="200" y="224" textAnchor="middle" fill="#64748b" fontSize="10.5" fontWeight="600">PARTNER SCRUTINY LEVEL (Low → High) ▶</text>

          {/* Plot nodes */}
          {items.map((it, idx) => {
            const cx = 30 + (it.x / 100) * 340;
            const cy = 20 + ((100 - it.y) / 100) * 180;
            const isHovered = hovered === idx;
            const isFatal = it.score < 50;
            const color = isFatal ? "#dc2626" : it.score < 70 ? "#0284c7" : "#16a34a";

            return (
              <g 
                key={it.name}
                className="matrix-node"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r={isHovered ? 13 : 9} 
                  fill="#ffffff" 
                  stroke={color} 
                  strokeWidth={isHovered ? 3.5 : 2.5} 
                  style={{ transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r={4} 
                  fill={color} 
                />
                <text 
                  x={cx} 
                  y={cy - 12} 
                  textAnchor="middle" 
                  fill="#1e5eff" 
                  fontSize={isHovered ? "11" : "9.5"} 
                  fontWeight={isHovered ? "800" : "600"}
                >
                  {it.score}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="matrix-legend-footer">
        {hovered !== null ? (
          <div className="matrix-tooltip-active">
            <span className="tooltip-name"><b>{items[hovered].name}</b></span>
            <span className="tooltip-score" style={{ color: items[hovered].score < 50 ? "#dc2626" : "#16a34a" }}>Score: {items[hovered].score}/100</span>
            <span className="tooltip-verdict">Scrutiny: {items[hovered].scrutiny} • Impact: {items[hovered].impact} ({items[hovered].status})</span>
          </div>
        ) : (
          <div className="matrix-hint">
            Hover any node on the matrix to inspect partner scrutiny impact and risk classification.
          </div>
        )}
      </div>
    </div>
  );
}

export function ConvictionSpectrum({ archetypes }: { archetypes: { archetype: string; conviction: number; threshold: number; status: string; focus: string; color: string }[] }) {
  return (
    <div className="conviction-spectrum-container">
      <div className="spectrum-list">
        {archetypes.map((arch) => {
          const isPassing = arch.conviction >= arch.threshold;
          return (
            <div key={arch.archetype} className="spectrum-item">
              <div className="spectrum-header">
                <div className="spectrum-title-col">
                  <b>{arch.archetype}</b>
                  <span className="spectrum-focus">{arch.focus}</span>
                </div>
                <div className="spectrum-status-col">
                  <span 
                    className="spectrum-badge" 
                    style={{ 
                      color: isPassing ? "#15803d" : arch.conviction >= 55 ? "#0284c7" : "#b91c1c",
                      background: isPassing ? "rgba(22, 163, 74, 0.12)" : arch.conviction >= 55 ? "rgba(0, 210, 255, 0.12)" : "rgba(220, 38, 38, 0.12)",
                      border: `1px solid ${isPassing ? "#bbf7d0" : arch.conviction >= 55 ? "#7dd3fc" : "#fecaca"}`
                    }}
                  >
                    {arch.status}
                  </span>
                  <strong className="spectrum-score">{arch.conviction}%</strong>
                </div>
              </div>
              <div className="spectrum-bar-track">
                <div 
                  className="spectrum-bar-fill" 
                  style={{ 
                    width: `${arch.conviction}%`,
                    background: `linear-gradient(90deg, #1e3a8a 0%, ${arch.color} 100%)`
                  }} 
                />
                {/* Benchmark threshold target line */}
                <div 
                  className="spectrum-threshold-marker" 
                  style={{ left: `${arch.threshold}%` }}
                  title={`Term Sheet Hurdle: ${arch.threshold}%`}
                >
                  <span className="threshold-tooltip">Hurdle {arch.threshold}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ValuationSensitivityChart({ data }: { data: { dilution: string; preMoney: string; postMoney: string; raise: string; founderRetained: string; note: string }[] }) {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="valuation-chart-container">
      <div className="valuation-scenarios-row">
        {data.map((sc, idx) => {
          const isActive = activeStep === idx;
          return (
            <div 
              key={sc.dilution} 
              className={`valuation-scenario-card ${isActive ? "selected" : ""}`}
              onClick={() => setActiveStep(idx)}
              style={{ cursor: "pointer" }}
            >
              <div className="scenario-dilution-badge">{sc.dilution} Dilution</div>
              <div className="scenario-post-money">{sc.postMoney}</div>
              <div className="scenario-pre-money">Pre: {sc.preMoney}</div>
              <div className="scenario-retained">Retained: <b>{sc.founderRetained}</b></div>
              <div className="scenario-note">{sc.note}</div>
            </div>
          );
        })}
      </div>
      <div className="valuation-details-box">
        <div className="details-header">
          <b>Scenario Analysis: {data[activeStep].dilution} Dilution at {data[activeStep].postMoney} Post-Money</b>
          <span className="details-tag">{data[activeStep].note}</span>
        </div>
        <p className="details-desc">
          Raising <b>{data[activeStep].raise}</b> on a <b>{data[activeStep].preMoney}</b> pre-money valuation leaves founding team with <b>{data[activeStep].founderRetained}</b> equity post-round. Gives 18–24 months of runway at standard burn.
        </p>
      </div>
    </div>
  );
}

export function VelocityAreaChart({ labels, values }: { labels: string[]; values: number[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const W = 360, H = 160, pad = 28;
  const maxV = 100;
  const pts = values.map((v, i) => {
    const x = pad + (i * (W - 2 * pad)) / (values.length - 1);
    const y = H - pad - (v / maxV) * (H - 2 * pad);
    return [x, y];
  });

  const pathD = pts.reduce((acc, [x, y], i) => (i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`), "");
  const areaD = `${pathD} L ${pts[pts.length - 1][0]} ${H - pad} L ${pts[0][0]} ${H - pad} Z`;

  // Institutional target threshold at 75%
  const targetY = H - pad - (75 / maxV) * (H - 2 * pad);

  return (
    <div className="velocity-area-chart">
      <svg viewBox={`0 0 ${W} ${H}`} className="velocity-svg" role="img" aria-label="Readiness velocity chart">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Target Fundability Line (75) */}
        <line x1={pad} x2={W - pad} y1={targetY} y2={targetY} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={W - pad} y={targetY - 5} textAnchor="end" fill="#16a34a" fontSize="10" fontWeight="700">Institutional Threshold (75)</text>

        {/* Background gridlines */}
        {[25, 50, 75, 100].map((g) => {
          const gy = H - pad - (g / maxV) * (H - 2 * pad);
          return <line key={g} x1={pad} x2={W - pad} y1={gy} y2={gy} stroke="#f1f5f9" strokeWidth="1" />;
        })}

        {/* Area & Stroke */}
        <path d={areaD} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {pts.map(([x, y], i) => (
          <g 
            key={i} 
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{ cursor: "pointer" }}
          >
            <circle cx={x} cy={y} r={hoveredIdx === i ? 7 : 4.5} fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
            <text x={x} y={H - 8} textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">{labels[i]}</text>
          </g>
        ))}
      </svg>
      <div className="readout">
        {hoveredIdx === null ? "Readiness trajectory over 6 diligence cycles" : `${labels[hoveredIdx]}: ${values[hoveredIdx]}/100 (${values[hoveredIdx] >= 75 ? "Target Met" : `${75 - values[hoveredIdx]} pts to Seed Target`})`}
      </div>
    </div>
  );
}
