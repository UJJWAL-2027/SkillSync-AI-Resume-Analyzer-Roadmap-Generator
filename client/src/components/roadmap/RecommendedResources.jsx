import React from "react";
import { Book, GraduationCap, PlaySquare, Laptop, BookOpen, Globe } from "lucide-react";
import { motion } from "framer-motion";

// Generate resources dynamically based on role/skills.
function getResources(analysisData) {
  const { role = "", missingSkills = [] } = analysisData || {};
  const r = role.toLowerCase();
  const missingStr = missingSkills.join(" ").toLowerCase();

  // Baseline resources matching the screenshot
  let resources = [
    { type: "DOCUMENTATION", name: "MDN Web Docs", icon: Book, iconColor: "text-emerald-400" },
    { type: "COURSE", name: "Frontend Masters", icon: GraduationCap, iconColor: "text-amber-400" },
    { type: "YOUTUBE", name: "Traversy Media", icon: PlaySquare, iconColor: "text-sky-400" },
    { type: "PRACTICE", name: "LeetCode", icon: Laptop, iconColor: "text-indigo-400" },
    { type: "BOOK", name: "You Don't Know JS", icon: BookOpen, iconColor: "text-purple-400" },
    { type: "COMMUNITY", name: "Dev.to", icon: Globe, iconColor: "text-rose-400" }
  ];

  if (r.includes("backend") || r.includes("node") || missingStr.includes("node") || missingStr.includes("express")) {
    resources = [
      { type: "DOCUMENTATION", name: "Node.js Official Docs", icon: Book, iconColor: "text-emerald-400" },
      { type: "COURSE", name: "Udemy - Node.js Bootcamp", icon: GraduationCap, iconColor: "text-amber-400" },
      { type: "YOUTUBE", name: "Hussein Nasser", icon: PlaySquare, iconColor: "text-sky-400" },
      { type: "PRACTICE", name: "HackerRank", icon: Laptop, iconColor: "text-indigo-400" },
      { type: "BOOK", name: "Designing Data-Intensive Applications", icon: BookOpen, iconColor: "text-purple-400" },
      { type: "COMMUNITY", name: "Stack Overflow", icon: Globe, iconColor: "text-rose-400" }
    ];
  } else if (r.includes("data") || missingStr.includes("python") || missingStr.includes("sql")) {
    resources = [
      { type: "DOCUMENTATION", name: "Pandas/NumPy Docs", icon: Book, iconColor: "text-emerald-400" },
      { type: "COURSE", name: "Coursera Data Science", icon: GraduationCap, iconColor: "text-amber-400" },
      { type: "YOUTUBE", name: "Krish Naik", icon: PlaySquare, iconColor: "text-sky-400" },
      { type: "PRACTICE", name: "Kaggle", icon: Laptop, iconColor: "text-indigo-400" },
      { type: "BOOK", name: "Python for Data Analysis", icon: BookOpen, iconColor: "text-purple-400" },
      { type: "COMMUNITY", name: "r/datascience", icon: Globe, iconColor: "text-rose-400" }
    ];
  }

  return resources;
}

export default function RecommendedResources({ analysisData }) {
  const resources = getResources(analysisData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="w-full mt-12 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-white tracking-tight">
        Recommended Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, idx) => {
          const Icon = res.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative p-6 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-purple-500/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] group flex flex-col gap-4"
            >
              <div className={`w-10 h-10 rounded-lg bg-slate-800/50 border border-white/5 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${res.iconColor}`} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{res.type}</span>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">{res.name}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
