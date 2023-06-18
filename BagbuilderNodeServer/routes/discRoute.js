const express = require('express');
const router = express.Router();

const mockDiscData = [{"name":"Blaze","description":null,"speed":7,"glide":5,"turn":0,"fade":3,"manufacturer":{"id":"gateway","name":"Gateway","description":null,"website":null}},
  {"name":"Xtreme","description":null,"speed":6,"glide":3,"turn":1,"fade":4,"manufacturer":{"id":"discraft","name":"Discraft","description":null,"website":null}},
  {"name":"Gator","description":null,"speed":5,"glide":2,"turn":0,"fade":3,"manufacturer":{"id":"innova","name":"Innova","description":null,"website":null}},
  {"name":"Firebird","description":null,"speed":9,"glide":3,"turn":0,"fade":4,"manufacturer":{"id":"innova","name":"Innova","description":null,"website":null}}];

router.get('', (req, res) => {
  console.log('route hit');
  res.status(201).send(mockDiscData)

});

module.exports = router;