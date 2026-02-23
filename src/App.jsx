import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { layers, crossCutting, useCases, buildPhases, consolidation, infrastructure, successCriteria } from './data'

const sections = ['Overview','Architecture','Cross-Cutting','Use Cases','Roles','Build Plan','Infrastructure']

function Nav({ active, onNav }) {
  return (
    <nav className="sticky top-0 z-50 bg-[#1E3A5F]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2">
        <span className="text-white font-[var(--font-heading)] font-bold text-lg mr-4 shrink-0">OpenClaw OS</span>
        {sections.map(s => (
          <button key={s} onClick={() => onNav(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all shrink-0 ${active === s ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white/90 hover:bg-white/10'}`}>
            {s}
          </button>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="Overview" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#2E86AB] to-[#A23B72]" />
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
            animate={{ y: [0, -200], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + Math.random()*4, repeat: Infinity, delay: Math.random()*5 }} />
        ))}
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 font-[var(--font-heading)]">OpenClaw OS v1</h1>
          <p className="text-xl md:text-2xl text-white/80 font-[var(--font-heading)] font-normal mb-8">A Personal Operating System for Capture, Intelligence, and Action</p>
          <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-8">
            {[["Version","1.0"],["Date","23/02/2026"],["Owner","Mike — Architect"],["Agent","Holly — PA, PM, Chief of Staff"]].map(([l,v]) => (
              <span key={l} className="bg-white/10 px-3 py-1.5 rounded-full"><span className="text-white/50">{l}:</span> <span className="text-white/90">{v}</span></span>
            ))}
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 max-w-3xl backdrop-blur-sm">
            <p className="text-white/90 italic text-lg leading-relaxed">"Capture for contemplation and planning, not real-time response. Everything flows in, gets organised, and gets surfaced when needed."</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SummaryCards() {
  const cards = [
    { icon: "📥", title: "Captures Everything", body: "Email (8 accounts), documents, photos, calls, AI chats, social media, news, location, scanned post — all into one pipeline", color: "#2E86AB" },
    { icon: "🧠", title: "Understands Context", body: "Knowledge graph connects people, organisations, projects, and documents. Detects patterns across all life domains", color: "#A23B72" },
    { icon: "⚡", title: "Acts on Your Behalf", body: "Holly sends emails, schedules meetings, compiles evidence packs, runs workflows — with Mike's approval at every step", color: "#E07A4F" },
    { icon: "👥", title: "Extends to Family & Team", body: "Scoped access for family members. Future: client-facing agents for Digital PMO as a Service", color: "#3C8D6E" }
  ]
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border-t-4" style={{ borderColor: c.color }}>
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="font-[var(--font-heading)] font-bold text-lg mb-2">{c.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function RoleBadge({ role, text }) {
  const isMike = role === 'Mike'
  return (
    <div className={`flex items-start gap-2 text-sm py-1.5`}>
      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${isMike ? 'bg-[#2E86AB]' : 'bg-[#A23B72]'}`}>{role}</span>
      <span className="text-[var(--color-text-secondary)]">{text}</span>
    </div>
  )
}

function LayerStack({ highlightLayers, roleFilter }) {
  const [expanded, setExpanded] = useState(null)
  return (
    <section id="Architecture" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="font-[var(--font-heading)] font-bold text-3xl mb-2">The Eight-Layer Architecture</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">Click any layer to explore. Information flows upward from foundation to agents.</p>
      <div className="flex flex-col-reverse gap-3">
        {layers.map((layer) => {
          const isExpanded = expanded === layer.id
          const isHighlighted = highlightLayers === null || highlightLayers.includes(layer.id)
          return (
            <motion.div key={layer.id} layout
              onClick={() => setExpanded(isExpanded ? null : layer.id)}
              className={`rounded-xl border-2 cursor-pointer transition-all overflow-hidden ${isHighlighted ? '' : 'opacity-30'}`}
              style={{ borderColor: layer.color, background: isExpanded ? `${layer.color}08` : 'white' }}
              whileHover={{ scale: 1.005 }}>
              <div className="flex items-center gap-4 p-4">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: layer.color }} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-[var(--font-heading)] font-bold text-lg" style={{ color: layer.color }}>{layer.label}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] truncate">{layer.purpose}</p>
                </div>
                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="text-xl text-[var(--color-text-secondary)]">▾</motion.span>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="border-t px-4 pb-4" style={{ borderColor: `${layer.color}30` }}>
                    <div className="pt-4 grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wide mb-2" style={{ color: layer.color }}>Components</h4>
                        <ul className="space-y-1">
                          {layer.components.map(c => <li key={c} className="text-sm flex items-start gap-2"><span style={{ color: layer.color }}>›</span> {c}</li>)}
                        </ul>
                      </div>
                      <div>
                        {layer.pipeline && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-sm uppercase tracking-wide mb-2" style={{ color: layer.color }}>
                              {layer.id === 1 ? 'Scale' : layer.id === 7 ? 'Operating Modes' : 'Data Flow'}
                            </h4>
                            <p className="text-sm bg-[var(--color-bg)] rounded-lg p-3 font-mono">{layer.pipeline}</p>
                          </div>
                        )}
                        <h4 className="font-semibold text-sm uppercase tracking-wide mb-2" style={{ color: layer.color }}>Responsibilities</h4>
                        {(!roleFilter || roleFilter === 'mike') && <RoleBadge role="Mike" text={layer.mike} />}
                        {(!roleFilter || roleFilter === 'holly') && <RoleBadge role="Holly" text={layer.holly} />}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
      {/* Data flow animation */}
      <div className="relative mt-6 flex justify-center">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
          <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-lg">⬆</motion.span>
          Information flows upward through the stack
        </div>
      </div>
    </section>
  )
}

function CrossCuttingSection() {
  return (
    <section id="Cross-Cutting" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="font-[var(--font-heading)] font-bold text-3xl mb-2">Cross-Cutting Concerns</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">Applies to every layer — designed in from the start.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {crossCutting.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-[var(--color-cross)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{c.icon}</span>
              <h3 className="font-[var(--font-heading)] font-bold">{c.title}</h3>
            </div>
            <ul className="space-y-1.5">
              {c.items.map(item => <li key={item} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2"><span className="text-[var(--color-cross)]">•</span>{item}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function UseCaseSection({ onHighlight }) {
  const [active, setActive] = useState(null)
  return (
    <section id="Use Cases" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="font-[var(--font-heading)] font-bold text-3xl mb-2">Use Cases — Why This Exists</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">Click a use case to see which layers are involved.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {useCases.map((uc, i) => (
          <motion.div key={uc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            onClick={() => { const next = active === uc.id ? null : uc.id; setActive(next); onHighlight(next ? uc.layers : null) }}
            className={`bg-white rounded-xl p-5 shadow-sm cursor-pointer transition-all hover:shadow-md ${active === uc.id ? 'ring-2 ring-offset-2' : ''}`}
            style={active === uc.id ? { ringColor: uc.badgeColor } : {}}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: uc.badgeColor }}>{uc.badge}</span>
            </div>
            <h3 className="font-[var(--font-heading)] font-bold text-lg mb-3">UC{uc.id}: {uc.title}</h3>
            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-red-400">Today</span>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{uc.today}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-green-600">With OpenClaw OS</span>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{uc.withOs}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {uc.layers.map(l => (
                <span key={l} className="text-[10px] px-1.5 py-0.5 rounded text-white font-semibold" style={{ background: layers[l].color }}>L{l}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function RolesSection() {
  return (
    <section id="Roles" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="font-[var(--font-heading)] font-bold text-3xl mb-8">Roles — Who Does What</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mike */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-[#2E86AB]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#2E86AB] flex items-center justify-center text-white text-xl font-bold">M</div>
            <div>
              <h3 className="font-[var(--font-heading)] font-bold text-xl">Mike</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Architect · Owner · Decision-Maker</p>
            </div>
          </div>
          {[
            ["Governs", ["PARA taxonomy", "Knowledge graph schema", "Security policies", "Build priorities"]],
            ["Participates", ["Reviews briefings", "Triggers searches", "Provides feedback", "Captures observations"]],
            ["Approves", ["All external actions", "Workflow definitions", "Schema changes", "Learning updates"]]
          ].map(([cat, items]) => (
            <div key={cat} className="mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#2E86AB] mb-1">{cat}</h4>
              <div className="flex flex-wrap gap-1.5">{items.map(i => <span key={i} className="text-xs bg-[#2E86AB]/10 text-[#2E86AB] px-2 py-1 rounded-full">{i}</span>)}</div>
            </div>
          ))}
          <p className="text-sm italic mt-4 text-[var(--color-text-secondary)] border-t pt-3">"Mike thinks, decides, and acts on high-judgment tasks."</p>
        </motion.div>
        {/* Holly */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-[#A23B72]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#A23B72] flex items-center justify-center text-white text-xl">🖥️</div>
            <div>
              <h3 className="font-[var(--font-heading)] font-bold text-xl">Holly</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">PA · Project Manager · Chief of Staff</p>
            </div>
          </div>
          {[
            ["PA", ["Daily briefings", "Calendar management", "Communication triage", "Meeting prep", "Reminders"]],
            ["PM", ["Project monitoring", "Deadline tracking", "Workflow orchestration", "Cost tracking"]],
            ["Chief of Staff", ["Pattern recognition", "Strategic surfacing", "Decision support", "Institutional memory"]]
          ].map(([cat, items]) => (
            <div key={cat} className="mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#A23B72] mb-1">{cat}</h4>
              <div className="flex flex-wrap gap-1.5">{items.map(i => <span key={i} className="text-xs bg-[#A23B72]/10 text-[#A23B72] px-2 py-1 rounded-full">{i}</span>)}</div>
            </div>
          ))}
          <div className="mt-4 border-t pt-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[#A23B72] mb-2">Operating Principles</h4>
            {["Propose, don't presume", "Explain reasoning", "Respect boundaries", "Fail gracefully", "Learn explicitly"].map(p => (
              <p key={p} className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1.5 mb-1"><span className="text-[#A23B72]">◆</span> {p}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BuildPlan() {
  return (
    <section id="Build Plan" className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="font-[var(--font-heading)] font-bold text-3xl mb-2">Build Sequence — Phased Delivery</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">From foundation to family.</p>
      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
        <div className="space-y-6">
          {buildPhases.map((p, i) => (
            <motion.div key={p.phase} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-start">
              <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full items-center justify-center text-white font-bold text-sm z-10" style={{ background: p.color }}>{i+1}</div>
              <div className="flex-1 bg-white rounded-xl p-5 shadow-sm border-l-4 md:border-l-0" style={{ borderColor: p.color }}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-[var(--font-heading)] font-bold text-lg">{p.phase}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: p.color }}>{p.status}</span>
                  <span className="text-xs text-[var(--color-text-secondary)]">{p.timing}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.items.map(item => <span key={item} className="text-xs bg-[var(--color-bg)] px-2 py-1 rounded-full">{item}</span>)}
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">Layers: {p.layers}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Consolidation */}
      <div className="mt-12">
        <h3 className="font-[var(--font-heading)] font-bold text-xl mb-4">Consolidation — Existing Projects → Layers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {consolidation.map(c => (
            <div key={c.label} className="bg-white rounded-lg p-4 shadow-sm flex items-start gap-3">
              <div className="w-2 h-full rounded-full shrink-0 mt-1" style={{ background: c.color, minHeight: '40px' }} />
              <div>
                <h4 className="font-semibold text-sm">{c.label}</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">{c.mapsTo}</p>
                <span className="text-[10px] mt-1 inline-block px-2 py-0.5 rounded-full bg-[var(--color-bg)]">{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InfraSection() {
  return (
    <section id="Infrastructure" className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-[var(--font-heading)] font-bold text-3xl mb-6">Infrastructure</h2>
          <div className="space-y-3">
            {infrastructure.map(inf => (
              <div key={inf.title} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                <span className="text-3xl">{inf.icon}</span>
                <div>
                  <h3 className="font-[var(--font-heading)] font-bold">{inf.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{inf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-[var(--font-heading)] font-bold text-3xl mb-6">Success Criteria</h2>
          <div className="space-y-3">
            {successCriteria.map(sc => (
              <div key={sc.title} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
                <span className="text-3xl">{sc.icon}</span>
                <div>
                  <h3 className="font-[var(--font-heading)] font-bold">{sc.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{sc.target}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RoleFilter({ value, onChange }) {
  return (
    <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 py-4">
      <span className="text-sm text-[var(--color-text-secondary)]">Filter by role:</span>
      {[['all', 'Everyone', '#6B6B8D'], ['mike', 'Mike', '#2E86AB'], ['holly', 'Holly', '#A23B72']].map(([v, label, color]) => (
        <button key={v} onClick={() => onChange(v === 'all' ? null : v)}
          className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${(value === v || (v === 'all' && !value)) ? 'text-white' : 'text-[var(--color-text-secondary)] bg-white'}`}
          style={(value === v || (v === 'all' && !value)) ? { background: color } : {}}>
          {label}
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('Overview')
  const [highlightLayers, setHighlightLayers] = useState(null)
  const [roleFilter, setRoleFilter] = useState(null)

  const handleNav = (section) => {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Nav active={activeSection} onNav={handleNav} />
      <Hero />
      <SummaryCards />
      <RoleFilter value={roleFilter} onChange={setRoleFilter} />
      <LayerStack highlightLayers={highlightLayers} roleFilter={roleFilter} />
      <CrossCuttingSection />
      <UseCaseSection onHighlight={setHighlightLayers} />
      <RolesSection />
      <BuildPlan />
      <InfraSection />
      <footer className="text-center py-8 text-sm text-[var(--color-text-secondary)]">
        OpenClaw OS v1 — Ecosystem Architecture · Version 1.0 · 23/02/2026
      </footer>
    </div>
  )
}
