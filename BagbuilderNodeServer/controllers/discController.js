const { pool } = require('../PG-connect');

const getAllDiscs = async () => {
  const query = `
    SELECT *
    FROM discs
    ORDER BY speed ASC, id ASC;`

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.log('Error fetching all discs', err);
  }
}

module.exports = {
  getAllDiscs
}