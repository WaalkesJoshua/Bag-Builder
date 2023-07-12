const { pool } = require('./PG-connect');


//function to hass passwords

//function to check if email exists in db
const checkUserEmailExists = async (email) => {
  const query = `
    SELECT COUNT(*)
    FROM bb_users
    WHERE email = $1;`

  try {
    const result = await pool.query(query, [email]);
    const count = parseInt(result.rows[0].count);
    // console.log(result);
    // console.log(count);
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Error searching for email', err);
    return err;
  }
};

module.exports = {checkUserEmailExists};