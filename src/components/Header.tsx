import React from "react";
import { Menu, X, Linkedin, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface HeaderProps {
  activeTab: "home" | "approach" | "services" | "careers" | "booking" | "blog" | "post";
  setActiveTab: (tab: "home" | "approach" | "services" | "careers" | "booking" | "blog" | "post") => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onBookCall: () => void;
  onOpenAiAgent?: () => void;
}

export default function Header({
  activeTab: activeTabProp,
  setActiveTab,
  menuOpen,
  setMenuOpen,
  onBookCall,
  onOpenAiAgent,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Deriving activeTab based on current pathname
  const getActiveTab = (): typeof activeTabProp => {
    if (currentPath === "/") return "home";
    if (currentPath === "/our-approach") return "approach";
    if (currentPath === "/our-services") return "services";
    if (currentPath === "/meet-our-experts") return "home"; // active in home
    if (currentPath === "/careers") return "careers";
    if (currentPath === "/contact-us" || currentPath === "/booking") return "booking";
    if (currentPath.startsWith("/blog") || currentPath.startsWith("/insights")) {
      if (currentPath.split("/").length > 2) return "post";
      return "blog";
    }
    return "home";
  };

  const activeTab = getActiveTab();
  
  const navLinks = [
    { id: "home", label: "Overview" },
    { id: "approach", label: "Approach" },
    { id: "services", label: "Pillars" },
    { id: "careers", label: "Careers" },
    { id: "blog", label: "Insights" },
    { id: "booking", label: "Briefing" },
  ] as const;

  const handleNavClick = (tabId: typeof navLinks[number]["id"]) => {
    const pathToTab: Record<string, string> = {
      home: "/",
      approach: "/our-approach",
      services: "/our-services",
      careers: "/careers",
      blog: "/blog",
      booking: "/contact-us",
    };
    navigate(pathToTab[tabId] || "/");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDesktopNavClick = (label: string) => {
    if (label === "Home") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "Our Approach") {
      navigate("/our-approach");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "Our Services") {
      navigate("/our-services");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "Meet Our Experts") {
      navigate("/meet-our-experts");
    } else if (label === "Contact Us") {
      navigate("/contact-us");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    // Kept at a clean, screen-saving compact height so it doesn't cover the phone screen
    <header className="sticky top-0 z-50 w-full h-24 lg:h-36 bg-[#0B1F3A] border-b border-white/10 overflow-visible select-none">
      
      {/* 1. GEOMETRIC BACKGROUND PATHS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 100" 
          preserveAspectRatio="none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1000" height="100" fill="#0B1F3A" />
          
          {/* Gold Angle */}
          <path d="M 1000 0 H 680 L 820 65 Q 860 48, 1000 48 Z" fill="#C58B07" />
          
          {/* Shadow Shard */}
          <path d="M 830 0 L 680 0 L 820 65 Z" fill="#000000" opacity="0.15" />
          
          {/* White Curvature Baseline */}
          <path d="M 1000 48 H 850 Q 800 48, 775 76 Q 750 97, 720 100 H 745 Q 770 95, 795 76 Q 820 54, 855 54 H 1000 Z" fill="#FFFFFF" />
          
          {/* Bottom Dark Lane Cover */}
          <path d="M 1000 54 H 855 Q 820 54, 795 76 Q 770 95, 745 100 H 1000 Z" fill="#0B1F3A" />
        </svg>
      </div>

      {/* 2. LAYOUT LAYERS */}
      <div className="relative w-full h-full z-10 max-w-[1700px] mx-auto px-4 sm:px-6 xl:px-12">
        
        {/* ======================================================= */}
        {/* MOBILE & TABLET LAYOUT ENGINE */}
        {/* ======================================================= */}
        <div className="flex lg:hidden w-full h-full items-center relative">
          
          {/* LOGO CONTAINER: Twice as large via hardware transformation scale, overhanging comfortably without changing the header size */}
          <Link 
            to="/"
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer hover:opacity-95 transition-all duration-300 transform active:scale-[0.99] flex items-center z-20 absolute left-2 top-1/2 -translate-y-1/2 scale-[1.75] origin-left"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1wfFCGOuw9qrk7hBtSaw7YQUD7TovbCbv" 
              alt="Ed Alfie & Winmax Advisory" 
              className="h-12 w-auto object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* HAMBURGER TRIGGER: Positioned up high by the ceiling */}
          <div className="absolute right-1 top-3 z-30">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-[#C58B07] transition-colors duration-200 cursor-pointer p-2 flex items-center justify-center focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
          
        </div>

        {/* ======================================================= */}
        {/* LAPTOP / DESKTOP LAYOUT ENGINE (Your Loved Design) */}
        {/* ======================================================= */}
        <div className="hidden lg:flex w-full h-full items-center justify-between relative">
          
          {/* Left Side: Logo Block */}
          <Link 
            to="/"
            className="cursor-pointer hover:opacity-95 transition-all duration-300 transform active:scale-[0.99] flex items-center shrink-0 z-20"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1wfFCGOuw9qrk7hBtSaw7YQUD7TovbCbv" 
              alt="Ed Alfie & Winmax Advisory" 
              className="h-[135px] xl:h-[150px] w-auto object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Middle Navigation Links */}
          <nav className="flex items-center gap-5 xl:gap-8 mr-auto ml-10 xl:ml-16 mt-1 z-20">
            {["Home", "Our Approach", "Our Services", "Meet Our Experts", "Contact Us"].map((link) => {
              const isActive = 
                (link === "Home" && activeTab === "home") ||
                (link === "Our Approach" && activeTab === "approach") ||
                (link === "Our Services" && activeTab === "services") ||
                (link === "Contact Us" && activeTab === "booking");

              return (
                <button
                  key={link}
                  onClick={() => handleDesktopNavClick(link)}
                  className={`text-[11px] xl:text-[12px] tracking-[0.16em] xl:tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap font-sans ${
                    isActive 
                      ? "text-[#C58B07] font-extrabold" 
                      : "text-white font-bold hover:text-[#C58B07]"
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </nav>

          {/* Desktop Independent Top-Right Menu Icon & Linkedin */}
          <div className="absolute right-0 top-4 lg:top-5 z-30 flex items-center gap-3">
            {onOpenAiAgent && (
              <button
                onClick={onOpenAiAgent}
                className="text-white hover:text-[#C58B07] transition-all duration-200 p-2 flex items-center justify-center focus:outline-none hover:scale-105 transform active:scale-95 cursor-pointer relative"
                title="Consult EAW Senior Advisor (AI)"
                id="header-ai-agent-toggle-desktop"
              >
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
              </button>
            )}
            <a
              href="https://www.linkedin.com/company/ed-alfie-winmax-advisory/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BvVcqXKRURBqEro6J2ME1vQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#C58B07] transition-colors duration-200 p-2 flex items-center justify-center focus:outline-none hover:scale-105 transform active:scale-95"
              title="View LinkedIn Page"
              id="header-linkedin-toggle"
            >
              <Linkedin className="w-5 h-5 lg:w-6 lg:h-6" />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-[#C58B07] transition-colors duration-200 cursor-pointer p-2 flex items-center justify-center focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="header-hamburger-menu"
            >
              {menuOpen ? (
                <X className="w-7 h-7 lg:w-8 lg:h-8" />
              ) : (
                <Menu className="w-7 h-7 lg:w-8 lg:h-8" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* 3. Global Navigation Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-24 lg:top-36 bg-[#0B1F3A]/98 border-b border-[#C58B07]/20 z-40 flex flex-col p-6 space-y-5 shadow-2xl backdrop-blur-lg h-[calc(100vh-6rem)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4 text-sm font-semibold tracking-wide uppercase max-w-lg mx-auto w-full">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id || (link.id === "blog" && activeTab === "post");
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left py-3 border-b border-white/10 leading-none tracking-[0.15em] font-sans ${
                      isActive ? "text-[#C58B07] font-extrabold" : "text-[#D9DDE3]"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onBookCall();
                }}
                className="mt-4 w-full bg-[#C58B07] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all text-center leading-none"
              >
                Request Briefing
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenAiAgent?.();
                }}
                className="mt-2 w-full bg-zinc-950/40 hover:bg-zinc-900 border border-white/15 hover:border-[#B08D57]/40 text-[#D9DDE3] hover:text-[#C58B07] text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all text-center leading-none flex items-center justify-center gap-2 cursor-pointer"
                id="header-ai-agent-toggle-mobile"
              >
                <MessageSquare className="w-4 h-4 text-[#B08D57]" />
                <span>Consult Senior AI Advisor</span>
              </button>
              <div className="flex justify-center pt-2">
                <a
                  href="https://www.linkedin.com/company/ed-alfie-winmax-advisory/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BvVcqXKRURBqEro6J2ME1vQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-[#C58B07] transition-colors py-2.5 px-4 border border-white/10 rounded-lg hover:bg-white/5 font-sans text-xs tracking-widest uppercase"
                  title="View LinkedIn Page"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Company LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}