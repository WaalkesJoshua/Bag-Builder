const express = require('express');
const router = express.Router();
const { getAllDiscs } = require('../controllers/discController');


router.get('', async (req, res) => {
  try {
    const result = await getAllDiscs();
    res.send(result);
  } catch (err) {
    console.log('Erro fetching all discs in disc route', err);
  }
});


//Future feature possibly, for now on app load, it will call get all
// router.get("/:id", async (req, res) => {

// })

module.exports = router;