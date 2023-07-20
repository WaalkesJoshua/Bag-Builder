require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');
const bagRoute = require('./routes/bagRoute.js');
const discRoute = require('./routes/discRoute.js');
const authRoute = require('./routes/authRoute');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.REACT_APP_NODE_PORT;

app.use(cors());
app.use(bodyParser.json());
morgan('dev');
app.use('/users', userRoute);
app.use('/bags', bagRoute);
app.use('/discs', discRoute);
app.use('/auth', authRoute)



app.listen(port, () => {
  console.log(`Listening on  port ${port}`);
});