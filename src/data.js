export const layers = [
  {
    id: 0, label: "L0: Ingestion Engine", color: "#2E86AB",
    purpose: "Capture everything from every source",
    components: ["Email (8 accounts)", "OneDrive docs", "Plaud transcripts", "Social media", "WhatsApp/iMessage", "Photos + EXIF", "AI conversations", "Scanned docs + OCR", "News/RSS", "Browser saves", "Location data", "Calendar events"],
    pipeline: "Extract → Deduplicate → Normalise → Classify (PARA) → Embed → Store",
    mike: "Feeds physical docs, corrects classifications",
    holly: "Monitors pipeline health, handles exceptions"
  },
  {
    id: 1, label: "L1: Information Repository", color: "#3C8D6E",
    purpose: "Single source of truth for all content",
    components: ["SQLite database", "File store (media/attachments)", "Metadata (PARA tags, dates, correspondents, sensitivity)", "Financial records table", "Ingestion audit log"],
    pipeline: "~100GB estimated for full v1 (email + docs + selective photos)",
    mike: "None day-to-day",
    holly: "Maintains, vacuums, reindexes, reports health"
  },
  {
    id: 2, label: "L2: Search & Retrieval", color: "#5BA08A",
    purpose: "Makes everything findable through multiple access patterns",
    components: ["Full-text search (SQLite FTS5)", "Semantic search (Vector embeddings)", "Filtered retrieval (PARA/date/correspondent)", "Temporal queries (date-indexed)", "Evidence compilation (combined modes)", "Relationship traversal (graph queries)"],
    mike: "Asks questions",
    holly: "Translates queries, combines modes, ranks results"
  },
  {
    id: 3, label: "L3: Knowledge Graph", color: "#A23B72",
    purpose: "Understands relationships, tracks activity, detects patterns",
    components: ["Entities: People, orgs, projects, docs, topics, places", "Relationships: works_at, attends, supplies, relates_to_project", "Activity streams: temporal interaction log", "Patterns: response times, invoice cycles, work habits", "Financial subgraph: income, expenses, anomaly detection"],
    mike: "Approves schema changes, corrects relationships",
    holly: "Maintains graph, extracts entities, proposes patterns"
  },
  {
    id: 4, label: "L4: Visual Access & Reporting", color: "#D4A843",
    purpose: "Makes the ecosystem visible to humans",
    components: ["Notion (UB3) — system of record", "Daily briefing → Telegram + Notion", "Evidence packs (EHCP/LAC/tax)", "Dashboards (health, ingestion, costs)", "Reports (financial, fostering, PMO)", "Family interface (restricted query access)"],
    mike: "Reviews outputs, navigates Notion",
    holly: "Produces all outputs, maintains sync"
  },
  {
    id: 5, label: "L5: Workflow Engine", color: "#E07A4F",
    purpose: "Multi-step processes with triggers, deadlines, and handoffs",
    components: ["EHCP review prep (6 weeks before)", "LAC review prep (4 weeks before)", "SplashDen month-end (1st monthly)", "Tax year prep (1 March annually)", "Daily briefing (06:00 daily)", "Meeting preparation (calendar trigger)", "Follow-up tracking (flagged items)"],
    pipeline: "Automated (Holly) | Manual (Mike) | Approval-gated (Holly proposes, Mike approves)",
    mike: "Approves definitions, completes manual steps, reviews at gates",
    holly: "Runs workflows, completes auto steps, tracks deadlines"
  },
  {
    id: 6, label: "L6: Action Engine", color: "#C94C4C",
    purpose: "Holly acts on the external world — with approval",
    components: ["Send email (Graph API / Gmail)", "Create/update calendar (Graph / Apple)", "Send messages (WhatsApp / Telegram)", "Post social media (Meta Business API)", "Create Notion content (API)", "Submit forms (browser automation)"],
    pipeline: "Holly identifies need → Drafts → Presents to Mike → Approves → Executes → Logged → Graph updated",
    mike: "Reviews and approves all external actions",
    holly: "Identifies needs, drafts, executes on approval, logs"
  },
  {
    id: 7, label: "L7: Agents", color: "#1E3A5F",
    purpose: "The actors — they use everything below",
    components: ["Holly: PA / PM / Chief of Staff (4 modes)", "Sub-agents: Briefing, Evidence, Meeting prep, Research, Code review", "Family agents: Milly's interface (restricted read-only)", "Team agents (v2+): Client-scoped PMO agents"],
    pipeline: "Scheduled (autonomous) | Reactive (Mike decides) | Proactive (Holly alerts) | Delegated (within scope)",
    mike: "Directs Holly, provides judgment, manages permissions",
    holly: "Everything else — operational heart of the ecosystem"
  }
];

