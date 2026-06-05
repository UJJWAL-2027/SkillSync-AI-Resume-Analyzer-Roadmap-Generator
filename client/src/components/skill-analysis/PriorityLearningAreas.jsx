import React from "react";
import { motion } from "framer-motion";
import { Zap, BarChart2 } from "lucide-react";

// Helper to derive impact and duration
function getLearningMeta(skillName) {
  const name = (skillName || "").toLowerCase();

  let impact = "Medium Impact";
  let impactClass = "bg-emerald-500/20 text-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
  let duration = "2-4 weeks";

  if (
    name.includes("system design") || 
    name.includes("architecture") || 
    name.includes("aws") || 
    name.includes("cloud")
  ) {
    impact = "Critical";
    impactClass = "bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)]";
    duration = "3-6 months";
  } else if (
    name.includes("docker") || 
    name.includes("kubernetes") || 
    name.includes("cicd") || 
    name.includes("devops") ||
    name.includes("node") ||
    name.includes("express")
  ) {
    impact = "High Impact";
    impactClass = "bg-amber-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.4)]";
    duration = "1-3 months";
  } else if (
    name.includes("dsa") || 
    name.includes("algorithm")
  ) {
    impact = "Medium Impact";
    impactClass = "bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]";
    duration = "3-6 months";
  }

  // Fallback for screenshots
  if (name.includes("advanced dsa")) {
    impact = "Medium Impact";
    impactClass = "bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]";
    duration = "3-6 months";
  }

  return { impact, impactClass, duration };
}

export default function PriorityLearningAreas({ roadmap = [] }) {
  if (!roadmap || roadmap.length === 0) return null;

  // Approximate total learning path duration
  const totalItems = roadmap.length;
  let totalDurationText = "1-3 months";
  if (totalItems > 8) totalDurationText = "12-18 months";
  else if (totalItems > 4) totalDurationText = "6-12 months";
  else if (totalItems > 2) totalDurationText = "3-6 months";

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative p-6 md:p-8 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col gap-8 mt-12">
      <div className="flex items-center gap-3">
        <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Priority Learning Areas
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col gap-6"
      >
        {roadmap.map((area, idx) => {
          const { impact, impactClass, duration } = getLearningMeta(area.skill || area.title);
          
          // Badge colors for ranking circles
          const isCritical = impact === "Critical";
          const isHigh = impact === "High Impact";
          const rankColor = isCritical ? "bg-rose-500" : isHigh ? "bg-amber-500" : "bg-emerald-500";

          return (
            <motion.div
              key={idx}
              variants={item}
              className="relative p-5 md:p-6 bg-[#162032] border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${rankColor} text-white font-bold text-xl flex items-center justify-center shadow-lg shrink-0`}>
                    {idx + 1}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white">{area.title || area.skill}</h3>
                    <p className="text-sm text-slate-400">Estimated completion time: {duration}</p>
                  </div>
                </div>

                <div className={`px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 w-fit ${impactClass}`}>
                  <BarChart2 className="w-4 h-4 shrink-0" />
                  {impact}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Recommended Progress</span>
                  <span>0%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-indigo-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Summary Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 p-5 rounded-xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-indigo-500/20"
      >
        <p className="text-sm text-slate-300 leading-relaxed">
          <span className="font-bold text-white">Learning Path Estimated Duration:</span> {totalDurationText} to master all priority areas. Focus on the highest impact areas first—it has the highest impact on your readiness score and employability.
        </p>
      </motion.div>
    </div>
  );
}
