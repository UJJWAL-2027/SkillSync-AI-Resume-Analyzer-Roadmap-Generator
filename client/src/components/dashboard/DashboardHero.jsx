import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp } from "lucide-react";

export default function DashboardHero({ analysis }) {
  const { role = "Target Role", score = 0, matchedSkills = [], missingSkills = [] } = analysis || {};

  const totalSkills = matchedSkills.length + missingSkills.length;
  const matchRatio = totalSkills > 0 ? `${matchedSkills.length}/${totalSkills}` : "0/0";

  // Match badge rating logic
  let badgeText = "Average Match";
  let badgeStyles = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  if (score >= 80) {
    badgeText = "Excellent Match";
    badgeStyles = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
  } else if (score >= 60) {
    badgeText = "Good Match";
    badgeStyles = "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]";
  }

  // Dynamic readiness message
  let feedbackMessage = "Several critical skills need improvement. Work on the gaps identified below to raise your match score.";
  if (score >= 75) {
    feedbackMessage = "You're on track! Your current skill set aligns well with the requirements for this role. Focus on filling the identified gaps to increase your competitiveness.";
  } else if (score >= 50) {
    feedbackMessage = "Good foundation, but some important gaps remain. Focusing on the missing high-priority skills will help you stand out.";
  }

  // SVG Circular progress details
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      <div className="relative group">
        {/* Glow behind the hero card */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[2rem] blur-xl opacity-60 pointer-events-none" />

        <div className="relative p-8 md:p-10 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_40px_rgba(99,102,241,0.05)] grid md:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE: Circular score */}
          <div className="md:col-span-5 flex flex-col items-center justify-center gap-6 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-md" />
              
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Track */}
                <circle
                  cx="88"
                  cy="88"
                  r={radius}
                  stroke="rgba(51, 65, 85, 0.3)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Foreground Active Ring */}
                <motion.circle
                  cx="88"
                  cy="88"
                  r={radius}
                  stroke="url(#heroScoreGrad)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="heroScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {score}%
                </span>
                <span className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">
                  Ready
                </span>
              </div>
            </div>

            {/* Match Badge */}
            <div className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${badgeStyles}`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {badgeText}
            </div>
          </div>

          {/* RIGHT SIDE: Target Role & Stats */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest block mb-1">
                Target Role
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {role}
              </h2>
              <div className="mt-3 flex items-start gap-2 text-[15px] text-slate-300 leading-relaxed">
                <TrendingUp className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                <p>{feedbackMessage}</p>
              </div>
            </div>

            {/* Hero mini metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0F172A]/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                  Match Score
                </p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  {score}%
                </p>
              </div>
              <div className="bg-[#0F172A]/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                  Skills Matched
                </p>
                <p className="text-2xl font-bold text-emerald-400">
                  {matchRatio}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}
