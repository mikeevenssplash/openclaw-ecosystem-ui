# OpenClaw OS v1 Ecosystem Architecture — Interactive UI

## Brief
Build a fully interactive, deployable web UI that visualises the OpenClaw OS v1 Ecosystem Architecture. This is Mike's personal operating system — 8 layers, 6 use cases, cross-cutting concerns, roles, build sequence, and infrastructure.

## Requirements
- **Fully working** — no placeholders, no TODOs, no mock data
- **Interactive** — clickable layers, expandable sections, animated data flow
- **Beautiful** — follow the design tokens exactly (colours, typography, spacing)
- **Responsive** — works on desktop and tablet
- **Accessible** — WCAG AA, colour-blind safe (dual coding), high readability fonts (Lexend headings, Inter body)
- **Deployable** — single page, served statically

## Tech Stack (already installed)
- React + Vite + @vitejs/plugin-react
- Tailwind CSS + @tailwindcss/vite
- Framer Motion for animations
- No backend — all data is static in data files

## Design Tokens
```json
{
  "colors": {
    "primary": "#1E3A5F",
    "secondary": "#2E86AB",
    "accent": "#A23B72",
    "success": "#3C8D6E",
    "warning": "#D4A843",
    "background": "#F5F3EE",
    "surface": "#FFFFFF",
    "text_primary": "#1A1A2E",
    "text_secondary": "#4A4A6A",
    "layer_0": "#2E86AB",
    "layer_1": "#3C8D6E",
    "layer_2": "#5BA08A",
    "layer_3": "#A23B72",
    "layer_4": "#D4A843",
    "layer_5": "#E07A4F",
    "layer_6": "#C94C4C",
    "layer_7": "#1E3A5F",
    "cross_cutting": "#6B6B8D",
    "mike_color": "#2E86AB",
    "holly_color": "#A23B72"
  },
  "typography": {
    "headings": "Lexend (Google Fonts)",
    "body": "Inter (Google Fonts)"
  }
}
```

## Sections to Build

### 1. Header (Hero)
- Title: "OpenClaw OS v1"
- Subtitle: "A Personal Operating System for Capture, Intelligence, and Action"
- Metadata: Version 1.0, Date 23/02/2026, Owner Mike, Primary Agent Holly
- Design principle callout (italic banner): "Capture for contemplation and planning, not real-time response."

### 2. Executive Summary (4 cards)
- Captures Everything: Email (8 accounts), documents, photos, calls, AI chats, social media, news, location, scanned post
- Understands Context: Knowledge graph connects people, organisations, projects. Detects patterns across all life domains
- Acts on Your Behalf: Holly sends emails, schedules, compiles evidence — with Mike's approval
- Extends to Family & Team: Scoped access for family. Future: client-facing Digital PMO as a Service

### 3. Eight-Layer Architecture (THE CENTREPIECE)
Interactive layered diagram. Bottom-to-top: L0 (foundation) → L7 (agents).
Each layer is clickable/expandable with:
- Layer name + colour
- Purpose statement
- Component list (detailed)
- Pipeline/data flow description
- Role badges: Mike (blue) and Holly (magenta) showing who does what

**Layer data:**

