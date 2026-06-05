import React from "react";
import { FileText, BarChart3, Target, Zap, Compass, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: FileText,
    title: "Resume Parsing",
    desc: "Advanced AI extracts all relevant information from your resume with 95% accuracy.",
  },
  {
    icon: BarChart3,
    title: "Job Readiness Score",
    desc: "Get an instant assessment of how ready you are for your target position.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    desc: "Identify exactly which skills you need to develop to land your dream job.",
  },
  {
    icon: Zap,
    title: "ATS Optimization",
    desc: "Receive suggestions to optimize your resume for Applicant Tracking Systems.",
  },
  {
    icon: Compass,
    title: "Personalized Roadmap",
    desc: "Get a custom learning path with timelines and milestone achievements.",
  },
  {
    icon: MessageCircle,
    title: "Career Feedback",
    desc: "Receive actionable feedback to improve your resume and interview skills.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
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
            Powerful Features
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Everything you need to succeed in your job search journey
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group bg-[#0F172A] border border-purple-500/10 rounded-xl p-6 hover:border-purple-500/25 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.06)]"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center mb-5 border border-purple-500/20 group-hover:bg-purple-500/25 transition-colors">
                <f.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-[16px] font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
