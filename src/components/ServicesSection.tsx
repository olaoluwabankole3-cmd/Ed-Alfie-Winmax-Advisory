import React from "react";
import { 
  TrendingUp, 
  MapPin, 
  Settings, 
  Users, 
  Briefcase, 
  Award,
  Globe, 
  CheckSquare, 
  Shield, 
  Sparkles,
  Cpu
} from "lucide-react";
import ScrollAnimatedSection from "./ScrollAnimatedSection";

export default function ServicesSection() {
  const services = [
    {
      id: "01",
      icon: TrendingUp,
      title: "Commercial & Sales Transformation",
      label: "COMMERCIAL RE-ENGINEERING",
      desc: "We help organizations redesign and optimize their commercial engines for sustainable, long-term revenue growth. This replaces fragmented sales processes with highly coordinated, execution-driven engines.",
      bullets: [
        "Route-to-Market (RTM) redesign",
        "Retail execution & Perfect Store",
        "Distributor performance management",
        "Commercial capability development",
        "SFA / DMS systems optimization"
      ]
    },
    {
      id: "02",
      icon: MapPin,
      title: "Route-to-Market & Distribution Optimization",
      label: "DATA-DRIVEN SYSTEMS",
      desc: "We design scalable, data-driven distribution systems tailored to market realities, securing geographic presence and preventing secondary channel leakages.",
      bullets: [
        "Distribution network redesign",
        "Geo-mapping & territory mapping",
        "Coverage expansion models",
        "Retail census & market intelligence",
        "Last-mile execution optimization"
      ]
    },
    {
      id: "03",
      icon: Settings,
      title: "Operations & Supply Chain Excellence",
      label: "OPERATIONAL INTEGRATION",
      desc: "We improve operational efficiency, cost structures, inventory hygiene, and performance reliability across manufacturing, warehousing, and dispatch channels.",
      bullets: [
        "Supply chain optimization & S&OP",
        "Inventory management & diagnostics",
        "Process redesign & KPI governance",
        "Manufacturing efficiency & standards",
        "Cross-functional operational alignment"
      ]
    },
    {
      id: "04",
      icon: Users,
      title: "Capability Development & Performance Coaching",
      label: "ORGANIZATIONAL ENABLEMENT",
      desc: "We build capable, highly disciplined sales and operations organizations, transferring expert skills directly to frontline executors and partner distributors.",
      bullets: [
        "Sales capability academies",
        "Distributor development initiatives",
        "Field discipline & execution training",
        "Performance management systems",
        "Leadership and performance coaching"
      ]
    },
    {
      id: "05",
      icon: Briefcase,
      title: "Corporate Strategy & Transformation Advisory",
      label: "ENTERPRISE ALIGNMENT",
      desc: "We support boards and leadership teams with goal alignment, Operating Model design, and governance frameworks for large-scale corporate transformations.",
      bullets: [
        "Growth & market expansion strategy",
        "Operating model & org design",
        "Transformation office PMO setup",
        "Performance turnaround advisory",
        "Strategic planning & alignment"
      ]
    },
    {
      id: "06",
      icon: Shield,
      title: "Investor Readiness & Business Scaling",
      label: "CAPITAL & SCALE PREPARATION",
      desc: "We support investors, founders, and boards in preparing businesses for scale, building robust financial narratives, and ensuring strict governance ahead of institutional capital growth.",
      bullets: [
        "Investor readiness preparation",
        "Financial narrative development",
        "Governance structuring & controls",
        "Operational scaling models",
        "Market feasibility assessments"
      ]
    },
    {
      id: "07",
      icon: Cpu,
      title: "AI Automation & Digital Transformation",
      label: "INTELLIGENT INTEGRATION",
      desc: "We help organizations improve efficiency, automate repetitive processes, enhance customer experiences, and drive operational excellence through intelligent automation and AI-powered business solutions.",
      bullets: [
        "AI Customer Support & Virtual Assistants",
        "Workflow & Process Automation",
        "Lead Qualification & CRM Automation",
        "Business Intelligence & Reporting Dashboards",
        "AI Knowledge Management Systems",
        "Digital Transformation Strategy"
      ]
    }
  ];

  const industries = [
    {
      id: "01",
      tag: "SUPPLY CHAIN SECURITY",
      title: "FMCG & Consumer Goods",
      desc: "Securing secondary distribution logistics, organizing sales rosters, and auditing cash-to-bank ledger balances across volatile trading hubs."
    },
    {
      id: "02",
      tag: "LOGISTICAL SHIELDS",
      title: "Modern Retail & Transport",
      desc: "Establishing route integrity metrics, tracking fuel-indexed costs, and ensuring safe warehouse stockpiling with strict weight validation."
    },
    {
      id: "03",
      tag: "DIGITAL LEDGER MATCH",
      title: "Fintech & Merchant Supply",
      desc: "Reconciled daily transaction matching, automated payment gateways, and direct working capital oversight models that flag leakage instantly."
    },
    {
      id: "04",
      tag: "COMMODITY CADENCE",
      title: "Agritech & Cold Chain",
      desc: "Optimizing pricing alignments, tracking regional crop hubs, and designing high-fidelity inventory risk shielding policies."
    }
  ];

  return (
    <>
      {/* SECTION 3: CORE SERVICES */}
      <ScrollAnimatedSection id="services-section" className="max-w-5xl mx-auto px-6 scroll-mt-36 sm:scroll-mt-48 md:scroll-mt-56 lg:scroll-mt-64">
        
        {/* Asymmetrical Header block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-zinc-900/80 items-end">
          <div className="md:col-span-5 space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#B08D57] uppercase font-bold block">
              01 / ADVISORY SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05] font-serif">
              Our Core Services.
            </h2>
          </div>
          <div className="md:col-span-7 md:border-l md:border-zinc-900 md:pl-8">
            <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
              We replace administrative complexity with clear, actionable operating procedures built for margin defense and market growth. We combine field audits with ledger-balancing software to shield client assets.
            </p>
          </div>
        </div>

        {/* Editorial Stacked Row Layout */}
        <div className="mt-8 divide-y divide-zinc-900/80">
          {services.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div 
                key={srv.id}
                className="py-10 md:py-12 flex flex-col md:grid md:grid-cols-12 md:gap-12 group transition-all duration-300 hover:bg-zinc-950/10"
              >
                {/* HUD sequence element & Icon */}
                <div className="col-span-12 md:col-span-3 lg:col-span-2 flex items-center md:items-start gap-4 mb-4 md:mb-0">
                  <span className="text-2xl font-serif text-[#B08D57]/30 group-hover:text-[#B08D57] transition-all duration-300 font-bold tracking-tight">
                    {srv.id} //
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-[#B08D57] shrink-0 group-hover:scale-105 transition-transform">
                    <IconComponent size={16} />
                  </div>
                </div>

                {/* Primary Narrative info */}
                <div className="col-span-12 md:col-span-6 lg:col-span-7 space-y-3">
                  <span className="text-[9px] font-mono tracking-widest text-[#B08D57]/80 block uppercase font-bold">
                    {srv.label}
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-[#B08D57] transition-colors duration-300 flex items-center gap-2">
                    {srv.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                    {srv.desc}
                  </p>
                </div>

                {/* Quantitative Bullet Details */}
                <div className="col-span-12 md:col-span-3 lg:col-span-3 mt-4 md:mt-0 flex flex-col justify-center">
                  <ul className="space-y-2 text-[11px] text-zinc-400 font-mono border-l-2 border-zinc-900 pl-4 group-hover:border-[#B08D57]/40 transition-colors">
                    {srv.bullets.map((bullet, i) => (
                      <li 
                        key={i} 
                        className="flex gap-2 items-center hover:translate-x-1 hover:text-white transition-all duration-200 cursor-default"
                      >
                        <span className="text-[#B08D57] text-[9px] shrink-0">▲</span> 
                        <span className="group-hover:text-zinc-300 transition-colors">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollAnimatedSection>

      {/* SECTION 5: INDUSTRIES */}
      <ScrollAnimatedSection id="industries-section" className="max-w-5xl mx-auto px-6 scroll-mt-36 sm:scroll-mt-48 md:scroll-mt-56 lg:scroll-mt-64 pt-16 sm:pt-24">
        
        {/* Asymmetrical Industries Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-zinc-900/80 items-end mb-8">
          <div className="md:col-span-5 space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#B08D57] uppercase font-bold block">
              02 / SECTOR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05] font-serif">
              Industries We Serve.
            </h2>
          </div>
          <div className="md:col-span-7 md:border-l md:border-zinc-900 md:pl-8">
            <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
              We bring highly disciplined, specialized operational frameworks to industries dependent on complex supply chains, multi-tiered accounts, and physical distribution networks.
            </p>
          </div>
        </div>

        {/* Bloomberg-Style Segmented columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-b border-zinc-900 divide-y md:divide-y-0 md:divide-x divide-zinc-900/80">
          {industries.map((ind) => (
            <div 
              key={ind.id} 
              className="p-6 md:p-8 hover:bg-zinc-950/40 transition-all duration-350 cursor-default group flex flex-col justify-between"
            >
              <div>
                {/* HUD style sequence context indicator */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-mono text-zinc-650 group-hover:text-[#B08D57] transition-colors">
                    [ 0{ind.id} ]
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-[#B08D57]/60 transition-colors"></div>
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-[#B08D57] uppercase block font-bold tracking-wider">
                    {ind.tag}
                  </span>
                  <h4 className="font-bold text-white text-base font-serif group-hover:translate-x-1 transition-transform duration-300">
                    {ind.title}
                  </h4>
                  <p className="text-zinc-450 text-xs font-sans leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>

              {/* Minimal footer line */}
              <div className="border-t border-zinc-900 mt-6 pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] font-mono text-[#B08D57] uppercase tracking-widest font-bold">
                  ACTIVE CORRIDOR FRAMEWORK
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollAnimatedSection>
    </>
  );
}
