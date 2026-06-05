import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

// Shared logic from PrioritySkills
export function getSkillMeta(skillName) {
  const name = (skillName || "").toLowerCase();

  let priority = "Priority: Medium";
  let priorityClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  
  let difficulty = "Moderate";
  let difficultyClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";

  if (
    name.includes("system design") || 
    name.includes("architecture") || 
    name.includes("aws") || 
    name.includes("cloud") || 
    name.includes("kubernetes") || 
    name.includes("docker") ||
    name.includes("dsa")
  ) {
    priority = "Priority: High";
    priorityClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    difficulty = "Hard";
    difficultyClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
  } else if (
    name.includes("node") || 
    name.includes("express") || 
    name.includes("cicd") || 
    name.includes("react") || 
    name.includes("javascript") ||
    name.includes("typescript")
  ) {
    priority = "Priority: High";
    priorityClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    difficulty = "Moderate";
    difficultyClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  }

  // Adjust for Docker specific case in screenshot
  if (name === "docker") {
    priority = "Priority: High";
    priorityClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    difficulty = "Moderate";
    difficultyClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  }

  return { priority, priorityClass, difficulty, difficultyClass };
}

export default function MissingSkills({ missingSkills }) {
  if (!missingSkills) return null;

  const count = missingSkills.length;

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
        <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Missing Skills
        </h2>
      </div>

      <p className="text-sm font-medium text-slate-400 -mt-2">
        Skills required but not detected: {count} skills
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3 md:gap-4 mt-2"
      >
        {missingSkills.map((skill, idx) => {
          const { priority, priorityClass, difficulty, difficultyClass } = getSkillMeta(skill);
          return (
            <motion.div
              key={idx}
              variants={item}
              className="px-5 py-4 bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 rounded-xl flex flex-col gap-3 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[16px] font-bold text-white">{skill}</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${priorityClass}`}>
                  {priority}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${difficultyClass}`}>
                  {difficulty}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
