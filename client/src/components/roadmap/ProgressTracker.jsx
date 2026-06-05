import React from "react";
import { motion } from "framer-motion";
import { Lock, Circle } from "lucide-react";
import { getDuration } from "./LearningTimeline";

// A custom SVG for the half-filled circle matching the 'IN PROGRESS' state
const HalfCircleIcon = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2V14Z" fill="currentColor"/>
    <circle cx="8" cy="8" r="6.5" stroke="currentColor"/>
  </svg>
);

export default function ProgressTracker({ analysisData }) {
  const { roadmap = [] } = analysisData || {};

  if (!roadmap.length) return null;

  // Clone roadmap to potentially inject an interview prep step if not present,
  // making it dynamically adaptable while preserving the screenshot's intent.
  const trackerItems = [...roadmap];
  if (!trackerItems.some(item => item.title.toLowerCase().includes("interview"))) {
    trackerItems.push({
      title: "Interview Preparation",
      goal: "Practice & Optimize for interviews",
      week: trackerItems.length + 1
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="w-full mt-12 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-white tracking-tight">
        Progress Tracker
      </h2>

      <div className="bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 md:p-8 flex flex-col">
        {trackerItems.map((item, idx) => {
          const isLast = idx === trackerItems.length - 1;
          const isFirst = idx === 0;
          
          let statusText = "UPCOMING";
          let statusColor = "text-slate-400";
          let Icon = Circle;
          let iconColor = "text-slate-500";

          if (isFirst) {
            statusText = "IN PROGRESS";
            statusColor = "text-purple-400";
            Icon = HalfCircleIcon;
            iconColor = "text-purple-400";
          } else if (isLast) {
            statusText = "LOCKED";
            statusColor = "text-slate-500";
            Icon = Lock;
            iconColor = "text-amber-500";
          }

          const duration = getDuration(item.title);

          return (
            <div 
              key={idx}
              className={`flex items-center justify-between py-4 ${idx !== trackerItems.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-5 h-5 shrink-0 ${iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-base font-bold tracking-tight ${isFirst ? 'text-white' : 'text-slate-200'}`}>
                    {item.title}
                  </span>
                  <span className="text-sm text-slate-500 mt-0.5">{duration}</span>
                </div>
              </div>
              
              <span className={`text-[11px] font-bold uppercase tracking-wider ${statusColor} shrink-0 ml-4`}>
                {statusText}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
