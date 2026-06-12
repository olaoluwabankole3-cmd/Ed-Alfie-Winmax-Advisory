import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HomeHeroSectionProps {
  onExploreServices: () => void;
  onSecureConsultation: () => void;
  onReadInsights?: () => void;
  onSeeApproach?: () => void;
  onOpenAiAgent?: () => void;
}

interface Slide {
  id: number;
  overTitle?: string;
  headline: string;
  supportingText: string;
  tagline?: string;
  videoUrl: string;
  ctas?: string[]; 
  ctaText?: string; 
  list?: string[];
  listTitle?: string;
  highlightTitle: string;
  highlightDesc: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 0,
    overTitle: "AT ED, ALFIE & WINMAX ADVISORY,",
    headline: "Building High-Performance Businesses Through Relentless Execution",
    supportingText: "EAW Advisory helps organizations accelerate growth, optimize operations, and execute transformation initiatives that deliver measurable results.",
    tagline: "Trusted by leaders who understand that execution is the ultimate competitive advantage.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4",
    ctas: ["Book an Executive Consultation", "Explore Our Services", "Meet Our Experts"],
    highlightTitle: "Intro",
    highlightDesc: "High Performance"
  },
  {
    id: 1,
    overTitle: "Strategy Is Easy. Execution Is Rare.",
    headline: "We Turn Strategy Into Measurable Results.",
    supportingText: "While others deliver recommendations, we build the systems, capabilities, and execution discipline that drive sustainable business growth.",
    tagline: "Strategy. Systems. Execution.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260520_133010_cb9c806d-bc9d-47f1-ac4c-b1759134ec8b.mp4",
    ctaText: "Book an Executive Consultation",
    highlightTitle: "Focus",
    highlightDesc: "Strategy & Execution"
  },
  {
    id: 2,
    overTitle: "Next-Gen Operational Efficiency",
    headline: "Automate Your Workflows. Scale Your Performance.",
    supportingText: "We help organizations deploy enterprise-grade AI agents, automate repetitive operations, and build intelligent workflows that reduce overhead and unlock exponential productivity.",
    list: [
      "AI Customer Support & Virtual Assistants",
      "Workflow & Process Automation",
      "Lead Qualification & CRM Automation",
      "Business Intelligence & Reporting Dashboards",
      "AI Knowledge Management Systems",
      "Digital Transformation Strategy"
    ],
    tagline: "The future of business belongs to leaders who automate the mundane to focus on the strategic.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260520_133010_cb9c806d-bc9d-47f1-ac4c-b1759134ec8b.mp4",
    ctaText: "Explore Automation Solutions",
    highlightTitle: "Automation",
    highlightDesc: "AI & Digital Strategy"
  },
  {
    id: 3,
    overTitle: "Built for Complex Business Challenges",
    headline: "From Growth Stagnation to Market Leadership.",
    supportingText: "We help organizations overcome commercial, operational, distribution, and supply chain challenges through execution-focused solutions.",
    list: ["Sales Transformation", "Route-to-Market Optimization", "Distribution Excellence", "Supply Chain Performance", "Business Turnarounds"],
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4",
    ctaText: "Explore Our Solutions",
    highlightTitle: "Solutions",
    highlightDesc: "Complex Challenges"
  },
  {
    id: 4,
    overTitle: "We Don’t Just Advise. We Execute.",
    headline: "Where Strategy Meets the Marketplace.",
    supportingText: "Our consultants have led transformations across FMCG, Telecoms, and Agribusiness. We understand what works because we have executed it ourselves.",
    tagline: "Over 100 years of combined commercial experience deployed to solve your most critical challenges.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064209_0cb7d815-ff61-4caa-a6d5-bbff145ab272.mp4",
    ctaText: "Meet Our Experts",
    highlightTitle: "Market",
    highlightDesc: "Practical Leadership"
  },
  {
    id: 5,
    overTitle: "Commercial Excellence Reimagined",
    headline: "Unlock Growth Hidden Within Your Business.",
    supportingText: "We help organizations identify and capture value through execution:",
    list: ["Sales Force Effectiveness", "Distributor Performance Improvement", "Revenue Growth Management", "Performance Governance"],
    tagline: "At EAW Advisory, we believe that: growth should never be accidental.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4",
    ctaText: "Accelerate Growth",
    highlightTitle: "Growth",
    highlightDesc: "Value and Performance"
  },
  {
    id: 6,
    overTitle: "The EAW Difference",
    headline: "Practical. Proven. Boardroom Ready.",
    supportingText: "Strategic thinking combined with operational rigor to ensure business transformation translates into measurable outcomes.",
    listTitle: "Why Clients Choose Us",
    list: ["Senior-led engagements", "Execution-focused delivery", "Capability transfer", "Sustainable results"],
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260520_133010_cb9c806d-bc9d-47f1-ac4c-b1759134ec8b.mp4",
    ctaText: "See Our Approach",
    highlightTitle: "Approach",
    highlightDesc: "The EAW Difference"
  },
  {
    id: 7,
    overTitle: "Results Matter",
    headline: "Transformation Measured in Outcomes.",
    supportingText: "We focus on the metrics that matter: Revenue Growth, Market Share, and Profitability.",
    list: ["Revenue Growth", "Market Share Expansion", "Productivity Improvement", "Cost Optimization"],
    tagline: "Because success is not what is recommended. Success is what gets implemented.",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4",
    ctaText: "Start Your Journey",
    highlightTitle: "Outcomes",
    highlightDesc: "Metrics That Matter"
  }
];

