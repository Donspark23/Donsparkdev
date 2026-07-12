import { useEffect, useRef } from "react";
import { S, Footer, GITHUB_USERNAME } from "../shared";

const SKILLS = [
  { icon:"⚛️", title:"Frontend Development", bg:"rgba(0,200,255,.1)",  tags:["React.js","HTML5","CSS3","JavaScript ES6+","Responsive Design","Tailwind CSS"] },
  { icon:"🟢", title:"Backend Development",  bg:"rgba(123,47,255,.1)", tags:["Node.js","Express.js","REST APIs","Middleware","Server Architecture"] },
  { icon:"🍃", title:"Database & Storage",   bg:"rgba(0,200,80,.1)",   tags:["MongoDB","Mongoose ODM","Schema Design","File Uploads","Cloudinary"] },
  { icon:"🛠️", title:"Tools & Platforms",    bg:"rgba(255,165,0,.1)",  tags:["Git & GitHub","Postman","Termux","Render","VS Code","npm"] },
  { icon:"🔐", title:"Security & Concepts",  bg:"rgba(255,45,120,.1)", tags:["JWT Auth","bcrypt","API Security","CORS","Rate Limiting","Multer"] },
];

const SKILL_BARS = [
  { name:"JavaScript", pct:90 },
  { name:"React.js",   pct:85 },
  { name:"Node.js",    pct:88 },
  { name:"MongoDB",    pct:82 },
  { name:"REST APIs",  pct:92 },
];

