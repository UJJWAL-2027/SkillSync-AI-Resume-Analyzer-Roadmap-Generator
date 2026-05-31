import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingOverlay({ message = "Analyzing your resume..." }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1120]/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center gap-5 p-8 bg-[#0F172A]/90 rounded-[2rem] shadow-[0_0_50px_rgba(99,102,241,0.15)] backdrop-blur-2xl border border-white/10 min-w-[300px]"
      >
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
        
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-400 animate-spin" />
          <div className="absolute inset-0 rounded-full border-r-2 border-purple-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          <Loader2 className="w-6 h-6 text-indigo-400 animate-pulse relative z-10" />
        </div>
        
        <div className="text-center z-10">
          <p className="text-base font-semibold text-slate-200">
            {message}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Running AI models...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
