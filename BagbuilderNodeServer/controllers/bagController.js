const { pool } = require('../PG-connect');

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

module.exports = {addBag};