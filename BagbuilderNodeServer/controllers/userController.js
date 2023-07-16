const { pool } = require('../PG-connect');
const { checkUserEmailExists } = require('../utils');
const { addBag, deleteAllUsersBagsById } = require('./bagController');

const userIdSeq = 'user_seq';



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

const getUserById = async (id) => {
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
};

const getUserByEmail = async (email) => {
  const query = `
  SELECT bb_users.*, json_agg(bags.*) AS bags
  FROM bb_users
  LEFT JOIN bags ON bb_users.id = bags.user_id
  WHERE bb_users.email = $1
  GROUP BY bb_users.id
  ORDER BY bb_users.id;`

  try {
    const result = await pool.query(query, [email]);
    return result.rows;
  } catch (err) {
    console.log('Error retrieving users', err);
    return err;
  }

};


const addUser = async (user) => {
  const { firstName, lastName, email, experience, hashedPass } = user;
  const bagName = "My First Bag";
  const bagDescription = "This is your first bag, let's add some discs!";

  if (await checkUserEmailExists(email)) {
    return('Email already exists');
  }

    const query = `
    INSERT INTO bb_users (id, first_name, last_name, email, experience, hashed_pass)
    VALUES (nextval('user_seq'),$1, $2, $3, $4, $5)
    RETURNING id;
    `
  try {
    const result = await pool.query(query, [firstName, lastName, email, experience, hashedPass]);
    user.id = result.rows[0].id;
    await addBag(bagName, bagDescription, user.id);
    const savedUser = await getUserById(user.id);
    return "Succesfully added: " + JSON.stringify(savedUser);

  } catch (err) {
    console.log(`Error adding user ${JSON.stringify(user)}`, err);
    return err;
  }
};

const deleteUserById = async(id) => {
  const query = `
    DELETE FROM bb_users
    WHERE id = $1;`

  try {
    await deleteAllUsersBagsById(id);
  } catch (err) {
    console.log('Error in user controller deleting user bags', err);
    return err;
  }


  try {
    const results = await pool.query(query, [id]);
    return results.rowCount;
  } catch (err) {
    console.log (`Error deleting user with id: ${id}`, err);
    return err;
  }
}

const updateUser = async (user) => {
  const {id, firstName, lastName, experience, email, hashedPass} = user;

  if (await checkUserEmailExists(email)) {
    return('Email already exists');
  }

  const query = `
    UPDATE bb_users
    SET first_name = $1,
    last_name = $2,
    experience = $3,
    email = $4,
    hashed_pass = $5
    WHERE id = $6;`

  try {
    const results = await pool.query(query, [firstName, lastName, experience, email, hashedPass, id]);
    console.log('Updated user', results);
    return results;
  } catch (err) {
    console.log(`Error updating user with id: ${id}`, err);
    return err;
  }

}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  checkUserEmailExists,
  addUser,
  deleteUserById,
  updateUser
};

