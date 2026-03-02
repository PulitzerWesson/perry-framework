
import { useState } from "react";

const phases = [
  {
    id: "constraint",
    number: "01",
    label: "FIND THE CONSTRAINT",
    tagline: "Trace it before you fix it.",
    color: "#E8A838",
    description: "The impulse is to fix. The discipline is to understand first. Most systems have one place where friction accumulates, data gets re-entered, or the work piles up. That place is worth finding before anything else moves.",
    mental_model: [
      { label: "Where is the work piling up?", note: "Volume is the tell — find where one more unit breaks the process" },
      { label: "What's being done more than once?", note: "Repeated work signals something the system should know but doesn't" },
      { label: "What would disappear if this worked?", note: "The clearest test of whether you've found the right constraint" },
    ],
    examples: [
      {
        co: "Snap! Mobile",
        problem: "Schools running 15–30 fundraisers a season were re-entering the same financial and identity data from scratch every time. Churn was spiking at activation. The product wasn't bad — the entry cost was.",
        signal: "Friction at activation, not product dissatisfaction. The constraint was in the data layer.",
        iteration: "First question: is this a data problem or a behavior problem? Ran a lightweight messaging pilot to test if chat reduced abandonment. Near-zero signal. Confirmed: the constraint was identity, not engagement."
      },
      {
        co: "Blue Nile",
        problem: "One experience for everyone meant a mediocre experience for everyone. High paid search spend, disappointing returns.",
        signal: "The budget wasn't the problem. Intent mismatch was."
      },
      {
        co: "A Place for Mom",
        problem: "The finance team was processing 200 invoices a day by hand. Revenue was growing. The manual work was growing with it.",
        signal: "No automated path between where a sale was recorded and where it was invoiced."
      },
    ],
  },
  {
    id: "lever",
    number: "02",
    label: "IDENTIFY THE LEVER",
    tagline: "Find the fix that propagates — not the one that terminates.",
    color: "#5DADE2",
    description: "Features solve problems in place. The right lever sits upstream — one change that unblocks everything downstream. The question is always: does this fix propagate, or does it end here?",
    mental_model: [
      { label: "What one fix unblocks everything below it?", note: "Leverage lives upstream — not at the point of pain" },
      { label: "What does the data already know?", note: "Signal is usually already flowing — it just isn't being used" },
      { label: "Missing abstraction or missing feature?", note: "Features are visible. Abstractions are what make features unnecessary." },
    ],
    examples: [
      {
        co: "Snap! Mobile",
        problem: "If identity and financial data could flow down the org hierarchy automatically once entered, no one would ever enter it twice. The graph model already knew the relationships — it just wasn't carrying the compliance data.",
        signal: "Neo4j inheritance model. Data modeling problem, not an ops problem.",
        iteration: "Messaging pilot ruled out engagement as the lever. Once identity was confirmed as the constraint, the architectural path was clear."
      },
      {
        co: "Blue Nile",
        problem: "Spec-first buyers needed raw data and zero friction. Relationship buyers needed trust signals and a guided experience. Routing on search intent — not demographic — was the lever.",
        signal: "One intent engine was averaging two very different needs into one mediocre outcome."
      },
      {
        co: "A Place for Mom",
        problem: "A single verification step between the CRM trigger and invoice creation would catch all bad data before it reached finance.",
        signal: "One upstream fix. No downstream errors. Revenue accuracy improved 7% per invoice."
      },
    ],
  },
  {
    id: "sequence",
    number: "03",
    label: "SEQUENCE THE BUILD",
    tagline: "Architecture before logic. Logic before surface.",
    color: "#58D68D",
    description: "Build in layers. Prove the base before extending it. The sequence is a decision — get it wrong and each layer compounds the error. Get it right and each layer makes the next one obvious.",
    mental_model: [
      { label: "What's the smallest thing that proves the concept?", note: "Start there. Don't design the full system first." },
      { label: "Does this layer work before building the next?", note: "Each layer earns the right to what follows" },
      { label: "What does the data need to know to make this automatic?", note: "If the model carries the logic, you don't have to" },
    ],
    examples: [
      {
        co: "Snap! Mobile",
        problem: "Layer 1: VGS tokenization at the fundraiser level — one person, one fundraiser, reuse your own info. Layer 2: Financial Rep fills out once, flows to all fundraisers below. Layer 3: Bank account inheritance. Layer 4: Lock payout method, add verification controls.",
        signal: "Orgs migrating to the hierarchical model grew 109% YoY. Churn dropped 20%.",
        iteration: "Proved tokenization at the individual level before moving it up the hierarchy. Each layer confirmed stable before extending. The full system wasn't designed upfront."
      },
      {
        co: "Blue Nile",
        problem: "Cross-session attribution model first — understand how users actually moved through the funnel. Intent routing second. UI changes last.",
        signal: "75% ROAS lift on mobile search. Device was an intent proxy — that only surfaced after the attribution layer existed."
      },
      {
        co: "A Place for Mom",
        problem: "Paid search was being asked to spend more to compensate for a broken site. Instead: stood up Unbounce as a stable, testable layer, recreated the existing flow first to confirm no regression, then iterated. Shifted optimization from lead volume to full-funnel — lead to tour to move-in.",
        signal: "$5.3M annual revenue growth. Adding qualifying friction improved downstream conversion more than removing all friction improved lead volume."
      },
    ],
  },
  {
    id: "loop",
    number: "04",
    label: "CLOSE THE LOOP",
    tagline: "Score the bet. Feed the delta back into 01.",
    color: "#C39BD3",
    isFeedback: true,
    description: "Every decision is a bet. Writing down what you expected before building — and comparing it to what actually happened — is the fastest way to get better at finding constraints. The gap is the lesson.",
    mental_model: [
      { label: "What did I predict?", note: "The hypothesis written before build — not reconstructed after" },
      { label: "What was the delta?", note: "Outcome vs. expectation, in real terms" },
      { label: "What does the gap teach?", note: "Where the model was wrong is where to look next" },
    ],
    examples: [
      {
        co: "Snap! Mobile — messaging",
        problem: "Predicted: in-app chat would reduce fundraiser abandonment. Stood up a lightweight version via getStream.io, offered early access as the incentive. Actual: near-zero correlation between messaging adoption and fundraiser completion.",
        signal: "Wrong level entirely. Messaging belonged at the school — not the fundraiser. Built there instead. Schools moved off Band and TeamSnap."
      },
      {
        co: "Snap! Mobile — identity",
        problem: "Predicted: eliminating re-entry would reduce churn. Actual: 20% churn reduction and 109% growth in orgs adopting the hierarchical model.",
        signal: "Identity friction was the primary blocker. The activation impact exceeded what was predicted — which meant the original constraint model was right, just undersized."
      },
      {
        co: "chzcloth (2026)",
        problem: "Built a product bet scoring tool to make this loop explicit — define the hypothesis before building, record what actually happened after shipping.",
        signal: "Variance tracking as a practice, not a retrospective."
      },
    ],
  },
];

