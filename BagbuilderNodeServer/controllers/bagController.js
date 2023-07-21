const { pool } = require('../PG-connect');
const { deleteRelationsByListOfBagIds } = require('./bags_discsController');

const bagIdSeq = 'bags_seq';

const getAllUsersBagsById = async (userId) => {
  const query = `
  SELECT
  bags.*, json_agg(discs.*) AS discs
  FROM bags
  LEFT JOIN
  bags_discs ON bags.id = bags_discs.bags_id
  LEFT JOIN
  discs ON bags_discs.discs_id = discs.id
  WHERE user_id = $1
  GROUP BY bags.id;`

  try {
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (err) {
    console.log('Error retrieving user bags with id: ', userId);
    return err;
  }
};

const addBag = async (name, description, userId) => {
  const query = `
    INSERT INTO bags (id, name, description, user_id)
    VALUES (nextval('bags_seq'),$1, $2, $3)
    RETURNING bags.*;`

  try {
    const result = await pool.query(query, [name, description, userId]);
    return result.rows;
  } catch (err) {
    console.log('Error adding bag', err);
    return err;
  }
};

const deleteBagById = async (bagId) => {
  const query = `
  DELETE FROM bags
  where id = $1;`

  try {
    await deleteRelationsByListOfBagIds([bagId]);
  } catch (err) {
    console.log('Error deleting disc relations with bagId: ', bagId, err);
  }

  try {
    await pool.query(query, [bagId]);
  } catch (err) {
    console.log('Error deleting bag with id: ', bagId, err);
    return err;
  }
};


const deleteAllUsersBagsById = async (userId) => {
  const returnBagIdsQuery = `
    SELECT json_agg(id) AS baglist
    FROM bags
    WHERE user_id = $1;`

  const query = `
    DELETE FROM bags
    WHERE user_id = $1;`

  let bagList = [];

  try {
    const bagIdResult = await pool.query(returnBagIdsQuery, [userId]);
    bagList = bagIdResult.rows[0].baglist;
  } catch (err) {
    console.log('Error retrieving list of bag ids', err);
    return err;
  }

  try {
    await deleteRelationsByListOfBagIds(bagList);
  } catch (err) {
    console.log('Error in bags controller trying to delete disc relations', err);
    return err;
  }

  try {
    const deleteResult = await pool.query(query, [userId]);
    return deleteResult.rows;
  } catch (err) {
    console.log('Error deleting bags with userId: ' + userId, err);
    return err;
  }
};

const updateBag = async (bag) => {
  const { id, name, description, userId } = bag;
  const query = `
  UPDATE bags
  SET name = $1,
  description = $2,
  user_id = $3
  WHERE id = $4;`

  try {
    const result = await pool.query(query, [name, description, userId, id]);
    return result;
  } catch (err) {
    console.log('Error updating bag with id: ', id, err);
    return err;
  }
};

const addDiscToBagByIds = async (bagId, discId) => {
  const query = `
    INSERT INTO bags_discs (bags_id, discs_id)
    SELECT $1, $2
    WHERE NOT EXISTS (
      SELECT 1
      FROM bags_discs
      WHERE bags_id = $1 AND  discs_id = $2
    );`

  try {
    const result = await pool.query(query, [bagId, discId]);
    return result;
  } catch (err) {
    console.log('Error adding disc to bag', err);
    return err;
  }
};

const removeDiscFromBagByIds = async (bagId, discId) => {
  const query = `
    DELETE FROM bags_discs
    WHERE bags_id = $1 AND discs_id = $2;`

  try {
    const result = await pool.query(query, [bagId, discId]);
    return result;
  } catch (err) {
    console.log('Error removing disc from bag', err);
    return err;
  }
};



module.exports = {
  getAllUsersBagsById,
  addBag,
  deleteBagById,
  deleteAllUsersBagsById,
  updateBag,
  addDiscToBagByIds,
  removeDiscFromBagByIds,

};