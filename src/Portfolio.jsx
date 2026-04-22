import { useState, useEffect, useRef } from "react";

const GITHUB_USERNAME = "Donspark23";
const GITHUB_API       = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

/* ══════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:#050811; color:#e8eaf6; font-family:'Outfit',sans-serif; overflow-x:hidden; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:#050811; }
  ::-webkit-scrollbar-thumb { background:#7b2fff; border-radius:2px; }
  ::selection { background:rgba(0,200,255,.2); color:#00c8ff; }
  body::before { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); opacity:.022; pointer-events:none; z-index:9999; }

  @keyframes orbFloat   { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
  @keyframes codeFloat  { 0%{transform:translateY(100vh) rotate(-5deg);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-100px) rotate(5deg);opacity:0} }
  @keyframes heroIn     { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes badgeIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse      { 0%,100%{opacity:1;box-shadow:0 0 12px #00c8ff} 50%{opacity:.4;box-shadow:0 0 4px #00c8ff} }
  @keyframes pulseDot   { 0%,100%{opacity:1;box-shadow:0 0 10px #00ff88} 50%{opacity:.5;box-shadow:0 0 4px #00ff88} }
  @keyframes ringCW     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ringCCW    { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes scrollPuls { 0%,100%{transform:scaleY(1);opacity:.5} 50%{transform:scaleY(.6);opacity:1} }
  @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
  @keyframes logoGlow   { 0%,100%{filter:drop-shadow(0 0 5px rgba(0,200,255,.5))} 50%{filter:drop-shadow(0 0 14px rgba(0,200,255,.9))} }
  @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes cursorBlink{ 0%,100%{opacity:.8} 50%{opacity:0} }

  .hero-content { animation:heroIn .9s cubic-bezier(.16,1,.3,1) both; }
  .badge-anim-1{animation:badgeIn .5s cubic-bezier(.16,1,.3,1) .3s both}
  .badge-anim-2{animation:badgeIn .5s cubic-bezier(.16,1,.3,1) .4s both}
  .badge-anim-3{animation:badgeIn .5s cubic-bezier(.16,1,.3,1) .5s both}
  .badge-anim-4{animation:badgeIn .5s cubic-bezier(.16,1,.3,1) .6s both}
  .badge-anim-5{animation:badgeIn .5s cubic-bezier(.16,1,.3,1) .7s both}
  .badge-anim-6{animation:badgeIn .5s cubic-bezier(.16,1,.3,1) .8s both}
  .scroll-anim  { animation:fadeIn 1s 1.5s both; }
  .logo-svg     { animation:logoGlow 3s ease-in-out infinite; }

  .reveal { opacity:0; transform:translateY(30px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-d1{transition-delay:.1s} .reveal-d2{transition-delay:.2s} .reveal-d3{transition-delay:.3s} .reveal-d4{transition-delay:.4s}

  .skill-bar-fill { transform:scaleX(0); transform-origin:left; transition:transform 1.2s cubic-bezier(.16,1,.3,1); }
  .skill-bar-fill.anim { transform:scaleX(1); }

  .nav-link-item { color:#a0aec0; text-decoration:none; font-size:.85rem; font-weight:500; letter-spacing:.5px; text-transform:uppercase; transition:color .3s; position:relative; }
  .nav-link-item::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:1px; background:#00c8ff; transform:scaleX(0); transition:transform .3s; transform-origin:left; }
  .nav-link-item:hover { color:#00c8ff; }
  .nav-link-item:hover::after { transform:scaleX(1); }
  .nav-cta-link { padding:8px 22px; border:1px solid #00c8ff; border-radius:6px; color:#00c8ff!important; font-size:.82rem!important; letter-spacing:.8px; transition:background .3s,box-shadow .3s!important; }
  .nav-cta-link:hover { background:rgba(0,200,255,.08); box-shadow:0 0 20px rgba(0,200,255,.2); }

  .glass-card { background:rgba(255,255,255,.035); border:1px solid rgba(0,200,255,.12); border-radius:16px; backdrop-filter:blur(12px); transition:transform .3s,border-color .3s,box-shadow .3s; }
  .glass-card:hover { transform:translateY(-4px); border-color:rgba(0,200,255,.25); box-shadow:0 0 30px rgba(0,200,255,.15); }

  .btn-primary  { display:inline-flex; align-items:center; gap:10px; padding:15px 34px; background:linear-gradient(135deg,#00c8ff,#7b2fff); border-radius:8px; color:#fff; font-weight:600; font-size:.95rem; text-decoration:none; border:none; cursor:pointer; transition:all .3s; letter-spacing:.3px; font-family:'Outfit',sans-serif; }
  .btn-primary:hover  { transform:translateY(-2px); box-shadow:0 8px 40px rgba(0,200,255,.35); }
  .btn-secondary{ display:inline-flex; align-items:center; gap:10px; padding:15px 34px; background:transparent; border-radius:8px; color:#e8eaf6; font-weight:600; font-size:.95rem; text-decoration:none; border:1px solid rgba(255,255,255,.12); cursor:pointer; transition:all .3s; letter-spacing:.3px; font-family:'Outfit',sans-serif; }
  .btn-secondary:hover{ border-color:rgba(0,200,255,.4); color:#00c8ff; transform:translateY(-2px); background:rgba(0,200,255,.04); }

  .contact-item { display:flex; align-items:center; gap:14px; padding:16px; background:rgba(255,255,255,.035); border:1px solid rgba(0,200,255,.12); border-radius:10px; transition:all .3s; text-decoration:none; color:#e8eaf6; }
  .contact-item:hover { border-color:rgba(0,200,255,.3); transform:translateX(4px); }
  .social-link  { width:44px; height:44px; border-radius:10px; background:rgba(255,255,255,.035); border:1px solid rgba(0,200,255,.12); display:flex; align-items:center; justify-content:center; text-decoration:none; transition:all .3s; color:#a0aec0; }
  .social-link:hover { border-color:rgba(0,200,255,.3); color:#00c8ff; transform:translateY(-2px); background:rgba(0,200,255,.06); }

  .project-card { border-radius:16px; overflow:hidden; background:rgba(8,13,26,.8); border:1px solid rgba(0,200,255,.12); transition:transform .3s,box-shadow .3s,border-color .3s; }
  .project-card:hover { transform:translateY(-6px); box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 40px rgba(0,200,255,.08); border-color:rgba(0,200,255,.3); }
  .proj-link-live{ display:inline-flex; align-items:center; gap:6px; font-size:.8rem; text-decoration:none; padding:8px 16px; border-radius:6px; font-weight:500; transition:all .2s; background:rgba(0,200,255,.1); border:1px solid rgba(0,200,255,.2); color:#00c8ff; }
  .proj-link-live:hover { background:rgba(0,200,255,.2); }
  .proj-link-gh  { display:inline-flex; align-items:center; gap:6px; font-size:.8rem; text-decoration:none; padding:8px 16px; border-radius:6px; font-weight:500; transition:all .2s; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); color:#6b7a99; }
  .proj-link-gh:hover { border-color:rgba(255,255,255,.2); color:#e8eaf6; }

  .repo-card-live { border-radius:12px; background:rgba(8,13,26,.8); border:1px solid rgba(0,200,255,.1); transition:all .3s; text-decoration:none; color:#e8eaf6; display:flex; flex-direction:column; gap:10px; padding:22px; }
  .repo-card-live:hover { border-color:rgba(0,200,255,.3); transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,.4); }

  .form-input { padding:14px 16px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); border-radius:8px; color:#e8eaf6; font-family:'Outfit',sans-serif; font-size:.9rem; outline:none; transition:border-color .3s,box-shadow .3s; resize:vertical; width:100%; }
  .form-input:focus { border-color:rgba(0,200,255,.4); box-shadow:0 0 0 3px rgba(0,200,255,.06); }
  .form-input::placeholder { color:#6b7a99; }
  .form-submit { padding:16px; background:linear-gradient(135deg,#00c8ff,#7b2fff); border:none; border-radius:8px; color:#fff; font-weight:600; font-size:.95rem; cursor:pointer; transition:all .3s; font-family:'Outfit',sans-serif; letter-spacing:.3px; width:100%; }
  .form-submit:hover { transform:translateY(-2px); box-shadow:0 8px 40px rgba(0,200,255,.35); }

  .footer-back { font-family:'DM Mono',monospace; font-size:.75rem; color:#6b7a99; text-decoration:none; display:flex; align-items:center; gap:8px; transition:color .3s; }
  .footer-back:hover { color:#00c8ff; }

  .gh-skeleton { background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:6px; }

  @media(max-width:900px){
    .about-grid{grid-template-columns:1fr!important;text-align:center}
    .about-visual{justify-content:center}
    .about-loc{justify-content:center!important}
    .contact-grid{grid-template-columns:1fr!important}
  }
  @media(max-width:768px){
    .nav-desktop{display:none!important}
    .ham-btn{display:flex!important}
    section{padding:70px 5%!important}
    .skills-grid{grid-template-columns:1fr!important}
    .projects-grid{grid-template-columns:1fr!important}
    .repos-grid{grid-template-columns:1fr!important}
    footer{justify-content:center!important;text-align:center}
  }
  @media(max-width:480px){
    .hero-cta{flex-direction:column}
    .btn-primary,.btn-secondary{justify-content:center}
    .about-stats{grid-template-columns:1fr 1fr!important}
  }
`;

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function GlobalStyles() {
  useEffect(() => {
    const id = "pf-global";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id; s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);
  return null;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useGitHub() {
  const [profile, setProfile] = useState(null);
  const [repos,   setRepos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const [pR, rR] = await Promise.all([
          fetch(GITHUB_API,       { headers:{ Accept:"application/vnd.github.v3+json" } }),
          fetch(GITHUB_REPOS_API, { headers:{ Accept:"application/vnd.github.v3+json" } }),
        ]);
        if (!pR.ok) throw new Error(`GitHub ${pR.status}`);
        const [p, r] = await Promise.all([pR.json(), rR.json()]);
        setProfile(p);
        setRepos(Array.isArray(r) ? r : []);
      } catch(e) { setError(e.message); }
      finally    { setLoading(false); }
    })();
  }, []);
  return { profile, repos, loading, error };
}

const LANG_COLORS = { JavaScript:"#f7df1e",TypeScript:"#3178c6",Python:"#3572A5",HTML:"#e34c26",CSS:"#563d7c","C++":"#f34b7d",Java:"#b07219",Go:"#00ADD8",Rust:"#dea584",Shell:"#89e051",Vue:"#41b883",Svelte:"#ff3e00" };
const lc = lang => LANG_COLORS[lang] || "#8b949e";

const S = {
  gradText:{ background:"linear-gradient(135deg,#00c8ff,#7b2fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" },
  mono:    { fontFamily:"'DM Mono',monospace" },
  display: { fontFamily:"'Syne',sans-serif" },
  neon:    { color:"#00c8ff" },
  dim:     { color:"#6b7a99" },
  mid:     { color:"#a0aec0" },
};

/* ══════════════════════════════════════════
   CUSTOM CODE-THEMED LOGO
══════════════════════════════════════════ */
function Logo({ size = 36 }) {
  return (
    <svg className="logo-svg" width={size * 3} height={size} viewBox="0 0 108 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00c8ff"/>
          <stop offset="100%" stopColor="#7b2fff"/>
        </linearGradient>
        <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#00c8ff" stopOpacity=".7"/>
          <stop offset="100%" stopColor="#7b2fff" stopOpacity=".7"/>
        </linearGradient>
        <filter id="logoGlowF" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Left angle bracket */}
      <text x="1"  y="26" fontFamily="'DM Mono',monospace" fontSize="20" fontWeight="500" fill="url(#logoGrad)" filter="url(#logoGlowF)">&lt;</text>
      {/* Monogram */}
      <text x="19" y="25" fontFamily="'Syne',sans-serif"   fontSize="16" fontWeight="800" fill="url(#logoGrad)" letterSpacing="-0.3" filter="url(#logoGlowF)">UCO</text>
      {/* Right slash-bracket */}
      <text x="65" y="26" fontFamily="'DM Mono',monospace" fontSize="20" fontWeight="500" fill="url(#logoGrad)" filter="url(#logoGlowF)">/&gt;</text>
      {/* Blinking cursor */}
      <rect x="95" y="11" width="3" height="15" rx="1" fill="#00c8ff" opacity=".85">
        <animate attributeName="opacity" values="0.85;0;0.85" dur="1.1s" repeatCount="indefinite"/>
      </rect>
      {/* Underline */}
      <rect x="19" y="29" width="46" height="1.5" rx="1" fill="url(#underlineGrad)"/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   STATIC DATA
══════════════════════════════════════════ */
const TECH_BADGES = [
  {icon:"⚛️",label:"React"},{icon:"🟢",label:"Node.js"},{icon:"⚡",label:"Express"},
  {icon:"🍃",label:"MongoDB"},{icon:"🔀",label:"Git"},{icon:"🔗",label:"REST APIs"},
];
const SKILLS = [
  {icon:"⚛️",title:"Frontend Development",bg:"rgba(0,200,255,.1)",  tags:["React.js","HTML5","CSS3","JavaScript ES6+","Responsive Design","Tailwind CSS"]},
  {icon:"🟢",title:"Backend Development", bg:"rgba(123,47,255,.1)", tags:["Node.js","Express.js","REST APIs","Middleware","Server Architecture"]},
  {icon:"🍃",title:"Database & Storage",  bg:"rgba(0,200,80,.1)",   tags:["MongoDB","Mongoose ODM","Schema Design","File Uploads","Cloudinary"]},
  {icon:"🛠️",title:"Tools & Platforms",   bg:"rgba(255,165,0,.1)",  tags:["Git & GitHub","Postman","Termux","Render","VS Code","npm"]},
  {icon:"🔐",title:"Security & Concepts", bg:"rgba(255,45,120,.1)", tags:["JWT Auth","bcrypt","API Security","CORS","Rate Limiting","Multer"]},
];
const SKILL_BARS = [
  {name:"JavaScript",pct:90},{name:"React.js",pct:85},
  {name:"Node.js",pct:88},{name:"MongoDB",pct:82},{name:"REST APIs",pct:92},
];
const PROJECTS = [
  { label:"Full Stack · Security", title:"Full Stack Auth System",
    desc:"Complete JWT authentication — register, login, protected routes, password hashing, and token refresh. Production-ready.",
    stack:["Node.js","Express","MongoDB","JWT","bcrypt","React"],
    gradient:"linear-gradient(135deg,rgba(0,200,255,.1),rgba(123,47,255,.1))",
    liveUrl:"#", ghUrl:`https://github.com/${GITHUB_USERNAME}`,
    lines:[[{c:"c-green",t:"POST"},{c:"",t:" "},{c:"c-blue",t:"/api/auth/register"}],[{c:"c-purple",t:"→"},{c:"",t:" hash password (bcrypt)"}],[{c:"c-purple",t:"→"},{c:"",t:" save to MongoDB"}],[{c:"c-purple",t:"→"},{c:"",t:" sign JWT token"}],[{c:"c-green",t:"200"},{c:"",t:" "},{c:"c-yellow",t:"{ token, user }"}]]},
  { label:"API · File Management", title:"File Upload API System",
    desc:"Robust upload API — profile pictures, metadata, file type validation, size limits, Cloudinary integration.",
    stack:["Node.js","Express","Multer","Cloudinary","MongoDB"],
    gradient:"linear-gradient(135deg,rgba(123,47,255,.1),rgba(255,45,120,.1))",
    liveUrl:"#", ghUrl:`https://github.com/${GITHUB_USERNAME}`,
    lines:[[{c:"c-green",t:"POST"},{c:"",t:" "},{c:"c-blue",t:"/api/upload/avatar"}],[{c:"c-purple",t:"→"},{c:"",t:" multer.single('file')"}],[{c:"c-purple",t:"→"},{c:"",t:" validate type/size"}],[{c:"c-purple",t:"→"},{c:"",t:" upload Cloudinary"}],[{c:"c-green",t:"200"},{c:"",t:" "},{c:"c-yellow",t:"{ url, metadata }"}]]},
  { label:"Frontend · React", title:"Developer Portfolio",
    desc:"This site — React portfolio with dark theme, glassmorphism, smooth animations, and live GitHub data from the API.",
    stack:["React.js","CSS3","JavaScript","Vite"],
    gradient:"linear-gradient(135deg,rgba(0,200,80,.1),rgba(0,200,255,.1))",
    liveUrl:"#", ghUrl:`https://github.com/${GITHUB_USERNAME}`,
    lines:[[{c:"c-blue",t:"import"},{c:"",t:" { useState } "},{c:"c-blue",t:"from"},{c:"",t:" "},{c:"c-yellow",t:"'react'"}],[{c:"c-purple",t:"const"},{c:"",t:" Portfolio = () => {"}],[{c:"",t:"  "},{c:"c-purple",t:"return"},{c:"",t:" <"},{c:"c-green",t:"App"},{c:"",t:" />"}],[{c:"",t:"}"}],[{c:"c-purple",t:"export default"},{c:"",t:" Portfolio"}]]},
  { label:"Backend API · Deployed", title:"REST API on Render",
    desc:"Production-deployed backend — full CRUD, auth middleware, rate limiting, CORS config, and Postman documentation.",
    stack:["Node.js","Express","MongoDB Atlas","Render","Postman"],
    gradient:"linear-gradient(135deg,rgba(255,165,0,.1),rgba(123,47,255,.1))",
    liveUrl:"#", ghUrl:`https://github.com/${GITHUB_USERNAME}`,
    lines:[[{c:"c-blue",t:"GET"},{c:"",t:"    "},{c:"c-green",t:"/api/products"},{c:"c-yellow",t:" ✓"}],[{c:"c-blue",t:"POST"},{c:"",t:"   "},{c:"c-green",t:"/api/orders"},{c:"c-yellow",t:" ✓"}],[{c:"c-blue",t:"PATCH"},{c:"",t:"  "},{c:"c-green",t:"/api/users/:id"},{c:"c-yellow",t:" ✓"}],[{c:"c-blue",t:"DELETE"},{c:"",t:" "},{c:"c-green",t:"/api/items/:id"},{c:"c-yellow",t:" ✓"}],[{c:"c-purple",t:"Deployed → Render ✓"}]]},
];
const SERVICES = [
  {icon:"🖥️",title:"Full Stack Development",desc:"End-to-end web apps with seamless frontend-backend integration, database design, and deployment."},
  {icon:"🔗",title:"API Development",       desc:"Secure, scalable REST APIs with auth, file handling, validation, and full documentation."},
  {icon:"⚛️",title:"Frontend UI Dev",       desc:"Pixel-perfect, responsive React interfaces with modern UX and smooth animations."},
  {icon:"🗄️",title:"Backend Systems",       desc:"Robust Node.js + MongoDB backends with optimized queries, caching, and secure architecture."},
  {icon:"🎓",title:"Mentorship & Training", desc:"One-on-one coaching and YouTube tutorials to master full stack development fast."},
];
const TESTIMONIALS = [
  {text:"Uchenna built our entire backend from scratch — auth, API, database — in record time. Clean code, great communication, truly understood our requirements.",      name:"Emeka A.",   role:"Startup Founder, Lagos", avatar:"👨🏾‍💼",bg:"rgba(0,200,255,.1)"},
  {text:"His mentoring helped me land my first dev job in 3 months. Chidera breaks down complex concepts with patience and real-world examples that stick.",             name:"Fatima M.", role:"Junior Developer, Abuja", avatar:"👩🏽‍💻",bg:"rgba(123,47,255,.1)"},
  {text:"The file upload API handles thousands of requests flawlessly. Proper error handling, security, and documentation — exactly what a production system needs.",   name:"David K.",  role:"CTO, Tech Agency",        avatar:"👨🏻‍💻",bg:"rgba(255,45,120,.1)"},
];

/* ══════════════════════════════════════════
   SHARED UI
══════════════════════════════════════════ */
function Divider() {
  return <div style={{width:"100%",height:1,background:"linear-gradient(90deg,transparent,rgba(0,200,255,.15),transparent)"}}/>;
}
function SectionHeader({ tag, title, accent, desc }) {
  return (
    <div className="reveal" style={{textAlign:"center",marginBottom:64}}>
      <div style={{display:"inline-block",...S.mono,fontSize:".72rem",...S.neon,letterSpacing:3,textTransform:"uppercase",marginBottom:16,padding:"5px 14px",border:"1px solid rgba(0,200,255,.2)",borderRadius:100}}>{tag}</div>
      <h2 style={{...S.display,fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,letterSpacing:"-1px",lineHeight:1.1,marginBottom:16}}>
        {title} <span style={S.gradText}>{accent}</span>
      </h2>
      {desc && <p style={{...S.mid,maxWidth:520,margin:"0 auto",fontSize:"1rem"}}>{desc}</p>}
    </div>
  );
}
function Mockup({ lines }) {
  const cm = {"c-green":"#00c88a","c-blue":"#00c8ff","c-purple":"#7b2fff","c-yellow":"#ffd700"};
  return (
    <div style={{width:"80%",maxWidth:280,background:"rgba(5,8,17,.9)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:20,...S.mono,fontSize:".65rem",color:"#6b7a99",lineHeight:1.9,position:"relative",zIndex:1,boxShadow:"0 20px 60px rgba(0,0,0,.6)"}}>
      <div style={{display:"flex",gap:5,marginBottom:12}}>
        {["#ff5f57","#febc2e","#28c840"].map(c=><span key={c} style={{width:8,height:8,borderRadius:"50%",background:c,display:"block"}}/>)}
      </div>
      {lines.map((row,ri)=><div key={ri}>{row.map((seg,si)=><span key={si} style={{color:cm[seg.c]||"#6b7a99"}}>{seg.t}</span>)}</div>)}
    </div>
  );
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar({ scrolled, mobileOpen, setMobileOpen }) {
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 5%",height:70,display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(5,8,17,.97)":"rgba(5,8,17,.7)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,200,255,.1)",transition:"background .3s"}}>
      <Logo/>
      <ul className="nav-desktop" style={{display:"flex",gap:"2rem",listStyle:"none"}}>
        {["about","skills","projects","services","github","contact"].map(id=>(
          <li key={id}><a href={`#${id}`} className={`nav-link-item${id==="contact"?" nav-cta-link":""}`}>{id[0].toUpperCase()+id.slice(1)}</a></li>
        ))}
      </ul>
      <div className="ham-btn" onClick={()=>setMobileOpen(!mobileOpen)} style={{cursor:"pointer",flexDirection:"column",gap:5,display:"none"}}>
        {[0,1,2].map(i=><span key={i} style={{display:"block",width:24,height:2,background:"#a0aec0",borderRadius:2}}/>)}
      </div>
      {mobileOpen&&(
        <div style={{position:"fixed",top:70,left:0,right:0,background:"rgba(5,8,17,.98)",padding:"24px 5%",display:"flex",flexDirection:"column",gap:20,borderBottom:"1px solid rgba(0,200,255,.1)",zIndex:999,backdropFilter:"blur(20px)"}}>
          {["about","skills","projects","services","github","contact"].map(id=>(
            <a key={id} href={`#${id}`} className="nav-link-item" onClick={()=>setMobileOpen(false)}>{id[0].toUpperCase()+id.slice(1)}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"120px 5% 80px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,200,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,.04) 1px,transparent 1px)",backgroundSize:"50px 50px",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)"}}/>
      {[{w:500,c:"rgba(0,200,255,.12)",t:"-100px",r:"-50px",d:"0s"},{w:400,c:"rgba(123,47,255,.15)",b:"-80px",l:"-80px",d:"-3s"},{w:300,c:"rgba(255,45,120,.08)",t:"40%",r:"30%",d:"-5s"}].map((o,i)=>(
        <div key={i} style={{position:"absolute",width:o.w,height:o.w,borderRadius:"50%",background:`radial-gradient(circle,${o.c},transparent 70%)`,filter:"blur(80px)",pointerEvents:"none",animation:`orbFloat 8s ease-in-out ${o.d} infinite`,top:o.t,right:o.r,bottom:o.b,left:o.l}}/>
      ))}
      {[{l:"8%",d:"18s",dl:"0s",code:"const auth = jwt.sign(payload, secret);"},{l:"75%",d:"22s",dl:"-8s",code:"db.collection('users').findOne({email})"},{l:"45%",d:"16s",dl:"-4s",code:"router.post('/api/upload', multer.single())"},{l:"20%",d:"20s",dl:"-12s",code:"app.use(cors({ origin: '*' }))"},{l:"60%",d:"24s",dl:"-6s",code:"useState(() => fetchData())"}].map((p,i)=>(
        <div key={i} style={{position:"absolute",left:p.l,...S.mono,fontSize:".7rem",color:"rgba(0,200,255,.15)",pointerEvents:"none",animation:`codeFloat ${p.d} ${p.dl} linear infinite`,whiteSpace:"nowrap"}}>{p.code}</div>
      ))}
      <div className="hero-content" style={{maxWidth:720,position:"relative",zIndex:2}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,...S.mono,fontSize:".78rem",...S.neon,letterSpacing:2,textTransform:"uppercase",marginBottom:24,padding:"8px 16px",background:"rgba(0,200,255,.06)",border:"1px solid rgba(0,200,255,.15)",borderRadius:100}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:"#00c8ff",boxShadow:"0 0 12px #00c8ff",animation:"pulse 2s ease-in-out infinite"}}/>
          Available for Projects
        </div>
        <h1 style={{...S.display,fontSize:"clamp(2.8rem,6vw,5rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-2px",marginBottom:10}}>
          <div style={{color:"#e8eaf6"}}>Full Stack</div>
          <div style={S.gradText}>Web Developer</div>
        </h1>
        <p style={{fontSize:"1.15rem",...S.mid,margin:"20px 0 36px",maxWidth:560,fontWeight:300,lineHeight:1.8}}>Building Scalable, Secure &amp; Modern Web Applications — from pixel-perfect frontends to bulletproof backend APIs.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:44}}>
          {TECH_BADGES.map((b,i)=>(
            <span key={i} className={`badge-anim-${i+1}`} style={{...S.mono,fontSize:".72rem",padding:"6px 14px",borderRadius:6,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"#6b7a99",cursor:"default",transition:"all .3s"}}
              onMouseEnter={e=>Object.assign(e.currentTarget.style,{background:"rgba(0,200,255,.08)",borderColor:"rgba(0,200,255,.3)",color:"#00c8ff",transform:"translateY(-2px)"})}
              onMouseLeave={e=>Object.assign(e.currentTarget.style,{background:"rgba(255,255,255,.04)",borderColor:"rgba(255,255,255,.08)",color:"#6b7a99",transform:""})}>
              {b.icon} {b.label}
            </span>
          ))}
        </div>
        <div className="hero-cta" style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          <a href="#projects" className="btn-primary">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><polyline points="16,3 12,7 8,3"/></svg>
            Hire Me
          </a>
        </div>
      </div>
      <div className="scroll-anim" style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,...S.dim,fontSize:".72rem",letterSpacing:2,textTransform:"uppercase",...S.mono,zIndex:2}}>
        <span>scroll</span>
        <div style={{width:1,height:50,background:"linear-gradient(to bottom,#00c8ff,transparent)",animation:"scrollPuls 2s ease-in-out infinite"}}/>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT
══════════════════════════════════════════ */
function About() {
  return (
    <section id="about" style={{padding:"100px 5%",background:"#080d1a"}}>
      <div className="about-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:60,alignItems:"center",maxWidth:1100,margin:"0 auto"}}>
        <div className="about-visual reveal" style={{display:"flex",justifyContent:"center"}}>
          <div style={{position:"relative",width:280,height:280}}>
            <div style={{width:"100%",height:"100%",borderRadius:24,border:"2px solid rgba(0,200,255,.2)",overflow:"hidden",position:"relative"}}>
              <img src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`} alt="Uchenna Chidera Onyesom" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";}}/>
            </div>
            {[{in:-20,dur:"20s",cw:true,dot:{top:0,left:"50%",transform:"translate(-50%,-50%)"},dc:"#00c8ff"},{in:-40,dur:"30s",cw:false,dot:{bottom:0,right:0,transform:"translate(50%,50%)"},dc:"#7b2fff",bc:"rgba(123,47,255,.1)"}].map((r,i)=>(
              <div key={i} style={{position:"absolute",borderRadius:"50%",border:`1px solid ${r.bc||"rgba(0,200,255,.15)"}`,inset:r.in,animation:`${r.cw?"ringCW":"ringCCW"} ${r.dur} linear infinite`}}>
                <div style={{position:"absolute",width:10,height:10,borderRadius:"50%",background:r.dc,boxShadow:`0 0 12px ${r.dc}`,animation:"pulseDot 2s infinite",...r.dot}}/>
              </div>
            ))}
            <div style={{position:"absolute",bottom:-16,right:-16,background:"#080d1a",border:"1px solid rgba(0,200,255,.12)",borderRadius:10,padding:"10px 16px",fontSize:".78rem",display:"flex",alignItems:"center",gap:8,backdropFilter:"blur(12px)",whiteSpace:"nowrap"}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#00ff88",boxShadow:"0 0 10px #00ff88",animation:"pulseDot 2s infinite"}}/>
              Open to Work — Abuja, NG 🇳🇬
            </div>
          </div>
        </div>
        <div className="reveal reveal-d1">
          <div style={{display:"inline-block",...S.mono,fontSize:".72rem",...S.neon,letterSpacing:3,textTransform:"uppercase",marginBottom:12,padding:"5px 14px",border:"1px solid rgba(0,200,255,.2)",borderRadius:100}}>About Me</div>
          <h2 style={{...S.display,fontSize:"2rem",fontWeight:800,letterSpacing:"-.5px",marginBottom:4,color:"white"}}>Uchenna Chidera<br/>Onyesom</h2>
          <p style={{...S.neon,...S.mono,fontSize:".85rem",marginBottom:20,letterSpacing:1}}>$ full-stack-developer --location="Abuja, Nigeria"</p>
          <p className="about-loc" style={{...S.dim,fontSize:".85rem",display:"flex",alignItems:"center",gap:6,marginBottom:24}}>📍 Abuja, Nigeria &nbsp;·&nbsp; 🕐 WAT (UTC+1)</p>
          <p style={{...S.mid,lineHeight:1.9,marginBottom:28,fontSize:".97rem"}}>I'm a disciplined, self-driven full stack developer who builds complete, production-ready systems — from crafting modern React interfaces to engineering secure Node.js backends and REST APIs.<br/><br/>Beyond writing code, I share knowledge through YouTube tutorials and one-on-one mentoring, helping the next generation of Nigerian developers break into tech.</p>
          <div className="about-stats" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:32}}>
            {[["20+","Projects Built"],["2+","Years Coding"],["100%","Dedication"]].map(([n,l])=>(
              <div key={l} style={{background:"rgba(255,255,255,.035)",border:"1px solid rgba(0,200,255,.12)",borderRadius:12,padding:16,textAlign:"center"}}>
                <div style={{...S.display,fontSize:"1.6rem",fontWeight:800,...S.gradText}}>{n}</div>
                <div style={{fontSize:".72rem",...S.dim,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          <a href="#contact" className="btn-primary" style={{width:"fit-content"}}>Let's Build Something →</a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SKILLS
══════════════════════════════════════════ */
function Skills() {
  const barsRef = useRef([]);
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("anim");obs.unobserve(e.target);}}),{threshold:.5});
    barsRef.current.forEach(b=>b&&obs.observe(b));
    return()=>obs.disconnect();
  },[]);
  return (
    <section id="skills" style={{padding:"100px 5%"}}>
      <SectionHeader tag="Expertise" title="My" accent="Tech Stack" desc="A curated arsenal of tools and technologies I wield to build complete, high-performance systems."/>
      <div className="skills-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24,maxWidth:1100,margin:"0 auto"}}>
        {SKILLS.map((s,i)=>(
          <div key={i} className={`glass-card reveal reveal-d${i%4+1}`} style={{padding:30}}>
            <div style={{width:50,height:50,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",marginBottom:20}}>{s.icon}</div>
            <div style={{...S.display,fontSize:"1rem",fontWeight:700,marginBottom:16}}>{s.title}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {s.tags.map(t=><span key={t} style={{...S.mono,fontSize:".7rem",padding:"4px 12px",borderRadius:5,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",...S.dim}}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:1100,margin:"48px auto 0"}}>
        {SKILL_BARS.map((b,i)=>(
          <div key={b.name} className={`reveal reveal-d${i%4+1}`} style={{display:"flex",alignItems:"center",gap:16,marginBottom:18}}>
            <span style={{...S.mono,fontSize:".78rem",...S.mid,width:120,flexShrink:0}}>{b.name}</span>
            <div style={{flex:1,height:4,background:"rgba(255,255,255,.05)",borderRadius:2,overflow:"hidden"}}>
              <div ref={el=>barsRef.current[i]=el} className="skill-bar-fill" style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#00c8ff,#7b2fff)",width:`${b.pct}%`}}/>
            </div>
            <span style={{...S.mono,fontSize:".72rem",...S.neon,width:36,textAlign:"right"}}>{b.pct}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════ */
function Projects() {
  return (
    <section id="projects" style={{padding:"100px 5%",background:"#080d1a"}}>
      <SectionHeader tag="Portfolio" title="Featured" accent="Projects" desc="Real-world systems built with production-grade architecture, security, and scalability in mind."/>
      <div className="projects-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:28,maxWidth:1200,margin:"0 auto"}}>
        {PROJECTS.map((p,i)=>(
          <div key={i} className={`project-card reveal reveal-d${i%4+1}`}>
            <div style={{height:200,background:p.gradient,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}><Mockup lines={p.lines}/></div>
            <div style={{padding:24}}>
              <div style={{...S.mono,fontSize:".68rem",...S.neon,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{p.label}</div>
              <h3 style={{...S.display,fontSize:"1.1rem",fontWeight:700,marginBottom:10}}>{p.title}</h3>
              <p style={{...S.mid,fontSize:".88rem",lineHeight:1.7,marginBottom:20}}>{p.desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
                {p.stack.map(s=><span key={s} style={{...S.mono,fontSize:".66rem",padding:"3px 10px",borderRadius:4,background:"rgba(0,200,255,.07)",border:"1px solid rgba(0,200,255,.15)",...S.neon}}>{s}</span>)}
              </div>
              <div style={{display:"flex",gap:12}}>
                <a href={p.liveUrl} className="proj-link-live">↗ Live Demo</a>
                <a href={p.ghUrl} target="_blank" rel="noreferrer" className="proj-link-gh">⌥ GitHub</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES
══════════════════════════════════════════ */
function Services() {
  return (
    <section id="services" style={{padding:"100px 5%"}}>
      <SectionHeader tag="What I Offer" title="My" accent="Services" desc="From idea to deployment — I handle the full product lifecycle with precision and professionalism."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20,maxWidth:1100,margin:"0 auto"}}>
        {SERVICES.map((s,i)=>(
          <div key={i} className={`glass-card reveal reveal-d${i%4+1}`} style={{padding:"32px 24px",textAlign:"center"}}>
            <span style={{fontSize:"2rem",marginBottom:16,display:"block"}}>{s.icon}</span>
            <div style={{...S.display,fontSize:".95rem",fontWeight:700,marginBottom:10}}>{s.title}</div>
            <p style={{fontSize:".82rem",...S.dim,lineHeight:1.7}}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   GITHUB — LIVE API DATA
══════════════════════════════════════════ */
function GitHubSection() {
  const { profile, repos, loading, error } = useGitHub();

  const langMap = {};
  repos.forEach(r=>{ if(r.language) langMap[r.language]=(langMap[r.language]||0)+1; });
  const total = Object.values(langMap).reduce((a,b)=>a+b,0)||1;
  const langs = Object.entries(langMap).sort((a,b)=>b[1]-a[1]).slice(0,5);

  const stats = [
    {label:"Public Repos", val:loading?"…":error?"—":(profile?.public_repos??"—")},
    {label:"Followers",    val:loading?"…":error?"—":(profile?.followers??"—")},
    {label:"Following",    val:loading?"…":error?"—":(profile?.following??"—")},
    {label:"Member Since", val:loading?"…":error?"—":(profile?.created_at?new Date(profile.created_at).getFullYear():"—")},
  ];

  return (
    <section id="github" style={{padding:"100px 5%",background:"#080d1a"}}>
      <SectionHeader tag="Open Source" title="GitHub" accent="Activity" desc={`Live data fetched directly from @${GITHUB_USERNAME} via the GitHub REST API.`}/>
      <div style={{maxWidth:1100,margin:"0 auto"}}>

        {/* Profile card */}
        {!loading && !error && profile && (
          <div className="glass-card reveal" style={{padding:28,marginBottom:36,display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
            <img src={profile.avatar_url} alt="avatar" style={{width:72,height:72,borderRadius:"50%",border:"2px solid rgba(0,200,255,.3)",flexShrink:0}} onError={e=>e.target.style.display="none"}/>
            <div style={{flex:1,minWidth:200}}>
              <div style={{...S.display,fontSize:"1.1rem",fontWeight:700,marginBottom:4}}>{profile.name||profile.login}</div>
              <div style={{...S.mono,fontSize:".8rem",...S.neon,marginBottom:6}}>@{profile.login}</div>
              {profile.bio && <p style={{...S.mid,fontSize:".85rem",lineHeight:1.6}}>{profile.bio}</p>}
              {profile.location && <p style={{...S.dim,fontSize:".8rem",marginTop:6}}>📍 {profile.location}</p>}
            </div>
            <a href={profile.html_url} target="_blank" rel="noreferrer" className="btn-secondary" style={{padding:"10px 22px",fontSize:".85rem"}}>View Profile →</a>
          </div>
        )}

        {error && <div style={{textAlign:"center",padding:32,color:"#ff6b6b",...S.mono,fontSize:".85rem",marginBottom:32}}>⚠ Could not load GitHub data: {error}</div>}

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:20,marginBottom:40}}>
          {stats.map((s,i)=>(
            <div key={s.label} className={`glass-card reveal reveal-d${i%4+1}`} style={{padding:28,textAlign:"center"}}>
              {loading
                ? <div className="gh-skeleton" style={{height:36,marginBottom:8}}/>
                : <div style={{...S.display,fontSize:"2.2rem",fontWeight:800,...S.gradText}}>{s.val}</div>
              }
              <div style={{fontSize:".8rem",...S.dim,marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Repos grid */}
        <div className="repos-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,marginBottom:40}}>
          {loading && [0,1,2,3].map(i=>(
            <div key={i} style={{padding:22,borderRadius:12,background:"rgba(8,13,26,.8)",border:"1px solid rgba(0,200,255,.1)"}}>
              <div className="gh-skeleton" style={{height:14,marginBottom:12,width:"60%"}}/>
              <div className="gh-skeleton" style={{height:12,marginBottom:8}}/>
              <div className="gh-skeleton" style={{height:12,width:"80%"}}/>
            </div>
          ))}
          {!loading && repos.map((r,i)=>(
            <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className={`repo-card-live reveal reveal-d${i%4+1}`}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#6b7a99"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/></svg>
                <span style={{...S.mono,fontSize:".85rem",...S.neon}}>{r.name}</span>
                {r.fork && <span style={{...S.mono,fontSize:".6rem",padding:"2px 7px",borderRadius:100,background:"rgba(123,47,255,.1)",border:"1px solid rgba(123,47,255,.2)",color:"#7b2fff"}}>fork</span>}
              </div>
              <p style={{fontSize:".82rem",...S.dim,lineHeight:1.6,flex:1}}>{r.description||"No description provided."}</p>
              <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                {r.language && (
                  <span style={{display:"flex",alignItems:"center",gap:6,fontSize:".75rem",...S.dim,...S.mono}}>
                    <span style={{width:10,height:10,borderRadius:"50%",background:lc(r.language),display:"block"}}/>{r.language}
                  </span>
                )}
                <span style={{fontSize:".75rem",...S.dim,...S.mono}}>⭐ {r.stargazers_count}</span>
                <span style={{fontSize:".75rem",...S.dim,...S.mono}}>🍴 {r.forks_count}</span>
                {r.updated_at && <span style={{fontSize:".7rem",...S.dim,...S.mono,marginLeft:"auto"}}>Updated {new Date(r.updated_at).toLocaleDateString("en-GB",{month:"short",year:"numeric"})}</span>}
              </div>
            </a>
          ))}
        </div>

        {/* Language bar */}
        {!loading && langs.length > 0 && (
          <div className="reveal">
            <div style={{...S.display,fontSize:"1rem",fontWeight:700,marginBottom:16}}>Language Breakdown</div>
            <div style={{height:10,borderRadius:5,overflow:"hidden",display:"flex",marginBottom:16}}>
              {langs.map(([lang,count])=>(
                <div key={lang} style={{width:`${(count/total*100).toFixed(1)}%`,background:lc(lang)}}/>
              ))}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:16}}>
              {langs.map(([lang,count])=>(
                <span key={lang} style={{display:"flex",alignItems:"center",gap:8,fontSize:".78rem",...S.dim,...S.mono}}>
                  <span style={{width:10,height:10,borderRadius:"50%",background:lc(lang),display:"block"}}/>{lang} {(count/total*100).toFixed(0)}%
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="reveal" style={{textAlign:"center",marginTop:40}}>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════ */
function Testimonials() {
  return (
    <section id="testimonials" style={{padding:"100px 5%"}}>
      <SectionHeader tag="Social Proof" title="What People" accent="Say" desc="Feedback from clients, mentees, and collaborators across Nigeria and beyond."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24,maxWidth:1100,margin:"0 auto"}}>
        {TESTIMONIALS.map((t,i)=>(
          <div key={i} className={`glass-card reveal reveal-d${i%3+1}`} style={{padding:30}}>
            <div style={{fontSize:"2.5rem",lineHeight:1,color:"#00c8ff",opacity:.4,fontFamily:"Georgia,serif",marginBottom:16}}>"</div>
            <div style={{color:"#ffd700",fontSize:".8rem",marginBottom:4}}>★★★★★</div>
            <p style={{...S.mid,fontSize:".9rem",lineHeight:1.8,marginBottom:24}}>{t.text}</p>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:t.bg,border:"2px solid rgba(0,200,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>{t.avatar}</div>
              <div>
                <div style={{...S.display,fontSize:".9rem",fontWeight:700}}>{t.name}</div>
                <div style={{fontSize:".75rem",...S.dim,marginTop:2}}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CONTACT  — powered by EmailJS
══════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = "service_n3s1od4";
const EMAILJS_TEMPLATE_ID = "template_udsckjq";
const EMAILJS_PUBLIC_KEY  = "uLGJAKbB7qRHVE43V";

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm]     = useState({name:"",email:"",subject:"",message:""});

  /* Inject EmailJS SDK once */
  useEffect(() => {
    const id = "emailjs-sdk";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id  = id;
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.onload = () => window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      document.head.appendChild(s);
    } else if (window.emailjs) {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }, []);

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in Name, Email and Message.");
      return;
    }
    setStatus("sending");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject || "Portfolio Contact",
        message:    form.message,
        reply_to:   form.email,
      });
      setStatus("sent");
      setForm({name:"",email:"",subject:"",message:""});
      setTimeout(() => setStatus("idle"), 4000);
    } catch(err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }
  return (
    <section id="contact" style={{padding:"100px 5%",background:"#080d1a"}}>
      <SectionHeader tag="Get In Touch" title="Let's" accent="Work Together" desc="Ready to build something exceptional? Let's connect and bring your idea to life."/>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:60,alignItems:"start"}}>
          <div className="reveal">
            <h3 style={{...S.display,fontSize:"1.4rem",fontWeight:800,marginBottom:16}}>Start a Conversation</h3>
            <p style={{...S.mid,fontSize:".9rem",lineHeight:1.8,marginBottom:32}}>Whether you need a full stack application, a secure API, or a skilled developer to join your team — I'm available and ready to deliver excellence.</p>
            <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:32}}>
              {[
                {icon:"📧",label:"Email",   value:"onyuchennachidera@gmail.com",     href:"mailto:onyuchennachidera@gmail.com"},
                {icon:"📱",label:"WhatsApp",value:"+234 8113882005",              href:"tel:+2348113882005"},
                {icon:"💼",label:"LinkedIn",value:"Uchenna Chidera Onyesom",        href:"https://www.linkedin.com/in/uchenna-chidera-onyesom-72b973345"},
                {icon:"🐙",label:"GitHub",  value:`github.com/${GITHUB_USERNAME}`, href:`https://github.com/${GITHUB_USERNAME}`},
              ].map(c=>(
                <a key={c.label} href={c.href} className="contact-item" target={c.href.startsWith("http")?"_blank":undefined} rel="noreferrer">
                  <div style={{width:40,height:40,borderRadius:10,background:"rgba(0,200,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>{c.icon}</div>
Z x                 <div>
                    <div style={{fontSize:".72rem",...S.dim,marginBottom:2}}>{c.label}</div>
                    <div style={{fontSize:".88rem",fontWeight:500}}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{display:"flex",gap:12}}>
              {[
                {t:"GitHub",   h:`https://github.com/${GITHUB_USERNAME}`,svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>},
                {t:"LinkedIn", h:"https://www.linkedin.com/in/uchenna-chidera-onyesom-72b973345",svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
                {t:"YouTube",  h:"#",svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>},
                {t:"Twitter",  h:"#",svg:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>},
              ].map(s=>(
                <a key={s.t} href={s.h} className="social-link" title={s.t} target="_blank" rel="noreferrer">{s.svg}</a>
              ))}
            </div>
          </div>
          <div className="reveal reveal-d1">
            <div className="glass-card" style={{padding:32}}>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {[{label:"Your Name",type:"text",k:"name",ph:"John Doe"},{label:"Email Address",type:"email",k:"email",ph:"john@company.com"},{label:"Subject",type:"text",k:"subject",ph:"Project Inquiry"}].map(f=>(
                  <div key={f.k} style={{display:"flex",flexDirection:"column",gap:6}}>
                    <label style={{fontSize:".78rem",...S.dim,...S.mono}}>{f.label}</label>
                    <input type={f.type} className="form-input" placeholder={f.ph} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}/>
                  </div>
                ))}
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  <label style={{fontSize:".78rem",...S.dim,...S.mono}}>// message</label>
                  <textarea className="form-input" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                </div>
                <button className="form-submit" onClick={handleSubmit} disabled={status==="sending"} style={status==="sent"?{background:"linear-gradient(135deg,#00c88a,#00a87a)"}:status==="error"?{background:"linear-gradient(135deg,#ff4d4d,#c00)"}:{}}>
                  {status==="idle"?"Send Message →":status==="sending"?"Sending…":status==="sent"?"✓ Message Sent!":"✗ Failed — Try Again"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{padding:"40px 5%",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
      <Logo size={28}/>
      <p style={{fontSize:".8rem",...S.dim}}>© {new Date().getFullYear()} Uchenna Chidera Onyesom · Built with 🖤 in Abuja, Nigeria</p>
      <a href="#hero" className="footer-back">Back to top ↑</a>
    </footer>
  );
}

/* ══════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════ */
export default function Portfolio() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>50);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  useReveal();

  return (
    <>
      <GlobalStyles/>
      <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <Hero/>
      <Divider/>
      <About/>
      <Divider/>
      <Skills/>
      <Divider/>
      <Projects/>
      <Divider/>
      <Services/>
      <Divider/>
      <GitHubSection/>
      <Divider/>
      <Testimonials/>
      <Divider/>
      <Contact/>
      <Footer/>
    </>
  );
}
