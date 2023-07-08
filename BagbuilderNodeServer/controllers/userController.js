const { pool } = require('../PG-connect');



const getAllUsers = async () => {
  const query = `
    SELECT bb_users.*, json_agg(bags.*) AS bags
    FROM bb_users
    LEFT JOIN bags ON bb_users.id = bags.user_id
    GROUP BY bb_users.id
    ORDER BY bb_users.id;`

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.log('Error retrieving users', err);
    return err;
  }
};

const getOneUserById = async (id) => {
  const query = `
    SELECT bb_users.*, json_agg(bags.*) AS bags
    FROM bb_users
    LEFT JOIN bags ON bb_users.id = bags.user_id
    WHERE bb_users.id = $1
    GROUP BY bb_users.id
    ORDER BY bb_users.id;`

    try {
      const result = await pool.query(query, [id]);
      return result.rows;
    } catch (err) {
      console.log('Error retrieving users', err);
      return err;
    }
}

module.exports = { getAllUsers, getOneUserById };

