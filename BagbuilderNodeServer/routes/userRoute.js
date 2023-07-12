const express = require('express');
const {getAllUsers, getUserById, addUser} = require('../controllers/userController');

const router = express.Router();


router.get("", async (req, res) => {
  const allUsers = await getAllUsers();
  res.send(allUsers);
});

router.get("/:id", async (req, res) => {
  // const userId = req.params.id;
  console.log(req.params);
  console.log(req.query);
  // const oneUser = await getUserById(userId);
  // res.send(oneUser);
  res.sendStatus(200);
});

router.post("/add", async (req, res) => {
  // console.log('adding user', req.body.user);
  const user = req.body;
  try {
    const addedUser = await addUser(user);
    res.send(addedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {

});

router.put("/update", async (req, res) => {

})



module.exports = router;