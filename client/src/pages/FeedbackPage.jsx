import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Subcomponents
import MobileNav from "@/components/MobileNav";
import PriorityImprovements from "@/components/feedback/PriorityImprovements";
import KeywordAnalysis from "@/components/feedback/KeywordAnalysis";
import ATSChecklist from "@/components/feedback/ATSChecklist";
import WritingTips from "@/components/feedback/WritingTips";
import QuickWins from "@/components/feedback/QuickWins";
import RecruiterInsights from "@/components/feedback/RecruiterInsights";
import ResumeSummary from "@/components/feedback/ResumeSummary";
import FinalCTA from "@/components/feedback/FinalCTA";

// 💡 Fallback client-side generator to dynamically produce writing tips, quick wins, recruiter insights,
// and resume summaries if they are not yet stored in localStorage (from old uploads prior to backend update)
function computeMissingFeedbackData(data) {
  if (!data) return data;
  if (data.writingTips && data.quickWins && data.recruiterInsights && data.resumeSummary) {
    return data;
  }

  const updated = { ...data };
  const role = data.role || "SDE";
  const score = data.score || 0;
  const missingSkills = data.missingSkills || [];
  const matchedSkills = data.matchedSkills || [];
  const atsChecklist = data.atsChecklist || [];
  
  const hasLinkedIn = atsChecklist.some(x => x.check.toLowerCase().includes("linkedin") && x.passed);
  const hasProjectsHeader = atsChecklist.some(x => x.check.toLowerCase().includes("project") && x.passed);
  const hasExperienceHeader = atsChecklist.some(x => x.check.toLowerCase().includes("experience") && x.passed);

  // 1. Writing Tips
  if (!updated.writingTips || updated.writingTips.length === 0) {
    const tips = [];
    
    // Tip 1: Quantify Achievements
    let beforeQ = "Responsible for project management and deployment.";
    let afterQ = "Led cross-functional team of 5, reducing deployment time by 40% and increasing uptime to 99.9%.";
    if (role === "AIML") {
      beforeQ = "Built machine learning models to improve prediction accuracy.";
      afterQ = "Developed and optimized an XGBoost classification model, increasing prediction accuracy by 15% and reducing inference latency by 80ms.";
    } else if (role === "DATASCIENCE") {
      beforeQ = "Analyzed user data and built reporting dashboards.";
      afterQ = "Processed over 10M+ rows of behavioral data using PySpark, designing an interactive Tableau dashboard that uncovered $50K in monthly cost-saving opportunities.";
    } else if (role === "DEVOPS") {
      beforeQ = "Helped migrate servers to the cloud and improve deployment speed.";
      afterQ = "Automated AWS infrastructure using Terraform, cutting developer deployment pipelines from 25 minutes down to 6 minutes.";
    }
    tips.push({
      title: "Quantify Achievements",
      explanation: "Numbers and metrics make achievements more credible and memorable to recruiters.",
      whyItMatters: "Hiring managers look for measurable impact (revenue saved, speed improved, latency reduced) to evaluate your efficiency.",
      beforeExample: beforeQ,
      afterExample: afterQ
    });

    // Tip 2: Use Action Verbs
    let beforeA = "Was responsible for code quality and bug fixing.";
    let afterA = "Orchestrated code reviews for a team of 4 and resolved critical memory leaks, improving overall application stability by 25%.";
    if (role === "AIML") {
      beforeA = "Worked on model training and cleaning data.";
      afterA = "Engineered preprocessing pipelines for 100GB+ image datasets and trained Convolutional Neural Networks (CNNs) using PyTorch.";
    } else if (role === "DEVOPS") {
      beforeA = "Assisted with Docker configuration and CI/CD pipelines.";
      afterA = "Streamlined build pipelines using GitHub Actions, containerizing application microservices with Docker for seamless environment parity.";
    } else if (role === "DATASCIENCE") {
      beforeA = "Helped the marketing team with SQL queries.";
      afterA = "Formulated complex PostgreSQL queries and cohort analyses, providing data-driven recommendations that boosted user retention by 12%.";
    }
    tips.push({
      title: "Use Action Verbs",
      explanation: 'Start each bullet point with powerful action verbs like "Developed," "Led," "Implemented," not passive voice.',
      whyItMatters: "Strong action verbs draw immediate attention to your active role and ownership in your projects.",
      beforeExample: beforeA,
      afterExample: afterA
    });

    // Tip 3: Tailor to Job Description
    const firstMissing = missingSkills[0] || "relevant skills";
    let beforeT = `Utilized standard languages for application development.`;
    let afterT = `Integrated ${firstMissing} to design and deploy secure, modular components within our production environment.`;
    if (role === "AIML") {
      beforeT = `Used AI concepts to build smart software.`;
      afterT = `Leveraged ${firstMissing} to implement custom loss functions and perform hyperparameter tuning.`;
    } else if (role === "DEVOPS") {
      beforeT = `Managed cloud servers and configured setup.`;
      afterT = `Configured ${firstMissing} pipelines to enable continuous deployment and automated rollbacks.`;
    } else if (role === "DATASCIENCE") {
      beforeT = `Parsed data to find key business insights.`;
      afterT = `Applied ${firstMissing} libraries to execute exploratory data analysis (EDA) and visualize trends.`;
    }
    tips.push({
      title: "Tailor to Job Description",
      explanation: `Match keywords and requirements from the job description to increase your ATS score.`,
      whyItMatters: "Applicant Tracking Systems score resumes based on direct matches of core keywords and required skills.",
      beforeExample: beforeT,
      afterExample: afterT
    });

    updated.writingTips = tips;
  }

  // 2. Quick Wins
  if (!updated.quickWins || updated.quickWins.length === 0) {
    const wins = [];
    if (!hasLinkedIn) {
      wins.push({
        title: "Add Your LinkedIn URL",
        impact: "High",
        explanation: "A LinkedIn profile allows recruiters to verify your identity, view professional recommendations, and explore your network.",
        benefit: "Increases recruiter engagement by 35%"
      });
    }
    
    wins.push({
      title: "Add Your GitHub Profile Link",
      impact: "High",
      explanation: "For technical positions, having an active GitHub link directly shows recruiters the quality, structure, and history of your code.",
      benefit: "Proves hands-on technical competence"
    });

    if (score < 90) {
      wins.push({
        title: "Include a 2-3 Line Professional Summary",
        impact: "High",
        explanation: `Position yourself immediately as a qualified candidate by writing a short, impact-oriented summary targeting the ${role} field.`,
        benefit: "Helps recruiters understand your value immediately"
      });
    }

    wins.push({
      title: "Use consistent date formats",
      impact: "Medium",
      explanation: "Ensure all dates on your resume follow a single format (e.g. Month YYYY or MM/YYYY) so that ATS software can easily parse your timeline.",
      benefit: "Improves ATS parsing accuracy"
    });

    wins.push({
      title: "Reorganize bullet points: Result-first format",
      impact: "High",
      explanation: "Rewrite your bullet points to start with the positive metric or achievement first, followed by the specific tools and actions you took.",
      benefit: "Makes accomplishments stand out to ATS systems"
    });

    if (missingSkills.length > 0) {
      wins.push({
        title: `Add ${missingSkills[0]} to Skills Section`,
        impact: "High",
        explanation: `The job description heavily values ${missingSkills[0]}. If you have prior experience with it, make sure it is explicitly listed.`,
        benefit: "Bypasses ATS keyword screening"
      });
    }

    updated.quickWins = wins;
  }

  // 3. Recruiter Insights
  if (!updated.recruiterInsights) {
    const roleNames = {
      SDE: "Software Development Engineer",
      AIML: "AI / Machine Learning Engineer",
      DEVOPS: "DevOps Engineer",
      DATASCIENCE: "Data Scientist"
    };
    const fullRoleName = roleNames[role] || role;

    let hiringPotential = "developing applicant";
    let potentialLabel = "Developing";
    if (score >= 75) {
      hiringPotential = "highly competitive candidate";
      potentialLabel = "Strong";
    } else if (score >= 45) {
      hiringPotential = "competitive candidate";
      potentialLabel = "Moderate";
    }

    let targetLevel = "junior / entry-level";
    if (data.level === "Advanced") {
      targetLevel = "senior";
    } else if (data.level === "Intermediate") {
      targetLevel = "mid-level";
    }

    let strengthPart = matchedSkills.length > 0
      ? `Your experience with key technologies like ${matchedSkills.slice(0, 2).join(" and ")} is strong`
      : "Your foundational credentials and academic background show potential";

    let concernPart = missingSkills.length > 0
      ? `but emphasizing your ${missingSkills.slice(0, 2).join(" and ")} capabilities will open doors to higher-tier opportunities`
      : "and your skill alignment is highly aligned with modern standards";

    let extraPart = "";
    if (role === "SDE") {
      extraPart = "Consider highlighting any leadership or mentorship experience, along with backend capabilities or cloud deployment.";
    } else if (role === "AIML") {
      extraPart = "Emphasizing model deployment, cloud orchestration (MLOps), or hyperparameter tuning will boost your competitive edge.";
    } else if (role === "DEVOPS") {
      extraPart = "Adding more infrastructure-as-code patterns, automated monitoring, or container orchestration details will be key.";
    } else if (role === "DATASCIENCE") {
      extraPart = "Focusing on big data processing, data warehousing, or statistical A/B testing will greatly attract hiring managers.";
    }

    const summary = `Based on your resume against ${fullRoleName} job postings, you're ${hiringPotential} for ${targetLevel} roles. ${strengthPart}, ${concernPart}. ${extraPart}`;

    let hiringPotentialLabel = "Developing";
    if (score >= 80) hiringPotentialLabel = "High";
    else if (score >= 50) hiringPotentialLabel = "Medium";
    else if (score >= 30) hiringPotentialLabel = "Developing";
    else hiringPotentialLabel = "Low";

    let positioning = "Full-stack candidate";
    if (role === "AIML") positioning = "AI / Machine Learning candidate";
    else if (role === "DATASCIENCE") positioning = "Data-focused candidate";
    else if (role === "DEVOPS") positioning = "DevOps-focused candidate";
    else {
      const hasFrontend = matchedSkills.some(s => ["react", "vue", "angular", "html", "css", "javascript", "typescript"].includes(s.toLowerCase()));
      const hasBackend = matchedSkills.some(s => ["node", "express", "python", "java", "spring", "c#", "net", "go", "sql", "mongodb"].includes(s.toLowerCase()));
      if (hasFrontend && hasBackend) positioning = "Full-stack candidate";
      else if (hasFrontend) positioning = "Frontend-focused candidate";
      else positioning = "Backend-focused candidate";
    }

    let competitiveness = "Competitive for entry-level roles";
    if (data.level === "Advanced") competitiveness = "Competitive for senior roles";
    else if (data.level === "Intermediate") competitiveness = "Competitive for mid-level roles";
    else if (score < 30) competitiveness = "Competitive for internships";

    let recommendedNextStep = "Build a cloud deployment project";
    if (role === "AIML") {
      recommendedNextStep = "Deploy models into production and demonstrate MLOps pipeline integration";
    } else if (role === "DEVOPS") {
      recommendedNextStep = "Add automated monitoring and Site Reliability Engineering metrics to your projects";
    } else if (role === "DATASCIENCE") {
      recommendedNextStep = "Incorporate big data processing patterns (e.g., Spark, Hadoop) or predictive analytics models";
    } else {
      if (missingSkills.some(s => ["aws", "docker", "kubernetes", "cloud"].includes(s.toLowerCase()))) {
        recommendedNextStep = "Build and host a cloud deployment project showing infrastructure setup";
      } else {
        recommendedNextStep = "Integrate advanced database schema optimization and API design exposure";
      }
    }

    const interviewReadiness = Math.round(
      score * 0.85 + (atsChecklist.filter(x => x.passed).length / (atsChecklist.length || 1)) * 15
    );

    updated.recruiterInsights = {
      verdict: summary,
      hiringPotential: hiringPotentialLabel,
      interviewReadiness: Math.min(interviewReadiness, 100),
      careerPositioning: positioning,
      marketCompetitiveness: competitiveness,
      recommendedNextStep
    };
  }

  // 4. Generate Resume Summary
  if (!updated.resumeSummary) {
    let overallQuality = "Needs Improvement";
    let qualityDesc = "Your resume requires significant optimization to align with the target role requirements.";
    if (score >= 85) {
      overallQuality = "Excellent";
      qualityDesc = "Your resume is outstanding and aligns perfectly with key industry expectations.";
    } else if (score >= 70) {
      overallQuality = "Strong";
      qualityDesc = "Your resume is well-structured and highly competitive for this role.";
    } else if (score >= 50) {
      overallQuality = "Good";
      qualityDesc = "Your resume shows a solid foundation, with some key areas to optimize.";
    } else if (score >= 35) {
      overallQuality = "Average";
      qualityDesc = "Your resume meets basic criteria but needs stronger technical alignment.";
    }

    const strengths = [];
    if (matchedSkills.length > 0) {
      strengths.push(`Clear technical expertise in ${matchedSkills.slice(0, 3).join(", ")}`);
    }
    if (hasExperienceHeader) {
      strengths.push("Well-organized professional experience section");
    }
    if (strengths.length < 3) {
      strengths.push(`Good alignment with the core ${role} requirements`);
    }

    const weaknesses = [];
    if (missingSkills.length > 0) {
      weaknesses.push(`Missing key role-specific keywords: ${missingSkills.slice(0, 2).join(", ")}`);
    }
    if (!hasLinkedIn) {
      weaknesses.push("Absence of professional networking links (LinkedIn URL)");
    }
    if (weaknesses.length < 3) {
      weaknesses.push("Limited inclusion of leadership or project ownership keywords");
    }

    let topAtsConcern = "No critical ATS concerns detected. Ensure your contact info is up to date.";
    const failedAts = atsChecklist.filter(x => !x.passed);
    if (failedAts.length > 0) {
      topAtsConcern = `Missing critical ATS elements: ${failedAts.map(x => x.check).slice(0, 2).join(" and ")}`;
    } else if (missingSkills.length > 0) {
      topAtsConcern = `Resume lacks critical keywords like ${missingSkills.slice(0, 2).join(", ")} required for this role`;
    }

    let mostImpactful = "Review the recommended next steps on the roadmap page to maximize your competitiveness.";
    if (!hasLinkedIn) {
      mostImpactful = "Adding a projects section and a clickable LinkedIn URL will significantly increase recruiter interest.";
    } else if (missingSkills.length > 0) {
      mostImpactful = `Integrating missing technical keywords like ${missingSkills[0]} and quantifying achievements will offer the highest ROI.`;
    }

    updated.resumeSummary = {
      overallQuality,
      qualityDesc,
      strengths,
      weaknesses,
      topAtsConcern,
      mostImpactfulImprovement: mostImpactful
    };
  }

  return updated;
}

