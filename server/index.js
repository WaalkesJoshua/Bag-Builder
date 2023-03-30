const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  console.log('root route hit');
});

app.get('/test', (req, res) => {
  console.log('test hit');
  res.send(
    'test successful'
  );
});

app.listen(port, () => {
  console.log(`Listening on  port ${port}`);
});