const express = require('express');
const {getAllUsers, getOneUserById} = require('../controllers/userController');

const router = express.Router();


router.get("", async (req, res) => {
  const allUsers = await getAllUsers();
  res.send(allUsers);
});

router.get("/:id", async (req, res) => {
  // const userId = req.params.id;
  console.log(req.params);
  console.log(req.query);
  // const oneUser = await getOneUserById(userId);
  // res.send(oneUser);
  res.sendStatus(200);
});

router.post("/add", async (req, res) => {
  
});

router.delete("/delete/:id", async (req, res) => {

});

router.put("/update", async (req, res) => {

})



module.exports = router;