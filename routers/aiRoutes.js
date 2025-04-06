const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

router.post('/gemini/decision', aiController.generateDecisions);
router.post('/gemini/summary', aiController.generateSummary);

module.exports = router;