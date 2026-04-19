import { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import { G } from "../data/theme.js";
import { STACK, TESTI, STATS } from "../data/home.js";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:${G.bg};color:${G.text};font-family:${G.display};overflow-x:hidden;cursor:none;}
::selection{background:${G.accent};color:#000;}
a{text-decoration:none;color:inherit;}
.cursor{position:fixed;width:10px;height:10px;background:${G.accent};border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:background .2s,transform .2s;}
.cursor-ring{position:fixed;width:34px;height:34px;border:1px solid rgba(0,212,255,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .3s,height .3s,border-color .3s;}
.cursor.h{background:${G.green};transform:translate(-50%,-50%) scale(2.2);}
.cursor-ring.h{width:56px;height:56px;border-color:${G.green};}
@keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.6)}}
@keyframes scrollPulse{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:.2;transform:scaleY(.4)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes glow{0%,100%{opacity:.4}50%{opacity:.9}}
.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s,transform .7s;}
.reveal.in{opacity:1;transform:none;}
`;

/* ─────────────────────────── CURSOR ─────────────────────────── */
function Cursor() {
  const curRef = useRef(); const ringRef = useRef();
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const move = e => { mx = e.clientX; my = e.clientY; curRef.current.style.left = mx + "px"; curRef.current.style.top = my + "px"; };
    const loop = () => { rx += (mx - rx) * .13; ry += (my - ry) * .13; ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; raf = requestAnimationFrame(loop); };
    const on = () => { curRef.current.classList.add("h"); ringRef.current.classList.add("h"); };
    const off = () => { curRef.current.classList.remove("h"); ringRef.current.classList.remove("h"); };
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    loop();
    return () => { cancelAnimationFrame(raf); document.removeEventListener("mousemove", move); };
  }, []);
  return (<><div className="cursor" ref={curRef}/><div className="cursor-ring" ref={ringRef}/></>);
}


/* ─────────────────────────── HERO CANVAS ─────────────────────────── */
function GridCanvas() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W, H, raf, nodes = [];
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 65; i++) nodes.push({ x: Math.random()*1600, y: Math.random()*900, vx: (Math.random()-.5)*.28, vy: (Math.random()-.5)*.28, r: Math.random()*1.6+.4 });
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = "rgba(0,212,255,.04)";
      for (let x=0;x<W;x+=52) for (let y=0;y<H;y+=52) { ctx.beginPath(); ctx.arc(x,y,.9,0,Math.PI*2); ctx.fill(); }
      nodes.forEach((a,i) => {
        a.x += a.vx; a.y += a.vy;
        if (a.x<0||a.x>W) a.vx*=-1; if (a.y<0||a.y>H) a.vy*=-1;
        nodes.slice(i+1).forEach(b => {
          const dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
          if (d<155) { ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(0,212,255,${(1-d/155)*.18})`; ctx.lineWidth=.55; ctx.stroke(); }
        });
        ctx.beginPath(); ctx.arc(a.x,a.y,a.r,0,Math.PI*2); ctx.fillStyle="rgba(0,212,255,.55)"; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>;
}

