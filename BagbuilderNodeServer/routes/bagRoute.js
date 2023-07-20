const express = require('express');
const router = express.Router();
const {
  getAllUsersBagsById,
  addBag,
  deleteBagById,
  deleteAllUsersBagsById,
  updateBag } = require('../controllers/bagController');



router.get("/userId/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log('userId:', userId);

  try {
    const bagList = await getAllUsersBagsById(userId);
    console.log('after query', bagList);
    res.send(bagList);
  } catch (err) {
    console.log('Error fetching bags for userId: ', userId, err);
    return err;
  }
});

//maybe a future feature
// router.get("/:id", async (req, res) => {

// });


router.post("/add", async (req, res) => {
  const { name, description, userId } = req.body;

  try {
    const newBag = await addBag(name, description, userId);
    return newBag;
  } catch (err) {
    console.log('Error creating new bag', err);
    return err;
  }
});

router.post("/:id/addDisc/:discId", async (req, res) => {

});

router.post("/:id/removeDisc/:discId", async (req, res) => {

});

router.delete("/delete/:bagId", async (req, res) => {
  const bagId = req.params.userId;

  try {
    const deletedBag = await deleteBagById(bagId);
    return deletedBag;
  } catch (err) {
    console.log('Error deleting bag with id: ', bagId, err);
    return err;
  }

});

router.put("/update", async (req, res) => {
  const bag = req.body;

  try {
    const updatedBag = await updateBag(bag);
    return updatedBag;
  } catch (err) {
    console.log('Error updating bag: ', bag, err);
    return err;
  }
});

module.exports = router;