import React, { useState, useEffect } from "react";
import Logo from "./Logo";

// FadeIn component: A wrapper that starts with opacity: 0 and transitions to opacity: 1 
// after a configurable delay (ms) using a setTimeout + React state. 
// Transition duration is also configurable. Uses inline transitionDuration style and Tailwind's transition-opacity class.
interface FadeInProps {
  delay: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export function FadeIn({ delay, duration = 1000, children, className = "" }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ease-out ${visible ? "opacity-100" : "opacity-0"} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

// AnimatedHeading component: Splits text by \n into lines, then each line into individual characters. 
// Each character is an inline-block <span> with CSS transitions on opacity and transform (translateX). 
// Animation triggers via React state after the initial delay.
interface AnimatedHeadingProps {
  text: string;
}

export function AnimatedHeading({ text }: AnimatedHeadingProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 200); // 200ms initial delay
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split("\n");
  const charDelay = 30; // 30ms
  const transitionDuration = 500; // 500ms

  return (
    <h1
      className="text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white leading-[1.15] md:leading-tight select-none"
      style={{ letterSpacing: "-0.04em" }}
    >
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;
        return (
          <span key={lineIndex} className="block py-0.5 whitespace-normal sm:whitespace-nowrap">
            {line.split("").map((char, charIndex) => {
              const delay = (lineIndex * lineLength * charDelay) + (charIndex * charDelay);
              const isSpace = char === " ";
              
              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all ease-out"
                  style={{
                    opacity: animated ? 1 : 0,
                    transform: animated ? "translateX(0)" : "translateX(-18px)",
                    transitionDuration: `${transitionDuration}ms`,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {isSpace ? "\u00A0" : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

interface ThreeDLandingPageProps {
  onEnterPortal: (destinationView?: "home" | "features" | "pricing" | "profile" | "detail", openChat?: boolean) => void;
  isClassicSlate: boolean;
}

export default function ThreeDLandingPage({ onEnterPortal }: ThreeDLandingPageProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      {/* Video Background (fully raw and uncovered as specified) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
      />

      {/* Main Container Layer (Absolutely over the video) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        
        {/* Navbar Section */}
        <div className="w-full px-6 md:px-12 lg:px-16 pt-6 shrink-0">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center cursor-pointer select-none font-sans" onClick={() => onEnterPortal("home")}>
              <Logo size="md" />
            </div>

            {/* Center: Links (hidden on mobile, visible md+) */}
            <div className="hidden md:flex items-center gap-8 font-sans">
              {[
                { name: "Who We Are", target: "home" as const },
                { name: "Useful Guides", target: "detail" as const },
                { name: "Business Helper", target: "features" as const }
              ].map((item) => (
                <span
                  key={item.name}
                  onClick={() => onEnterPortal(item.target)}
                  className="text-sm font-medium text-gray-300 hover:text-brand-gold transition-colors cursor-pointer"
                >
                  {item.name}
                </span>
              ))}
            </div>

            {/* Right: "Start a Chat" button */}
            <button
              onClick={() => onEnterPortal("pricing")}
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 hover:scale-[1.03] transition-all cursor-pointer select-none active:scale-[0.97] font-sans"
            >
              Book a Free Meeting
            </button>
          </nav>
        </div>

        {/* Hero Content (Bottom of viewport) */}
        <div className="w-full px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 flex-1 flex flex-col justify-end">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-end gap-8">
            
            {/* Left Column - Main Content */}
            <div className="flex flex-col items-start max-w-2xl">
              {/* Heading character-by-character transition */}
              <AnimatedHeading text={"We help your business\ngrow and do better."} />

              {/* Subheading with Fade-in transitioning starting at 800ms */}
              <FadeIn delay={800} duration={1000} className="w-full">
                <p className="text-base md:text-lg text-gray-200 mb-5 leading-relaxed font-sans font-medium">
                  We work with you to make your business more successful, helper you get more customers, and make more money. No complex words—just friendly, real support that works.
                </p>
              </FadeIn>

              {/* Action buttons row with Fade-in starting at 1200ms */}
              <FadeIn delay={1200} duration={1000} className="w-full">
                <div className="flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => onEnterPortal("pricing")}
                    className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-zinc-200 hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer text-sm font-sans"
                  >
                    Book a Free Meeting
                  </button>
                  <button
                    onClick={() => onEnterPortal("home")}
                    className="liquid-glass border border-white/25 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer text-sm font-sans"
                  >
                    See What We Do
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Status Tag Card */}
            <div className="flex items-end justify-start lg:justify-end font-sans">
              {/* Fade-in animation starting at 1400ms */}
              <FadeIn delay={1400} duration={1000}>
                <div 
                  onClick={() => onEnterPortal("pricing")}
                  className="liquid-glass border border-white/20 px-6 py-4 rounded-xl select-none text-left lg:text-right cursor-pointer hover:bg-white/5 hover:border-brand-gold/40 hover:shadow-xl transition-all duration-300 group active:scale-[0.98]"
                >
                  <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide text-white block">
                    Real Advice. Real Growth.
                  </span>
                  <span className="text-xs font-bold tracking-wider text-brand-gold group-hover:text-white block mt-1.5 uppercase transition-colors">
                    Click here to Talk to Us! →
                  </span>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
