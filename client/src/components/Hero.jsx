import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.08]">
            <span className="text-white">Turn Your{"\n"}Resume Into a </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
              Job-Ready Career Plan
            </span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
            Upload your resume, discover skill gaps, measure job readiness, and
            receive a personalized roadmap to land your target role.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0A0E1A] font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-white/10 text-[15px]"
            >
              Analyze My Resume
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-4">
            <p className="text-sm text-slate-500 mb-2">
              Trusted by thousands of professionals
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                10,000+ Resumes Analyzed
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                95% Accuracy Rate
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column — Glass Preview Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg mx-auto lg:ml-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition duration-700" />

            <div className="relative bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Resume Analysis</h3>
                <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              </div>

              {/* Circular Score */}
              <div className="flex justify-center mb-6">
                <div className="relative w-44 h-44">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80" cy="80" r="68"
                      fill="none"
                      stroke="rgba(51,65,85,0.5)"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80" cy="80" r="68"
                      fill="none"
                      stroke="url(#heroGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 68}
                      strokeDashoffset={2 * Math.PI * 68 * (1 - 0.82)}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">82%</span>
                    <span className="text-sm text-slate-400">Match Score</span>
                  </div>
                </div>
              </div>

              {/* Stat Cards Row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "ATS Score", value: "78%" },
                  { label: "Skills Found", value: "24" },
                  { label: "Gaps", value: "7" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#1E293B]/60 border border-white/5 rounded-xl p-3 text-center"
                  >
                    <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-purple-400">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Roadmap Progress */}
              <div>
                <p className="text-sm text-slate-400 mb-2">Roadmap Progress</p>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
