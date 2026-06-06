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
          className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-2">Keywords Matched</h3>
          <p className="text-slate-400 text-sm mb-6">These keywords are already in your resume</p>
          <div className="flex flex-wrap gap-2">
            {matched.length > 0 ? (
              matched.map((kw, i) => (
                <div key={i} className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20 flex items-center gap-1.5">
                  <span>✓</span> {kw}
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
          className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-2">Keywords Missing</h3>
          <p className="text-slate-400 text-sm mb-6">Add these to improve ATS matching</p>
          <div className="flex flex-wrap gap-2">
            {missing.length > 0 ? (
              missing.map((kw, i) => (
                <div key={i} className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20 flex items-center gap-1.5">
                  <span>+</span> {kw}
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
          className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-2">Recommended Keywords</h3>
          <p className="text-slate-400 text-sm mb-6">High-value keywords for your role</p>
          <div className="flex flex-wrap gap-2">
            {recommended.length > 0 ? (
              recommended.map((kw, i) => (
                <div key={i} className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20 flex items-center gap-1.5">
                  <span className="text-amber-400">★</span> {kw}
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
