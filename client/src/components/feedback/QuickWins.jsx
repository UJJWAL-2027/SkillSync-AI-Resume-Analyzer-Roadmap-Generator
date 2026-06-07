import React from "react";
import { motion } from "framer-motion";

export default function QuickWins({ wins = [] }) {
  if (!wins || wins.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-xl">🚀</span> Quick Wins
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Easy improvements with high impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wins.map((item, index) => {
          const isHigh = item.impact === "High";
          const borderStyle = isHigh
            ? "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]"
            : "border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)]";
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative group bg-[#0F172A]/50 border rounded-xl p-5 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#0F172A]/70 ${borderStyle}`}
            >
              {/* Subtle background highlight */}
              <div className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${isHigh ? "bg-emerald-500/0 group-hover:bg-emerald-500/5" : "bg-purple-500/0 group-hover:bg-purple-500/5"}`} />

              <h3 className="relative z-10 text-base font-bold text-slate-200 group-hover:text-white transition-colors duration-300 mb-1">
                {item.title}
              </h3>
              <p className="relative z-10 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                {item.benefit || item.explanation}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
