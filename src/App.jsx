import { useState } from "react";

const MISSION = "A key objective is to make the business fall in love with Salesforce. Not as a system they log into, but as the enabler that surfaces the right work, removes the admin, and lets every team focus on what actually matters.";

const EPICS = [
  { key:"SS-28", name:"Service Desk", half:"H1", quarter:"Q1-Q2", outcome:"RETAIN DEALERS", tagline:"Everything Zendesk promises, built natively in Salesforce", stories:20, okrs:["O1","O2"], teams:["CS"], highlights:["Refined 6-stage case model","SLAs with business hours","Pending and On-Hold automation","Child case model","CSAT surveys","Contact forms","Slack alerts","Email template library"] },
  { key:"SS-83", name:"Onboarding Revamp", half:"H1", quarter:"Q1-Q2", outcome:"RETAIN DEALERS", tagline:"Every dealer live within 10 business days, fully tracked", stories:6, okrs:["O1"], teams:["Onboarding"], highlights:["8 clear case stages","Auto-creation on Closed Won","Reactivating dealer path","SLA enforcement","Manager dashboard","Go-live checklist"] },
  { key:"SS-84", name:"Account Lifecycle & Pipeline", half:"H1", quarter:"Q1-Q2", outcome:"RETAIN DEALERS", tagline:"Qualifying to Onboarding to Live to Lapsed to Reactivating - and every AM touchpoint in between", stories:19, okrs:["O1","O2"], teams:["AM","KAM","TSNB"], highlights:["10-stage lifestage path","Daily auto-progression Flow","Lifestage Duration (Months) formula field","Winback Lead auto-creation","Lapse detection","Team collision prevention","Action Today account view","6 standard AM list views","Mandatory call logging","Next Contact Date discipline","Callback task model","AM manager dashboard"] },
  { key:"SS-85", name:"Opportunity Management", half:"H1", quarter:"Q1-Q2", outcome:"GROW REVENUE", tagline:"If a commercial event is happening, it should look like a deal", stories:16, okrs:["O1"], teams:["Sales","AM"], highlights:["Standard Sales stage model","Cancellation save pipeline","Suspension recovery pipeline","GSOU free-trial conversion","Overposting upgrade pipeline","Collaborative forecasting","KYC and Verif automation"] },
  { key:"SS-181", name:"Lead Management", half:"H1", quarter:"Q2", outcome:"GROW REVENUE", tagline:"No lead sits unworked. No rep wastes time on the wrong dealer.", stories:8, okrs:["O1"], teams:["TSNB"], highlights:["8 lead stages","MC engagement on record","Inbound 2-hour SLA","Lead assignment rules","Winback Lead routing","MC to Lead sync","Lead Action Today view"] },
  { key:"SS-182", name:"Sales Engagement", half:"H2", quarter:"Q3", outcome:"GROW REVENUE", tagline:"Cadences as a governed tool - not a free-for-all", stories:3, okrs:["O1"], teams:["Sales","AM"], highlights:["Cadence governance model","SF team creates cadences only","Team leads request via Jira","Quarterly cadence review","3 initial cadences built","Activity capture to SF"] },
  { key:"SS-108", name:"KAM & Salesforce Maps", half:"H2", quarter:"Q3", outcome:"GROW REVENUE", tagline:"More time in front of dealers. Less time planning the route.", stories:8, okrs:["O1"], teams:["KAM"], highlights:["Licence and territory design","Address data cleanse","Route optimisation","Visit auto-logging","Coverage gap dashboard","KAM mobile app","KAM homepage"] },
  { key:"SS-87", name:"Single Source of Truth & Integrations", half:"H1", quarter:"Q1-Q2", outcome:"TRUST THE DATA", tagline:"If it is not in Salesforce, it does not exist", stories:10, okrs:["O1","O2","O3"], teams:["All"], highlights:["TAFKAR bidirectional sync","MAT sync","Dealer Centre real-time sync","Marketing Cloud engagement sync","Duplicate management rules","Data cleansing programme","Spreadsheet retirement plan","MAT and TAFKAR feasibility study"] },
  { key:"SS-88", name:"Platform, Page Layouts & Homepages", half:"H2", quarter:"Q3-Q4", outcome:"BUILD THE PLATFORM", tagline:"Log in and immediately know what your day looks like", stories:9, okrs:["O1","O3"], teams:["All"], highlights:["5 bespoke Lightning homepages","CS, Onboarding, TSNB, TSAM, KAM","Console apps per team","Page layout optimisation","Vonage CTI integration","TimeWarped timeline embed"] },
  { key:"SS-89", name:"Einstein & Agentforce", half:"H2", quarter:"Q3-Q4", outcome:"BUILD THE PLATFORM", tagline:"AI on stable foundations - not on top of chaos", stories:7, okrs:["O1","O2"], teams:["CS","AM"], highlights:["Licence review first","Einstein Case Summaries","Prompt Templates","Next Best Action for churn","Knowledge Base","AI deflection on contact forms","Agentforce CS bot"] },
  { key:"SS-177", name:"Salesforce Voice", half:"H2", quarter:"Q4", outcome:"BUILD THE PLATFORM", tagline:"Every call captured, contextual, and connected", stories:1, okrs:["O1","O2"], teams:["CS","AM","Sales"], highlights:["Call transcription","Sentiment analysis","Whisper coaching","Screen pop on inbound","Supervisor monitoring","Amazon Connect integration","Replaces Vonage CTI"] },
];

