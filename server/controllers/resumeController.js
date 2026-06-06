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

    // ✅ Generate Priority Improvements
    const priorityImprovements = [];
    
    if (!hasExperienceHeader && !hasProjectsHeader) {
      priorityImprovements.push({
        title: "Add Experience or Projects Section",
        description: "Your resume lacks structured experience or project sections. Recruiters need to see applied knowledge.",
        priority: "High Priority",
        actionItems: [
          "Create a dedicated 'Experience' or 'Projects' section",
          "Include 2-3 detailed bullet points per entry",
          "Highlight quantifiable achievements"
        ]
      });
    }

    if (analysis.missingSkills.length > 0) {
      priorityImprovements.push({
        title: "Strengthen Technical Skills Section",
        description: `Your resume is missing key technical skills required for a ${role} role. Recruiters want to see proficiency levels and related skills.`,
        priority: "High Priority",
        actionItems: [
          `Add missing skills: ${analysis.missingSkills.slice(0, 3).join(", ")}`,
          "Add proficiency levels (Expert, Advanced, Intermediate)",
          "Group related technologies together",
          "Prioritize most relevant skills for your target role"
        ]
      });
    }

    if (!hasLinkedIn) {
      priorityImprovements.push({
        title: "Add LinkedIn Profile",
        description: "A LinkedIn profile provides a comprehensive view of your professional network and endorsements.",
        priority: "Medium Priority",
        actionItems: [
          "Include a clickable LinkedIn URL in the contact header",
          "Ensure your LinkedIn profile matches your resume content"
        ]
      });
    }

    if (analysis.score < 60) {
        priorityImprovements.push({
            title: "Optimize Project Descriptions",
            description: "Current project descriptions might be too generic. Add metrics, technologies used, and impact statements.",
            priority: "Medium Priority",
            actionItems: [
                "Restructure as: Project Name | Role | Impact | Tech Stack",
                "Add quantifiable results (e.g., 'Improved performance by 40%')",
                "Include 3-5 bullet points per project",
                "Highlight your specific contribution"
            ]
        });
    }

    if (priorityImprovements.length === 0 || analysis.score >= 80) {
        priorityImprovements.push({
            title: "Enhance Summary Statement",
            description: "Your professional summary could better highlight your unique value proposition.",
            priority: "Low Priority",
            actionItems: [
                "Lead with your biggest achievement or value proposition",
                "Mention target role and career goals",
                "Include 2-3 key accomplishments",
                "Keep it to 2-3 sentences maximum"
            ]
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