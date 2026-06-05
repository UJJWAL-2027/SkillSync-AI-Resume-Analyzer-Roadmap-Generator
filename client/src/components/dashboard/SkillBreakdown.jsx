import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

const CATEGORIES = [
  { name: "Frontend", keywords: ["react", "vue", "angular", "html", "css", "js", "javascript", "typescript", "next", "tailwind", "frontend", "sass", "bootstrap"] },
  { name: "Backend", keywords: ["node", "express", "nest", "django", "flask", "spring", "backend", "api", "graphql", "rest", "golang", "php"] },
  { name: "DSA", keywords: ["structure", "algorithm", "dsa", "leetcode", "array", "tree", "graph", "sorting", "searching"] },
  { name: "Databases", keywords: ["sql", "mysql", "postgres", "postgresql", "mongo", "mongodb", "redis", "database", "db", "prisma", "sequelize", "nosql"] },
  { name: "Cloud", keywords: ["aws", "azure", "gcp", "cloud", "docker", "kubernetes", "k8s", "devops", "terraform", "cicd", "git", "github", "jenkins"] },
  { name: "System Design", keywords: ["system design", "architecture", "microservices", "scaling", "load balancer", "caching", "design pattern"] },
];

export default function SkillBreakdown({ analysis }) {
  const { score = 0, matchedSkills = [], missingSkills = [] } = analysis || {};

  // Map skill list of strings to lowercase for categorization
  const matchedList = matchedSkills.map(s => (typeof s === "string" ? s.toLowerCase() : JSON.stringify(s).toLowerCase()));
  const missingList = missingSkills.map(s => (typeof s === "string" ? s.toLowerCase() : JSON.stringify(s).toLowerCase()));

  // Process data for the chart dynamically
  const data = CATEGORIES.map((cat) => {
    // Check which skills fit in this category
    const matchedCount = matchedList.filter(s => cat.keywords.some(kw => s.includes(kw))).length;
    const missingCount = missingList.filter(s => cat.keywords.some(kw => s.includes(kw))).length;
    const totalCount = matchedCount + missingCount;

    let pct = 0;
    if (totalCount > 0) {
      pct = Math.round((matchedCount / totalCount) * 100);
    } else {
      // Deterministic calculation based on overall score and category name if no specific skills belong here
      const charSum = cat.name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const offset = (charSum % 25) - 10; // stable offset between -10 and 15
      pct = Math.min(95, Math.max(30, Math.round(score + offset)));
    }

    return {
      name: cat.name,
      value: pct,
    };
  });

  // Custom tooltips for high-fidelity styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0F172A] border border-white/10 px-3 py-2 rounded-xl text-xs text-slate-300 shadow-2xl">
          <p className="font-semibold text-white mb-0.5">{payload[0].payload.name}</p>
          <p className="text-indigo-400">Match Level: <span className="font-bold">{payload[0].value}%</span></p>
        </div>
      );
    }
    return null;
  };

  // Harmonious gradient colors matching landing/dashboard theme
  const barColors = [
    { start: "#8B5CF6", end: "#EC4899" }, // Frontend
    { start: "#6366F1", end: "#3B82F6" }, // Backend
    { start: "#06B6D4", end: "#3B82F6" }, // DSA
    { start: "#A78BFA", end: "#C084FC" }, // Databases
    { start: "#C084FC", end: "#E879F9" }, // Cloud
    { start: "#818CF8", end: "#6366F1" }, // System Design
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col gap-6"
    >
      <h3 className="text-xl font-bold text-white tracking-tight">
        Skill Breakdown
      </h3>

      <div className="p-6 bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_40px_rgba(99,102,241,0.02)]">
        <div className="w-full h-[320px] md:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
            >
              <defs>
                {barColors.map((col, idx) => (
                  <linearGradient id={`barGrad-${idx}`} key={idx} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={col.start} />
                    <stop offset="100%" stopColor={col.end} stopOpacity={0.8} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255, 255, 255, 0.05)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94A3B8", fontSize: 11 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255, 255, 255, 0.02)", radius: 12 }}
              />
              <Bar
                dataKey="value"
                radius={[12, 12, 0, 0]}
                maxBarSize={60}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#barGrad-${index % barColors.length})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
