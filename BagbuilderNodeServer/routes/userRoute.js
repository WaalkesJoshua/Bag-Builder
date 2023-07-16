const express = require('express');
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  checkUserEmailExists,
  addUser,
  deleteUserById,
  updateUser } = require('../controllers/userController');

const router = express.Router();


router.get("", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const oneUser = await getUserById(userId);
    res.send(oneUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/add", async (req, res) => {
  const user = req.body;
  try {
    const addedUser = await addUser(user);
    res.send(addedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
   const result = await deleteUserById(id);
   if (result === 1) {
     res.send('User successfully deleted');
   }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/update", async (req, res) => {
  const user = req.body;
  console.log('User', user);
  try {
    const result = await updateUser(user);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});



module.exports = router;