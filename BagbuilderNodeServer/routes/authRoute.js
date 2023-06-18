const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function generateJWTToken(email) {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30m" })
};

// need to check email in request body against mockData and then if found, send back that user in authState
router.post('/login', (req, res) => {
  const token = generateJWTToken(req.body.email);
  let tokenData = {
    token: token,
    expiresIn: 30,
    authState: { id: 1, name: "Josh", email: "myemail" }
  }
  res.status(201).send(tokenData);
});

// need to check email in request body against mockData and then if found, send back that user in authState
router.post('/signup', (req, res) => {
  const token = generateJWTToken(req.body.email);
  let tokenData = {
    token: token,
    expiresIn: 30,
    authState: { id: 1, name: "Josh", email: "josh.waalkes21@gmail.com" }
  }
  res.status(201).send(tokenData);
});

module.exports = router;