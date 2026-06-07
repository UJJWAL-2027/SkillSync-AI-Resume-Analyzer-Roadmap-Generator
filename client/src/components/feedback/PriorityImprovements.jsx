import React from "react";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function PriorityImprovements({ improvements = [] }) {
  if (!improvements || improvements.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <Zap className="w-6 h-6 text-orange-500 fill-orange-500" />
          Priority Improvements
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Focus on these areas to maximize your resume's impact
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {improvements.map((item, index) => {
          let priorityStyles = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
          let dotColor = "bg-blue-400";
          let borderGlow =
            "hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(96,165,250,0.12),0_0_0_1px_rgba(168,85,247,0.2)]";

          if (item.priority.includes("High")) {
            priorityStyles = "bg-red-500/10 text-red-400 border border-red-500/20";
            dotColor = "bg-red-400";
            borderGlow =
              "hover:border-red-400/50 hover:shadow-[0_0_28px_rgba(239,68,68,0.2),0_0_0_1px_rgba(168,85,247,0.3)]";
          } else if (item.priority.includes("Medium")) {
            priorityStyles = "bg-orange-500/10 text-orange-400 border border-orange-500/20";
            dotColor = "bg-orange-400";
            borderGlow =
              "hover:border-orange-400/40 hover:shadow-[0_0_24px_rgba(249,115,22,0.15),0_0_0_1px_rgba(168,85,247,0.25)]";
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className={`relative group bg-[#0F172A]/50 border border-white/5 rounded-xl p-6 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.015] hover:-translate-y-1 hover:bg-[#0F172A]/80 ${borderGlow}`}
            >
              {/* Left edge accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500/0 via-purple-500/70 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-xl" />

              {/* Gradient sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Header row */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors duration-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Priority badge */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 transition-all duration-300 group-hover:brightness-125 ${priorityStyles}`}
                >
                  <span className={`w-2 h-2 rounded-full ${dotColor} group-hover:animate-pulse`} />
                  {item.priority}
                </div>
              </div>

              {/* Divider */}
              <div className="relative z-10 h-px bg-white/5 group-hover:bg-purple-500/20 transition-colors duration-300 mb-4" />

              {/* Action items */}
              <div className="relative z-10">
                <span className="text-xs font-semibold text-slate-500 group-hover:text-purple-400/70 uppercase tracking-wider mb-3 block transition-colors duration-300">
                  Action Items
                </span>
                <ul className="flex flex-col gap-3">
                  {item.actionItems.map((action, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300"
                    >
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30 group-hover:bg-purple-500/30 group-hover:border-purple-400/60 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-all duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-purple-300 transition-colors duration-300" />
                      </div>
                      <span className="leading-relaxed">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
