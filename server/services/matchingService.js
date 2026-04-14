const roleSkills = require("../utils/roleSkills");

exports.analyzeSkills = (userSkills = [], role) => {

  const requiredSkills = roleSkills[role] || [];

  
  const normalizedUserSkills = userSkills.map((skill) =>
    skill.toLowerCase().trim()
  );


  const matchedSkills = requiredSkills.filter((requiredSkill) =>
    normalizedUserSkills.some((userSkill) =>
      userSkill.includes(requiredSkill)
    )
  );

  
  const missingSkills = requiredSkills.filter(
    (skill) => !matchedSkills.includes(skill)
  );

  
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