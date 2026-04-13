const roleSkills = require("../utils/roleSkills");

exports.analyzeSkills = (userSkills = [], role) => {
  // ✅ Get required skills for selected role
  const requiredSkills = roleSkills[role] || [];

  // ✅ Normalize user skills (lowercase + trim)
  const normalizedUserSkills = userSkills.map((skill) =>
    skill.toLowerCase().trim()
  );

  // ✅ Smart matching (handles variations like node.js, reactjs, etc.)
  const matchedSkills = requiredSkills.filter((requiredSkill) =>
    normalizedUserSkills.some((userSkill) =>
      userSkill.includes(requiredSkill)
    )
  );

  // ✅ Missing skills
  const missingSkills = requiredSkills.filter(
    (skill) => !matchedSkills.includes(skill)
  );

  // ✅ Score calculation (safe)
  const score =
    requiredSkills.length > 0
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0;

  return {
    score,
    matchedSkills,
    missingSkills,
  };
};