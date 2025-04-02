const express = require('express');
const { registerCareGiver, loginCareGiver } = require('../services/careGiverService');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const careGiver = await registerCareGiver(req.body);
    res.status(201).json(careGiver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginCareGiver(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
