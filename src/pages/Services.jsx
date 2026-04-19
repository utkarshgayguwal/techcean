import { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav.jsx";
import PageHero from "../components/PageHero.jsx";
import { G } from "../data/theme.js";
import { SERVICES, PROCESS, FAQS } from "../data/services.jsx";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{background:${G.bg};color:${G.text};font-family:${G.display};overflow-x:hidden;cursor:none;}
::selection{background:${G.accent};color:#000;}a{text-decoration:none;color:inherit;}
.cursor{position:fixed;width:10px;height:10px;background:${G.accent};border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:background .2s,transform .2s;}
.cursor-ring{position:fixed;width:34px;height:34px;border:1px solid rgba(0,212,255,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .3s,height .3s,border-color .3s;}
.cursor.h{background:${G.green};transform:translate(-50%,-50%) scale(2.2);}
.cursor-ring.h{width:56px;height:56px;border-color:${G.green};}
@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.6)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes dash{to{stroke-dashoffset:0}}
`;

/* ── CURSOR ── */
function Cursor() {
  const curRef = useRef(), ringRef = useRef();
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0,raf;
    const move = e => { mx=e.clientX; my=e.clientY; curRef.current.style.left=mx+"px"; curRef.current.style.top=my+"px"; };
    const loop = () => { rx+=(mx-rx)*.13; ry+=(my-ry)*.13; ringRef.current.style.left=rx+"px"; ringRef.current.style.top=ry+"px"; raf=requestAnimationFrame(loop); };
    const on  = () => { curRef.current.classList.add("h"); ringRef.current.classList.add("h"); };
    const off = () => { curRef.current.classList.remove("h"); ringRef.current.classList.remove("h"); };
    document.addEventListener("mousemove",move);
    document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",on);el.addEventListener("mouseleave",off);});
    loop();
    return ()=>{cancelAnimationFrame(raf);document.removeEventListener("mousemove",move);};
  },[]);
  return <><div className="cursor" ref={curRef}/><div className="cursor-ring" ref={ringRef}/></>;
}

/* ── HERO BANNER ── */
function ServicesHero() {
  return (
    <PageHero
      badge="WHAT WE BUILD"
      title={<><span>Our </span><span style={{ background: `linear-gradient(100deg,${G.accent},${G.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Services</span></>}
      subtitle="End-to-end digital solutions — from strategy and design to engineering and deployment. Everything your product needs to succeed."
      stats={[
        { value: "50+", label: "Projects Delivered" },
        { value: "8–10 Weeks", label: "Avg Delivery Time" },
        { value: "98%", label: "Client Satisfaction" },
      ]}
    />
  );
}

/* ── PROCESS STEPS ── */

/* ── HELPERS ── */
function useInView(threshold=.12) {
  const ref = useRef(); const [v, setV] = useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);io.disconnect();}},{threshold});io.observe(el);return()=>io.disconnect();},[]);
  return [ref,v];
}
function Reveal({children,delay=0,style={}}) {
  const [ref,v]=useInView();
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:`opacity .7s ${delay}s,transform .7s ${delay}s`,...style}}>{children}</div>;
}
const Btn=({href,primary,children,onClick})=>{
  const base={display:"inline-flex",alignItems:"center",gap:6,padding:".78rem 1.8rem",fontFamily:G.mono,fontWeight:700,fontSize:".75rem",letterSpacing:".06em",textTransform:"uppercase",transition:"all .25s",clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",cursor:"none"};
  const p={background:G.accent,color:"#000"};const g={background:"transparent",border:`1px solid ${G.border}`,color:G.muted};
  return <a href={href} onClick={onClick} style={{...base,...(primary?p:g)}}
    onMouseEnter={e=>{if(primary){e.currentTarget.style.boxShadow=`0 0 28px rgba(0,212,255,.5)`;e.currentTarget.style.transform="translateY(-2px)";}else{e.currentTarget.style.borderColor=G.accent;e.currentTarget.style.color=G.accent;}}}
    onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";if(!primary){e.currentTarget.style.borderColor=G.border;e.currentTarget.style.color=G.muted;}}}>{children}</a>;
};
const Arrow=()=><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M6.5 2l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;

/* ── SERVICE CARD (grid view) ── */
function ServiceCard({s, onSelect, selected}) {
  const [hov,setHov]=useState(false);
  return (
    <div style={{background:selected?G.surface:hov?G.surface:G.bg2,border:`1px solid ${selected?s.color:hov?"rgba(0,212,255,.25)":G.border}`,padding:"2rem",position:"relative",overflow:"hidden",transition:"all .3s",cursor:"none",transform:hov&&!selected?"translateY(-4px)":"none"}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>onSelect(s.id)}>
      {selected&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${s.color},transparent)`}}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.2rem"}}>
        <div style={{color:s.color,transition:"transform .3s",transform:hov?"scale(1.1) rotate(-5deg)":"none"}}>{s.icon}</div>
        <span style={{fontFamily:G.mono,fontSize:".65rem",color:G.muted,letterSpacing:".08em"}}>{s.num}</span>
      </div>
      <h3 style={{fontSize:"1.1rem",fontWeight:700,letterSpacing:"-.01em",marginBottom:".5rem",color:selected?G.text:hov?G.text:G.text}}>{s.title}</h3>
      <p style={{fontSize:".82rem",color:G.muted,lineHeight:1.65,marginBottom:"1.2rem"}}>{s.short}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {s.tags.slice(0,3).map(t=><span key={t} style={{fontFamily:G.mono,fontSize:".6rem",color:s.color,border:`1px solid ${s.color}22`,padding:".15rem .5rem",background:`${s.color}08`,letterSpacing:".05em"}}>{t}</span>)}
      </div>
      {/* hover arrow */}
      <div style={{position:"absolute",bottom:"1.5rem",right:"1.5rem",color:s.color,opacity:hov||selected?1:0,transform:hov||selected?"translateX(0)":"translateX(-8px)",transition:"all .25s"}}>
        <Arrow/>
      </div>
      {/* glow */}
      <div style={{position:"absolute",bottom:-50,right:-50,width:140,height:140,background:`radial-gradient(circle,${s.color}18,transparent 70%)`,pointerEvents:"none",opacity:hov||selected?1:0,transition:"opacity .4s"}}/>
    </div>
  );
}

/* ── SERVICE DETAIL PANEL ── */
function ServiceDetail({s}) {
  const [ref,v]=useInView();
  return (
    <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(20px)",transition:"opacity .5s,transform .5s",background:G.surface,border:`1px solid ${G.border}`,borderTop:`2px solid ${s.color}`,padding:"3rem",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,right:0,width:300,height:300,background:`radial-gradient(circle at 100% 0%,${s.color}0d,transparent 65%)`,pointerEvents:"none"}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem"}}>
        {/* Left */}
        <div>
          <div style={{color:s.color,marginBottom:"1.2rem"}}>{s.icon}</div>
          <span style={{fontFamily:G.mono,fontSize:".65rem",color:G.muted,letterSpacing:".1em",textTransform:"uppercase"}}>Service {s.num}</span>
          <h2 style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,letterSpacing:"-.03em",lineHeight:1.1,margin:".4rem 0 1rem"}}>{s.title}</h2>
          <p style={{fontSize:".92rem",color:G.muted,lineHeight:1.8,marginBottom:"1.8rem"}}>{s.desc}</p>
          <div style={{display:"flex",gap:".6rem",flexWrap:"wrap"}}>
            {s.tags.map(t=><span key={t} style={{fontFamily:G.mono,fontSize:".65rem",color:s.color,border:`1px solid ${s.color}33`,padding:".25rem .65rem",background:`${s.color}0a`,letterSpacing:".05em"}}>{t}</span>)}
          </div>
        </div>
        {/* Right */}
        <div>
          <div style={{marginBottom:"2rem"}}>
            <p style={{fontFamily:G.mono,fontSize:".65rem",color:s.color,letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1rem"}}>// What's included</p>
            {s.features.map((f,i)=>(
              <div key={f} style={{display:"flex",alignItems:"flex-start",gap:10,padding:".65rem 0",borderBottom:`1px solid ${G.border}`,animation:`fadeUp .4s ${i*.06}s both`}}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0,marginTop:2}}><path d="M2 7l3.5 3.5L12 4" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{fontSize:".85rem",color:G.text,lineHeight:1.5}}>{f}</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{fontFamily:G.mono,fontSize:".65rem",color:s.color,letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1rem"}}>// Deliverables</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem"}}>
              {s.deliverables.map(d=>(
                <div key={d} style={{background:G.bg,border:`1px solid ${G.border}`,padding:".6rem .8rem",fontFamily:G.mono,fontSize:".67rem",color:G.muted,letterSpacing:".04em",display:"flex",alignItems:"center",gap:6}}>
                  <span style={{width:4,height:4,background:s.color,borderRadius:"50%",flexShrink:0}}/>
                  {d}
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:"1.8rem"}}>
            <Btn href="#contact" primary>Start This Project <Arrow/></Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PROCESS SECTION ── */
function Process() {
  return (
    <section id="process" style={{padding:"8rem 4rem",background:G.bg,borderTop:`1px solid ${G.border}`}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <Reveal>
          <div style={{textAlign:"center",marginBottom:"4rem"}}>
            <p style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{color:G.green}}>//</span>How We Work</p>
            <h2 style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:"1rem"}}>
              Precision from <span style={{background:`linear-gradient(100deg,${G.accent},${G.green})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>day one</span>
            </h2>
            <p style={{fontSize:".95rem",color:G.muted,maxWidth:480,margin:"0 auto",lineHeight:1.75}}>A clear process eliminates surprises and gets your product to market faster.</p>
          </div>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:G.border,border:`1px solid ${G.border}`}}>
          {PROCESS.map((p,i)=>(
            <Reveal key={p.num} delay={i*.07}>
              <div style={{background:G.bg,padding:"2.2rem",position:"relative",overflow:"hidden",height:"100%",transition:"background .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=G.surface;}}
                onMouseLeave={e=>{e.currentTarget.style.background=G.bg;}}>
                <div style={{position:"absolute",top:-20,right:-20,fontFamily:G.mono,fontSize:"5rem",fontWeight:700,color:G.accent,opacity:.04,lineHeight:1}}>{p.num}</div>
                <div style={{fontFamily:G.mono,fontSize:".7rem",color:G.accent,letterSpacing:".1em",marginBottom:"1rem"}}>{p.num}</div>
                <h3 style={{fontSize:"1.05rem",fontWeight:700,marginBottom:".6rem",letterSpacing:"-.01em"}}>{p.title}</h3>
                <p style={{fontSize:".83rem",color:G.muted,lineHeight:1.68}}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const [open,setOpen]=useState(null);
  return (
    <section style={{padding:"8rem 4rem",background:G.bg2,borderTop:`1px solid ${G.border}`}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <Reveal>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <p style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{color:G.green}}>//</span>FAQ</p>
            <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,letterSpacing:"-.03em"}}>Common <span style={{background:`linear-gradient(100deg,${G.accent},${G.green})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>questions</span></h2>
          </div>
        </Reveal>
        {FAQS.map((f,i)=>(
          <Reveal key={f.question} delay={i*.06}>
            <div style={{borderBottom:`1px solid ${G.border}`,overflow:"hidden"}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.4rem 0",background:"none",border:"none",cursor:"none",textAlign:"left",gap:"1rem"}}>
                <span style={{fontSize:"1rem",fontWeight:700,color:open===i?G.accent:G.text,transition:"color .25s",letterSpacing:"-.01em"}}>{f.question}</span>
                <span style={{color:open===i?G.accent:G.muted,transition:"transform .3s,color .25s",transform:open===i?"rotate(45deg)":"none",fontSize:"1.4rem",lineHeight:1,flexShrink:0}}>+</span>
              </button>
              <div style={{maxHeight:open===i?200:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.4,0,.2,1)"}}>
                <p style={{fontSize:".9rem",color:G.muted,lineHeight:1.78,paddingBottom:"1.4rem"}}>{f.answer}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── CTA STRIP ── */
function CTAStrip() {
  return (
    <section id="contact" style={{position:"relative",overflow:"hidden",background:G.bg,borderTop:`1px solid ${G.border}`,padding:"7rem 4rem",textAlign:"center"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,background:`radial-gradient(ellipse,rgba(0,212,255,.07),transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{maxWidth:640,margin:"0 auto",position:"relative",zIndex:2}}>
        <Reveal>
          <p style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1rem",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{color:G.green}}>//</span>Let's Build</p>
          <h2 style={{fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-.03em",marginBottom:"1.2rem"}}>
            Ready to start<br/><span style={{background:`linear-gradient(100deg,${G.accent},${G.green})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>your project?</span>
          </h2>
          <p style={{fontSize:".95rem",color:G.muted,lineHeight:1.75,marginBottom:"2.5rem"}}>Tell us about your idea. We'll get back to you within 24 hours with a plan.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <Btn href="mailto:hello@techcean.co.in" primary>Get a Free Quote <Arrow/></Btn>
            <Btn href="https://techcean.co.in">Visit Our Site</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{background:G.bg,borderTop:`1px solid ${G.border}`,padding:"1.8rem 4rem"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <a href="/" style={{fontFamily:G.mono,fontSize:".95rem",fontWeight:700,display:"flex",alignItems:"center",gap:2}}><span style={{color:G.green}}>&lt;</span><span>TechCean</span><span style={{color:G.green}}>/&gt;</span></a>
        <span style={{fontFamily:G.mono,fontSize:".62rem",color:G.muted,letterSpacing:".06em"}}>© 2025 TechCean. All rights reserved.</span>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Home","Privacy","Contact"].map(l=><a key={l} href="#" style={{fontFamily:G.mono,fontSize:".62rem",color:G.muted,letterSpacing:".06em",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color=G.accent} onMouseLeave={e=>e.target.style.color=G.muted}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ── SERVICES MAIN GRID ── */
function ServicesGrid() {
  const [selected, setSelected] = useState("web");
  const selectedService = SERVICES.find(s=>s.id===selected);
  return (
    <section id="services" style={{padding:"6rem 4rem",maxWidth:1280,margin:"0 auto"}}>
      <Reveal style={{marginBottom:"1rem"}}>
        <p style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",gap:6}}><span style={{color:G.green}}>//</span>All Services</p>
        <p style={{fontSize:".9rem",color:G.muted,maxWidth:480,lineHeight:1.7}}>Click any service to explore what's included, our tech stack, and deliverables.</p>
      </Reveal>

      {/* Grid of cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:G.border,border:`1px solid ${G.border}`,marginTop:"2rem",marginBottom:"2rem"}}>
        {SERVICES.map((s,i)=>(
          <Reveal key={s.id} delay={i*.07}>
            <ServiceCard s={s} onSelect={setSelected} selected={selected===s.id}/>
          </Reveal>
        ))}
      </div>

      {/* Detail panel */}
      <ServiceDetail s={selectedService} key={selected}/>
    </section>
  );
}

/* ── APP ── */
export default function ServicesPage() {
  return (
    <>
      <style>{css}</style>
      <Cursor/>
      <Nav active="Services" />
      <ServicesHero/>
      <ServicesGrid/>
      <Process/>
      <FAQ/>
      <CTAStrip/>
      <Footer/>
    </>
  );
}
