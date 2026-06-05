import React from "react";
import { Target, Trophy, Code2, Target as TargetIcon } from "lucide-react"; // using specific icons to match somewhat
import { motion } from "framer-motion";

export default function RoadmapHero({ analysisData }) {
  const { role = "Target Role", roadmap = [] } = analysisData || {};

  // Compute metrics
  const totalMilestones = roadmap.length;
  // Estimate ~2 weeks per item roughly for visual
  const totalWeeks = totalMilestones > 0 ? totalMilestones * 2 : 0; 
  const estimatedCompletion = `${totalWeeks} weeks`;
  
  // Count projects (rough heuristic based on goals that include "Build", "Project", "App")
  const projectsToBuild = roadmap.filter(item => {
    const goal = (item.goal || "").toLowerCase();
    return goal.includes("build") || goal.includes("project") || goal.includes("app") || goal.includes("clone");
  }).length || Math.max(1, Math.floor(totalMilestones / 2));

  // Custom icons matching the screenshot styles as close as possible using lucide
  const metrics = [
    { 
      label: "Estimated Completion", 
      value: estimatedCompletion, 
      icon: TargetIcon, 
      iconColor: "text-purple-400" 
    },
    { 
      label: "Target Role", 
      value: role, 
      icon: Target, 
      iconColor: "text-purple-400" 
    },
    { 
      label: "Total Milestones", 
      value: totalMilestones, 
      icon: Trophy, 
      iconColor: "text-purple-400" 
    },
    { 
      label: "Projects To Build", 
      value: projectsToBuild, 
      icon: Code2, 
      iconColor: "text-purple-400" 
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full mt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-3"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Personalized Learning Roadmap
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed">
          A step-by-step plan designed to help you close skill gaps and become job-ready faster.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${m.iconColor}`} />
                <span className="text-xs font-medium text-slate-400">
                  {m.label}
                </span>
              </div>
              <h3 className={`font-bold text-white tracking-tight ${m.label === 'Target Role' ? 'text-xl leading-tight' : 'text-3xl'}`}>
                {m.value}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
