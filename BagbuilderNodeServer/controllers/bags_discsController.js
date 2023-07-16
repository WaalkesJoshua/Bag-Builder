const { pool } = require('../PG-connect');








const deleteRelationsByListOfBagIds = async (idList) => {
  if(idList.length === 0) {
    return;
  }
  const query = `
  DELETE FROM bags_discs
  WHERE bags_id IN (${idList.join()});`

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.log ('Error deleting relation from bags_discs', err);
    return err;
  }
};

module.exports = {
  deleteRelationsByListOfBagIds,

}

