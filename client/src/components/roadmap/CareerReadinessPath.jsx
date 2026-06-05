import React from "react";
import { motion } from "framer-motion";

export default function CareerReadinessPath({ analysisData }) {
  const { score = 0 } = analysisData || {};
  
  // Decide active stage based on resume score dynamically
  // This simulates the readiness progression
  let activeStageIndex = 0;
  if (score > 40) activeStageIndex = 1;
  if (score > 60) activeStageIndex = 2;
  if (score > 80) activeStageIndex = 3;
  if (score > 90) activeStageIndex = 4;

  const stages = [
    { title: "Current State", subtitle: "Skill Gap Identified" },
    { title: "Skill Development", subtitle: "Master Core Technologies" },
    { title: "Project Building", subtitle: "Create Portfolio Pieces" },
    { title: "Interview Prep", subtitle: "Practice & Optimize" },
    { title: "Job Ready", subtitle: "Ready for Interviews" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="w-full mt-12 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-white tracking-tight">
        Career Readiness Path
      </h2>

      <div className="bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 md:p-8">
        <div className="flex flex-col">
          {stages.map((stage, idx) => {
            const isCompleted = idx < activeStageIndex;
            const isActive = idx === activeStageIndex;
            const isLast = idx === stages.length - 1;
            
            // Determine circle styling
            let circleClass = "bg-[#1E293B] border-slate-700 text-slate-400";
            if (isCompleted) {
              circleClass = "bg-[#4C1D95]/40 border-purple-500/50 text-purple-300";
            }
            if (isActive) {
              circleClass = "bg-[#4C1D95] text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]";
            }

            return (
              <div key={idx} className="flex gap-6 relative">
                {/* Vertical Line connecting nodes */}
                {!isLast && (
                  <div className="absolute left-[19px] top-10 bottom-[-10px] w-px bg-slate-800">
                     {isCompleted && (
                       <div className="absolute top-0 w-full bg-[#4C1D95]" style={{ height: '100%' }} />
                     )}
                     {isActive && (
                       <div className="absolute top-0 w-full bg-gradient-to-b from-[#4C1D95] to-transparent" style={{ height: '50%' }} />
                     )}
                  </div>
                )}
                
                {/* Circular Node */}
                <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border shrink-0 font-bold text-sm transition-all duration-300 ${circleClass}`}>
                  {idx + 1}
                </div>
                
                {/* Content */}
                <div className="flex flex-col pb-10 mt-1">
                  <h3 className={`text-[15px] font-bold tracking-tight ${isActive || isCompleted ? 'text-white' : 'text-slate-300'}`}>
                    {stage.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 mt-1">
                    {stage.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
