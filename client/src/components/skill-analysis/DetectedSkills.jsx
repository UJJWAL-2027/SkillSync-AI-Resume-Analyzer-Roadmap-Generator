import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function DetectedSkills({ matchedSkills, totalSkills }) {
  if (!matchedSkills) return null;

  const count = matchedSkills.length;
  const progressPercent = totalSkills > 0 ? Math.round((count / totalSkills) * 100) : 0;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative p-6 md:p-8 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Skills Successfully Detected
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-400">
          Matched Skills: {count}/{totalSkills}
        </p>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-emerald-400 rounded-full"
          />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2"
      >
        {matchedSkills.map((skill, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="px-4 py-3 bg-[#0a1420] border border-[#1e2e42] hover:border-emerald-500/50 hover:bg-emerald-500/5 rounded-xl flex items-center gap-3 transition-colors duration-300"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[14px] font-semibold text-slate-100">{skill}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
