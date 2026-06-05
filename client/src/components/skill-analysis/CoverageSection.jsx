import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function CoverageSection({ matchedSkills = [], missingSkills = [] }) {
  const matchedCount = matchedSkills.length;
  const missingCount = missingSkills.length;
  const total = matchedCount + missingCount;
  
  const coveragePercent = total > 0 ? Math.round((matchedCount / total) * 100) : 0;

  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const listItem = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative p-6 md:p-8 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col gap-8">
      {/* Header & Progress */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Job Description Coverage
        </h2>
        
        <div className="flex items-end justify-between">
          <span className="text-sm font-medium text-slate-400">Coverage Progress</span>
          <span className="text-3xl font-bold text-indigo-300">{coveragePercent}%</span>
        </div>

        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${coveragePercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
          />
        </div>
      </div>

      {/* Two Columns: Matched vs Missing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-2">
        
        {/* Left Column - Matched */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-emerald-400">
              Matched Keywords ({matchedCount})
            </h3>
          </div>
          
          <motion.div
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            {matchedSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={listItem}
                className="px-4 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3 hover:border-emerald-500/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-sm font-medium text-slate-200">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Missing */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-amber-400">
              Missing Keywords ({missingCount})
            </h3>
          </div>
          
          <motion.div
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            {missingSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={listItem}
                className="px-4 py-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-center gap-3 hover:border-amber-500/30 transition-colors"
              >
                <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm font-medium text-slate-200">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
