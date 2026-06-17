import React from "react";
import { Check, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import ScrollAnimatedSection from "./ScrollAnimatedSection";

interface CareersSectionProps {
  careerStatus: "idle" | "submitting" | "success";
  careerName: string;
  setCareerName: (v: string) => void;
  careerEmail: string;
  setCareerEmail: (v: string) => void;
  careerSpecialty: string;
  setCareerSpecialty: (v: string) => void;
  careerSummary: string;
  setCareerSummary: (v: string) => void;
  careerCode: string;
  handleCareerSubmit: (e: React.FormEvent) => void;
  resetCareerForm: () => void;
}

export default function CareersSection({
  careerStatus,
  careerName,
  setCareerName,
  careerEmail,
  setCareerEmail,
  careerSpecialty,
  setCareerSpecialty,
  careerSummary,
  setCareerSummary,
  careerCode,
  handleCareerSubmit,
  resetCareerForm,
}: CareersSectionProps) {
  return (
    <ScrollAnimatedSection id="career-section" className="max-w-5xl mx-auto px-6 scroll-mt-36 sm:scroll-mt-48 md:scroll-mt-56 lg:scroll-mt-64">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Editorial Information Block */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-72">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#B08D57] uppercase font-bold block">
              TALENT & BENCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05] font-serif">
              Join EAW Bench.
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal">
            We recruit highly disciplined operational partners, financial automation professionals, and field logistics auditors who operate under a strict execution-first model. Our vetting process is intense.
          </p>

          {/* FT-Style list with minimalist borders */}
          <div className="border-t border-b border-zinc-900 py-6 space-y-6">
            <h4 className="font-semibold text-[#B08D57] text-[10px] uppercase font-mono tracking-widest">
              REQUIRED OPERATIONAL ATTRIBUTES:
            </h4>
            <ul className="space-y-4 text-xs text-zinc-450 font-sans">
              <li className="flex gap-3 items-start group">
                <span className="text-[#B08D57] font-mono text-[11px] mt-0.5 group-hover:translate-x-0.5 transition-transform">[ 01 ]</span>
                <span className="leading-relaxed">Proven route mapping and supply-chain auditing experience across primary West African commercial corridors.</span>
              </li>
              <li className="flex gap-3 items-start group">
                <span className="text-[#B08D57] font-mono text-[11px] mt-0.5 group-hover:translate-x-0.5 transition-transform">[ 02 ]</span>
                <span className="leading-relaxed">Deep familiarity with automated daily digital bookkeeping software and cloud-hosted ledger matching protocols.</span>
              </li>
              <li className="flex gap-3 items-start group">
                <span className="text-[#B08D57] font-mono text-[11px] mt-0.5 group-hover:translate-x-0.5 transition-transform">[ 03 ]</span>
                <span className="leading-relaxed">Capacity to lead intense, high-cadence corporate stand-up routines with executive stakeholder advisory clients.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Premium Form Container */}
        <div className="lg:col-span-7 bg-[#050b14]/10 border border-zinc-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B08D57]/3 rounded-full blur-3xl pointer-events-none"></div>

          {careerStatus !== "success" ? (
            <form onSubmit={handleCareerSubmit} className="space-y-6 relative z-10" id="career-submission-form">
              <div className="border-b border-zinc-900 pb-4">
                <h3 className="text-base font-bold text-white font-serif tracking-tight">
                  Executive Intake Credentials
                </h3>
                <p className="text-[11px] text-zinc-500 font-sans mt-1">
                  Complete the partner evaluation routing checklist below.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Full Corporate Name</label>
                  <input 
                    type="text"
                    required
                    value={careerName}
                    onChange={(e) => setCareerName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Email Address</label>
                  <input 
                    type="email"
                    required
                    value={careerEmail}
                    onChange={(e) => setCareerEmail(e.target.value)}
                    placeholder="e.g. j.doe@eawadvisory.com"
                    className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Operational Pillar Specialty</label>
                <select 
                  value={careerSpecialty}
                  onChange={(e) => setCareerSpecialty(e.target.value)}
                  className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white font-sans cursor-pointer focus:outline-none transition-all text-zinc-350"
                >
                  <option value="Route-to-Market & Logistics" className="bg-[#070b13]">Route-to-Market & Logistics</option>
                  <option value="Operational Governance & Performance Control" className="bg-[#070b13]">Operational Governance & Performance Control</option>
                  <option value="Accounting Automations & Systems" className="bg-[#070b13]">Accounting Automations & Systems</option>
                  <option value="Frontier Strategy & Capital Sourcing" className="bg-[#070b13]">Frontier Strategy & Capital Sourcing</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Experience Summary & Key Corridor Outcomes</label>
                <textarea 
                  required
                  rows={4}
                  value={careerSummary}
                  onChange={(e) => setCareerSummary(e.target.value)}
                  placeholder="Summarize your hands-on corridor logistics audits, digital ledger installations, and active client links."
                  className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans leading-relaxed"
                />
              </div>

              <button 
                type="submit"
                disabled={careerStatus === "submitting"}
                className="w-full bg-[#B08D57] hover:bg-[#8C6A35] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl text-center cursor-pointer transition-all disabled:opacity-50"
              >
                {careerStatus === "submitting" ? "Transmitting Profile..." : "Submit Profile to Partners Office"}
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6 relative z-10"
              id="career-submit-success-card"
            >
              <div className="w-12 h-12 rounded-full bg-[#B08D57]/10 text-[#B08D57] flex items-center justify-center mx-auto text-lg">
                <CheckCircle size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-lg font-serif">Application Transmitted</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto font-sans leading-normal">
                  Your executive profile has been safely routed to the Partners' office. A strategic assessment partner will review and contact you if there is an operational match.
                </p>
              </div>
              <div className="bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-900 text-xs font-mono text-zinc-350 w-fit mx-auto">
                REFERENCE KEY: <span className="text-[#B08D57] font-bold">{careerCode}</span>
              </div>
              <button 
                onClick={resetCareerForm}
                className="text-xs uppercase tracking-wider font-bold text-zinc-500 hover:text-white underline cursor-pointer"
              >
                Submit Another Profile
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </ScrollAnimatedSection>
  );
}
