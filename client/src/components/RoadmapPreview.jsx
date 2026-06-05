import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

const roadmapItems = [
  {
    title: "JavaScript Fundamentals",
    desc: "Master async/await, closures, and ES6+ features",
    week: "Week 1",
    status: "completed",
  },
  {
    title: "React Projects",
    desc: "Build real-world projects and master hooks",
    week: "Week 2",
    status: "completed",
  },
  {
    title: "Backend Development",
    desc: "Learn Node.js and build REST APIs",
    week: "Week 3",
    status: "in-progress",
  },
  {
    title: "System Design",
    desc: "Master scalability and architecture patterns",
    week: "Week 4",
    status: "upcoming",
  },
  {
    title: "Interview Preparation",
    desc: "Practice coding interviews and mock sessions",
    week: "Week 5",
    status: "upcoming",
  },
];

const statusStyles = {
  completed: {
    border: "border-emerald-500/25",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    barColor: "bg-emerald-400",
    weekColor: "text-emerald-400",
  },
  "in-progress": {
    border: "border-purple-500/25",
    icon: <Circle className="w-5 h-5 text-purple-400 fill-purple-400/30" />,
    barColor: "bg-purple-500",
    weekColor: "text-purple-400",
  },
  upcoming: {
    border: "border-slate-700/60",
    icon: <Circle className="w-5 h-5 text-slate-600" />,
    barColor: "",
    weekColor: "text-purple-400/60",
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function RoadmapPreview() {
  return (
    <section id="roadmap" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Learning Roadmap
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A personalized timeline to achieve your career goals
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col gap-4"
        >
          {roadmapItems.map((r) => {
            const style = statusStyles[r.status];
            return (
              <motion.div
                key={r.week}
                variants={item}
                className={`group bg-[#0F172A] border ${style.border} rounded-xl px-6 py-5 flex items-start gap-4 hover:border-purple-500/30 transition-all duration-300`}
              >
                <div className="mt-0.5 shrink-0">{style.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-white">{r.title}</h4>
                  <p className="text-sm text-slate-400 mt-0.5">{r.desc}</p>
                  {(r.status === "completed" || r.status === "in-progress") && (
                    <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: r.status === "completed" ? "100%" : "50%",
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full rounded-full ${style.barColor}`}
                      />
                    </div>
                  )}
                </div>
                <span className={`text-sm font-medium ${style.weekColor} shrink-0`}>
                  {r.week}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <a
            href="/upload"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#0A0E1A] font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-sm shadow-lg shadow-white/10"
          >
            Start Your Roadmap
          </a>
        </motion.div>
      </div>
    </section>
  );
}
