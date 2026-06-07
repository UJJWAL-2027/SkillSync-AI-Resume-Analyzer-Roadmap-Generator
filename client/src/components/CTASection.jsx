import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  const scrollToFeatures = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-28 px-6 relative">
      {/* Subtle glow behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-purple-600/8 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E293B]/80 border border-white/10 text-sm text-slate-300 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Get Started Today
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Discover Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
            Skill Gaps?
          </span>
        </h2>

        <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
          Join thousands of professionals who have unlocked their full potential
          with SkillSync
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0A0E1A] font-semibold rounded-full hover:bg-slate-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] text-[15px]"
          >
            Analyze Resume Now
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={scrollToFeatures}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1E293B]/60 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-full hover:bg-[#1E293B]/80 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-[15px] cursor-pointer"
          >
            View Features
          </button>
        </div>

        <p className="text-sm text-slate-500 mt-6">
          Free for your first analysis • No credit card required • Results in 30
          seconds
        </p>
      </motion.div>
    </section>
  );
}
