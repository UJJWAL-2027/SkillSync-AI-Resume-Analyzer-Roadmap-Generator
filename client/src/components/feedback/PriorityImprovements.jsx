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
          if (item.priority.includes("High")) {
            priorityStyles = "bg-red-500/10 text-red-400 border border-red-500/20";
            dotColor = "bg-red-400";
          } else if (item.priority.includes("Medium")) {
            priorityStyles = "bg-orange-500/10 text-orange-400 border border-orange-500/20";
            dotColor = "bg-orange-400";
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#0F172A]/50 border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 ${priorityStyles}`}>
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  {item.priority}
                </div>
              </div>

              <div className="mt-6">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                  Action Items
                </span>
                <ul className="flex flex-col gap-3">
                  {item.actionItems.map((action, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
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