const OUTCOMES = [
  { id:"GROW REVENUE", label:"Grow Revenue", icon:"📈", color:"#10b981", bg:"rgba(16,185,129,0.1)", border:"rgba(16,185,129,0.3)" },
  { id:"RETAIN DEALERS", label:"Retain Dealers", icon:"🤝", color:"#f59e0b", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.3)" },
  { id:"TRUST THE DATA", label:"Trust the Data", icon:"🎯", color:"#8b5cf6", bg:"rgba(139,92,246,0.1)", border:"rgba(139,92,246,0.3)" },
  { id:"BUILD THE PLATFORM", label:"Build the Platform", icon:"⚡", color:"#3b82f6", bg:"rgba(59,130,246,0.1)", border:"rgba(59,130,246,0.3)" },
];

const OKR_LABELS = { O1:"O1 - Grow", O2:"O2 - Trust", O3:"O3 - Culture" };
const OKR_COLORS = { O1:"#10b981", O2:"#f59e0b", O3:"#8b5cf6" };
const OKR_BG = { O1:"rgba(16,185,129,0.15)", O2:"rgba(245,158,11,0.15)", O3:"rgba(139,92,246,0.15)" };

const inputStyle = {
  width:"100%",
  padding:"9px 12px",
  fontSize:13,
  borderRadius:8,
  border:"1px solid rgba(255,255,255,0.12)",
  background:"rgba(255,255,255,0.06)",
  color:"#fff",
  fontFamily:"'DM Sans', -apple-system, sans-serif",
  outline:"none",
};

