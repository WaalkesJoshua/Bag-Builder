const express = require('express');
const app = express();
const port = 4040;
const cors = require('cors');
const userRoute = require('./routes/userRouteuserRoute.js');
const bagRoute = require('./routes/bagRoute.js');
const discRoute = require('./routes/discRoute.js');
const morgan = require('morgan');


app.use(cors());
morgan('dev');
app.use('/users', userRoute);
app.use('/bags', bagRoute);
app.use('/discs', discRoute);


app.get('/', (req, res) => {
  console.log('root route hit');
});


app.listen(port, () => {
  console.log(`Listening on  port ${port}`);
});