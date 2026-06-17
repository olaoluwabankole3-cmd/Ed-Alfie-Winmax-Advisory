import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle, 
  Layers, 
  Target, 
  FileText, 
  HelpCircle, 
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Settings,
  ShieldCheck,
  Zap,
  Check
} from "lucide-react";

interface Stage {
  number: number;
  title: string;
  objective: string;
  activities: string[];
  outputs: string[];
  note?: string;
  color: string;
}

const STAGES: Stage[] = [
  {
    number: 1,
    title: "Enterprise Diagnostic & Discovery",
    objective: "Develop a deep understanding of current business realities, operational bottlenecks, and strategic gaps.",
    activities: [
      "Leadership interviews",
      "Commercial diagnostics",
      "Operational assessments",
      "Data review and analytics",
      "Market and channel analysis",
      "Field immersion",
      "Customer and distributor engagement",
      "Capability assessment",
      "KPI analysis",
      "Governance assessment"
    ],
    outputs: [
      "Diagnostic report",
      "Opportunity heatmaps",
      "Friction-point analysis",
      "Baseline KPI dashboard",
      "Strategic gap assessment"
    ],
    color: "#C58B07"
  },
  {
    number: 2,
    title: "Strategic Alignment & Value Prioritization",
    objective: "Align leadership around priorities, transformation goals, and measurable value creation opportunities.",
    activities: [
      "Executive workshops",
      "Strategic prioritization",
      "Value-at-stake modeling",
      "Target-state definition",
      "Success metric alignment",
      "Governance structure design"
    ],
    outputs: [
      "Transformation roadmap",
      "Strategic priorities matrix",
      "KPI architecture",
      "Governance model",
      "Business case validation"
    ],
    note: "Delivery Frameworks: Deploying specific step-by-step methodologies including Agile, Six Sigma, and our proprietary 4-stage active growth model.",
    color: "#D4AF37"
  },
  {
    number: 3,
    title: "Solution Design & Operating Model Development",
    objective: "Design scalable, executable systems and frameworks.",
    activities: [
      "RTM (Route-to-Market) redesign",
      "Territory optimization",
      "Capability architecture",
      "Performance management design",
      "Process redesign",
      "Reporting structures",
      "Organizational alignment",
      "Technology enablement integration"
    ],
    outputs: [
      "Operating model",
      "Process maps",
      "Territory structures",
      "Capability framework",
      "Reporting templates",
      "Governance workflows"
    ],
    color: "#C58B07"
  },
  {
    number: 4,
    title: "Capability Development & Change Enablement",
    objective: "Equip teams with the skills, tools, and discipline required for successful execution.",
    activities: [
      "Training programs",
      "Coaching sessions",
      "Field accompaniment",
      "Leadership alignment",
      "Distributor capability development",
      "KPI ownership systems",
      "Change management interventions"
    ],
    outputs: [
      "Training curriculum",
      "Capability scorecards",
      "Coaching structures",
      "Performance dashboards"
    ],
    color: "#D4AF37"
  },
  {
    number: 5,
    title: "Execution Support & Governance",
    objective: "Ensure disciplined implementation and measurable adoption.",
    activities: [
      "Field audits",
      "Governance reviews",
      "KPI tracking",
      "Execution reviews",
      "Management reporting",
      "Steering committee sessions",
      "Continuous improvement cycles"
    ],
    outputs: [
      "Governance reports",
      "Compliance tracking",
      "Execution dashboards",
      "Improveing action plans"
    ],
    color: "#C58B07"
  },
  {
    number: 6,
    title: "Sustainability & Scale-Up",
    objective: "Institutionalize improvements and enable long-term scalability.",
    activities: [
      "SOP documentation",
      "Internal capability transfer",
      "Governance embedding",
      "Leadership enablement",
      "Continuous improvement frameworks"
    ],
    outputs: [
      "Sustainability framework",
      "SOP manuals",
      "Internal governance systems",
      "Scale-up roadmap"
    ],
    color: "#D4AF37"
  }
];

interface ApproachSectionProps {
  onBackToOverview: () => void;
  onBookConsultation: () => void;
}

