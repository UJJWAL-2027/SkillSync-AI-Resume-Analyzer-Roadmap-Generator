import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Target, TrendingUp, Award, Zap } from "lucide-react";

export default function RecruiterInsights({ insights = null }) {
  if (!insights) return null;

  // Map hiring potential to border and text colors
  const getPotentialStyles = (potential) => {
    switch (potential) {
      case "High":
        return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
      case "Medium":
        return "text-indigo-400 border-indigo-500/20 bg-indigo-500/5";
      case "Developing":
        return "text-amber-400 border-amber-500/20 bg-amber-500/5";
      default:
        return "text-red-400 border-red-500/20 bg-red-500/5";
    }
  };

  return (
    <section className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <span className="text-xl">👔</span> AI Recruiter Insights
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Professional perspective on your candidacy
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Recruiter Evaluation Summary Box - Exactly matching the screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative group bg-[#0F172A]/50 border border-purple-500/20 rounded-2xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:bg-[#0F172A]/70"
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Recruiter Verdict Paragraph */}
          <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300 text-[15px] md:text-base leading-relaxed mb-6 font-medium">
            {insights.verdict || insights.summary}
          </p>

          {/* Divider */}
          <div className="h-px bg-white/10 group-hover:bg-purple-500/20 transition-colors duration-300 my-6" />

          {/* Avatar Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              AI
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors duration-300">
                SkillSync AI Recruiter
              </span>
              <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                Professional analyst
              </span>
            </div>
          </div>
        </motion.div>

        {/* Recruiter Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Career Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-2xl bg-[#0F172A]/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-purple-400">
              <Briefcase className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Career Positioning</span>
            </div>
            <span className="text-base font-bold text-slate-200 leading-snug">
              {insights.careerPositioning}
            </span>
          </motion.div>

          {/* Card 2: Market Competitiveness */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="p-5 rounded-2xl bg-[#0F172A]/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Market Competitiveness</span>
            </div>
            <span className="text-base font-bold text-slate-200 leading-snug">
              {insights.marketCompetitiveness}
            </span>
          </motion.div>

          {/* Card 3: Hiring Potential */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-5 rounded-2xl bg-[#0F172A]/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-sky-400">
              <Award className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Hiring Potential</span>
            </div>
            <div className={`mt-0.5 px-3 py-1 w-fit rounded-full text-sm font-extrabold border ${getPotentialStyles(insights.hiringPotential || insights.potential)}`}>
              {insights.hiringPotential || insights.potential}
            </div>
          </motion.div>

          {/* Card 4: Interview Readiness (Full Width Span) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="md:col-span-1 p-5 rounded-2xl bg-[#0F172A]/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-emerald-400">
              <Target className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Interview Readiness</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-emerald-400">
                {insights.interviewReadiness || insights.readiness}%
              </span>
            </div>
          </motion.div>

          {/* Card 5: Recommended Next Step (Remaining width span) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-2 p-5 rounded-2xl bg-purple-950/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-purple-300">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Recommended Next Step</span>
            </div>
            <span className="text-sm font-semibold text-slate-300 leading-relaxed mt-0.5">
              {insights.recommendedNextStep || (insights.actions && insights.actions[0]) || "Optimize core skills and cloud infrastructure projects."}
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
