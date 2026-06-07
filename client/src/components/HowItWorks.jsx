import React from "react";
import { Upload, Zap, Compass } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Upload Resume",
    desc: "Simply upload your resume in PDF or Word format. Our AI instantly processes and analyzes your document.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Analyze Skills & Gaps",
    desc: "Our engine identifies your current skills, strengths, and areas for improvement with pinpoint accuracy.",
  },
  {
    num: "03",
    icon: Compass,
    title: "Get Personalized Roadmap",
    desc: "Receive a custom learning roadmap tailored to your goals and target role with actionable steps.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
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
            How It Works
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Three simple steps to transform your career path
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={item}
              className="relative group bg-[#0F172A]/70 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 flex-1 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center mb-6 text-xl font-bold text-white group-hover:scale-110 group-hover:border-purple-500/40 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                <step.icon className="w-5 h-5 text-purple-400" />
              </div>

              {/* Text */}
              <h3 className="relative z-10 text-lg font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="relative z-10 text-sm text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
