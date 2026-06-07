import React from "react";
import { motion } from "framer-motion";

export default function ResumeSummary({ summary = null }) {
  if (!summary) return null;

  const getQualityColor = (quality) => {
    switch (quality) {
      case "Excellent":
        return "text-emerald-400";
      case "Strong":
        return "text-indigo-400";
      case "Good":
        return "text-sky-400";
      case "Average":
        return "text-amber-400";
      default:
        return "text-red-400";
    }
  };

  return (
    <section className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-xl">🤖</span> AI Resume Summary
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative group bg-[#0F172A]/50 border border-white/5 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
      >
        {/* Top Shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Overall Quality */}
        <div className="mb-6">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
            OVERALL QUALITY
          </span>
          <h3 className={`text-3xl font-black ${getQualityColor(summary.overallQuality)} mb-1`}>
            {summary.overallQuality}
          </h3>
          <p className="text-sm text-slate-400">
            {summary.qualityDesc}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-6" />

        {/* Strengths and Weaknesses Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Main Strengths */}
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-3">
              MAIN STRENGTHS
            </span>
            <ul className="flex flex-col gap-2.5">
              {summary.strengths?.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Biggest Weaknesses */}
          <div>
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block mb-3">
              BIGGEST WEAKNESSES
            </span>
            <ul className="flex flex-col gap-2.5">
              {summary.weaknesses?.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="text-amber-500 shrink-0">▲</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top ATS Concern */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block mb-2">
            TOP ATS CONCERN
          </span>
          <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 text-sm text-slate-300">
            {summary.topAtsConcern}
          </div>
        </div>

        {/* Most Impactful Improvement */}
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-2">
            MOST IMPACTFUL IMPROVEMENT
          </span>
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-sm text-slate-300">
            {summary.mostImpactfulImprovement}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
