const { pool } = require('../PG-connect');
const { deleteRelationsByListOfBagIds } = require('./bags_discsController');

const bagIdSeq = 'bags_seq';

const addBag = async (name, description, userId) => {
  const query = `
    INSERT INTO bags (id, name, description, user_id)
    VALUES (nextval('bags_seq'),$1, $2, $3)
    RETURNING bags.*;`

  try {
    const result = await pool.query(query, [name, description, userId]);
  } catch (err) {
    console.log('Error adding bag', err);
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

  try{
    const deleteResult = await pool.query(query, [userId]);
    return deleteResult.rows;
  } catch (err) {
    console.log('Error deleting bags with userId: ' + userId, err);
    return err;
  }
}

module.exports = {
  addBag,
  deleteAllUsersBagsById,

};