import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Helper to guess duration.
export function getDuration(skill) {
  const s = (skill || "").toLowerCase();
  if (s.includes("system design") || s.includes("architecture")) return "4 weeks";
  if (s.includes("react") || s.includes("dsa")) return "3 weeks";
  return "2 weeks";
}

export default function LearningTimeline({ analysisData }) {
  const { roadmap = [] } = analysisData || {};

  if (!roadmap.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="w-full mt-12 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-white tracking-tight">
        Learning Timeline
      </h2>

      <div className="flex flex-col gap-4">
        {roadmap.map((item, idx) => {
          const duration = getDuration(item.title);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group p-5 md:p-6 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300">
                  <span className="text-purple-400 font-bold text-sm">W{item.week || idx + 1}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-0.5">{duration}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
