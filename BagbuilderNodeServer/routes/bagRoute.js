const express = require('express');
const router = express.Router();
const {
  getAllUsersBagsById,
  addBag,
  deleteBagById,
  updateBag,
  addDiscToBagByIds,
  removeDiscFromBagByIds } = require('../controllers/bagController');



router.get("/userId/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const bagList = await getAllUsersBagsById(userId);
    res.send(bagList);
  } catch (err) {
    console.log('Error fetching bags for userId: ', userId, err);
    res.send(err);
  }
});

//maybe a future feature
// router.get("/:id", async (req, res) => {

// });


router.post("/add/:userId", async (req, res) => {
  const { name, description} = req.body;
  const userId = req.params.userId;

  try {
    const newBag = await addBag(name, description, userId);
    res.send(newBag);
  } catch (err) {
    console.log('Error creating new bag', err);
    res.send(err);
  }
});

router.post("/:bagId/addDisc/:discId", async (req, res) => {
  //fire bird is id: 4
  //valkyrie is id: 7
  //buzz is id: 38
  const {bagId, discId} = req.params;

  try {
    const result = await addDiscToBagByIds(bagId, discId);
    res.send(result);
  }  catch (err) {
    console.log('Error adding disc in bag route', err);
    res.send(err);
  }
});

router.post("/:bagId/removeDisc/:discId", async (req, res) => {
  const {bagId, discId} = req.params;

  try {
    const result = await removeDiscFromBagByIds(bagId, discId);
    res.send(result);
  }  catch (err) {
    console.log('Error adding disc in bag route', err);
    res.send(err);
  }
});

router.delete("/delete/:bagId", async (req, res) => {
  const bagId = req.params.bagId;

  try {
    await deleteBagById(bagId);
    res.send('Successfully deleted bag');
  } catch (err) {
    console.log('Error deleting bag with id: ', bagId, err);
    res.send(err);
  }
});

router.put("/update", async (req, res) => {
  const bag = req.body;

  try {
    const updatedBag = await updateBag(bag);
    res.send(updatedBag);
  } catch (err) {
    console.log('Error updating bag: ', bag, err);
    res.send(err);
  }
});

module.exports = router;