import React from "react";
import { motion } from "framer-motion";

export default function WritingTips({ tips = [] }) {
  if (!tips || tips.length === 0) return null;

  // Map titles to emojis
  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes("verb") || t.includes("action")) return "💪";
    if (t.includes("quantify") || t.includes("achievement")) return "❖❖";
    if (t.includes("tailor") || t.includes("job")) return "🎯";
    if (t.includes("technical") || t.includes("description")) return "💻";
    return "✍️";
  };

  return (
    <section className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-xl">✍️</span> Writing Tips
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Best practices for resume content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((item, index) => {
          const icon = getIcon(item.title);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col group bg-[#0F172A]/50 border border-white/5 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:bg-[#0F172A]/80"
            >
              {/* Left edge accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500/0 via-purple-500/70 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />

              {/* Gradient sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Header and Title */}
              <div className="flex gap-4 items-start mb-4">
                <span className="text-2xl mt-0.5 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)] shrink-0 transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-sm leading-relaxed mb-5">
                {item.explanation}
              </p>

              {/* Before vs After or note container */}
              {item.beforeExample && item.afterExample ? (
                <div className="mt-auto p-4 rounded-xl bg-slate-950/40 border border-white/5 group-hover:border-purple-500/10 group-hover:bg-slate-950/60 transition-all duration-300">
                  <div className="text-xs leading-relaxed text-slate-300 flex flex-col gap-2">
                    <div className="flex items-start gap-1">
                      <span className="text-red-400 shrink-0">❌</span>
                      <span className="text-slate-400">{item.beforeExample}</span>
                    </div>
                    <div className="h-px bg-white/5 my-1" />
                    <div className="flex items-start gap-1">
                      <span className="text-emerald-400 shrink-0">✅</span>
                      <span className="text-slate-200 font-medium">{item.afterExample}</span>
                    </div>
                  </div>
                </div>
              ) : (
                item.afterExample && (
                  <div className="mt-auto p-4 rounded-xl bg-slate-950/40 border border-white/5 group-hover:border-purple-500/10 group-hover:bg-slate-950/60 transition-all duration-300">
                    <p className="text-xs leading-relaxed text-slate-300">
                      {item.afterExample}
                    </p>
                  </div>
                )
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
