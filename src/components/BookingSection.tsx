import React from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import ScrollAnimatedSection from "./ScrollAnimatedSection";

interface BookingSectionProps {
  contactName: string;
  setContactName: (v: string) => void;
  contactEmail: string;
  setContactEmail: (v: string) => void;
  contactCompany: string;
  setContactCompany: (v: string) => void;
  contactPhone: string;
  setContactPhone: (v: string) => void;
  contactRevenue: string;
  setContactRevenue: (v: string) => void;
  contactChallenge: string;
  setContactChallenge: (v: string) => void;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  selectedTime: string;
  setSelectedTime: (v: string) => void;
  contactMessage: string;
  setContactMessage: (v: string) => void;
  bookingStatus: "idle" | "submitting" | "success";
  bookingCode: string;
  handleBookingSubmit: (e: React.FormEvent) => void;
  resetBookingForm: () => void;
}

export default function BookingSection({
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactCompany,
  setContactCompany,
  contactPhone,
  setContactPhone,
  contactRevenue,
  setContactRevenue,
  contactChallenge,
  setContactChallenge,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  contactMessage,
  setContactMessage,
  bookingStatus,
  bookingCode,
  handleBookingSubmit,
  resetBookingForm,
}: BookingSectionProps) {
  return (
    <ScrollAnimatedSection id="contact-section" className="max-w-5xl mx-auto px-6 scroll-mt-36 sm:scroll-mt-48 md:scroll-mt-56 lg:scroll-mt-64">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Handcrafted Editorial Info */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-72">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#B08D57] uppercase font-bold block">
              SECURE ENGAGEMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05] font-serif">
              Let's Tighten Your Operations.
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal">
            Request an on-site audit or book a structured briefing session with our advisory bench. We don't deploy generic questionnaires—simply state your corporate size and core bottleneck.
          </p>

          {/* FT-Style direct channels segmented by thin lines */}
          <div className="border-t border-b border-zinc-900 divide-y divide-zinc-900 py-2">
            <div className="py-4 flex gap-4 items-center group">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#B08D57] group-hover:scale-105 transition-transform">
                <Mail size={14} />
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 block uppercase font-bold tracking-widest">Email Partner Office</span>
                <span className="text-xs text-white font-mono group-hover:text-[#B08D57] transition-colors">advisors@eawadvisory.com</span>
              </div>
            </div>

            <div className="py-4 flex gap-4 items-center group">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#B08D57] group-hover:scale-105 transition-transform">
                <Phone size={14} />
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 block uppercase font-bold tracking-widest">Partner Urgent Hotline</span>
                <span className="text-xs text-white font-mono group-hover:text-[#B08D57] transition-colors">+234 (0) 708 194 9693</span>
              </div>
            </div>

            <div className="py-4 flex gap-4 items-center group">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#B08D57] group-hover:scale-105 transition-transform">
                <MapPin size={14} />
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 block uppercase font-bold tracking-widest">Lagos Advisory Hub</span>
                <span className="text-xs text-white font-sans group-hover:text-[#B08D57] transition-colors">Lekki Phase 1, Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-contrast scheduling panel */}
        <div className="lg:col-span-7 bg-[#050b14]/10 border border-zinc-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden" id="meeting-schedule-container">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B08D57]/3 rounded-full blur-3xl pointer-events-none"></div>

          {bookingStatus !== "success" ? (
            <form onSubmit={handleBookingSubmit} className="space-y-5 relative z-10" id="contact-booking-form">
              <div className="border-b border-zinc-900 pb-4">
                <h3 className="text-base font-bold text-white font-serif tracking-tight">
                  Briefing Intake Scheduler
                </h3>
                <p className="text-[11px] text-zinc-500 font-sans mt-1">
                  Secure on-site logistics auditing, cadence reviews, or capital sourcing sessions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Contact Name</label>
                  <input 
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Kola Bankole"
                    className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Corporate Work Email</label>
                  <input 
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. k.bankole@myfirm.com"
                    className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Enterprise Name</label>
                  <input 
                    type="text"
                    required
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                    placeholder="e.g. Retail Horizon Ltd"
                    className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Telephone Number</label>
                  <input 
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g. +234 803 ..."
                    className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Monthly Revenue Size</label>
                  <select 
                    value={contactRevenue}
                    onChange={(e) => setContactRevenue(e.target.value)}
                    className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white font-sans cursor-pointer focus:outline-none transition-all text-zinc-350"
                  >
                    <option value="Under $500k" className="bg-[#070b13]">Under $500k</option>
                    <option value="$500k - $2M Mid-Market" className="bg-[#070b13]">$500k - $2M Mid-Market</option>
                    <option value="$2M - $5M Enterprise" className="bg-[#070b13]">$2M - $5M Enterprise</option>
                    <option value="Over $5M Enterprise" className="bg-[#070b13]">Over $5M Enterprise</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest">Main Operational Challenge</label>
                  <select 
                    value={contactChallenge}
                    onChange={(e) => setContactChallenge(e.target.value)}
                    className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white font-sans cursor-pointer focus:outline-none transition-all text-zinc-350"
                  >
                    <option value="Route-to-Market Pipeline" className="bg-[#070b13]">Route-to-Market Pipeline</option>
                    <option value="Operational Meeting Cadence" className="bg-[#070b13]">Operational Meeting Cadence</option>
                    <option value="Manual / Leaking Accounting Books" className="bg-[#070b13]">Manual / Leaking Accounting Books</option>
                    <option value="Board Sourcing Sprints" className="bg-[#070b13]">Board Sourcing Sprints</option>
                  </select>
                </div>
              </div>

              {/* Sub-card of schedules */}
              <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-2xl space-y-3">
                <span className="text-[8px] font-mono text-[#B08D57] tracking-widest block uppercase font-bold">
                  PROPOSE BRIEFING LOCKS (OPTIONAL)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-zinc-550 block">Target Meeting Date</label>
                    <input 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#03060c]/50 border border-zinc-900 text-zinc-350 focus:outline-none focus:border-[#B08D57] p-2.5 rounded-xl text-base md:text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-zinc-550 block font-normal">Preferred Hour Zone</label>
                    <select 
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-[#03060c]/50 border border-zinc-900 text-zinc-350 focus:outline-none focus:border-[#B08D57] p-2.5 rounded-xl text-base md:text-xs cursor-pointer"
                    >
                      <option value="11:00 WAT / GMT+1" className="bg-[#070b13]">11:00 WAT / GMT+1</option>
                      <option value="14:00 WAT / GMT+1" className="bg-[#070b13]">14:00 WAT / GMT+1</option>
                      <option value="16:00 WAT / GMT+1" className="bg-[#070b13]">16:00 WAT / GMT+1</option>
                      <option value="17:30 WAT / GMT+1" className="bg-[#070b13]">17:30 WAT / GMT+1</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-mono text-zinc-400 block font-bold tracking-widest font-bold">Brief Strategic Goal</label>
                <textarea 
                  rows={2}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="What specific outcome is your board looking to defend or achieve?"
                  className="w-full bg-[#03060c]/80 border border-zinc-900 focus:border-[#B08D57] rounded-xl p-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans leading-relaxed"
                />
              </div>

              <button 
                type="submit"
                disabled={bookingStatus === "submitting"}
                className="w-full bg-[#B08D57] hover:bg-[#8C6A35] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl text-center cursor-pointer transition-all disabled:opacity-50"
              >
                {bookingStatus === "submitting" ? "Transmitting Operational Briefing..." : "Submit Intake & Secure Session"}
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4 relative z-10"
              id="booking-submit-success-card"
            >
              <div className="w-12 h-12 rounded-full bg-[#B08D57]/10 text-[#B08D57] flex items-center justify-center mx-auto text-lg">
                <CheckCircle size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-lg font-serif">Intake Secured</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto font-sans leading-normal">
                  Your enterprise briefing payload has been securely routed. {selectedDate ? `Our Strategic Planning Desk has reserved ${selectedDate} at ${selectedTime}.` : "We will follow up via email immediately."}
                </p>
              </div>
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 text-xs font-mono text-zinc-350 w-fit mx-auto">
                STRATEGY TOKEN: <span className="text-[#B08D57] font-bold">{bookingCode}</span>
              </div>
              <button 
                onClick={resetBookingForm}
                className="text-xs uppercase tracking-wider font-bold text-zinc-500 hover:text-white underline cursor-pointer"
              >
                Request Another Briefing Session
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </ScrollAnimatedSection>
  );
}
