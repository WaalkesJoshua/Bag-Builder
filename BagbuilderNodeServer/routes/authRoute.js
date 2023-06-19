const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mockData =  require('../mockData');

function generateJWTToken(email) {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30m" })
};

const mockUserData = mockData();

// [
//   {
//     id: 1,
//     firstName: 'Terry',
//     lastName: 'Medhurst',
//     age: 50,
//     gender: 'male',
//     email: 'atuny0@sohu.com',
//     username: 'atuny0',
//     password: '9uQFF1Lh',
//     birthDate: '2000-12-25'
//   },
//   {
//     id: 2,
//     firstName: 'Sheldon',
//     lastName: 'Quigley',
//     age: 28,
//     gender: 'male',
//     email: 'hbingley1@plala.or.jp',
//     username: 'hbingley1',
//     password: 'CQutx25i8r',
//     birthDate: '2003-08-02'
//   },
// ]


// need to check email in request body against mockData and then if found, send back that user in authState
router.post('/login', (req, res) => {

  console.log(mockUserData[0]);
  const token = generateJWTToken(req.body.email);
  let tokenData = {
    token: token,
    expiresIn: 30,
    authUserState: mockUserData[0]
  }
  res.status(201).send(tokenData);
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