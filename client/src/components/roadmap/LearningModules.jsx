import React, { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDuration } from "./LearningTimeline";

// Shared logic from PrioritySkills for difficulty/priority
function getModuleMeta(skillName) {
  const name = (skillName || "").toLowerCase();

  let priority = "Medium";
  let priorityClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  let difficulty = "Intermediate";

  if (
    name.includes("system design") || 
    name.includes("architecture") || 
    name.includes("aws") || 
    name.includes("cloud") || 
    name.includes("kubernetes") || 
    name.includes("docker") ||
    name.includes("dsa")
  ) {
    priority = "Critical";
    priorityClass = "bg-rose-500/20 text-rose-400 border border-rose-500/30";
    difficulty = "Advanced";
  } else if (
    name.includes("node") || 
    name.includes("express") || 
    name.includes("cicd") || 
    name.includes("react")
  ) {
    priority = "High";
    priorityClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    difficulty = "Intermediate";
  }

  // Fallback for screenshots exact match visual
  if (name.includes("javascript advanced concepts")) {
    priority = "Critical";
    priorityClass = "bg-rose-500/20 text-rose-400 border border-rose-500/30";
    difficulty = "Intermediate";
  }

  return { priority, priorityClass, difficulty };
}

export default function LearningModules({ analysisData }) {
  const { roadmap = [] } = analysisData || {};
  const [expandedId, setExpandedId] = useState(null);

  if (!roadmap.length) return null;

  const toggleAccordion = (idx) => {
    setExpandedId(expandedId === idx ? null : idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="w-full mt-12 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-white tracking-tight">
        Learning Modules
      </h2>

      <div className="flex flex-col gap-4">
        {roadmap.map((item, idx) => {
          const isExpanded = expandedId === idx;
          const duration = getDuration(item.title);
          const { priority, priorityClass, difficulty } = getModuleMeta(item.title);
          const description = item.goal || `Core programming foundation required for development.`;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative group bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] ${isExpanded ? 'border-purple-500/40 bg-[#151f32]/90' : 'hover:-translate-y-1'}`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 md:p-6 flex items-start sm:items-center justify-between gap-4 text-left focus:outline-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 flex-1">
                  <BookOpen className={`w-5 h-5 shrink-0 ${isExpanded ? 'text-purple-400' : 'text-purple-400/70'}`} />
                  <div className="flex flex-col">
                    <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-0.5 max-w-2xl truncate md:whitespace-normal">{description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 shrink-0 mt-1 sm:mt-0">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-bold text-white">{duration}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{difficulty}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-purple-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="px-5 md:px-6 pb-6 pt-2 border-t border-white/5">
                      {/* Mobile stats */}
                      <div className="sm:hidden flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-500 uppercase tracking-wider">Duration</span>
                          <span className="text-sm font-bold text-white">{duration}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-slate-500 uppercase tracking-wider">Difficulty</span>
                          <span className="text-sm font-bold text-white">{difficulty}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6">
                        <div>
                          <h4 className="text-sm font-bold text-white mb-3">Key Topics:</h4>
                          <div className="flex flex-wrap gap-2">
                            {(item.topics || ["Closures", "Async/Await", "Promises", "Event Loop"]).map((topic, tIdx) => (
                              <span key={tIdx} className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium shadow-sm">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white mb-3">Priority Level:</h4>
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold w-fit ${priorityClass}`}>
                            {priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
