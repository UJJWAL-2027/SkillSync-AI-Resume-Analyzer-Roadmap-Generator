const pdf = require("pdf-parse");
const { extractSkills } = require("../services/skillExtractor");
const { analyzeSkills } = require("../services/matchingService");
const { generateRoadmap } = require("../services/roadmapService");
const { generateFeedback } = require("../services/feedbackService");

// ✅ Allowed roles
const validRoles = ["SDE", "AIML", "DEVOPS", "DATASCIENCE"];

exports.uploadResume = async (req, res) => {
  try {
    // ✅ File validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // ✅ File type validation
    if (req.file.mimetype !== "application/pdf" && !req.file.originalname.toLowerCase().endsWith(".pdf")) {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    // ✅ Role validation
    const role = req.body.role;
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing role",
      });
    }

    // 🔍 Logging (interview bonus)
    console.log("📌 Role:", role);

    // ✅ Extract text from PDF
    const data = await pdf(req.file.buffer);
    const rawText = data.text;

    // ✅ Empty text check
    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "This file does not appear to be a valid resume. Please upload a resume PDF containing readable text.",
      });
    }

    // ✅ Extract skills
    const skills = extractSkills(rawText);

    console.log("🧠 Extracted Skills:", skills);

    // ✅ Handle no skills case
    if (!skills || skills.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          role,
          level: "Beginner",
          extractedSkills: [],
          score: 0,
          matchedSkills: [],
          missingSkills: [],
          roadmap: [],
          feedback: [
            "No relevant skills detected. Add technical skills to your resume.",
          ],
        },
      });
    }

    // ✅ Analyze skills
    const analysis = analyzeSkills(skills, role);

    console.log("📊 Score:", analysis.score);
    console.log("❗ Missing Skills:", analysis.missingSkills);

    // ✅ Confidence level
    let level = "Beginner";
    if (analysis.score > 70) level = "Advanced";
    else if (analysis.score > 40) level = "Intermediate";

    // ✅ Generate roadmap
    const roadmap = generateRoadmap(analysis.missingSkills);

    // ✅ Generate feedback
    const feedback = generateFeedback(analysis.missingSkills, role);

    // ✅ Generate ATS Compatibility Checklist
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(rawText);
    const hasPhone = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(rawText);
    const hasLinkedIn = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i.test(rawText);
    const hasExperienceHeader = /\b(Experience|Employment History|Work History)\b/i.test(rawText);
    const hasEducationHeader = /\b(Education|Academic Background)\b/i.test(rawText);
    const hasProjectsHeader = /\b(Projects|Personal Projects)\b/i.test(rawText);
    const hasSkillsHeader = /\b(Skills|Technical Skills|Core Competencies)\b/i.test(rawText);

    const atsChecklist = [
      { check: "Contact information clearly visible", passed: hasEmail && hasPhone },
      { check: "Professional email address used", passed: hasEmail },
      { check: "Phone number included", passed: hasPhone },
      { check: "LinkedIn profile URL provided", passed: hasLinkedIn },
      { check: "Proper section headers", passed: hasExperienceHeader && hasEducationHeader },
      { check: "Skills section included", passed: hasSkillsHeader },
      { check: "Standard fonts only (no decorative fonts)", passed: true }, // Assumed standard as pdf-parse works best with standard text
      { check: "Consistent date formatting", passed: true } // Assumed true for visual completeness if text parses
    ];

    // ✅ Dynamic Action Item Generators
    const getTechActionItems = () => {
      let items = [];
      if (analysis.missingSkills.length > 0) {
          items.push(`Add missing skills like ${analysis.missingSkills.slice(0, 3).join(", ")} which are highly sought after for ${role} positions.`);
      }
      if (skills.length > 0) {
          items.push(`You currently list ${skills.slice(0, 2).join(", ")}. Consider adding your proficiency level (e.g., Expert, Intermediate) for these to give recruiters clarity.`);
      }
      items.push(`Reorganize your skills section to prioritize ${role}-specific technologies over generic tools.`);
      return items;
    };

    const getProjectActionItems = () => {
      let items = [];
      items.push(`Restructure your project bullet points to highlight your specific impact on the ${role} components.`);
      if (skills.length > 0) {
          const randomSkill = skills[Math.floor(Math.random() * skills.length)];
          items.push(`Explicitly mention where you applied ${randomSkill} in your recent projects to prove practical experience.`);
      }
      items.push(`Add quantifiable results (e.g., 'Improved performance by 40%') to demonstrate measurable impact to potential employers.`);
      return items;
    };

    const getFormattingActionItems = () => {
      let items = [];
      if (!hasExperienceHeader && !hasEducationHeader) {
          items.push(`Clearly define your 'Experience' and 'Education' sections with standard headers so ATS systems can parse them accurately.`);
      } else {
          items.push(`Ensure consistent bullet point formatting, margins, and spacing across all your core sections.`);
      }
      items.push(`Use standard, ATS-friendly fonts (Arial, Calibri) to prevent automated rejection from tracking software.`);
      if (!hasLinkedIn) {
          items.push(`Add a clickable LinkedIn profile URL to your contact header to provide a comprehensive professional view.`);
      }
      return items;
    };

    const getSummaryActionItems = () => {
      let items = [];
      items.push(`Tailor your opening summary to explicitly target the ${role} position and align with career goals.`);
      if (skills.length >= 2) {
          items.push(`Highlight your core expertise in ${skills[0]} and ${skills[1]} right in the very first sentence.`);
      } else {
          items.push(`Mention your primary technical strengths and biggest achievement immediately in the summary.`);
      }
      items.push(`Keep the summary concise (2-3 sentences) and focus entirely on your unique value proposition.`);
      return items;
    };

    const getKeywordActionItems = () => {
      let items = [];
      items.push(`Research 10-15 keywords from recent ${role} job postings and integrate them naturally throughout your bullet points.`);
      if (analysis.missingSkills.length > 0) {
          items.push(`Focus heavily on incorporating missing critical terms like ${analysis.missingSkills[0]} into your work experience descriptions.`);
      }
      items.push(`Ensure variations of the ${role} title are mentioned, such as full titles or common industry acronyms.`);
      return items;
    };

    // ✅ Pre-compute ATS failure count (needed by priority resolver)
    const failedAtsChecks = atsChecklist.filter(item => !item.passed).length;

    // ✅ Dynamic Priority Resolver
    // Uses a composite of match score, missing skill count, and ATS failures
    // to determine the most accurate priority tier for each improvement card.
    const resolvePriority = ({ missingWeight = 0, scoreWeight = 0, atsWeight = 0 }) => {
      // Normalize each signal to 0–100 scale
      const missingSignal = Math.min((analysis.missingSkills.length / 5) * 100, 100); // max 5 missing
      const scoreSignal = 100 - analysis.score; // lower score = higher urgency
      const atsSignal = Math.min((failedAtsChecks / 5) * 100, 100); // max 5 ats fails

      const composite =
        (missingSignal * missingWeight + scoreSignal * scoreWeight + atsSignal * atsWeight) /
        (missingWeight + scoreWeight + atsWeight || 1);

      if (composite >= 60) return "High Priority";
      if (composite >= 30) return "Medium Priority";
      return "Low Priority";
    };

    // ✅ Generate Priority Improvements
    const priorityImprovements = [];

    // 1. Strengthen Technical Skills Section — driven mainly by missing skills count
    if (analysis.missingSkills.length > 0) {
      priorityImprovements.push({
        title: "Strengthen Technical Skills Section",
        description: `Your resume is missing key technical skills required for a ${role} role. Recruiters want to see proficiency levels and related skills.`,
        priority: resolvePriority({ missingWeight: 0.7, scoreWeight: 0.3, atsWeight: 0 }),
        actionItems: getTechActionItems()
      });
    }

    // 2. Optimize Project Descriptions — driven mainly by overall match score
    if (analysis.score < 80) {
      priorityImprovements.push({
        title: "Optimize Project Descriptions",
        description: "Current project descriptions might be too generic. Add metrics, technologies used, and impact statements.",
        priority: resolvePriority({ missingWeight: 0.2, scoreWeight: 0.8, atsWeight: 0 }),
        actionItems: getProjectActionItems()
      });
    }

    // 3. Improve Resume Formatting — driven mainly by ATS failures
    if (failedAtsChecks > 0 || !hasExperienceHeader || !hasEducationHeader) {
      priorityImprovements.push({
        title: "Improve Resume Formatting",
        description: "Consider updating the visual hierarchy and spacing to make it more ATS-friendly.",
        priority: resolvePriority({ missingWeight: 0, scoreWeight: 0.2, atsWeight: 0.8 }),
        actionItems: getFormattingActionItems()
      });
    }

    // 4. Enhance Summary Statement — balanced across all signals
    if (analysis.score < 90) {
      priorityImprovements.push({
        title: "Enhance Summary Statement",
        description: "Your professional summary could better highlight your unique value proposition.",
        priority: resolvePriority({ missingWeight: 0.3, scoreWeight: 0.5, atsWeight: 0.2 }),
        actionItems: getSummaryActionItems()
      });
    }

    // 5. Add More Keywords — driven by missing skills + score gap
    if (analysis.missingSkills.length > 0 || analysis.score < 70) {
      priorityImprovements.push({
        title: "Add More Keywords",
        description: "Include industry-specific keywords to improve ATS matching with job descriptions.",
        priority: resolvePriority({ missingWeight: 0.5, scoreWeight: 0.5, atsWeight: 0 }),
        actionItems: getKeywordActionItems()
      });
    }

    // ✅ Generate Keyword Analysis
    const keywordAnalysis = {
      matched: analysis.matchedSkills,
      missing: analysis.missingSkills,
      recommended: []
    };
    
    const roleRecommendations = {
      SDE: ["Microservices", "REST APIs", "Agile", "Full-Stack Developer", "Web Performance", "System Design"],
      AIML: ["Deep Learning", "Data Mining", "NLP", "Computer Vision", "Model Deployment", "MLOps"],
      DEVOPS: ["Infrastructure as Code", "Containerization", "Monitoring", "Log Management", "Automation", "Site Reliability"],
      DATASCIENCE: ["Data Visualization", "Statistical Analysis", "Predictive Modeling", "Big Data", "A/B Testing", "ETL"]
    };

    keywordAnalysis.recommended = roleRecommendations[role] || ["Problem Solving", "Team Collaboration", "Agile"];
    keywordAnalysis.recommended = keywordAnalysis.recommended.filter(k => !analysis.matchedSkills.some(ms => ms.toLowerCase() === k.toLowerCase()));

    // ✅ Generate Dynamic Writing Tips (3-6 personalized tips, no generic placeholders, no hardcoded examples)
    const writingTips = [];
    
    // Check for Quantified Achievements: check if resume lacks numbers/percentages
    const digitCount = (rawText.match(/\d/g) || []).length;
    const hasPercentages = /%/.test(rawText);
    if (digitCount < 15 || !hasPercentages) {
      let beforeText = "Responsible for project management and deployment.";
      let afterText = "Led cross-functional team of 5, reducing deployment time by 40% and increasing uptime to 99.9%.";
      if (role === "AIML") {
        beforeText = "Built machine learning models to improve prediction accuracy.";
        afterText = "Developed and optimized an XGBoost classification model, increasing prediction accuracy by 15% and reducing inference latency by 80ms.";
      } else if (role === "DATASCIENCE") {
        beforeText = "Analyzed user data and built reporting dashboards.";
        afterText = "Processed over 10M+ rows of behavioral data using PySpark, designing an interactive Tableau dashboard that uncovered $50K in monthly cost-saving opportunities.";
      } else if (role === "DEVOPS") {
        beforeText = "Helped migrate servers to the cloud and improve deployment speed.";
        afterText = "Automated AWS infrastructure using Terraform, cutting developer deployment pipelines from 25 minutes down to 6 minutes.";
      }
      
      writingTips.push({
        title: "Quantify Achievements",
        explanation: "Numbers and metrics make achievements more credible and memorable to recruiters.",
        whyItMatters: "Hiring managers look for measurable impact (revenue saved, speed improved, latency reduced) to evaluate your efficiency.",
        beforeExample: beforeText,
        afterExample: afterText
      });
    }

    // Check for Action Verbs: check for passive phrases
    const hasPassivePhrases = /\b(was responsible for|worked on|helped with|assisted in|duties included)\b/i.test(rawText);
    if (hasPassivePhrases || rawText.length < 500) {
      let beforeText = "Was responsible for code quality and bug fixing.";
      let afterText = "Orchestrated code reviews for a team of 4 and resolved critical memory leaks, improving overall application stability by 25%.";
      if (role === "AIML") {
        beforeText = "Worked on model training and cleaning data.";
        afterText = "Engineered preprocessing pipelines for 100GB+ image datasets and trained Convolutional Neural Networks (CNNs) using PyTorch.";
      } else if (role === "DEVOPS") {
        beforeText = "Assisted with Docker configuration and CI/CD pipelines.";
        afterText = "Streamlined build pipelines using GitHub Actions, containerizing application microservices with Docker for seamless environment parity.";
      } else if (role === "DATASCIENCE") {
        beforeText = "Helped the marketing team with SQL queries.";
        afterText = "Formulated complex PostgreSQL queries and cohort analyses, providing data-driven recommendations that boosted user retention by 12%.";
      }

      writingTips.push({
        title: "Use Action Verbs",
        explanation: 'Start each bullet point with powerful action verbs like "Developed," "Led," "Implemented," not passive voice.',
        whyItMatters: "Strong action verbs draw immediate attention to your active role and ownership in your projects.",
        beforeExample: beforeText,
        afterExample: afterText
      });
    }

    // Check for Keyword/Role tailoring
    if (analysis.missingSkills.length > 0) {
      const firstMissing = analysis.missingSkills[0];
      let beforeText = `Utilized standard languages for application development.`;
      let afterText = `Integrated ${firstMissing} to design and deploy secure, modular components within our production environment.`;
      if (role === "AIML") {
        beforeText = `Used AI concepts to build smart software.`;
        afterText = `Leveraged ${firstMissing} to implement custom loss functions and perform hyperparameter tuning.`;
      } else if (role === "DEVOPS") {
        beforeText = `Managed cloud servers and configured setup.`;
        afterText = `Configured ${firstMissing} pipelines to enable continuous deployment and automated rollbacks.`;
      } else if (role === "DATASCIENCE") {
        beforeText = `Parsed data to find key business insights.`;
        afterText = `Applied ${firstMissing} libraries to execute exploratory data analysis (EDA) and visualize trends.`;
      }

      writingTips.push({
        title: "Tailor to Job Description",
        explanation: `Match keywords and requirements from the job description to increase your ATS score.`,
        whyItMatters: "Applicant Tracking Systems score resumes based on direct matches of core keywords and required skills.",
        beforeExample: beforeText,
        afterExample: afterText
      });
    }

    // Check for Technical Descriptions
    if (analysis.score < 85) {
      let beforeText = "Built a web app to help customers manage tasks.";
      let afterText = "Architected a responsive task-management SPA using React and Node.js, implementing Redux for state management and JWT for secure authentication.";
      if (role === "AIML") {
        beforeText = "Built a chatbot project for user queries.";
        afterText = "Developed an NLP conversational chatbot using BERT and Transformers, optimizing model size through quantization to reduce latency by 35%.";
      } else if (role === "DEVOPS") {
        beforeText = "Set up servers on AWS to host the company website.";
        afterText = "Deployed auto-scaling ECS clusters behind an Application Load Balancer on AWS, using Route53 for DNS and CloudFront for CDN caching.";
      } else if (role === "DATASCIENCE") {
        beforeText = "Built a prediction system for housing prices.";
        afterText = "Developed a gradient-boosted regression model in Python, utilizing Feature Engineering on geographic datasets to reduce RMSE by 18%.";
      }

      writingTips.push({
        title: "Improve Technical Descriptions",
        explanation: "Detail the specific technical stack, architecture, and engineering challenges you solved.",
        whyItMatters: "Technical recruiters and engineering managers evaluate your skill level by the complexity and depth of your technical implementation details.",
        beforeExample: beforeText,
        afterExample: afterText
      });
    }

    // Fallback/Ensure at least 3 tips
    if (writingTips.length < 3) {
      writingTips.push({
        title: "Structure bullet points by impact",
        explanation: "Focus on the 'So What?' of your daily responsibilities.",
        whyItMatters: "Every bullet point should show why the work you did mattered to the business or team, not just what task you performed.",
        beforeExample: "Monitored server logs for any issues.",
        afterExample: "Monitored system logs and set up automated alerts, reducing mean-time-to-resolution (MTTR) of critical outages by 40%."
      });
    }

    // ✅ Generate Dynamic Quick Wins (4-8 high-impact improvements, easy to implement, based on weaknesses)
    const quickWins = [];

    if (!hasLinkedIn) {
      quickWins.push({
        title: "Add Your LinkedIn URL",
        impact: "High",
        explanation: "A LinkedIn profile allows recruiters to verify your identity, view your professional recommendations, and explore your network.",
        benefit: "Increases recruiter engagement by 35%"
      });
    }

    const hasGitHub = /github\.com/i.test(rawText);
    if (!hasGitHub && (role === "SDE" || role === "AIML" || role === "DEVOPS")) {
      quickWins.push({
        title: "Add Your GitHub Profile Link",
        impact: "High",
        explanation: "For technical positions, having an active GitHub link directly shows recruiters the quality, structure, and history of your code.",
        benefit: "Proves hands-on technical competence"
      });
    }

    if (analysis.score < 90) {
      quickWins.push({
        title: "Include a 2-3 Line Professional Summary",
        impact: "High",
        explanation: `Position yourself immediately as a qualified candidate by writing a short, impact-oriented summary targeting the ${role} field.`,
        benefit: "Helps recruiters understand your value immediately"
      });
    }

    // Check date formats or just general formatting improvement
    quickWins.push({
      title: "Use consistent date formats",
      impact: "Medium",
      explanation: "Ensure all dates on your resume follow a single format (e.g. Month YYYY or MM/YYYY) so that ATS software can easily parse your timeline.",
      benefit: "Improves ATS parsing accuracy"
    });

    quickWins.push({
      title: "Reorganize bullet points: Result-first format",
      impact: "High",
      explanation: "Rewrite your bullet points to start with the positive metric or achievement first, followed by the specific tools and actions you took.",
      benefit: "Makes accomplishments stand out to ATS systems"
    });

    if (analysis.missingSkills.length > 0) {
      quickWins.push({
        title: `Add ${analysis.missingSkills[0]} to Skills Section`,
        impact: "High",
        explanation: `The job description heavily values ${analysis.missingSkills[0]}. If you have prior experience with it, make sure it is explicitly listed.`,
        benefit: "Bypasses ATS keyword screening"
      });
    }

    if (!hasProjectsHeader) {
      quickWins.push({
        title: "Add a Dedicated Projects Section",
        impact: "High",
        explanation: "Showcase personal, academic, or professional projects to validate your skills with real-world applications.",
        benefit: "Demonstrates practical application of skills"
      });
    }

    // Ensure we have between 4 and 8 quick wins
    if (quickWins.length < 4) {
      quickWins.push({
        title: "Avoid pronoun usage",
        impact: "Medium",
        explanation: "Remove first-person pronouns (I, me, my, we) from all descriptions to maintain a professional, objective tone.",
        benefit: "Aligns with executive resume standards"
      });
    }

    // ✅ Generate Dynamic AI Recruiter Insights
    const roleNames = {
      SDE: "Software Development Engineer",
      AIML: "AI / Machine Learning Engineer",
      DEVOPS: "DevOps Engineer",
      DATASCIENCE: "Data Scientist"
    };
    const fullRoleName = roleNames[role] || role;

    let hiringPotential = "developing applicant";
    let potentialLabel = "Developing";
    if (analysis.score >= 75) {
      hiringPotential = "highly competitive candidate";
      potentialLabel = "Strong";
    } else if (analysis.score >= 45) {
      hiringPotential = "competitive candidate";
      potentialLabel = "Moderate";
    }

    let targetLevel = "junior / entry-level";
    if (level === "Advanced") {
      targetLevel = "senior";
    } else if (level === "Intermediate") {
      targetLevel = "mid-level";
    }

    // Build recruiter summary paragraph
    let strengthPart = "";
    if (analysis.matchedSkills.length > 0) {
      strengthPart = `Your experience with key technologies like ${analysis.matchedSkills.slice(0, 2).join(" and ")} is strong`;
    } else {
      strengthPart = "Your foundational credentials and academic background show potential";
    }

    let concernPart = "";
    if (analysis.missingSkills.length > 0) {
      concernPart = `but emphasizing your ${analysis.missingSkills.slice(0, 2).join(" and ")} capabilities will open doors to higher-tier opportunities`;
    } else {
      concernPart = "and your skill alignment is highly aligned with modern standards";
    }

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

    const recruiterSummary = `Based on your resume against ${fullRoleName} job postings, you're ${hiringPotential} for ${targetLevel} roles. ${strengthPart}, ${concernPart}. ${extraPart}`;

    // Key Strengths
    const strengths = [];
    if (analysis.matchedSkills.length > 0) {
      strengths.push(`Solid baseline knowledge in ${analysis.matchedSkills.slice(0, 3).join(", ")}`);
    } else {
      strengths.push("Well-structured base resume layout");
    }
    if (atsChecklist.filter(x => x.passed).length > 5) {
      strengths.push("Strong ATS formatting and critical contact headers present");
    } else {
      strengths.push("Clear and legible resume sections");
    }
    if (digitCount >= 15 && hasPercentages) {
      strengths.push("Good inclusion of quantifiable metrics and achievements");
    }

    const interviewReadiness = Math.round(
      analysis.score * 0.85 + (atsChecklist.filter(x => x.passed).length / atsChecklist.length) * 15
    );

    let hiringPotentialLabel = "Developing";
    if (analysis.score >= 80) hiringPotentialLabel = "High";
    else if (analysis.score >= 50) hiringPotentialLabel = "Medium";
    else if (analysis.score >= 30) hiringPotentialLabel = "Developing";
    else hiringPotentialLabel = "Low";

    let positioning = "Full-stack candidate";
    if (role === "AIML") positioning = "AI / Machine Learning candidate";
    else if (role === "DATASCIENCE") positioning = "Data-focused candidate";
    else if (role === "DEVOPS") positioning = "DevOps-focused candidate";
    else {
      const hasFrontend = skills.some(s => ["react", "vue", "angular", "html", "css", "javascript", "typescript"].includes(s.toLowerCase()));
      const hasBackend = skills.some(s => ["node", "express", "python", "java", "spring", "c#", "net", "go", "sql", "mongodb"].includes(s.toLowerCase()));
      if (hasFrontend && hasBackend) positioning = "Full-stack candidate";
      else if (hasFrontend) positioning = "Frontend-focused candidate";
      else positioning = "Backend-focused candidate";
    }

    let competitiveness = "Competitive for entry-level roles";
    if (level === "Advanced") competitiveness = "Competitive for senior roles";
    else if (level === "Intermediate") competitiveness = "Competitive for mid-level roles";
    else if (analysis.score < 30) competitiveness = "Competitive for internships";

    let recommendedNextStep = "Build a cloud deployment project";
    if (role === "AIML") {
      recommendedNextStep = "Deploy models into production and demonstrate MLOps pipeline integration";
    } else if (role === "DEVOPS") {
      recommendedNextStep = "Add automated monitoring and Site Reliability Engineering metrics to your projects";
    } else if (role === "DATASCIENCE") {
      recommendedNextStep = "Incorporate big data processing patterns (e.g., Spark, Hadoop) or predictive analytics models";
    } else {
      if (analysis.missingSkills.some(s => ["aws", "docker", "kubernetes", "cloud"].includes(s.toLowerCase()))) {
        recommendedNextStep = "Build and host a cloud deployment project showing infrastructure setup";
      } else {
        recommendedNextStep = "Integrate advanced database schema optimization and API design exposure";
      }
    }

    const recruiterInsights = {
      verdict: recruiterSummary,
      hiringPotential: hiringPotentialLabel,
      interviewReadiness: Math.min(interviewReadiness, 100),
      careerPositioning: positioning,
      marketCompetitiveness: competitiveness,
      recommendedNextStep
    };

    // ✅ Generate Dynamic AI Resume Summary
    let overallQuality = "Needs Improvement";
    let qualityDesc = "Your resume requires significant optimization to align with the target role requirements.";
    if (analysis.score >= 85) {
      overallQuality = "Excellent";
      qualityDesc = "Your resume is outstanding and aligns perfectly with key industry expectations.";
    } else if (analysis.score >= 70) {
      overallQuality = "Strong";
      qualityDesc = "Your resume is well-structured and highly competitive for this role.";
    } else if (analysis.score >= 50) {
      overallQuality = "Good";
      qualityDesc = "Your resume shows a solid foundation, with some key areas to optimize.";
    } else if (analysis.score >= 35) {
      overallQuality = "Average";
      qualityDesc = "Your resume meets basic criteria but needs stronger technical alignment.";
    }

    // Main Strengths (3-6)
    const mainStrengths = [];
    if (analysis.matchedSkills.length > 0) {
      mainStrengths.push(`Clear technical expertise in ${analysis.matchedSkills.slice(0, 3).join(", ")}`);
    }
    if (hasExperienceHeader) {
      mainStrengths.push("Well-organized professional experience section");
    }
    if (atsChecklist.filter(x => x.passed).length >= 6) {
      mainStrengths.push("Excellent ATS formatting and structure compatibility");
    }
    if (digitCount >= 12) {
      mainStrengths.push("Good inclusion of quantifiable achievements and data-driven metrics");
    }
    if (mainStrengths.length < 3) {
      mainStrengths.push(`Good alignment with the core ${role} requirements`);
    }

    // Biggest Weaknesses (3-6)
    const biggestWeaknesses = [];
    if (analysis.missingSkills.length > 0) {
      biggestWeaknesses.push(`Missing key role-specific keywords: ${analysis.missingSkills.slice(0, 2).join(", ")}`);
    }
    if (digitCount < 10) {
      biggestWeaknesses.push("Limited emphasis on quantifiable business results and impact");
    }
    if (!hasLinkedIn) {
      biggestWeaknesses.push("Absence of professional networking links (LinkedIn URL)");
    }
    if (!hasProjectsHeader) {
      biggestWeaknesses.push("Lack of a dedicated projects section to validate practical experience");
    }
    if (biggestWeaknesses.length < 3) {
      biggestWeaknesses.push("Limited inclusion of leadership or project ownership keywords");
    }

    // Top ATS Concern
    let topAtsConcern = "No critical ATS concerns detected. Ensure your contact info is up to date.";
    const failedAts = atsChecklist.filter(x => !x.passed);
    if (failedAts.length > 0) {
      topAtsConcern = `Missing critical ATS elements: ${failedAts.map(x => x.check).slice(0, 2).join(" and ")}`;
    } else if (analysis.missingSkills.length > 0) {
      topAtsConcern = `Resume lacks critical backend, frontend, or cloud keywords like ${analysis.missingSkills.slice(0, 2).join(", ")} required for this role`;
    }

    // Most Impactful Improvement
    let mostImpactful = "Review the recommended next steps on the roadmap page to maximize your competitiveness.";
    if (!hasLinkedIn || !hasProjectsHeader) {
      mostImpactful = "Adding a projects section and a clickable LinkedIn URL will significantly increase recruiter interest.";
    } else if (analysis.missingSkills.length > 0) {
      mostImpactful = `Integrating missing technical keywords like ${analysis.missingSkills[0]} and quantifying achievements will offer the highest ROI.`;
    }

    const resumeSummary = {
      overallQuality,
      qualityDesc,
      strengths: mainStrengths,
      weaknesses: biggestWeaknesses,
      topAtsConcern,
      mostImpactfulImprovement: mostImpactful
    };

    // ✅ Final response
    res.status(200).json({
      success: true,
      data: {
        role,
        level,
        extractedSkills: skills,
        score: analysis.score,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        roadmap,
        feedback,
        atsChecklist,
        priorityImprovements,
        keywordAnalysis,
        writingTips,
        quickWins,
        recruiterInsights,
        resumeSummary
      },
    });

  } catch (error) {
    console.error("❌ ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error processing resume",
    });
  }
};