export default function About() {
  const barsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("anim"); obs.unobserve(e.target); }
      }),
      { threshold: 0.3 }
    );
    barsRef.current.forEach(b => b && obs.observe(b));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ABOUT SECTION */}
      <section style={{ padding:"80px 5%", background:"#080d1a" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:60, alignItems:"center", maxWidth:1100, margin:"0 auto" }}>

          {/* Avatar */}
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:280, height:280 }}>
              <div style={{ width:"100%", height:"100%", borderRadius:24, border:"2px solid rgba(0,200,255,.2)", overflow:"hidden" }}>
                <img
                  src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
                  alt="Uchenna Chidera Onyesom"
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                  onError={e => e.target.style.display="none"}
                />
              </div>
              <div style={{ position:"absolute", inset:-20, borderRadius:"50%", border:"1px solid rgba(0,200,255,.15)", animation:"ringCW 20s linear infinite", pointerEvents:"none" }}>
                <div style={{ position:"absolute", width:10, height:10, borderRadius:"50%", background:"#00c8ff", boxShadow:"0 0 12px #00c8ff", top:0, left:"50%", transform:"translate(-50%,-50%)" }}/>
              </div>
              <div style={{ position:"absolute", inset:-40, borderRadius:"50%", border:"1px solid rgba(123,47,255,.1)", animation:"ringCCW 30s linear infinite", pointerEvents:"none" }}>
                <div style={{ position:"absolute", width:10, height:10, borderRadius:"50%", background:"#7b2fff", boxShadow:"0 0 12px #7b2fff", bottom:0, right:0, transform:"translate(50%,50%)" }}/>
              </div>
              <div style={{ position:"absolute", bottom:-16, right:-16, background:"#080d1a", border:"1px solid rgba(0,200,255,.12)", borderRadius:10, padding:"10px 16px", fontSize:".78rem", display:"flex", alignItems:"center", gap:8, backdropFilter:"blur(12px)", whiteSpace:"nowrap", zIndex:2 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#00ff88", boxShadow:"0 0 10px #00ff88", display:"block" }}/>
                Open to Work — Abuja, NG 🇳🇬
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <div style={{ display:"inline-block", fontFamily:"'DM Mono',monospace", fontSize:".72rem", color:"#00c8ff", letterSpacing:3, textTransform:"uppercase", marginBottom:12, padding:"5px 14px", border:"1px solid rgba(0,200,255,.2)", borderRadius:100 }}>About Me</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"2rem", fontWeight:800, letterSpacing:"-.5px", marginBottom:4, color:"#e8eaf6" }}>Uchenna Chidera<br/>Onyesom</h2>
            <p style={{ fontFamily:"'DM Mono',monospace", color:"#00c8ff", fontSize:".85rem", marginBottom:20, letterSpacing:1 }}>$ full-stack-developer --location="Abuja, Nigeria"</p>
            <p style={{ color:"#6b7a99", fontSize:".85rem", marginBottom:24 }}>📍 Abuja, Nigeria &nbsp;·&nbsp; 🕐 WAT (UTC+1)</p>
            <p style={{ color:"#a0aec0", lineHeight:1.9, marginBottom:28, fontSize:".97rem" }}>
              I'm a disciplined, self-driven full stack developer who builds complete, production-ready systems — from crafting modern React interfaces to engineering secure Node.js backends and REST APIs.<br/><br/>
              Beyond writing code, I share knowledge through YouTube tutorials and one-on-one mentoring, helping the next generation of Nigerian developers break into tech.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:32 }}>
              {[["20+","Projects Built"],["2+","Years Coding"],["100%","Dedication"]].map(([n,l]) => (
                <div key={l} style={{ background:"rgba(255,255,255,.035)", border:"1px solid rgba(0,200,255,.12)", borderRadius:12, padding:16, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.6rem", fontWeight:800, background:"linear-gradient(135deg,#00c8ff,#7b2fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{n}</div>
                  <div style={{ fontSize:".72rem", color:"#6b7a99", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a href="/contact" className="btn-primary">Let's Build Something →</a>
              <a href="https://drive.google.com/uc?export=download&id=16dgO03jC0fxfFEkIGS1xx-b-uAOzVLPL" target="_blank" rel="noreferrer" className="btn-cv">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section style={{ padding:"80px 5%" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ display:"inline-block", fontFamily:"'DM Mono',monospace", fontSize:".72rem", color:"#00c8ff", letterSpacing:3, textTransform:"uppercase", marginBottom:16, padding:"5px 14px", border:"1px solid rgba(0,200,255,.2)", borderRadius:100 }}>Expertise</div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, letterSpacing:"-1px", lineHeight:1.1, marginBottom:16, color:"#e8eaf6" }}>
            My <span style={{ background:"linear-gradient(135deg,#00c8ff,#7b2fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Tech Stack</span>
          </h2>
          <p style={{ color:"#a0aec0", maxWidth:520, margin:"0 auto", fontSize:"1rem" }}>A curated arsenal of tools and technologies I wield to build complete, high-performance systems.</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24, maxWidth:1100, margin:"0 auto" }}>
          {SKILLS.map((s,i) => (
            <div key={i} className="glass-card" style={{ padding:30 }}>
              <div style={{ width:50, height:50, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", marginBottom:20 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, marginBottom:16, color:"#e8eaf6" }}>{s.title}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {s.tags.map(t => (
                  <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:".7rem", padding:"4px 12px", borderRadius:5, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", color:"#6b7a99" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth:1100, margin:"48px auto 0" }}>
          {SKILL_BARS.map((b,i) => (
            <div key={b.name} style={{ display:"flex", alignItems:"center", gap:16, marginBottom:18 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".78rem", color:"#a0aec0", width:120, flexShrink:0 }}>{b.name}</span>
              <div style={{ flex:1, height:4, background:"rgba(255,255,255,.05)", borderRadius:2, overflow:"hidden" }}>
                <div ref={el => barsRef.current[i] = el} className="skill-bar-fill" style={{ height:"100%", borderRadius:2, background:"linear-gradient(90deg,#00c8ff,#7b2fff)", width:`${b.pct}%` }}/>
              </div>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".72rem", color:"#00c8ff", width:36, textAlign:"right" }}>{b.pct}%</span>
            </div>
          ))}
        </div>
      </section>

      <Footer/>
    </>
  );
}