const s = {
  app: { minHeight:"100vh", background:"#01190E", color:"#fff", fontFamily:"'DM Sans', -apple-system, sans-serif" },
  header: { borderBottom:"1px solid rgba(131,242,151,0.12)", padding:"28px 40px 0", position:"sticky", top:0, zIndex:100, background:"#01190E" },
  headerTop: { display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:20 },
  brandRow: { display:"flex", alignItems:"center", gap:10, marginBottom:8 },
  dot: { width:8, height:8, borderRadius:"50%", background:"#FF5033" },
  eyebrow: { fontSize:11, fontWeight:700, letterSpacing:3, color:"#83F297", textTransform:"uppercase" },
  h1: { fontSize:"clamp(26px,4vw,44px)", fontWeight:800, letterSpacing:-1, lineHeight:1.05, margin:0 },
  subtitle: { fontSize:13, color:"rgba(255,255,255,0.4)", marginTop:6 },
  mission: { background:"rgba(255,80,51,0.07)", border:"1px solid rgba(255,80,51,0.18)", borderRadius:12, padding:"14px 20px", margin:"0 40px 0", fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.7, fontStyle:"italic" },
  missionAccent: { color:"#FF5033", fontStyle:"normal", fontWeight:700 },
  tabRow: { display:"flex", gap:0, marginTop:20 },
  tab: { padding:"10px 20px", fontSize:13, fontWeight:500, cursor:"pointer", border:"none", background:"transparent", color:"rgba(255,255,255,0.4)", borderBottom:"2px solid transparent", transition:"all 0.15s" },
  tabActive: { color:"#fff", borderBottom:"2px solid #FF5033" },
  body: { padding:"32px 40px" },
  filterRow: { display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" },
  filterBtn: { padding:"5px 14px", borderRadius:20, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"rgba(255,255,255,0.45)", fontSize:11, fontWeight:700, cursor:"pointer", transition:"all 0.15s" },
  filterBtnActive: { borderColor:"#FF5033", color:"#FF5033", background:"rgba(255,80,51,0.08)" },
  stats: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 },
  statCard: { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"14px 16px" },
  statNum: { fontSize:28, fontWeight:800, lineHeight:1 },
  statLabel: { fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:4 },
  landscape: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 },
  outcomeHeader: { display:"flex", alignItems:"center", gap:8, paddingBottom:12, borderBottom:"2px solid", marginBottom:12 },
  epicCard: { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"14px 16px", cursor:"pointer", marginBottom:10, transition:"all 0.15s" },
  epicCardExpanded: { background:"rgba(255,80,51,0.06)", borderColor:"#FF5033" },
  epicKey: { fontSize:10, fontFamily:"monospace", color:"rgba(255,255,255,0.3)" },
  epicHalf: { fontSize:9, fontWeight:700, background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.4)", borderRadius:4, padding:"1px 6px" },
  epicName: { fontSize:14, fontWeight:700, lineHeight:1.3, marginTop:4 },
  epicTagline: { fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:3, lineHeight:1.4 },
  epicStoriesBadge: { fontSize:10, fontWeight:700, borderRadius:6, padding:"2px 8px", whiteSpace:"nowrap", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.5)" },
  badges: { display:"flex", gap:5, marginTop:9, flexWrap:"wrap" },
  badge: { fontSize:9, fontWeight:700, borderRadius:3, padding:"2px 6px" },
  detail: { marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.08)" },
  detailLabel: { fontSize:10, fontWeight:700, letterSpacing:1, color:"rgba(255,255,255,0.35)", marginBottom:6 },
  detailItem: { fontSize:11, color:"rgba(255,255,255,0.55)", marginBottom:4, display:"flex", gap:6 },
  jiraBtn: { display:"inline-flex", alignItems:"center", gap:5, marginTop:10, fontSize:11, fontWeight:700, color:"#FF5033", textDecoration:"none", background:"rgba(255,80,51,0.08)", border:"1px solid rgba(255,80,51,0.25)", borderRadius:6, padding:"5px 12px" },
  table: { width:"100%", borderCollapse:"separate", borderSpacing:"0 4px" },
  th: { fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.3)", letterSpacing:1, padding:"6px 12px", textAlign:"left" },
  thOkr: { textAlign:"center" },
  td: { padding:"8px 12px", background:"rgba(255,255,255,0.03)" },
  tdFirst: { borderRadius:"8px 0 0 8px" },
  tdLast: { borderRadius:"0 8px 8px 0" },
  dot2: { width:30, height:30, borderRadius:7, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 },
  sprintBoard: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 },
  sprintCol: { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:16 },
  sprintColTitle: { fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)", letterSpacing:1, marginBottom:12, display:"flex", alignItems:"center", justifyContent:"space-between" },
  sprintCard: { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"10px 12px", marginBottom:8 },
  sprintCardName: { fontSize:12, fontWeight:600, color:"#fff" },
  sprintCardMeta: { fontSize:10, color:"rgba(255,255,255,0.35)", marginTop:3, fontFamily:"monospace" },
  formWrap: { maxWidth:520 },
  formGroup: { marginBottom:18 },
  formLabel: { fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.5)", marginBottom:6, display:"block" },
  submitBtn: { background:"#FF5033", color:"#fff", border:"none", borderRadius:8, padding:"10px 22px", fontSize:13, fontWeight:700, cursor:"pointer" },
  successBox: { background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:12, padding:"20px 24px" },
  successTitle: { fontSize:15, fontWeight:700, color:"#83F297" },
  successSub: { fontSize:12, color:"rgba(131,242,151,0.7)", marginTop:6, lineHeight:1.6 },
};

