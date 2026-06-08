const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { uploadResume } = require("../controllers/resumeController");

// POST /api/resume/upload
router.post("/upload", upload.single("resume"), uploadResume);

// GET /api/resume/health (diagnostic route)
router.get("/health", (req, res) => res.json({ status: "ok" }));

module.exports = router;