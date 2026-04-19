import { useState, useEffect, useRef } from "react";
import "./styles/global.css";

const G = {
  bg: "#04060f", bg2: "#07091a", surface: "#0b0f1e",
  accent: "#00d4ff", green: "#00ff9d", purple: "#8b5cf6",
  text: "#e2eeff", muted: "#4f6080", border: "rgba(0,212,255,.1)",
  mono: "'Space Mono', monospace", display: "'Syne', sans-serif",
};

const css = `
@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.6)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
`;

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f);},[]);
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:scrolled?"1rem 4rem":"1.6rem 4rem",transition:"all .4s",background:scrolled?"rgba(4,6,15,.92)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?`1px solid ${G.border}`:"1px solid transparent"}}>
      <a href="/" style={{fontFamily:G.mono,fontSize:"1rem",fontWeight:700,display:"flex",alignItems:"center",gap:2}}>
        <span style={{color:G.green}}>&lt;</span><span>TechCean</span><span style={{color:G.green}}>/&gt;</span>
      </a>
      <ul style={{display:"flex",gap:"2.5rem",listStyle:"none",alignItems:"center"}}>
        {[["Services","#services"],["Work","#work"],["Process","#process"],["Contact","#contact"]].map(([l,h])=>(
          <li key={l}><a href={h} style={{fontFamily:G.mono,fontSize:".72rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:l==="Contact"?G.accent:G.muted,transition:"color .2s"}} onMouseEnter={e=>e.target.style.color=G.text} onMouseLeave={e=>e.target.style.color=l==="Services"?G.accent:G.muted}>{l}</a></li>
        ))}
      </ul>
      <a href="#contact" style={{fontFamily:G.mono,fontSize:".72rem",fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",padding:".55rem 1.4rem",border:`1px solid ${G.accent}`,color:G.accent,clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",transition:"all .25s"}}
        onMouseEnter={e=>{e.currentTarget.style.background=G.accent;e.currentTarget.style.color="#000";e.currentTarget.style.boxShadow=`0 0 24px rgba(0,212,255,.45)`;}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=G.accent;e.currentTarget.style.boxShadow="none";}}>
        Get Started
      </a>
    </nav>
  );
}

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

