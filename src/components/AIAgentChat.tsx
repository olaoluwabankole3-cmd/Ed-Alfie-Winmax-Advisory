import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";

interface AIAgentChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onScheduleFromChat: (dateTime: string, advisorName: string) => void;
}

const PRESET_PROMPTS = [
  "Assess trade route leakage & slippages",
  "Explain EAW's 6-Stage Execution Audit",
  "How to book a briefing with Ed Alfie",
  "What is cash-to-bank discipline?"
];

function formatAssistantMessage(text: string) {
  if (!text) return "";
  
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="text-[#B08D57] font-semibold font-sans">{part}</strong>;
    }
    
    const lines = part.split("\n");
    return lines.map((line, lIdx) => {
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
      if (isBullet) {
        return (
          <span key={`${index}-${lIdx}`} className="block pl-4 py-0.5 relative font-sans text-xs text-zinc-300">
            <span className="absolute left-0 text-[#B08D57]">—</span>
            {line.trim().substring(2)}
          </span>
        );
      }
      return (
        <span key={`${index}-${lIdx}`} className="block py-1 leading-relaxed text-zinc-300 text-xs font-sans">
          {line}
        </span>
      );
    });
  });
}

export default function AIAgentChat({
  isOpen,
  onClose,
  onOpen,
  onScheduleFromChat
}: AIAgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I am ALFIE, the custom AI Assistant for EAW Advisory. Ask me about EAW's performance metrics, corporate capabilities, or operational execution frameworks."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Clean, high-conversion micro-greeting trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    
    // Explicitly tracking the updated history array so it transmits accurately 
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);
    setShowNotification(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages
        })
      });

      if (!response.ok) {
        throw new Error("Connectivity error.");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content || "I have noted your focus. Let's arrange an executive partner-level consultation."
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.functionCall && data.functionCall.name === "bookAppointment") {
        const { dateTime, advisorName } = data.functionCall.args;
        setTimeout(() => {
          onScheduleFromChat(dateTime || "Next available", advisorName || "Ed Alfie (Senior Partner)");
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Interface latency detected. Please route directly to the scheduling framework below, or contact the office at +2347081949693."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Dynamic Floating Action Layout Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 max-w-[calc(100vw-3rem)]">
        <AnimatePresence>
          {showNotification && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-950/95 backdrop-blur-md border border-[#B08D57]/40 p-3 rounded-xl shadow-2xl max-w-xs text-xs font-sans text-zinc-100 relative mb-1"
              id="ai-agent-notification-tooltip"
            >
              <button 
                onClick={() => setShowNotification(false)}
                className="absolute top-2 right-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={12} />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={12} className="text-[#B08D57]" />
                <span className="font-sans text-[10px] uppercase tracking-wider text-[#B08D57] font-bold">EAW System Assistant</span>
              </div>
              <p className="text-zinc-300 text-[11px] font-sans leading-snug pr-3">
                Ask ALFIE about EAW operations, metrics, or capabilities.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={isOpen ? onClose : onOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-14 h-14 bg-zinc-950 hover:bg-black rounded-full flex items-center justify-center border border-[#B08D57]/50 shadow-2xl cursor-pointer relative group overflow-hidden focus:outline-none"
          id="ai-agent-launcher-btn"
          title="Query ALFIE"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#B08D57]/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-zinc-950 rounded-full scale-95 z-0" />
          
          <span className="relative z-10 text-[#B08D57] group-hover:text-white transition-colors duration-300">
            {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
          </span>
        </motion.button>
      </div>

      {/* Re-Engineered Chat Window Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] bg-zinc-950/95 border border-[#B08D57]/30 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col z-50 overflow-hidden backdrop-blur-lg font-sans"
            id="ai-agent-chat-window"
          >
            {/* Clean Institutional Header */}
            <div className="p-4 border-b border-zinc-900 bg-zinc-900/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#B08D57]/10 border border-[#B08D57]/20 flex items-center justify-center relative">
                  <span className="text-[11px] font-sans font-bold text-[#B08D57]">MK</span>
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-zinc-950" />
                </div>
                <div>
                  <h3 className="text-xs font-sans font-bold text-white tracking-wide uppercase">
                    ALFIE
                  </h3>
                  <p className="text-[9px] font-sans uppercase tracking-wider text-zinc-400">
                    EAW Operations Assistant
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-zinc-500 hover:text-white transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 scrollbar-none">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed font-sans ${
                        msg.role === "user" 
                          ? "bg-[#B08D57] text-white" 
                          : "bg-zinc-900/50 border border-zinc-900 text-zinc-300"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="text-[11.5px] font-sans font-medium leading-relaxed">{msg.content}</p>
                      ) : (
                        formatAssistantMessage(msg.content)
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-zinc-900/50 border border-zinc-900 rounded-lg p-3 max-w-[85%] flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#B08D57] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-1 rounded-full bg-[#B08D57] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-1 rounded-full bg-[#B08D57] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Compact Metric Presets */}
            {messages.length < 3 && (
              <div className="px-4 py-2.5 bg-zinc-950 border-t border-zinc-900/50">
                <div className="flex flex-wrap gap-1">
                  {PRESET_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[10px] font-sans text-zinc-400 hover:text-[#B08D57] hover:border-[#B08D57]/40 bg-zinc-900/30 border border-zinc-900 px-2.5 py-1 rounded transition-all text-left max-w-full cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Second Latency Optimized Input Field */}
            <div className="p-3 border-t border-zinc-900 bg-zinc-950">
              <div className="h-9 bg-zinc-900/30 border border-zinc-900 focus-within:border-[#B08D57]/50 rounded flex items-center px-3 gap-2 transition-colors">
                <input
                  type="text"
                  placeholder="Ask ALFIE about EAW operations..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  className="flex-grow bg-transparent text-xs font-sans text-white focus:outline-none placeholder-zinc-600 disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isLoading || !inputValue.trim()}
                  className="text-zinc-500 hover:text-[#B08D57] disabled:text-zinc-800 cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </div>
              <div className="flex items-center justify-between px-0.5 pt-2 text-[8.5px] text-zinc-600 font-sans tracking-wide">
                <span>EAW Verification Secure</span>
                <div className="flex items-center gap-1">
                  <span>Enter to Send</span>
                  <CornerDownLeft size={8} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