export default function FeedbackPage() {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (!stored) {
      navigate("/upload");
    } else {
      try {
        const parsed = JSON.parse(stored);
        const resolvedData = parsed.analysis ? parsed.analysis : parsed;
        setAnalysisData(computeMissingFeedbackData(resolvedData));
      } catch (e) {
        console.error("Failed to parse analysisResult", e);
        navigate("/upload");
      }
    }
    setIsChecking(false);
  }, [navigate]);


  if (isChecking || !analysisData) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="text-slate-400 animate-pulse text-lg">Loading Feedback...</div>
      </div>
    );
  }

  // Use the new dynamically generated fields from backend
  const { 
    priorityImprovements = [], 
    keywordAnalysis = {}, 
    atsChecklist = [],
    writingTips = [],
    quickWins = [],
    recruiterInsights = null,
    resumeSummary = null
  } = analysisData;

  return (
    <div className="min-h-screen bg-[#0B1120] relative flex flex-col font-sans text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-sky-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all duration-300">
              <span className="text-white font-bold text-sm tracking-wide">SS</span>
            </span>
            <span className="text-slate-100 font-semibold text-lg tracking-tight">SkillSync</span>
          </Link>

          <MobileNav />

          {/* Progress Navigation */}
          <nav className="hidden md:flex items-center gap-3 text-sm font-medium">
            <Link to="/dashboard" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">
              Dashboard
            </Link>
            <span className="text-slate-600">→</span>
            <Link to="/skill-analysis" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">
              Skill Analysis
            </Link>
            <span className="text-slate-600">→</span>
            <Link to="/roadmap" className="text-slate-500 px-3 py-1 hover:text-slate-300 transition-colors">
              Roadmap
            </Link>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Feedback
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 flex flex-col gap-12">
        
        {/* Page Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Resume Feedback
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl leading-relaxed">
            Detailed analysis and actionable insights to improve your resume and career prospects
          </p>
        </motion.div>



        {/* Section 2: Priority Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <PriorityImprovements improvements={priorityImprovements} />
        </motion.div>

        {/* Section 3: Keyword Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <KeywordAnalysis keywordAnalysis={keywordAnalysis} />
        </motion.div>

        {/* Section 4: ATS Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <ATSChecklist checklist={atsChecklist} />
        </motion.div>

        {/* Section 5: Writing Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <WritingTips tips={writingTips} />
        </motion.div>

        {/* Section 6: Quick Wins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <QuickWins wins={quickWins} />
        </motion.div>

        {/* Section 7: AI Recruiter Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <RecruiterInsights insights={recruiterInsights} />
        </motion.div>

        {/* Section 8: AI Resume Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <ResumeSummary summary={resumeSummary} />
        </motion.div>

        {/* Section 9: Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <FinalCTA />
        </motion.div>

      </main>
    </div>
  );
}

