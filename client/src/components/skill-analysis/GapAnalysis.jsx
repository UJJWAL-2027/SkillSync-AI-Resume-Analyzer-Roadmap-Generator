import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";

// Formatter from StrengthsSection
function formatStrengthTitle(skill) {
  const name = skill.toLowerCase();
  if (name.includes("react")) return "Strong React & JavaScript expertise";
  if (name.includes("javascript") || name.includes("js")) return "Solid full-stack fundamentals";
  if (name.includes("sql") || name.includes("database") || name.includes("mongo") || name.includes("db")) return "Good database knowledge";
  if (name.includes("git") || name.includes("github")) return "Well-structured project portfolio";
  if (name.includes("structure") || name.includes("algorithm") || name.includes("dsa") || name.includes("problem solving")) return "Good problem-solving mindset";

  const titleCased = skill.charAt(0).toUpperCase() + skill.slice(1);
  return `Strong ${titleCased} expertise`;
}

// Format weakness from missing skills
function formatWeaknessTitle(skill) {
  const name = skill.toLowerCase();
  if (name.includes("system design") || name.includes("architecture")) return "System design & architecture";
  if (name.includes("aws") || name.includes("cloud") || name.includes("gcp")) return "Cloud technologies (AWS, GCP)";
  if (name.includes("docker") || name.includes("kubernetes") || name.includes("cicd") || name.includes("devops")) return "DevOps & CI/CD pipelines";
  if (name.includes("dsa") || name.includes("algorithm")) return "Advanced data structures & algorithms";
  
  const titleCased = skill.charAt(0).toUpperCase() + skill.slice(1);
  return `Need to improve ${titleCased}`;
}

export default function GapAnalysis({ matchedSkills = [], missingSkills = [] }) {
  // Deduplicate and map
  const strengths = Array.from(new Set(matchedSkills.map(formatStrengthTitle))).slice(0, 4);
  const weaknesses = Array.from(new Set(missingSkills.map(formatWeaknessTitle))).slice(0, 4);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative p-6 md:p-8 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col gap-8 mt-12">
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
        Gap Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left - Strengths */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-lg font-bold text-emerald-400">
              Your Strengths
            </h3>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {strengths.map((str, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="px-5 py-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3 hover:border-emerald-500/30 transition-colors"
              >
                <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-[15px] font-semibold text-slate-200">{str}</span>
              </motion.div>
            ))}
            {strengths.length === 0 && (
              <p className="text-slate-400 text-sm">No specific strengths identified.</p>
            )}
          </motion.div>
        </div>

        {/* Right - Weaknesses */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-lg font-bold text-amber-400">
              Areas to Improve
            </h3>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {weaknesses.map((weak, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="px-5 py-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center gap-3 hover:border-amber-500/40 transition-colors"
              >
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-[15px] font-semibold text-slate-200">{weak}</span>
              </motion.div>
            ))}
            {weaknesses.length === 0 && (
              <p className="text-slate-400 text-sm">No critical areas to improve identified.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