export default function App() {
  const [active, setActive] = useState("constraint");
  const [expandedExample, setExpandedExample] = useState(null);
  const activePhase = phases.find(p => p.id === active);

  return (
    <div style={{
      fontFamily: "'Courier New', monospace",
      background: "#0D0D0D",
      minHeight: "100vh",
      color: "#D4D4D4",
      padding: "40px 24px",
      boxSizing: "border-box",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        .phase-btn { cursor: pointer; border: none; background: none; text-align: left; width: 100%; padding: 0; }
        .phase-btn:hover .phase-inner { opacity: 1 !important; }
        .ex-card { cursor: default; }
        .ex-card.expandable { cursor: pointer; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeSlide 0.28s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto 48px" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: 6, color: "#7E7E7E", marginBottom: 8 }}>
          HOW I WORK
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1, margin: "0 0 16px", color: "#F0F0F0", letterSpacing: 2 }}>
          THE PATTERN.
        </h1>
        <p style={{ fontSize: 12, color: "#7E7E7E", maxWidth: 560, lineHeight: 1.8, margin: 0, fontFamily: "'Space Mono', monospace" }}>
          Observed across fifteen years of learning alongside engineers, finance teams, sales, and customers. 
        </p>
      </div>

      {/* Phase Selector */}
      <div style={{ maxWidth: 900, margin: "0 auto 32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {phases.map(phase => (
          <button key={phase.id} className="phase-btn" onClick={() => { setActive(phase.id); setExpandedExample(null); }}>
            <div
              className="phase-inner"
              style={{
                padding: "18px 16px",
                border: `1px solid ${active === phase.id ? phase.color : "#222"}`,
                borderRadius: 4,
                background: active === phase.id ? `${phase.color}10` : "#141414",
                opacity: active === phase.id ? 1 : 0.5,
                transition: "all 0.22s",
                position: "relative",
              }}
            >
              {phase.isFeedback && (
                <div style={{
                  position: "absolute", top: 10, right: 12,
                  display: "flex", alignItems: "center", gap: 4,
                  background: "#141414",
                  border: `1px solid ${active === phase.id ? "#C39BD360" : "#2A2A2A"}`,
                  borderRadius: 20, padding: "2px 7px",
                  transition: "all 0.22s",
                }}>
                  <span style={{ fontSize: 10, color: "#C39BD3" }}>↺</span>
                  <span style={{ fontSize: 8, letterSpacing: 2, color: "#7E7E7E", fontFamily: "'Space Mono', monospace" }}>01</span>
                </div>
              )}
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: active === phase.id ? phase.color : "#3A3A3A", lineHeight: 1, marginBottom: 6 }}>
                {phase.number}
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: 2, color: active === phase.id ? "#F0F0F0" : "#7E7E7E", lineHeight: 1.35 }}>
                {phase.label}
              </div>
              {active === phase.id && (
                <div style={{ marginTop: 10, height: 2, background: phase.color, borderRadius: 1 }} />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Active Detail */}
      {activePhase && (
        <div key={active} className="fade-in" style={{ maxWidth: 900, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 36, height: 1, background: activePhase.color }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: activePhase.color, letterSpacing: 3, textTransform: "uppercase" }}>
              {activePhase.tagline}
            </span>
            <div style={{ flex: 1, height: 1, background: "#1A1A1A" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, marginBottom: 28 }}>
            {/* Mental Model */}
            <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: 4, padding: "22px 20px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: 3, color: "#7E7E7E", marginBottom: 18 }}>
                THE QUESTION
              </div>
              <p style={{ fontSize: 12, color: "#7E7E7E", lineHeight: 1.75, marginBottom: 22, fontFamily: "'Space Mono', monospace" }}>
                {activePhase.description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {activePhase.mental_model.map((item, i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${activePhase.color}35`, paddingLeft: 14 }}>
                    <div style={{ fontSize: 12, color: "#DEDEDE", fontFamily: "'Space Mono', monospace", marginBottom: 3 }}>
                      ▸ {item.label}
                    </div>
                    <div style={{ fontSize: 11, color: "#7E7E7E", fontFamily: "'Space Mono', monospace", lineHeight: 1.55 }}>
                      {item.note}
                    </div>
                  </div>
                ))}
              </div>

              {activePhase.isFeedback && (
                <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid #1E1E1E" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, color: "#C39BD3" }}>↺</span>
                    <span style={{ fontSize: 10, color: "#7E7E7E", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>
                      the delta goes back into 01
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Examples */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: 3, color: "#7E7E7E", marginBottom: 4, display: "flex", alignItems: "center", gap: 12 }}>
                <span>FROM MY WORK</span>
                {activePhase.examples.some(e => e.iteration) && (
                  <span style={{ fontSize: 9, color: "#7E7E7E", letterSpacing: 1, fontFamily: "'Space Mono', monospace", textTransform: "none", fontWeight: "normal" }}>
                    — tap ▾ to see how it iterated
                  </span>
                )}
              </div>
              {activePhase.examples.map((ex, i) => (
                <div
                  key={i}
                  className={`ex-card ${ex.iteration ? "expandable" : ""}`}
                  onClick={() => ex.iteration && setExpandedExample(expandedExample === i ? null : i)}
                  style={{
                    background: "#141414",
                    border: `1px solid ${expandedExample === i ? activePhase.color + "40" : "#1E1E1E"}`,
                    borderRadius: 4,
                    padding: "16px 18px",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{
                      display: "inline-block", fontSize: 9, letterSpacing: 2,
                      padding: "2px 8px", borderRadius: 2,
                      background: `${activePhase.color}18`, color: activePhase.color,
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {ex.co.toUpperCase()}
                    </span>
                    {ex.iteration && (
                      <span style={{ fontSize: 9, color: "#7E7E7E", fontFamily: "'Space Mono', monospace" }}>
                        {expandedExample === i ? "▴ less" : "▾ how it iterated"}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: "#C0C0C0", fontFamily: "'Space Mono', monospace", lineHeight: 1.65, marginBottom: 10 }}>
                    {ex.problem}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: activePhase.color, fontSize: 10, marginTop: 2, flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: 11, color: "#7E7E7E", fontFamily: "'Space Mono', monospace", lineHeight: 1.55 }}>
                      {ex.signal}
                    </span>
                  </div>
                  {ex.iteration && expandedExample === i && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${activePhase.color}20` }}>
                      <div style={{ fontSize: 9, letterSpacing: 2, color: activePhase.color, fontFamily: "'Space Mono', monospace", marginBottom: 6, opacity: 0.8 }}>
                        HOW IT ITERATED
                      </div>
                      <div style={{ fontSize: 11, color: "#7E7E7E", fontFamily: "'Space Mono', monospace", lineHeight: 1.65 }}>
                        {ex.iteration}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "20px 0", borderTop: "1px solid #181818", flexWrap: "wrap" }}>
            {phases.map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => { setActive(p.id); setExpandedExample(null); }} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: 2,
                  color: active === p.id ? p.color : "#7E7E7E",
                  transition: "color 0.2s", padding: "4px 6px",
                }}>
                  {p.number} {p.label.split(" ").slice(0, 2).join(" ")}
                </button>
                {i < phases.length - 1 && (
                  <span style={{ color: "#222", fontSize: 14 }}>—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