export default function ApproachSection({ onBackToOverview, onBookConsultation }: ApproachSectionProps) {
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const activeStage = STAGES.find(s => s.number === selectedStage) || STAGES[0];

  return (
    <section className="relative w-full text-zinc-100 py-12 sm:py-20 lg:py-24 bg-[#030712] select-none">
      {/* Decorative Blur Vectors */}
      <div className="absolute top-1/4 left-1/10 w-80 h-80 rounded-full bg-[#C58B07]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-[#C58B07]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Editorial Sub-Header & Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-500">
          <button 
            onClick={onBackToOverview}
            className="text-zinc-400 hover:text-[#C58B07] transition-all cursor-pointer outline-none focus:outline-none"
          >
            Overview
          </button>
          <span>/</span>
          <span className="text-[#C58B07]">Our Methodology</span>
        </div>

        {/* Big Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-12 border-b border-zinc-900 mb-12 items-end">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C58B07] uppercase font-bold block">
              METHODOLOGY FLOWCASE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] font-serif">
              The 6-Stage Execution Architecture
            </h1>
          </div>
          <div className="lg:col-span-6 lg:border-l lg:border-zinc-800 lg:pl-8">
            <p className="text-zinc-450 text-xs sm:text-sm leading-relaxed max-w-xl">
              EAW Advisory deploys structured, execution-driven consulting methodologies tailored to each client’s business realities and transformation objectives. While frameworks are customized by engagement, our typical transformation methodology follows a rigorous, battle-tested execution loop.
            </p>
          </div>
        </div>

        {/* STAGE NUMERICAL SELECTOR TIMELINE (Large buttons for touch targets >= 44px) */}
        <div className="mb-12">
          {/* Mobile Carousel / Scroll-bar */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-3 lg:pb-0 lg:grid lg:grid-cols-6 lg:gap-4">
            {STAGES.map((s) => {
              const isActive = selectedStage === s.number;
              return (
                <button
                  key={s.number}
                  onClick={() => setSelectedStage(s.number)}
                  className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all duration-300 pointer-events-auto cursor-pointer flex-shrink-0 w-64 lg:w-auto h-[105px] focus:outline-none select-none ${
                    isActive
                      ? "bg-[#0B1F3A]/63 border-[#C58B07] shadow-lg shadow-[#C58B07]/5"
                      : "bg-zinc-950/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-mono text-[11px] font-bold ${isActive ? "text-[#C58B07]" : "text-zinc-500"}`}>
                      STAGE 0{s.number}
                    </span>
                    {isActive && <Check className="w-4.5 h-4.5 text-[#C58B07]" />}
                  </div>
                  <span className={`text-xs font-bold leading-tight font-sans text-left line-clamp-2 ${isActive ? "text-white" : "text-zinc-400"}`}>
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE STAGE DETAILED CANVAS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-zinc-950/20 rounded-2xl border border-white/5 p-6 sm:p-8 lg:p-12 relative overflow-hidden"
          >
            {/* Ambient Background Glow inside Active Node */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C58B07]/2 rounded-full blur-3xl pointer-events-none" />

            {/* Left Box: Active Stage Head, Objective & Framework Meta */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#C58B07]/10 text-[#C58B07] font-bold uppercase tracking-wider">
                    Stage 0{activeStage.number} of 06
                  </span>
                  <div className="h-[1px] flex-grow bg-white/10" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight leading-tight">
                  {activeStage.title}
                </h2>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 font-bold block flex items-center gap-1.5">
                    <Target className="w-3 h-3 text-[#C58B07]" />
                    Stage Objective
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-350 leading-relaxed font-sans font-normal border-l border-[#C58B07]/30 pl-3 italic">
                    {activeStage.objective}
                  </p>
                </div>
              </div>

              {/* Delivery model notes or frameworks highlights */}
              {activeStage.note ? (
                <div className="bg-[#0B1F3A]/25 border border-white/5 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[#C58B07]">
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold">Delivery Architecture</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {activeStage.note}
                  </p>
                </div>
              ) : (
                <div className="bg-zinc-950/40 border border-white/5 rounded-xl p-4 space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block font-bold">Execution Rigor</span>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Designed to produce high-transparency quantitative models that eliminate regional RTM friction points.
                  </p>
                </div>
              )}
            </div>

            {/* Right Box: Activities and Outputs comparison */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-6 lg:pt-0 lg:border-l lg:border-white/5 lg:pl-8">
              
              {/* Activities Column */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-450 border-b border-white/5 pb-2 flex items-center justify-between">
                  <span>ACTIVITIES</span>
                  <span className="text-[#C58B07] font-sans text-[10px] font-normal lowercase">{activeStage.activities.length} steps</span>
                </h4>
                <ul className="space-y-2 pt-1">
                  {activeStage.activities.map((act, i) => (
                    <li key={i} className="flex gap-2.5 items-start group">
                      <span className="text-[#C58B07] font-mono text-[10px] select-none mt-0.5">//</span>
                      <span className="text-xs text-zinc-300 leading-relaxed font-sans transition-all group-hover:text-white">
                        {act}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverable Outputs Column */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-450 border-b border-white/5 pb-2 flex items-center justify-between">
                  <span>STAGE OUTPUTS</span>
                  <span className="text-emerald-500 font-sans text-[10px] font-normal lowercase">{activeStage.outputs.length} metrics</span>
                </h4>
                <ul className="space-y-2 pt-1">
                  {activeStage.outputs.map((out, i) => (
                    <li key={i} className="flex gap-2.5 items-start bg-zinc-950/30 border border-white/5 p-2 rounded-lg transition-all hover:bg-[#0B1F3A]/10 group">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-200 leading-normal font-sans font-medium group-hover:text-white">
                        {out}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* BOTTOM EXTRA INFOGRAPHIC & CTAs CONTAINER */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-950/40 via-zinc-950/20 to-zinc-950/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#C58B07]">
              Continuous Pipeline Governance
            </h3>
            <p className="text-xs text-zinc-450 max-w-xl leading-relaxed">
              Our 6-stage architecture is dynamic. We review lead performance indicators weekly and maintain embedded specialists inside customer distribution loops to continuously audit margins and scale.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onBackToOverview}
              className="px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-widest font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/5 transition-all cursor-pointer text-center"
            >
              Back to Overview
            </button>
            <button
              onClick={onBookConsultation}
              className="px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-widest font-mono bg-[#C58B07] hover:bg-[#A87606] text-white shadow-lg shadow-[#C58B07]/10 transition-all cursor-pointer text-center"
            >
              Book Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
