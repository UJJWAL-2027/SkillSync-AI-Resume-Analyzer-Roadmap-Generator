import React from "react";
import { motion } from "framer-motion";
import { Target, FileText, Heart, BarChart3 } from "lucide-react";

export default function QuickMetrics({ analysis }) {
  const { score = 0, matchedSkills = [], missingSkills = [] } = analysis || {};

  const totalSkills = matchedSkills.length + missingSkills.length;
  const matchedText = totalSkills > 0 ? `${matchedSkills.length}/${totalSkills}` : "0/0";

  // Dynamic calculations based on the actual readiness score
  const atsScore = Math.min(98, Math.max(35, Math.round(score * 1.1)));
  const resumeHealth = Math.min(95, Math.max(40, Math.round(score * 1.05)));
  const experienceMatch = Math.min(92, Math.max(25, Math.round(score * 0.92)));

  const metrics = [
    {
      title: "ATS Score",
      value: `${atsScore}%`,
      icon: Target,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Resume Health",
      value: `${resumeHealth}%`,
      icon: FileText,
      iconColor: "text-sky-400",
      iconBg: "bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Skills Matched",
      value: matchedText,
      icon: Heart,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Experience Match",
      value: `${experienceMatch}%`,
      icon: BarChart3,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="text-xl font-bold text-white tracking-tight">
        Quick Metrics
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((m, idx) => {
          const IconComponent = m.icon;
          return (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative group cursor-default"
            >
              {/* Card Hover Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="relative p-6 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-400">
                    {m.title}
                  </span>
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    {m.value}
                  </span>
                </div>

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${m.iconBg}`}>
                  <IconComponent className={`w-6 h-6 ${m.iconColor}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
