

const express = require("express");
const router = express.Router();

const resumeRoutes = require("./resumeRoutes");

router.use("/resume", resumeRoutes);

router.get("/", (req, res) => {
  res.send("API Routes Working");
});

module.exports = router;