const pdf = require("pdf-parse");
const { extractSkills } = require("../services/skillExtractor");
const { analyzeSkills } = require("../services/matchingService");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const role = req.body.role; // 👈 IMPORTANT

    const data = await pdf(req.file.buffer);
    const rawText = data.text;

    const skills = extractSkills(rawText);

    // 🧠 Analyze skills
    const analysis = analyzeSkills(skills, role);

    res.status(200).json({
      message: "Resume analyzed successfully",
      role: role,
      extractedSkills: skills,
      ...analysis,
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: "Error processing resume" });
  }
};