export const crossCutting = [
  { icon: "🛡️", title: "Security & Access Control", items: ["Sensitivity: Public → Internal → Sensitive → Restricted", "Fostering data: always Restricted", "Role-based: Mike (full) → Holly (principled) → Family (scoped) → Team (project)", "Encryption at rest, audit trail on every access"] },
  { icon: "📡", title: "Observability & Alerting", items: ["Ingestion failures >1hr", "Classification confidence <80%", "Storage >80% alert", "API costs >80% budget", "Workflow >24hr overdue"] },
  { icon: "💾", title: "Backup & Recovery", items: ["SQLite: daily snapshot → OneDrive + weekly external", "File store: mirrored to OneDrive", "Config + memory: Git (minutes recovery)", "Target: 24 hours data, minutes config"] },
  { icon: "🔄", title: "Feedback & Learning Loop", items: ["Classification corrections → retrain patterns", "Quality ratings → adjust format/depth", "Tacit knowledge proposals → Mike approves", "Monthly accuracy, quarterly quality review"] },
  { icon: "💷", title: "Cost Management", items: ["Anthropic API: hard cap + 80% alert + circuit breaker", "Microsoft Graph: free tier, monitor rate limits", "Gmail: free tier, monitor quota", "Storage: growth monitoring + threshold alerts"] },
  { icon: "⏱️", title: "Data Retention", items: ["Fostering records: 75 years (statutory)", "Financial: 7 years (HMRC)", "Work email: engagement + 2 years", "News/RSS: 90 days rolling", "Location: 1 year rolling"] }
];

export const useCases = [
  { id: 1, title: "EHCP Evidence Compilation", badge: "Highest Value", badgeColor: "#C94C4C", today: "Manual search across 3 email accounts, OneDrive, WhatsApp, Plaud. Takes days. Things get missed.", withOs: "Holly compiles everything, assembles evidence timeline, identifies gaps, produces draft pack. Mike reviews.", layers: [0,1,2,3,4,5,7] },
  { id: 2, title: "SplashDen Tax Preparation", badge: "High Value", badgeColor: "#E07A4F", today: "Manual trawl through email, bank statements, receipts. Hours of spreadsheet work.", withOs: "Holly queries financial layer, cross-references SimplyBook, produces income/expense summary with linked source docs, flags gaps.", layers: [0,1,2,3,4,7] },
  { id: 3, title: "Daily Briefing", badge: "Partially Built", badgeColor: "#3C8D6E", today: "Separate briefing system with independent data gathering per domain.", withOs: "Briefing becomes a consumer of the Ingestion Engine. Pre-classified content, no duplicate API calls.", layers: [0,1,2,4,7] },
  { id: 4, title: "PMO Client Onboarding", badge: "Future — v2+", badgeColor: "#6B6B8D", today: "Manual setup of project controls and document management per client.", withOs: "Holly creates scoped workspace. Client docs flow through ingestion with isolation. Team agent provides search and reporting.", layers: [0,1,2,3,4,5,6,7] },
  { id: 5, title: "Proactive Intelligence", badge: "Differentiator", badgeColor: "#A23B72", today: "Mike discovers relevant connections manually, if at all.", withOs: "Holly detects cross-domain connections. Flags policy changes affecting active projects before deadlines.", layers: [0,3,5,7] },
  { id: 6, title: "Family Extension", badge: "Quality of Life", badgeColor: "#D4A843", today: "Family members ask Mike for info he has to look up manually.", withOs: "Milly asks 'when's the next pool booking?' and gets an answer from the same data Holly uses. No fostering/financial access.", layers: [1,2,7] }
];

