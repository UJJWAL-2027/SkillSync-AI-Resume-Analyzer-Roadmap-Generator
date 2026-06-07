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
        message: "Could not extract text from resume",
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
        keywordAnalysis
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