export default function HomeHeroSection({
  onExploreServices,
  onSecureConsultation,
  onReadInsights,
  onSeeApproach,
  onOpenAiAgent,
}: HomeHeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const duration = 6000;
    const intervalTime = 50; 
    const totalSteps = duration / intervalTime;
    let stepCount = 0;

    const interval = setInterval(() => {
      stepCount++;
      const computedProgress = (stepCount / totalSteps) * 100;
      setProgress(computedProgress);

      if (stepCount >= totalSteps) {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        setProgress(0);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const handleScrollTo = (id: string, fallback?: () => void) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (fallback) {
      fallback();
    }
  };

  const handleCtaClick = (text: string) => {
    const norm = text.toLowerCase();
    if (norm.includes("consultation") || norm.includes("growth") || norm.includes("journey")) {
      handleScrollTo("contact-section", onSecureConsultation);
    } else if (norm.includes("automation")) {
      if (onOpenAiAgent) {
        onOpenAiAgent();
      } else {
        handleScrollTo("services-section", onExploreServices);
      }
    } else if (norm.includes("services") || norm.includes("solutions")) {
      handleScrollTo("services-section", onExploreServices);
    } else if (norm.includes("experts") || norm.includes("leadership")) {
      handleScrollTo("leadership-section");
    } else if (norm.includes("approach")) {
      if (onSeeApproach) {
        onSeeApproach();
      } else {
        handleScrollTo("why-eaw-section", onExploreServices);
      }
    } else {
      onSecureConsultation();
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="hero-section"
      className="relative w-full h-dvh min-h-[600px] flex flex-col justify-between overflow-hidden bg-black text-white px-4 sm:px-6 md:px-12 lg:px-16 py-4 select-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={currentSlide}
            src={activeSlide.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black/65 backdrop-blur-[0.5px] z-5 pointer-events-none" />      {/* 
          MODIFICATION: 
          1. pt-24 pb-16 md:pt-16 lg:pt-20 md:pb-0 - Dynamic spacing to avoid crowding boundaries on mobile.
          2. justify-center md:justify-start - Center vertically on mobile, anchor top on desktop.
      */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-grow flex flex-col justify-center md:justify-start pt-24 pb-16 md:pt-16 lg:pt-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-y-3 sm:gap-y-4 lg:gap-y-5"
          >
            {activeSlide.overTitle && (
              <span className="font-mono uppercase tracking-[0.2em] text-[#B08D57] text-[10px] sm:text-xs block">
                {activeSlide.overTitle}
              </span>
            )}

            {/* Optimized responsive text sizes */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl font-sans">
              {activeSlide.headline}
            </h1>

            <p className="text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed font-sans font-normal">
              {activeSlide.supportingText}
            </p>

            {/* Tightened List spacing with responsive text size */}
            {activeSlide.list && (
              <div className="w-full max-w-2xl bg-zinc-950/20 backdrop-blur-sm p-3 rounded-xl border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm md:text-base text-zinc-300 font-medium font-sans">
                  {activeSlide.list.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[#B08D57]">—</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSlide.tagline && (
              <p className="text-[11px] sm:text-xs text-zinc-400 italic font-sans max-w-2xl border-l border-[#B08D57] pl-3 leading-relaxed">
                "{activeSlide.tagline}"
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              {activeSlide.ctas ? (
                activeSlide.ctas.map((cta, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCtaClick(cta)}
                    className={`px-4 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest font-mono transition-all ${
                      idx === 0 
                        ? "bg-[#B08D57] text-white" 
                        : "bg-zinc-950/40 text-zinc-300 border border-white/10"
                    }`}
                  >
                    {cta}
                  </button>
                ))
              ) : activeSlide.ctaText ? (
                <button
                  onClick={() => handleCtaClick(activeSlide.ctaText!)}
                  className="px-5 py-3 rounded text-[10px] font-bold uppercase tracking-widest font-mono bg-[#B08D57] text-white"
                >
                  {activeSlide.ctaText}
                </button>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Navigation Buttons (Desktop only) */}
      <button 
        onClick={handlePrev} 
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-black/60 hover:scale-105 transition-all cursor-pointer focus:outline-none items-center justify-center"
        aria-label="Previous Slide"
        id="hero-prev-btn"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={handleNext} 
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-black/60 hover:scale-105 transition-all cursor-pointer focus:outline-none items-center justify-center"
        aria-label="Next Slide"
        id="hero-next-btn"
      >
        <ChevronRight size={24} />
      </button>

      {/* Timeline Controls - Anchored at the absolute bottom */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4 border-t border-white/10 mb-2">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-4 sm:gap-6 font-mono pb-2 min-w-max">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => { setCurrentSlide(idx); setProgress(0); }}
                    className="group flex flex-col items-start focus:outline-none transition-all cursor-pointer relative flex-shrink-0"
                    style={{ width: "55px" }}
                  >
                    <div className="w-full h-[1.5px] bg-zinc-800 rounded-full mb-2 overflow-hidden relative">
                      {isActive && (
                        <div
                          className="h-full bg-[#B08D57]"
                          style={{ width: `${progress}%`, transition: "width 50ms linear" }}
                        />
                      )}
                    </div>
                    <span className={`text-[10px] font-bold ${isActive ? "text-[#B08D57]" : "text-zinc-500"}`}>
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Buttons (Mobile/Tablet only) */}
          <div className="flex md:hidden items-center gap-2 flex-shrink-0">
            <button 
              onClick={handlePrev} 
              className="p-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-400 hover:text-white cursor-pointer transition-all flex items-center justify-center z-30"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNext} 
              className="p-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-zinc-400 hover:text-white cursor-pointer transition-all flex items-center justify-center z-30"
              aria-label="Next Slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}