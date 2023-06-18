require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');
const bagRoute = require('./routes/bagRoute.js');
const discRoute = require('./routes/discRoute.js');
const authRoute = require('./routes/authRoute');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mockData = require('./mockData');

const port = process.env.REACT_APP_NODE_PORT;

app.use(cors());
app.use(bodyParser.json());
morgan('dev');
app.use('/users', userRoute);
app.use('/bags', bagRoute);
app.use('/discs', discRoute);
app.use('/auth', authRoute)

const mockUserData = mockData();


function generateJWTToken(email) {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "30m" })
};


app.get('/', (req, res) => {
  console.log('root route hit');
});

app.post('/login', (req, res) => {
  const token = generateJWTToken(req.body.email);
  let tokenData = {
    token: token,
    expiresIn: 30,
    authState: { id: 1, name: "Josh", email: "myemail" }
  }
  res.status(201).send(tokenData);
});

app.post('/signup', (req, res) => {
  // const token = generateJWTToken(req.body.email);
  // let tokenData = {
  //   token: token,
  //   expiresIn: 30,
  //   authState: { id: 1, name: "Josh", email: "josh.waalkes21@gmail.com" }
  // }
  // res.status(201).send(tokenData);
});

app.listen(port, () => {
  console.log(`Listening on  port ${port}`);
});