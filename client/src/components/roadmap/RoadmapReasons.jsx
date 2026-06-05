import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function generateReason(skill) {
  const s = (skill || "").toLowerCase();
  if (s.includes("backend") || s.includes("node") || s.includes("express")) {
    return `Missing backend development experience`;
  }
  if (s.includes("cloud") || s.includes("aws") || s.includes("gcp")) {
    return `Limited cloud deployment exposure`;
  }
  if (s.includes("system design") || s.includes("architecture")) {
    return `Lack of system design fundamentals`;
  }
  if (s.includes("db") || s.includes("sql") || s.includes("database") || s.includes("mongo")) {
    return `No database-focused projects`;
  }
  if (s.includes("react") || s.includes("frontend")) {
    return `Missing modern frontend experience`;
  }
  if (s.includes("docker") || s.includes("kubernetes") || s.includes("cicd") || s.includes("devops")) {
    return `Lack of containerization & DevOps skills`;
  }
  if (s.includes("dsa") || s.includes("algorithm")) {
    return `Need stronger advanced algorithms foundation`;
  }
  return `Missing ${skill} experience`;
}

export default function RoadmapReasons({ analysisData }) {
  const { missingSkills = [] } = analysisData || {};

  if (!missingSkills.length) return null;

  // Deduplicate reasons
  const reasons = Array.from(new Set(missingSkills.map(generateReason))).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="w-full mt-8"
    >
      <div className="relative p-6 md:p-8 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight mb-2">
            Why This Roadmap Was Generated
          </h2>
          <p className="text-sm text-slate-400">
            This roadmap is personalized based on the gaps identified during resume analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-slate-300 text-[15px]">{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
