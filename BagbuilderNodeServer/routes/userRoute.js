const express = require('express');
const mockData = require('../mockData');

const router = express.Router();
const mockUserData = mockData();


router.get("", (req, res) => {
  res.send(mockUserData);
});

module.exports = router;