function ContactHero() {
  return (
    <section style={{position:"relative",minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"10rem 4rem 6rem",overflow:"hidden",borderBottom:`1px solid ${G.border}`}}>
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.14}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cgrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={G.accent} strokeWidth=".4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cgrid)"/>
      </svg>
      {[["0,0","top:2rem;left:2rem"],["0,0","top:2rem;right:2rem;transform:scaleX(-1)"],["0,0","bottom:2rem;left:2rem;transform:scaleY(-1)"],["0,0","bottom:2rem;right:2rem;transform:scale(-1,-1)"]].map(([,s],i)=>(
        <svg key={i} width="40" height="40" style={{position:"absolute",...Object.fromEntries(s.split(";").map(x=>x.split(":")))}} viewBox="0 0 40 40" fill="none">
          <path d="M2 18V2h16" stroke={G.accent} strokeWidth="1.5" opacity=".5"/>
        </svg>
      ))}
      <div style={{position:"absolute",top:"30%",left:"50%",transform:"translateX(-50%)",width:500,height:300,background:`radial-gradient(ellipse,rgba(0,212,255,.08),transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:2}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:".28rem .85rem",border:`1px solid rgba(0,255,157,.22)`,background:"rgba(0,255,157,.05)",fontFamily:G.mono,fontSize:".65rem",letterSpacing:".1em",color:G.green,marginBottom:"1.6rem",animation:"fadeUp .7s both"}}>
          <span style={{width:5,height:5,background:G.green,borderRadius:"50%",animation:"pulse 2s infinite"}}/>
          GET IN TOUCH
        </div>
        <h1 style={{fontSize:"clamp(3rem,7vw,6rem)",fontWeight:800,lineHeight:1,letterSpacing:"-.035em",marginBottom:"1.2rem",animation:"fadeUp .6s .1s both"}}>
          Let's <span style={{background:`linear-gradient(100deg,${G.accent},${G.green})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>connect</span>
        </h1>
        <p style={{fontSize:"clamp(.9rem,1.4vw,1.1rem)",color:G.muted,lineHeight:1.78,maxWidth:520,margin:"0 auto",animation:"fadeUp .6s .2s both"}}>
          Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
        </p>
      </div>
    </section>
  );
}

const CONTACTS = [
  { label: "Email", value: "hello@techcean.co.in", icon: "✉" },
  { label: "Phone", value: "+91 83297 78934", icon: "📞" },
  { label: "Location", value: "Mumbai, India", icon: "📍" },
];

const SOCIALS = [
  { name: "GitHub", href: "https://github.com", icon: "⌘" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "◈" },
  { name: "Twitter", href: "https://twitter.com", icon: "✦" },
  { name: "Instagram", href: "https://instagram.com", icon: "◎" },
];

function ContactInfo() {
  return (
    <section style={{padding:"6rem 4rem",background:G.bg2,borderTop:`1px solid ${G.border}`}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",gap:6}}>
          <span style={{color:G.green}}>//</span> Contact Info
        </div>
        <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,lineHeight:1.06,letterSpacing:"-.03em",marginBottom:"2.5rem"}}>
          Reach us at
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
          {CONTACTS.map((c,i)=>(
            <div key={c.label} style={{background:G.surface,border:`1px solid ${G.border}`,padding:"2rem",display:"flex",flexDirection:"column",gap:"1rem",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=G.accent;e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.transform="none";}}>
              <span style={{fontSize:"1.5rem"}}>{c.icon}</span>
              <div>
                <div style={{fontFamily:G.mono,fontSize:".65rem",color:G.muted,letterSpacing:".08em",textTransform:"uppercase",marginBottom:".4rem"}}>{c.label}</div>
                <a href={c.label==="Email"?`mailto:${c.value}`:"#"} style={{fontSize:"1rem",fontWeight:600,color:G.text,transition:"color .2s"}}
                  onMouseEnter={e=>e.target.style.color=G.accent} onMouseLeave={e=>e.target.style.color=G.text}>{c.value}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({name:"",email:"",project:"",budget:"",message:""});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const handleChange = e => setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit = e => { e.preventDefault(); setSending(true); setTimeout(()=>{setSending(false);setSent(true);},1500); };
  const inputStyle = {width:"100%",background:G.surface,border:`1px solid ${G.border}`,padding:"1rem 1.2rem",fontFamily:G.mono,fontSize:".85rem",color:G.text,outline:"none",transition:"border-color .25s"};
  return (
    <section style={{padding:"6rem 4rem",borderTop:`1px solid ${G.border}`}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",gap:6}}><span style={{color:G.green}}>//</span> Send a Message</div>
        <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,lineHeight:1.06,letterSpacing:"-.03em",marginBottom:"2.5rem"}}>Start a conversation</h2>
        {sent ? (
          <div style={{background:G.surface,border:`1px solid ${G.green}`,padding:"3rem",textAlign:"center"}}>
            <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✓</div>
            <div style={{fontSize:"1.25rem",fontWeight:700,marginBottom:".5rem"}}>Message sent!</div>
            <div style={{color:G.muted}}>We'll get back to you within 24 hours.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
              <input name="name" placeholder="Your Name *" value={form.name} onChange={handleChange} required style={inputStyle}
                onFocus={e=>e.target.style.borderColor=G.accent} onBlur={e=>e.target.style.borderColor=G.border}/>
              <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} required style={inputStyle}
                onFocus={e=>e.target.style.borderColor=G.accent} onBlur={e=>e.target.style.borderColor=G.border}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
              <input name="project" placeholder="Project Type" value={form.project} onChange={handleChange} style={inputStyle}
                onFocus={e=>e.target.style.borderColor=G.accent} onBlur={e=>e.target.style.borderColor=G.border}/>
              <select name="budget" value={form.budget} onChange={handleChange} style={{...inputStyle,cursor:"pointer"}}>
                <option value="" style={{color:G.muted}}>Select Budget</option>
                <option value="5k-10k" style={{color:G.text}}>$5k - $10k</option>
                <option value="10k-25k" style={{color:G.text}}>$10k - $25k</option>
                <option value="25k-50k" style={{color:G.text}}>$25k - $50k</option>
                <option value="50k+" style={{color:G.text}}>$50k+</option>
              </select>
            </div>
            <textarea name="message" placeholder="Tell us about your project *" value={form.message} onChange={handleChange} required rows={5} style={{...inputStyle,resize:"vertical",minHeight:120}}
              onFocus={e=>e.target.style.borderColor=G.accent} onBlur={e=>e.target.style.borderColor=G.border}/>
            <button type="submit" disabled={sending} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,padding:"1rem 2rem",background:sending?G.muted:G.accent,color:"#000",fontFamily:G.mono,fontSize:".8rem",fontWeight:700,letterSpacing:".05em",textTransform:"uppercase",border:"none",cursor:"pointer",clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",transition:"all .25s"}}
              onMouseEnter={e=>!sending && (e.currentTarget.style.boxShadow=`0 0 30px ${G.accent}66`)}
              onMouseLeave={e=>!sending && (e.currentTarget.style.boxShadow="none")}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section style={{padding:"6rem 4rem",background:G.bg2,borderTop:`1px solid ${G.border}`}}>
      <div style={{maxWidth:1280,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontFamily:G.mono,fontSize:".72rem",color:G.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".9rem",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><span style={{color:G.green}}>//</span> Follow Us</div>
        <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,lineHeight:1.06,letterSpacing:"-.03em",marginBottom:"2.5rem"}}>Join our community</h2>
        <div style={{display:"flex",justifyContent:"center",gap:"1.25rem",flexWrap:"wrap"}}>
          {SOCIALS.map(s=>(
            <a key={s.name} href={s.href} target="_blank" rel="noopener" style={{display:"inline-flex",alignItems:"center",gap:8,padding:".75rem 1.5rem",border:`1px solid ${G.border}`,color:G.muted,fontFamily:G.mono,fontSize:".75rem",letterSpacing:".05em",textTransform:"uppercase",transition:"all .25s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=G.accent;e.currentTarget.style.color=G.accent;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.color=G.muted;}}>
              <span>{s.icon}</span>{s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{background:G.bg,borderTop:`1px solid ${G.border}`,padding:"1.8rem 4rem"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
        <a href="/" style={{fontFamily:G.mono,fontSize:".95rem",fontWeight:700,display:"flex",alignItems:"center",gap:2}}>
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

export default function ContactPage() {
  return (
    <>
      <style>{css}</style>
      <Cursor />
      <Nav />
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <SocialSection />
      <Footer />
    </>
  );
}