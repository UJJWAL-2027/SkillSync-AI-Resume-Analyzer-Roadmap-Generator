import React from "react";
import { CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ATSChecklist({ checklist = [] }) {
  if (!checklist || checklist.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          ATS Compatibility Checklist
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Ensure your resume passes automated screening systems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checklist.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative group bg-[#0F172A]/50 border border-white/5 rounded-xl p-4 flex items-center gap-4 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:bg-[#0F172A]/70"
          >
            {/* Subtle background highlight */}
            <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors duration-300 pointer-events-none" />

            {item.passed ? (
              <div className="relative w-6 h-6 rounded bg-purple-600 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-all duration-300 z-10">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            ) : (
              <div className="relative w-6 h-6 rounded bg-white/5 border border-white/20 shrink-0 group-hover:border-purple-400/50 transition-colors duration-300 z-10" />
            )}
            <span className={`relative z-10 text-sm transition-colors duration-300 ${item.passed ? "text-slate-200 group-hover:text-white" : "text-slate-400 group-hover:text-slate-300"}`}>
              {item.check}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