**L0: Ingestion Engine** (color: #2E86AB)
- Purpose: Capture everything from every source
- Sources: Email (8 accounts), OneDrive docs, Plaud transcripts, Social media, WhatsApp/iMessage, Photos + EXIF, AI conversations, Scanned docs + OCR, News/RSS, Browser saves, Location data, Calendar events
- Pipeline: Extract → Deduplicate → Normalise → Classify (PARA) → Embed → Store
- Mike: Feeds physical docs, corrects classifications
- Holly: Monitors pipeline health, handles exceptions

**L1: Information Repository** (color: #3C8D6E)
- Purpose: Single source of truth for all content
- Components: SQLite database, File store (media/attachments), Metadata (PARA tags, dates, correspondents, sensitivity), Financial records table, Ingestion audit log
- Tech note: ~100GB estimated for full v1
- Mike: None day-to-day
- Holly: Maintains, vacuums, reindexes, reports health

**L2: Search & Retrieval** (color: #5BA08A)
- Purpose: Makes everything findable
- Modes: Full-text search (SQLite FTS5), Semantic search (Vector embeddings), Filtered retrieval (PARA/date/correspondent), Temporal queries, Evidence compilation, Relationship traversal
- Mike: Asks questions
- Holly: Translates queries, combines modes, ranks results

**L3: Knowledge Graph** (color: #A23B72)
- Purpose: Understands relationships, tracks activity, detects patterns
- Elements: Entities (People, orgs, projects, docs, topics, places), Relationships (works_at, attends, supplies, relates_to_project), Activity streams (temporal interaction log), Patterns (response times, invoice cycles, work habits), Financial subgraph (income, expenses, anomaly detection)
- Mike: Approves schema changes, corrects relationships
- Holly: Maintains graph, extracts entities, proposes patterns

**L4: Visual Access & Reporting** (color: #D4A843)
- Purpose: Makes the ecosystem visible to humans
- Surfaces: Notion (UB3) system of record, Daily briefing → Telegram + Notion, Evidence packs (EHCP/LAC/tax), Dashboards (health, ingestion, costs), Reports (financial, fostering, PMO), Family interface (restricted)
- Mike: Reviews outputs, navigates Notion
- Holly: Produces all outputs, maintains sync

**L5: Workflow Engine** (color: #E07A4F)
- Purpose: Multi-step processes with triggers, deadlines, handoffs
- Workflows: EHCP review prep (6 weeks before), LAC review prep (4 weeks before), SplashDen month-end (1st monthly), Tax year prep (1 March), Daily briefing (06:00), Meeting prep (calendar trigger), Follow-up tracking (flagged items)
- Step types: Automated (Holly executes) | Manual (Mike acts) | Approval-gated (Holly proposes, Mike approves)
- Mike: Approves definitions, completes manual steps, reviews at gates
- Holly: Runs workflows, completes auto steps, tracks deadlines

**L6: Action Engine** (color: #C94C4C)
- Purpose: Holly acts on the external world — with approval
- Actions: Send email (Graph API), Calendar (Graph/Apple), Messages (WhatsApp/Telegram), Social media (Meta API), Notion content (API), Form submission (browser automation)
- Lifecycle: Holly identifies need → Drafts → Presents to Mike → Mike approves → Holly executes → Logged → Graph updated
- Mike: Reviews and approves all external actions
- Holly: Identifies needs, drafts, executes on approval, logs

**L7: Agents** (color: #1E3A5F)
- Purpose: The actors — they use everything below
- Holly: Primary Agent (PA/PM/Chief of Staff) — 4 modes: Scheduled (autonomous), Reactive (Mike decides), Proactive (Holly alerts), Delegated (within scope)
- Sub-agents: Briefing agents, Evidence compiler, Meeting prep, Research synthesis, Code review
- Family agents: Milly's interface, future family members (restricted read-only)
- Team agents (v2+): Client-scoped PMO agents (isolated from personal data)
- Mike: Directs Holly, provides judgment, manages permissions
- Holly: Everything else — operational heart of the ecosystem

### 4. Cross-Cutting Concerns (6 cards)
- Security & Access Control: Sensitivity levels (Public→Restricted), fostering always Restricted, role-based access, encryption + audit
- Observability: Pipeline health, classification confidence, storage, API costs, workflow deadlines
- Backup & Recovery: SQLite daily snapshots, file mirror, git config, 24h recovery target
- Feedback & Learning Loop: Classification corrections, quality ratings, tacit knowledge proposals, monthly/quarterly reviews
- Cost Management: Anthropic API caps + circuit breaker, Graph/Gmail free tiers, storage monitoring
- Data Retention: Fostering 75 years, financial 7 years, work email engagement+2y, news 90 days, location 1 year

### 5. Use Cases (6 cards with Today vs With OS)
- UC1: EHCP Evidence Compilation (Highest Value) — Today: manual search across 3 accounts, days of work. With OS: Holly compiles everything, identifies gaps, produces draft pack. Layers: L0→L1→L2→L3→L4→L5→L7
- UC2: SplashDen Tax Preparation (High Value) — Today: manual trawl, hours of spreadsheets. With OS: Holly queries financial layer, cross-refs SimplyBook, flags gaps. Layers: L0→L1→L2→L3→L4→L7
- UC3: Daily Briefing (Already Partially Built) — Today: separate system, independent data gathering. With OS: consumer of Ingestion Engine, pre-classified content. Layers: L0→L1→L2→L4→L7
- UC4: PMO Client Onboarding (Future v2+) — With OS: scoped workspace, client isolation, team agent. Layers: All + security
- UC5: Proactive Intelligence (Differentiator) — With OS: Holly detects cross-domain connections automatically. Layers: L0→L3→L5→L7
- UC6: Family Extension (Quality of Life) — With OS: family queries via restricted interface. Layers: L1→L2→Security→L7

### 6. Roles (Mike vs Holly comparison)
**Mike** (blue, #2E86AB): Architect · Owner · Decision-Maker
- Governs: PARA taxonomy, graph schema, security policies, build priorities
- Participates: Reviews briefings, triggers searches, provides feedback, captures observations
- Approves: All external actions, workflow definitions, schema changes, learning updates
- Principle: "Mike thinks, decides, and acts on high-judgment tasks."

**Holly** (magenta, #A23B72): PA · Project Manager · Chief of Staff
- PA: Briefings, calendar, communication triage, meeting prep, reminders
- PM: Project monitoring, deadline tracking, workflow orchestration, cost tracking
- Chief of Staff: Pattern recognition, strategic surfacing, decision support, institutional memory, proactive intelligence
- Principles: Propose don't presume, explain reasoning, respect boundaries, fail gracefully, learn explicitly

### 7. Consolidation (existing projects → layers)
- Communications Engine → Layers 0-2 (Phase 0 complete)
- Digital Twin & Knowledge Graph → Layer 3 (Task 1 in progress)
- Daily Briefing System → Layer 4 consumer (Operational, needs refactoring)
- Holly Memory System → Layer 7 context (Phase 2 implemented)
- Claude Export App → Layer 0 connector (Built, needs integration)
- Plugin Architecture → Build methodology (Framework defined)
- The Knowledge System → Cross-cutting (Ongoing)

### 8. Build Sequence (6 phases)
1. Foundation (Now, In Progress): Comms Engine Phase 0-1, Digital Twin Tasks 1-2, Holly Memory — L0,L1,L3,L7
2. Core Pipeline (Next, Ready): Email connectors, OneDrive, PARA classifier, Search index — L0,L1,L2
3. Intelligence (After Core, Planned): Knowledge graph, entity extraction, financial model, pattern detection — L3
4. Output & Action (After Intelligence, Planned): Briefing refactor, Notion sync, Dashboard, Workflow engine, Action engine — L4,L5,L6
5. Extended Sources (Parallel, Planned): Plaud, social media, WhatsApp/iMessage, photos, AI convos, scanned docs, news — L0
6. Family & Team (v1.x/v2, Future): Milly's interface, team agent, Digital PMO packaging — L7+Security

### 9. Infrastructure (5 cards)
- Holly (Mac Mini): Primary runtime
- Queeg (Windows/Docker): Heavy processing, backup, dev/test
- OneDrive: Working docs, backup, mobile consumption
- Notion (UB3): System of record, PARA backbone
- Telegram: Briefing delivery, quick interactions

### 10. Success Criteria (5 cards)
- Ingestion: All 8 email accounts flowing, >85% classification confidence
- Search: <30 seconds for any query across full repository
- Evidence: EHCP prep reduced from days to hours
- Financial: SplashDen month-end in <30 minutes
- Intelligence: ≥1 proactive insight per week that Mike acts on

## Key Interactions to Implement
1. **Layer stack click-to-expand**: Click any layer → smoothly expands to show full detail
2. **Data flow animation**: Animated particles/lines flowing upward through layers (information journey)
3. **Role filter toggle**: Button to highlight Mike's vs Holly's responsibilities across all sections
4. **Use case → layer highlight**: Click a use case → relevant layers in the stack glow/highlight
5. **Build phase timeline**: Interactive horizontal timeline with progress indicators
6. **Sticky navigation**: Top nav with smooth scroll to sections
7. **Hover tooltips**: Rich info on components, badges, connections

## Have fun with it. Make it beautiful. Ship it.