/* ─────────────────────────── TYPEWRITER ─────────────────────────── */
function Typewriter() {
  const words = ["TechCean","Innovation","AI Solutions","Web Dev","The Future"];
  const [wi, setWi] = useState(0); const [shown, setShown] = useState(""); const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const t = setTimeout(() => {
      if (!del && shown.length < w.length) setShown(w.slice(0, shown.length+1));
      else if (!del && shown.length === w.length) setDel(true);
      else if (del && shown.length > 0) setShown(shown.slice(0,-1));
      else { setDel(false); setWi(i => (i+1)%words.length); }
    }, del ? 40 : shown.length === words[wi].length && !del ? 1800 : 78);
    return () => clearTimeout(t);
  }, [shown, del, wi]);
  return (
    <div style={{fontFamily:G.mono,fontSize:"clamp(.9rem,2vw,1.25rem)",display:"flex",alignItems:"center",justifyContent:"center",gap:3,marginBottom:".9rem",animation:"fadeUp .7s .1s both"}}>
      <span style={{color:G.green}}>&lt;</span>
      <span style={{color:G.accent,minWidth:"6ch"}}>{shown}</span>
      <span style={{color:G.accent,animation:"blink .85s step-end infinite"}}>|</span>
      <span style={{color:G.green}}>/&gt;</span>
    </div>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"8rem 4rem 4rem",overflow:"hidden"}}>
      <GridCanvas/>
      {/* Radial glows */}
      <div style={{position:"absolute",top:"20%",right:"8%",width:420,height:420,background:`radial-gradient(circle, rgba(139,92,246,.13) 0%, transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"15%",left:"5%",width:320,height:320,background:`radial-gradient(circle, rgba(0,212,255,.07) 0%, transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:2,maxWidth:860,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
        {/* Badge */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:".3rem .9rem",border:`1px solid rgba(0,255,157,.22)`,background:"rgba(0,255,157,.05)",fontFamily:G.mono,fontSize:".65rem",letterSpacing:".1em",color:G.green,marginBottom:"1.6rem",animation:"fadeUp .7s both"}}>
          <span style={{width:6,height:6,background:G.green,borderRadius:"50%",animation:"pulse 2s infinite"}}/>
          AVAILABLE FOR NEW PROJECTS — 2025
        </div>
        <Typewriter/>
        <h1 style={{fontSize:"clamp(3.2rem,7.5vw,6.5rem)",fontWeight:800,lineHeight:1,letterSpacing:"-.035em",marginBottom:"1.4rem",animation:"fadeUp .7s .15s both"}}>
          We architect<br/>
          <span style={{background:`linear-gradient(100deg,${G.accent},${G.green})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>digital futures</span>
        </h1>
        <p style={{fontSize:"clamp(.9rem,1.4vw,1.05rem)",color:G.muted,lineHeight:1.78,maxWidth:520,marginBottom:"2.4rem",animation:"fadeUp .7s .25s both"}}>
          TechCean builds scalable software, AI-powered products and pixel-perfect web experiences — engineered to perform at any scale.
        </p>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center",animation:"fadeUp .7s .35s both"}}>
          <Btn href="#services" primary>Explore Services <Arrow/></Btn>
          <Btn href="#work">See Our Work</Btn>
        </div>
      </div>
      {/* Scroll hint */}
      <div style={{position:"absolute",bottom:"2.2rem",right:"4rem",display:"flex",flexDirection:"column",alignItems:"center",gap:8,fontFamily:G.mono,fontSize:".6rem",letterSpacing:".14em",color:G.muted,writingMode:"vertical-rl",zIndex:2,animation:"fadeUp .7s .6s both"}}>
        <span>SCROLL</span>
        <div style={{width:1,height:58,background:`linear-gradient(to bottom,${G.accent},transparent)`,animation:"scrollPulse 2s ease-in-out infinite"}}/>
      </div>
    </section>
  );
}

/* ─────────────────────────── MARQUEE ─────────────────────────── */
function Marquee() {
  const items = ["Website Development","✦","AI Integrations","✦","Mobile Apps","✦","UI/UX Design","✦","Cloud & DevOps","✦","E-Commerce","✦"];
  const all = [...items,...items,...items,...items];
  return (
    <div style={{overflow:"hidden",borderTop:`1px solid ${G.border}`,borderBottom:`1px solid ${G.border}`,background:G.bg2,padding:"1rem 0",position:"relative"}}>
      <div style={{position:"absolute",top:0,bottom:0,left:0,width:100,background:`linear-gradient(to right,${G.bg2},transparent)`,zIndex:2,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,bottom:0,right:0,width:100,background:`linear-gradient(to left,${G.bg2},transparent)`,zIndex:2,pointerEvents:"none"}}/>
      <div style={{display:"flex",width:"max-content",animation:"marquee 32s linear infinite"}}>
        {all.map((x,i) => x === "✦"
          ? <span key={i} style={{color:G.accent,fontSize:".55rem",display:"flex",alignItems:"center",padding:"0 .6rem"}}>✦</span>
          : <span key={i} style={{fontFamily:G.mono,fontSize:".72rem",letterSpacing:".12em",textTransform:"uppercase",color:G.muted,padding:"0 1.5rem",whiteSpace:"nowrap"}}>{x}</span>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────── STATS ─────────────────────────── */
function Stats() {
  return (
    <div id="stats" style={{background:G.bg2,borderBottom:`1px solid ${G.border}`}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",background:G.border,gap:1}}>
        {STATS.map(([n,l],i) => (
          <RevealBox key={l} delay={i*.08}>
            <div style={{background:G.bg2,padding:"3rem 2rem",textAlign:"center",position:"relative",overflow:"hidden",transition:"background .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=G.surface;e.currentTarget.querySelector(".sline").style.width="64px";}}
              onMouseLeave={e=>{e.currentTarget.style.background=G.bg2;e.currentTarget.querySelector(".sline").style.width="28px";}}>
              <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 50% 110%, rgba(0,212,255,.07), transparent 60%)`,pointerEvents:"none"}}/>
              <span style={{fontFamily:G.mono,fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:G.accent,display:"block",marginBottom:".5rem",lineHeight:1}}>{n}</span>
              <span style={{fontFamily:G.mono,fontSize:".68rem",color:G.muted,letterSpacing:".08em",textTransform:"uppercase"}}>{l}</span>
              <div className="sline" style={{width:28,height:2,background:`linear-gradient(90deg,${G.accent},${G.green})`,margin:".9rem auto 0",transition:"width .4s"}}/>
            </div>
          </RevealBox>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── TECH STACK ─────────────────────────── */
function TechStack() {
  const [active, setActive] = useState("Frontend");
  const [key, setKey] = useState(0);
  const switchTab = t => { setActive(t); setKey(k => k+1); };
  return (
    <section id="services" style={{padding:"8rem 4rem",maxWidth:1280,margin:"0 auto"}}>
      <SectionLabel>Technology</SectionLabel>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:"2.5rem"}}>
        <SectionTitle>Our <Grad>tech stack</Grad></SectionTitle>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {Object.keys(STACK).map(k => (
            <button key={k} onClick={() => switchTab(k)} style={{fontFamily:G.mono,fontSize:".68rem",letterSpacing:".07em",textTransform:"uppercase",padding:".38rem 1rem",border:`1px solid ${k===active?G.accent:G.border}`,color:k===active?G.accent:G.muted,background:k===active?"rgba(0,212,255,.08)":"transparent",cursor:"none",transition:"all .25s",clipPath:"polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)"}}>{k}</button>
          ))}
        </div>
      </div>
      <div key={key} style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:1,background:G.border,border:`1px solid ${G.border}`}}>
        {STACK[active].map((t,i) => (
          <div key={t.name} className="reveal in" style={{background:G.bg,padding:"2rem 1rem",display:"flex",flexDirection:"column",alignItems:"center",gap:10,textAlign:"center",position:"relative",overflow:"hidden",cursor:"none",transition:"background .3s",animation:`fadeUp .5s ${i*.06}s both`}}
            onMouseEnter={e=>{e.currentTarget.style.background=G.surface;e.currentTarget.querySelector(".ti").style.filter="none";e.currentTarget.querySelector(".tn").style.color=G.accent;}}
            onMouseLeave={e=>{e.currentTarget.style.background=G.bg;e.currentTarget.querySelector(".ti").style.filter="grayscale(1) brightness(.6)";e.currentTarget.querySelector(".tn").style.color=G.muted;}}>
            <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 50% -10%,rgba(0,212,255,.09),transparent 65%)`,transform:"translateY(-100%)",transition:"transform .4s",pointerEvents:"none"}}/>
            <span className="ti" style={{fontSize:"1.7rem",filter:"grayscale(1) brightness(.6)",transition:"filter .3s"}}>{t.icon}</span>
            <span className="tn" style={{fontFamily:G.mono,fontSize:".68rem",color:G.muted,letterSpacing:".07em",transition:"color .3s"}}>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */
function Testimonials() {
  return (
    <section id="work" style={{padding:"8rem 4rem",background:G.bg2,borderTop:`1px solid ${G.border}`}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <SectionLabel>Client Voices</SectionLabel>
        <SectionTitle>Trusted by <Grad>builders</Grad></SectionTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem",marginTop:"3rem"}}>
          {TESTI.map((t,i) => (
            <RevealBox key={t.name} delay={i*.1}>
              <div style={{background:G.surface,border:`1px solid ${G.border}`,padding:"2rem",position:"relative",overflow:"hidden",transition:"border-color .3s,transform .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,212,255,.3)";e.currentTarget.style.transform="translateY(-5px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.transform="none";}}>
                <div style={{position:"absolute",top:8,right:16,fontSize:"5rem",color:t.color,opacity:.06,fontFamily:G.mono,lineHeight:1}}>"</div>
                {/* Stars */}
                <div style={{display:"flex",gap:3,marginBottom:"1rem"}}>
                  {[...Array(5)].map((_,j) => <div key={j} style={{width:10,height:10,background:G.accent,clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"}}/>)}
                </div>
                <p style={{fontSize:".88rem",color:G.muted,lineHeight:1.78,marginBottom:"1.6rem"}}>"{t.q}"</p>
                <div style={{display:"flex",alignItems:"center",gap:10,borderTop:`1px solid ${G.border}`,paddingTop:"1.2rem"}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${t.color},${G.purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:G.mono,fontSize:".68rem",fontWeight:700,color:"#000",flexShrink:0}}>{t.init}</div>
                  <div>
                    <div style={{fontSize:".82rem",fontWeight:700,marginBottom:2}}>{t.name}</div>
                    <div style={{fontFamily:G.mono,fontSize:".63rem",color:G.muted}}>{t.role}</div>
                  </div>
                </div>
              </div>
            </RevealBox>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ─────────────────────────── */
function ParticleCanvas() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W, H, raf, pts = [];
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i=0;i<40;i++) pts.push({x:Math.random()*1400,y:Math.random()*500,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.2+.4});
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => { p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(0,212,255,.3)";ctx.fill(); });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, []);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>;
}

function CTA() {
  return (
    <div id="contact" style={{position:"relative",overflow:"hidden",background:G.bg,borderTop:`1px solid ${G.border}`}}>
      <ParticleCanvas/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:350,background:`radial-gradient(ellipse,rgba(0,212,255,.055),transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"8rem 4rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"3rem",flexWrap:"wrap",position:"relative",zIndex:2}}>
        <RevealBox>
          <div>
            <div style={{fontFamily:G.mono,fontSize:".7rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",gap:6}}><span style={{color:G.green}}>//</span> Let's Build</div>
            <h2 style={{fontSize:"clamp(2rem,4.5vw,3.8rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-.03em",marginBottom:"1.2rem"}}>
              Ready to build<br/><span style={{background:`linear-gradient(100deg,${G.accent},${G.green})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>something great?</span>
            </h2>
            <p style={{fontSize:".95rem",color:G.muted,maxWidth:440,lineHeight:1.75}}>Let's turn your idea into a live, scalable product. Drop us a message and we'll respond within 24 hours.</p>
          </div>
        </RevealBox>
        <RevealBox delay={.15}>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            <Btn href="mailto:hello@techcean.co.in" primary>Start a Project <Arrow/></Btn>
            <Btn href="https://techcean.co.in">Visit Website</Btn>
          </div>
        </RevealBox>
      </div>
    </div>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer() {
  return (
    <footer style={{background:G.bg,borderTop:`1px solid ${G.border}`,padding:"1.8rem 4rem"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <a href="#" style={{fontFamily:G.mono,fontSize:".95rem",fontWeight:700,display:"flex",alignItems:"center",gap:2}}>
          <span style={{color:G.green}}>&lt;</span><span>TechCean</span><span style={{color:G.green}}>/&gt;</span>
        </a>
        <span style={{fontFamily:G.mono,fontSize:".62rem",color:G.muted,letterSpacing:".06em"}}>© 2025 TechCean. All rights reserved.</span>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Privacy","Terms","GitHub"].map(l => <a key={l} href="#" style={{fontFamily:G.mono,fontSize:".62rem",color:G.muted,letterSpacing:".06em",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color=G.accent} onMouseLeave={e=>e.target.style.color=G.muted}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── HELPERS ─────────────────────────── */
function Btn({ href, primary, children }) {
  const base = { display:"inline-flex",alignItems:"center",gap:6,padding:".82rem 2rem",fontFamily:G.mono,fontWeight:700,fontSize:".8rem",letterSpacing:".05em",textTransform:"uppercase",transition:"all .25s",clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" };
  const p = { background:G.accent,color:"#000" };
  const g = { background:"transparent",border:`1px solid ${G.border}`,color:G.muted };
  return (
    <a href={href} style={{...base,...(primary?p:g)}}
      onMouseEnter={e=>{ if(primary){e.currentTarget.style.boxShadow=`0 0 30px rgba(0,212,255,.5)`;e.currentTarget.style.transform="translateY(-2px)";}else{e.currentTarget.style.borderColor=G.accent;e.currentTarget.style.color=G.accent;}}}
      onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";if(!primary){e.currentTarget.style.borderColor=G.border;e.currentTarget.style.color=G.muted;}}}>
      {children}
    </a>
  );
}
const Arrow = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const Grad = ({ children }) => <span style={{background:`linear-gradient(100deg,${G.accent},${G.green})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{children}</span>;
const SectionLabel = ({ children }) => <div style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",gap:6,opacity:.9}}><span style={{color:G.green}}>//</span>{children}</div>;
const SectionTitle = ({ children }) => <h2 style={{fontSize:"clamp(2.2rem,4.5vw,3.5rem)",fontWeight:800,lineHeight:1.06,letterSpacing:"-.03em",marginBottom:"1rem"}}>{children}</h2>;

function RevealBox({ children, delay=0 }) {
  const ref = useRef(); const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e]) => { if(e.isIntersecting){setVis(true);io.disconnect();} },{threshold:.12});
    io.observe(el); return ()=>io.disconnect();
  },[]);
  return <div ref={ref} style={{opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:`opacity .7s ${delay}s,transform .7s ${delay}s`}}>{children}</div>;
}

/* ─────────────────────────── APP ─────────────────────────── */
export default function App() {
  return (
    <>
      <style>{css}</style>
      <Cursor/>
      <Nav/>
      <Hero/>
      <Marquee/>
      <Stats/>
      <TechStack/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </>
  );
}
