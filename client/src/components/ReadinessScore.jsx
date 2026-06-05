import React from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

/* ----- data ----- */
const score = 78;
const chartData = [
  { name: "filled", value: score },
  { name: "empty", value: 100 - score },
];

const skills = [
  { name: "Frontend", pct: 85, color: "#8B5CF6" },
  { name: "Backend", pct: 72, color: "#3B82F6" },
  { name: "DSA", pct: 60, color: "#EC4899" },
  { name: "System Design", pct: 40, color: "#F97316" },
];

/* ----- component ----- */
export default function ReadinessScore() {
  return (
    <section id="readiness" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Readiness Score
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            See a detailed breakdown of your job readiness and skill levels
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Circular Chart (Recharts) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="78%"
                    outerRadius="96%"
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={6}
                  >
                    <Cell fill="url(#scoreGradient)" />
                    <Cell fill="rgba(51,65,85,0.4)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {score}
                  <span className="text-3xl">%</span>
                </span>
                <span className="text-sm text-slate-400 mt-1">Job Readiness</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Skill Breakdown Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-[#0F172A] border border-purple-500/15 rounded-xl p-7">
              <h3 className="text-lg font-semibold text-white mb-6">
                Skill Match Breakdown
              </h3>

              <div className="flex flex-col gap-5">
                {skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300 font-medium">{s.name}</span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: s.color }}
                      >
                        {s.pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths / Focus Areas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0F172A] border border-white/5 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Strengths</p>
                <p className="text-sm font-semibold text-white">Frontend, Backend</p>
              </div>
              <div className="bg-[#0F172A] border border-white/5 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">Focus Areas</p>
                <p className="text-sm font-semibold text-white">System Design, DSA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