export default function App() {
  const [tab, setTab] = useState("roadmap");
  const [filter, setFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(null);
  const [ideaState, setIdeaState] = useState({ name:"", team:"", title:"", problem:"", beneficiary:"", priority:"" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalStories = EPICS.reduce((a,e) => a+e.stories, 0);
  const filteredEpics = filter === "ALL" ? EPICS : EPICS.filter(e => e.outcome === filter);
  const byOutcome = OUTCOMES.map(o => ({ ...o, epics:filteredEpics.filter(e => e.outcome===o.id) })).filter(o => o.epics.length > 0);

  function handleSubmit() {
    if (!ideaState.name || !ideaState.team || !ideaState.title || !ideaState.problem) {
      alert("Please fill in your name, team, idea title, and problem description.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  }

  return (
    <div style={s.app}>
      <div style={s.header}>
        <div style={s.headerTop}>
          <div>
            <div style={s.brandRow}>
              <div style={s.dot}/>
              <span style={s.eyebrow}>Cazoo - Salesforce Product</span>
            </div>
            <h1 style={s.h1}>2027 Roadmap</h1>
            <p style={s.subtitle}>{EPICS.length} Epics - {totalStories}+ Stories - 4 Strategic Outcomes</p>
          </div>
        </div>

        <div style={s.mission}>
          <span style={s.missionAccent}>Our mission</span> - {MISSION}
        </div>

        <div style={s.tabRow}>
          {[["roadmap","Roadmap"],["okr","OKR Map"],["sprint","What's Planned"],["idea","Submit an Idea"]].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ ...s.tab, ...(tab===id ? s.tabActive : {}) }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={s.body}>

        {tab === "roadmap" && (
          <>
            <div style={s.stats}>
              {[
                [EPICS.length,"Epics","#FF5033"],
                [totalStories+"+","Stories in backlog","#83F297"],
                ["4","Strategic outcomes","#f59e0b"],
                ["2027","Target delivery","#3b82f6"],
              ].map(([num,label,color]) => (
                <div key={label} style={s.statCard}>
                  <div style={{...s.statNum, color}}>{num}</div>
                  <div style={s.statLabel}>{label}</div>
                </div>
              ))}
            </div>

            <div style={s.filterRow}>
              {[["ALL","All Epics"], ...OUTCOMES.map(o=>[o.id, o.icon+" "+o.label])].map(([id,label]) => (
                <button key={id} onClick={()=>setFilter(id)} style={{ ...s.filterBtn, ...(filter===id ? s.filterBtnActive : {}) }}>
                  {label}
                </button>
              ))}
            </div>

            <div style={s.landscape}>
              {byOutcome.map(o => (
                <div key={o.id}>
                  <div style={{...s.outcomeHeader, borderBottomColor:o.color}}>
                    <span style={{fontSize:18}}>{o.icon}</span>
                    <span style={{fontSize:11,fontWeight:800,letterSpacing:1.5,color:o.color,textTransform:"uppercase"}}>{o.label}</span>
                    <span style={{marginLeft:"auto",fontSize:11,color:o.color,background:o.bg,border:`1px solid ${o.border}`,borderRadius:20,padding:"1px 9px",fontWeight:700}}>{o.epics.length}</span>
                  </div>
                  {o.epics.map(e => {
                    const isExp = expanded === e.key;
                    return (
                      <div key={e.key} onClick={()=>setExpanded(isExp?null:e.key)} style={{...s.epicCard,...(isExp?s.epicCardExpanded:{})}}>
                        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                              <span style={s.epicKey}>{e.key}</span>
                              <span style={s.epicHalf}>{e.quarter}</span>
                            </div>
                            <div style={s.epicName}>{e.name}</div>
                            <div style={s.epicTagline}>{e.tagline}</div>
                          </div>
                          <span style={{...s.epicStoriesBadge,color:o.color,borderColor:o.border,background:o.bg}}>{e.stories} stories</span>
                        </div>
                        <div style={s.badges}>
                          {e.okrs.map(ok => (
                            <span key={ok} style={{...s.badge,background:OKR_BG[ok],color:OKR_COLORS[ok]}}>{OKR_LABELS[ok]}</span>
                          ))}
                          {e.teams.map(t => (
                            <span key={t} style={{...s.badge,background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.08)"}}>{t}</span>
                          ))}
                        </div>
                        {isExp && (
                          <div style={s.detail}>
                            <div style={s.detailLabel}>KEY DELIVERABLES</div>
                            {e.highlights.map((h,i) => (
                              <div key={i} style={s.detailItem}>
                                <span style={{color:"#FF5033",flexShrink:0}}>-</span>
                                {h}
                              </div>
                            ))}
                            <a href={`https://motors-uk.atlassian.net/browse/${e.key}`} target="_blank" rel="noreferrer" onClick={ev=>ev.stopPropagation()} style={s.jiraBtn}>
                              Open in Jira
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "okr" && (
          <>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:24,lineHeight:1.7}}>
              How each Epic maps to the three OKRs. Epics that fuel all three are your highest-value investments.
            </div>
            <div style={{display:"flex",gap:20,marginBottom:24,flexWrap:"wrap"}}>
              {[["O1","#10b981","O1 - Grow our business by being a valued partner to dealers"],["O2","#f59e0b","O2 - Increase dealers trust in the Cazoo brand"],["O3","#8b5cf6","O3 - Build Cazoos fearless and dynamic culture"]].map(([o,c,l]) => (
                <div key={o} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:10,height:10,borderRadius:3,background:c,flexShrink:0}}/>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.45)"}}>{l}</span>
                </div>
              ))}
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Epic</th>
                  {["O1","O2","O3"].map(o => <th key={o} style={{...s.th,...s.thOkr,color:OKR_COLORS[o]}}>{OKR_LABELS[o]}</th>)}
                  <th style={s.th}>Outcome</th>
                </tr>
              </thead>
              <tbody>
                {EPICS.map(e => {
                  const out = OUTCOMES.find(o=>o.id===e.outcome);
                  return (
                    <tr key={e.key}>
                      <td style={{...s.td,...s.tdFirst}}>
                        <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{e.name}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"monospace"}}>{e.key} - {e.quarter}</div>
                      </td>
                      {["O1","O2","O3"].map(o => (
                        <td key={o} style={{...s.td,textAlign:"center"}}>
                          <div style={{...s.dot2,background:e.okrs.includes(o)?OKR_BG[o]:"rgba(255,255,255,0.03)",color:e.okrs.includes(o)?OKR_COLORS[o]:"rgba(255,255,255,0.15)",fontSize:e.okrs.includes(o)?14:10}}>
                            {e.okrs.includes(o)?"●":"-"}
                          </div>
                        </td>
                      ))}
                      <td style={{...s.td,...s.tdLast}}>
                        {out && <span style={{fontSize:10,fontWeight:700,color:out.color,background:out.bg,border:`1px solid ${out.border}`,borderRadius:20,padding:"3px 10px",whiteSpace:"nowrap"}}>{out.icon} {out.label}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:28}}>
              {["O1","O2","O3"].map(o => (
                <div key={o} style={{background:OKR_BG[o],border:`1px solid ${OKR_COLORS[o]}30`,borderRadius:10,padding:"16px 20px"}}>
                  <div style={{fontSize:32,fontWeight:800,color:OKR_COLORS[o],lineHeight:1}}>{EPICS.filter(e=>e.okrs.includes(o)).length}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:4}}>Epics fuelling {OKR_LABELS[o]}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "sprint" && (
          <>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:24,lineHeight:1.7}}>
              All stories are currently in backlog. As sprints begin in 2027 this board will show live progress. Below is the H1 / H2 delivery plan.
            </p>
            <div style={s.sprintBoard}>
              {[["H1 - Jan to Jun","H1"],["H2 - Jul to Dec","H2"],["Done","done"]].map(([title,half]) => {
                const epics = half==="done" ? [] : EPICS.filter(e=>e.half===half);
                return (
                  <div key={half} style={s.sprintCol}>
                    <div style={s.sprintColTitle}>
                      {title}
                      <span style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,fontSize:10,padding:"1px 8px",color:"rgba(255,255,255,0.4)"}}>{epics.length}</span>
                    </div>
                    {half==="done" ? (
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.25)",lineHeight:1.7}}>Nothing shipped yet. This fills as Epics complete. Watch this space.</div>
                    ) : epics.map(e => (
                      <div key={e.key} style={s.sprintCard}>
                        <div style={s.sprintCardName}>{e.name}</div>
                        <div style={s.sprintCardMeta}>{e.key} - {e.stories} stories - {e.quarter}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:32,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"20px 24px"}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:"rgba(255,255,255,0.3)",marginBottom:16,textTransform:"uppercase"}}>2027 Delivery Timeline</div>
              <div style={{display:"flex",gap:4,height:40,borderRadius:8,overflow:"hidden"}}>
                <div style={{flex:5,background:"rgba(255,80,51,0.15)",border:"1px solid rgba(255,80,51,0.25)",borderRadius:"8px 0 0 8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#FF5033"}}>H1 - {EPICS.filter(e=>e.half==="H1").length} Epics</div>
                <div style={{flex:5,background:"rgba(131,242,151,0.08)",border:"1px solid rgba(131,242,151,0.15)",borderRadius:"0 8px 8px 0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#83F297"}}>H2 - {EPICS.filter(e=>e.half==="H2").length} Epics</div>
              </div>
            </div>
          </>
        )}

        {tab === "idea" && (
          <>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.45)",marginBottom:24,lineHeight:1.7,maxWidth:520}}>
              Have an idea for Salesforce? Submit it here. The SF team reviews all submissions and good ideas get turned into Jira stories in the next planning cycle. This is how the roadmap stays connected to the people who use it every day.
            </p>
            {!submitted ? (
              <div style={s.formWrap}>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Your name</label>
                  <input style={inputStyle} type="text" placeholder="e.g. Sarah Johnson" value={ideaState.name} onChange={e=>setIdeaState(p=>({...p,name:e.target.value}))}/>
                </div>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Your team</label>
                  <select style={inputStyle} value={ideaState.team} onChange={e=>setIdeaState(p=>({...p,team:e.target.value}))}>
                    <option value="">Select your team</option>
                    {["CS","Onboarding","TSAM","TSNB","KAM","Finance","Product","Tech","Other"].map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>What is the idea?</label>
                  <input style={inputStyle} type="text" placeholder="One clear sentence" value={ideaState.title} onChange={e=>setIdeaState(p=>({...p,title:e.target.value}))}/>
                </div>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>What problem does it solve?</label>
                  <textarea style={{...inputStyle, resize:"vertical", minHeight:80}} placeholder="Describe the current pain. What are you doing today that this would fix?" value={ideaState.problem} onChange={e=>setIdeaState(p=>({...p,problem:e.target.value}))}/>
                </div>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Which team would benefit?</label>
                  <input style={inputStyle} type="text" placeholder="e.g. All AMs, CS agents, TSNB reps..." value={ideaState.beneficiary} onChange={e=>setIdeaState(p=>({...p,beneficiary:e.target.value}))}/>
                </div>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Priority (your view)</label>
                  <select style={inputStyle} value={ideaState.priority} onChange={e=>setIdeaState(p=>({...p,priority:e.target.value}))}>
                    <option value="">How urgent is this?</option>
                    <option value="blocking">Blocking - we cannot work without it</option>
                    <option value="high">High - daily frustration</option>
                    <option value="nice">Nice to have - would help but not critical</option>
                  </select>
                </div>
                <button style={{...s.submitBtn, opacity:submitting?0.6:1}} disabled={submitting} onClick={handleSubmit}>
                  {submitting ? "Submitting..." : "Submit idea"}
                </button>
              </div>
            ) : (
              <div style={s.successBox}>
                <div style={s.successTitle}>Idea submitted</div>
                <div style={s.successSub}>
                  Thanks {ideaState.name}. Your idea has been logged for the SF team to review.
                  Good ideas get into the next planning cycle. We will be in touch.
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