export const buildPhases = [
  { phase: "Foundation", timing: "Now", status: "In Progress", color: "#3C8D6E", items: ["Comms Engine Phase 0-1", "Digital Twin Tasks 1-2", "Holly Memory"], layers: "L0, L1, L3, L7" },
  { phase: "Core Pipeline", timing: "Next", status: "Ready", color: "#2E86AB", items: ["Email connectors (Graph + Gmail)", "OneDrive ingestion", "PARA classifier", "Search index"], layers: "L0, L1, L2" },
  { phase: "Intelligence", timing: "After Core", status: "Planned", color: "#A23B72", items: ["Knowledge graph subgraphs", "Entity auto-extraction", "Financial data model", "Pattern detection"], layers: "L3" },
  { phase: "Output & Action", timing: "After Intelligence", status: "Planned", color: "#D4A843", items: ["Briefing refactor", "Notion sync", "Dashboard MVP", "Workflow engine", "Action engine"], layers: "L4, L5, L6" },
  { phase: "Extended Sources", timing: "Parallel", status: "Planned", color: "#E07A4F", items: ["Plaud transcripts", "Social media", "WhatsApp/iMessage", "Photos", "AI conversations", "News/RSS"], layers: "L0" },
  { phase: "Family & Team", timing: "v1.x / v2", status: "Future", color: "#6B6B8D", items: ["Milly's restricted interface", "Team agent prototype", "Digital PMO as a Service packaging"], layers: "L7 + Security" }
];

export const consolidation = [
  { label: "Communications Engine", mapsTo: "Layers 0-2", status: "Phase 0 complete", color: "#2E86AB" },
  { label: "Digital Twin & Knowledge Graph", mapsTo: "Layer 3", status: "Task 1 in progress", color: "#A23B72" },
  { label: "Daily Briefing System", mapsTo: "Layer 4 consumer", status: "Operational — needs refactoring", color: "#D4A843" },
  { label: "Holly Memory System", mapsTo: "Layer 7 context", status: "Phase 2 implemented", color: "#1E3A5F" },
  { label: "Claude Export App", mapsTo: "Layer 0 connector", status: "Built — needs integration", color: "#2E86AB" },
  { label: "Plugin Architecture", mapsTo: "Build methodology", status: "Framework defined", color: "#6B6B8D" },
  { label: "The Knowledge System", mapsTo: "Cross-cutting methodology", status: "Ongoing", color: "#6B6B8D" }
];

export const infrastructure = [
  { icon: "🖥️", title: "Holly (Mac Mini)", desc: "Primary runtime — agent, ingestion, repository, search, graph, workflows" },
  { icon: "💻", title: "Queeg (Windows/Docker)", desc: "Heavy processing — bulk OCR, embeddings, backup, dev/test" },
  { icon: "☁️", title: "OneDrive", desc: "Working docs, backup target, mobile consumption folder" },
  { icon: "📋", title: "Notion (UB3)", desc: "System of record — human-facing interface, PARA backbone" },
  { icon: "📱", title: "Telegram", desc: "Briefing delivery, quick Holly interactions" }
];

export const successCriteria = [
  { icon: "✅", title: "Ingestion", target: "All 8 email accounts flowing, >85% classification confidence" },
  { icon: "🔍", title: "Search", target: "<30 seconds for any query across full repository" },
  { icon: "📄", title: "Evidence", target: "EHCP prep reduced from days to hours" },
  { icon: "📈", title: "Financial", target: "SplashDen month-end in <30 minutes of Mike's time" },
  { icon: "👁️", title: "Intelligence", target: "≥1 proactive insight per week that Mike acts on" }
];
