import React from "react";
import { Key } from "lucide-react";
import { motion } from "framer-motion";

export default function KeywordAnalysis({ keywordAnalysis = {} }) {
  const { matched = [], missing = [], recommended = [] } = keywordAnalysis;

  return (
    <section className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <Key className="w-6 h-6 text-amber-500 fill-amber-500" />
          Keyword Analysis
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Optimize your resume with industry-relevant keywords
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Keywords Matched */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative group bg-[#022c22]/40 border border-[#065f46]/50 rounded-xl p-6 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <h3 className="relative z-10 text-lg font-bold text-slate-200 group-hover:text-white transition-colors duration-300 mb-2">Keywords Matched</h3>
          <p className="relative z-10 text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-sm mb-6">These keywords are already in your resume</p>
          <div className="relative z-10 flex flex-wrap gap-2">
            {matched.length > 0 ? (
              matched.map((kw, i) => (
                <div key={i} className="px-3 py-1.5 rounded-full bg-[#064e3b]/60 text-[#34d399] text-sm border border-[#059669]/50 flex items-center gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                  <span className="text-xs">✓</span> {kw}
                </div>
              ))
            ) : (
              <span className="text-slate-500 text-sm">No keywords matched</span>
            )}
          </div>
        </motion.div>

        {/* Keywords Missing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative group bg-[#451a03]/40 border border-[#92400e]/50 rounded-xl p-6 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <h3 className="relative z-10 text-lg font-bold text-slate-200 group-hover:text-white transition-colors duration-300 mb-2">Keywords Missing</h3>
          <p className="relative z-10 text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-sm mb-6">Add these to improve ATS matching</p>
          <div className="relative z-10 flex flex-wrap gap-2">
            {missing.length > 0 ? (
              missing.map((kw, i) => (
                <div key={i} className="px-3 py-1.5 rounded-full bg-[#78350f]/60 text-[#fbbf24] text-sm border border-[#d97706]/50 flex items-center gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                  <span className="text-xs font-bold">+</span> {kw}
                </div>
              ))
            ) : (
              <span className="text-slate-500 text-sm">No missing keywords</span>
            )}
          </div>
        </motion.div>

        {/* Recommended Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative group bg-[#172554]/40 border border-[#1e40af]/50 rounded-xl p-6 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <h3 className="relative z-10 text-lg font-bold text-slate-200 group-hover:text-white transition-colors duration-300 mb-2">Recommended Keywords</h3>
          <p className="relative z-10 text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-sm mb-6">High-value keywords for your role</p>
          <div className="relative z-10 flex flex-wrap gap-2">
            {recommended.length > 0 ? (
              recommended.map((kw, i) => (
                <div key={i} className="px-3 py-1.5 rounded-full bg-[#1e3a8a]/60 text-[#60a5fa] text-sm border border-[#2563eb]/50 flex items-center gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(96,165,250,0.3)]">
                  <span className="text-[#fbbf24] text-xs">★</span> <span className="text-slate-200">{kw}</span>
                </div>
              ))
            ) : (
              <span className="text-slate-500 text-sm">No extra recommendations</span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
