const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function generateJWTToken(email) {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30m" })
};

// need to check email in request body against mockData and then if found, send back that user in authState
router.post('/login', (req, res) => {

  // console.log(mockUserData[0]);
  // const token = generateJWTToken(req.body.email);
  // let tokenData = {
  //   token: token,
  //   expiresIn: 30,
  //   authUserState: mockUserData[0]
  // }
  // res.status(201).send(tokenData);
});

// need to check email in request body against mockData and then if found, send back that user in authState
router.post('/signup', (req, res) => {
  const {firstName, lastName, email, password, verifyPass } = req.body;
  const token = generateJWTToken(email);
  let tokenData = {
    token: token,
    expiresIn: 30,
    authUserState: { id: 1, firstName, lastName, email }
  }
  res.status(201).send(tokenData);
});

router.post('/guest', (req, res) => {
  res.sendStatus(201);
});

module.exports = router;