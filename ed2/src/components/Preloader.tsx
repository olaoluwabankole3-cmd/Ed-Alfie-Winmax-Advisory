import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles } from "lucide-react";
import Logo from "./Logo";

interface PreloaderProps {
  onComplete: () => void;
}

const TICKER_MESSAGES = [
  "CONNECTING SECURE CORRIDOR...",
  "CALIBRATING 3D IMMERSIVE DATAFRAME...",
  "MAPPING FRONTIER TRADE-ROUTE GEOGRAPHIES...",
  "AUTOMATING DOUBLE-ENTRY LEDGERS...",
  "ESTABLISHING METRIC-DRIVEN GOVERNANCE...",
  "SECURE DESK PORTAL ACTIVATED."
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Elegant progression from 0 to 100 with varying speeds for realism
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 4;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Clean elegant delay before launching the main site
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for fade-out/scale animations to finish
        }, 500);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Rotate through simulated executive ticker messages
  useEffect(() => {
    if (progress >= 100) return;
    const messageInterval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 280);

    return () => clearInterval(messageInterval);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 w-screen h-screen z-[9999] bg-[#03060c] flex flex-col items-center justify-center text-white px-6 font-sans overflow-hidden select-none pointer-events-auto"
          id="luxury-preloader-splash"
        >
          {/* Ambient lighting spot in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-[#B08D57]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Minimalist framing detail matching McKinsey level detailing */}
          <div className="absolute inset-8 border border-zinc-900/30 rounded-2xl pointer-events-none flex flex-col justify-between p-4 font-mono text-[8px] text-zinc-600">
            <div className="flex justify-between">
              <span>EAW PROTOCOL V3.41</span>
              <span>GEO: FRONT HUB CENTRAL</span>
            </div>
            <div className="flex justify-between">
              <span>STATUS: AUTHENTICATED</span>
              <span>©2026 EAW ADVISORY INC.</span>
            </div>
          </div>

          {/* Center Brand Group */}
          <div className="relative flex flex-col items-center max-w-md w-full text-center space-y-6">
            
            {/* Core Segmented Hexagon Signifier */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-zinc-950/95 border border-zinc-800/90 flex items-center justify-center text-[#C58B07] shadow-2xl relative"
            >
              <Logo orientation="iconOnly" size="sm" iconClassName="relative z-10 text-[#C58B07]" />
              {/* Pulsing ring outer shield */}
              <div className="absolute inset-0 rounded-full border border-[#C58B07]/20 animate-ping opacity-35" />
            </motion.div>

            {/* Typography */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#B08D57] uppercase font-bold block mb-1">
                EAW ADVISORY
              </span>
              <h1 className="text-xl sm:text-2xl font-serif text-white tracking-widest font-thin">
                TACTICAL PORTAL
              </h1>
            </div>

            {/* Continuous Line Loader */}
            <div className="w-48 h-[1.5px] bg-zinc-900 overflow-hidden relative rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B08D57]/45 via-[#B08D57] to-[#B08D57]/45 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear" }}
              />
            </div>

            {/* System Metrics Indicator Row */}
            <div className="w-full flex justify-between items-center px-4 pt-1 text-center font-mono text-[9px] text-zinc-500">
              <span className="uppercase tracking-widest">
                {TICKER_MESSAGES[tickerIndex]}
              </span>
              <span className="text-[#B08D57] font-bold tracking-wider">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>

          </div>

          {/* Glowing bottom grid elements */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-4 rounded-full bg-[#B08D57]/5 blur-xl pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
