const pdf = require("pdf-parse");
const { extractSkills } = require("../services/skillExtractor");
const { analyzeSkills } = require("../services/matchingService");
const { generateRoadmap } = require("../services/roadmapService");

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

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume",
      });
    }

    // ✅ Extract skills
    const skills = extractSkills(rawText);

    // ✅ Analyze skills
    const analysis = analyzeSkills(skills, role);

    // ✅ Generate roadmap
    const roadmap = generateRoadmap(analysis.missingSkills);

    // ✅ Final response (clean structure)
    res.status(200).json({
      success: true,
      data: {
        role,
        extractedSkills: skills,
        score: analysis.score,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        roadmap,
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