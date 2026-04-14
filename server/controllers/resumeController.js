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

    // ✅ Role validation
    const role = req.body.role;
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing role",
      });
    }

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

    // ✅ Handle case: no skills found
    if (!skills || skills.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          role,
          level, 
          extractedSkills: [],
          score: 0,
          matchedSkills: [],
          missingSkills: [],
          roadmap: [],
          feedback: [
            "No relevant skills detected. Try improving your resume with technical skills.",
          ],
        },
      });
    }

    // ✅ Analyze skills
    const analysis = analyzeSkills(skills, role);
    let level = "Beginner";

if (analysis.score > 70) level = "Advanced";
else if (analysis.score > 40) level = "Intermediate";

    // ✅ Generate roadmap
    const roadmap = generateRoadmap(analysis.missingSkills);

    // ✅ Generate feedback
    const feedback = generateFeedback(analysis.missingSkills, role);

    // ✅ Final response
    res.status(200).json({
      success: true,
      data: {
        role,
        extractedSkills: skills,
        score: analysis.score,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        roadmap,
        feedback,
      },
    });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error processing resume",
    });
  }
};