import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";

// Formatter to enhance skill strings to descriptive strengths
function formatStrengthTitle(skill) {
  const name = skill.toLowerCase();
  if (name.includes("react")) return "Strong React Experience";
  if (name.includes("javascript") || name.includes("js")) return "JavaScript Foundation";
  if (name.includes("sql") || name.includes("database") || name.includes("mongo") || name.includes("db")) return "Good Database Knowledge";
  if (name.includes("git") || name.includes("github")) return "Version Control Practices";
  if (name.includes("structure") || name.includes("algorithm") || name.includes("dsa") || name.includes("problem solving")) return "Problem Solving Skills";

  const titleCased = skill.charAt(0).toUpperCase() + skill.slice(1);
  return `${titleCased} Proficiency`;
}

export default function StrengthsSection({ analysis }) {
  const { matchedSkills = [] } = analysis || {};

  if (matchedSkills.length === 0) {
    return null;
  }

  // Display top 4 strengths (or all if less than 4)
  const displayStrengths = matchedSkills.slice(0, 4);

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
        Your Strongest Areas
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {displayStrengths.map((skill, idx) => {
          const strengthTitle = formatStrengthTitle(skill);
          
          return (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group cursor-default"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="relative p-6 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium tracking-wide block mb-0.5">
                      Strength {idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {strengthTitle}
                    </h4>
                  </div>
                </div>

                <Star className="w-5 h-5 text-amber-400 fill-transparent group-hover:fill-amber-400/20 transition-all shrink-0 ml-4" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
