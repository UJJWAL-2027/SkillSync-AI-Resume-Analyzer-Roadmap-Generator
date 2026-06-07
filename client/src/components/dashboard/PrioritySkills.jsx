import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

// Helper to determine metadata dynamically for any skill name
function getSkillMeta(skillName) {
  const name = skillName.toLowerCase();

  let priority = "Medium Priority";
  let priorityClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  
  let difficulty = "Medium Difficulty";
  let difficultyClass = "text-amber-400";

  if (
    name.includes("system design") || 
    name.includes("architecture") || 
    name.includes("aws") || 
    name.includes("cloud") || 
    name.includes("kubernetes") || 
    name.includes("docker")
  ) {
    priority = "High Priority";
    priorityClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)]";
    difficulty = "Hard Difficulty";
    difficultyClass = "text-rose-400";
  } else if (
    name.includes("node") || 
    name.includes("express") || 
    name.includes("cicd") || 
    name.includes("react") || 
    name.includes("javascript") ||
    name.includes("typescript")
  ) {
    priority = "High Priority";
    priorityClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)]";
    difficulty = "Medium Difficulty";
    difficultyClass = "text-amber-400";
  }

  return { priority, priorityClass, difficulty, difficultyClass };
}

export default function PrioritySkills({ analysis }) {
  const { missingSkills = [] } = analysis || {};

  if (missingSkills.length === 0) {
    return null;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col gap-6"
    >
      <h3 className="text-xl font-bold text-white tracking-tight">
        High Priority Skills To Learn
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {missingSkills.map((skill, idx) => {
          const { priority, priorityClass, difficulty, difficultyClass } = getSkillMeta(skill);

          return (
            <motion.div
              key={idx}
              variants={item}
              className="relative group cursor-default transition-all duration-300 hover:-translate-y-1"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="relative p-6 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] transition-all duration-300">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {skill}
                  </h4>
                  <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityClass}`}>
                    {priority}
                  </span>
                  <span className={`text-xs font-semibold ${difficultyClass}`}>
                    {difficulty}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
