export const STEPS = [
  {
    num: "01", phase: "Phase One",
    title: "Discovery & Alignment",
    icon: "◎",
    color: "#00d4ff",
    duration: "1–2 weeks",
    desc: "We start by deeply understanding your business, users, and technical landscape. No assumptions, no templates.",
    details: [
      "Stakeholder interviews & goal mapping",
      "User research & persona definition",
      "Competitor & market analysis",
      "Technical feasibility audit",
      "Risk identification & mitigation plan",
    ],
    deliverable: "Project Charter + Technical Brief",
  },
  {
    num: "02", phase: "Phase Two",
    title: "Architecture & Design",
    icon: "⬡",
    color: "#00ff9d",
    duration: "1–3 weeks",
    desc: "System design, tech stack selection, and UI/UX wireframes — all locked before a single line of production code.",
    details: [
      "Database schema & API contract design",
      "Tech stack selection & rationale",
      "UI/UX wireframes & prototypes",
      "Component library setup",
      "Infrastructure & DevOps planning",
    ],
    deliverable: "Architecture Doc + Figma Prototype",
  },
  {
    num: "03", phase: "Phase Three",
    title: "Build Sprints",
    icon: "⚡",
    color: "#8b5cf6",
    duration: "4–12 weeks",
    desc: "Two-week sprints with real deliverables at every checkpoint. Staging previews, async standups, total transparency.",
    details: [
      "Two-week sprint cycles",
      "Daily async standups via Slack/Linear",
      "Live staging environment previews",
      "Code review & QA at each sprint",
      "Weekly client sync & demo",
    ],
    deliverable: "Working Product Increments",
  },
  {
    num: "04", phase: "Phase Four",
    title: "QA & Hardening",
    icon: "◈",
    color: "#00d4ff",
    duration: "1–2 weeks",
    desc: "Automated tests, load testing, security audits, and accessibility checks — we don't ship anything we wouldn't use ourselves.",
    details: [
      "Unit, integration & E2E test suite",
      "Load & performance benchmarking",
      "Security vulnerability audit",
      "WCAG accessibility compliance",
      "Cross-browser & device testing",
    ],
    deliverable: "QA Report + Bug-free Build",
  },
  {
    num: "05", phase: "Phase Five",
    title: "Launch & Handoff",
    icon: "▲",
    color: "#00ff9d",
    duration: "1 week",
    desc: "Zero-downtime deployment, full documentation, team training, and a smooth handover so you can run independently.",
    details: [
      "CI/CD pipeline configuration",
      "Zero-downtime production deployment",
      "Full technical documentation",
      "Team training & walkthrough sessions",
      "Post-launch monitoring setup",
    ],
    deliverable: "Live Product + Full Documentation",
  },
  {
    num: "06", phase: "Phase Six",
    title: "Support & Scale",
    icon: "∞",
    color: "#8b5cf6",
    duration: "Ongoing",
    desc: "We don't disappear after launch. Retainer options, feature sprints, performance monitoring — we grow with you.",
    details: [
      "Monthly retainer engagements",
      "24h critical bug response SLA",
      "Feature sprint planning & execution",
      "Performance monitoring & reporting",
      "Strategic product roadmap advisory",
    ],
    deliverable: "Growth-Ready Product",
  },
];


export const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Most web and mobile projects complete in 8–14 weeks. AI integrations typically take 4–8 weeks. Larger platforms and custom solutions vary based on scope.",
  },
  {
    q: "What is your development methodology?",
    a: "We follow agile with two-week sprints. Each sprint delivers working, testable software. You'll see progress every two weeks with demos and feedback sessions.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes. All projects include 30 days of hypercare after launch. We also offer retainers for ongoing improvements, maintenance, and new feature development.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We've successfully augmented existing teams, provided code reviews, and done knowledge transfer. We adapt to your workflow.",
  },
  {
    q: "How do you handle pricing and payments?",
    a: "We provide fixed-price quotes for defined scope, and time-and-materials for ongoing work. Payments are milestone-based: 30% start, 30% midpoint, 40% completion.",
  },
  {
    q: "What if our requirements change mid-project?",
    a: "We build flexibility into our process. Scope changes go through a change request process with transparent impact assessment before we proceed.",
  },
];

export const TOOLS = [
  { icon: "Ln", label: "Linear", color: "#5e6ad2" },
  { icon: "Gh", label: "GitHub", color: "#00d4ff" },
  { icon: "Fg", label: "Figma", color: "#00ff9d" },
  { icon: "Sl", label: "Slack", color: "#8b5cf6" },
  { icon: "Vr", label: "Vercel", color: "#00d4ff" },
  { icon: "Dk", label: "Docker", color: "#00ff9d" },
  { icon: "Aw", label: "AWS", color: "#8b5cf6" },
  { icon: "Nt", label: "Notion", color: "#00d4ff" },
];;