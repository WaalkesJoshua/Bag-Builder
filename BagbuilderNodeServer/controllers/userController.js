const { pool } = require('../PG-connect');
const { addBag, deleteAllUsersBagsById } = require('./bagController');

const userIdSeq = 'user_seq';



const getAllUsers = async () => {
  // const query = `
  //   SELECT bb_users.*, json_agg(bags.*) AS bags
  //   FROM bb_users
  //   LEFT JOIN bags ON bb_users.id = bags.user_id
  //   GROUP BY bb_users.id
  //   ORDER BY bb_users.id;`

  const query = `
  SELECT
    bb_users.*,
    (
        SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', bags.id,
                'name', bags.name,
                'description', bags.description,
                'discs', COALESCE(
                    (
                        SELECT JSON_AGG(discs.*)
                        FROM bags_discs
                        INNER JOIN discs ON bags_discs.discs_id = discs.id
                        WHERE bags_discs.bags_id = bags.id
                    ),
                    '[]'::JSON
                )
            )
        )
        FROM bags
        WHERE bags.user_id = bb_users.id
    ) AS bags
FROM bb_users
ORDER BY bb_users.id;`

  try {
    const result = await pool.query(query);
    //future upgrade: map over result and change id to number
    return result.rows;
  } catch (err) {
    console.log('Error retrieving users', err);
    return err;
  }
};

const getUserById = async (id) => {
  const query = `
  SELECT
    bb_users.*,
    (
        SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', bags.id,
                'name', bags.name,
                'description', bags.description,
                'discs', COALESCE(
                    (
                        SELECT JSON_AGG(discs.*)
                        FROM bags_discs
                        INNER JOIN discs ON bags_discs.discs_id = discs.id
                        WHERE bags_discs.bags_id = bags.id
                    ),
                    '[]'::JSON
                )
            )
        )
        FROM bags
        WHERE bags.user_id = bb_users.id
    ) AS bags
FROM bb_users
WHERE id = $1
ORDER BY bb_users.id;`

  try {
    const result = await pool.query(query, [id]);
    //future upgrade: map over result and change id to number
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

const checkUserEmailExists = async (email) => {
  const query = `
    SELECT COUNT(*)
    FROM bb_users
    WHERE email = $1;`

  const result = await pool.query(query, [email]);
  if (parseInt(result.rows[0].count) === 0) {
    return false;
  }

  return true;
};


const addUser = async (user) => {
  const { firstName, lastName, email, experience, hashedPass } = user;
  const bagName = "My First Bag";
  const bagDescription = "This is your first bag, let's add some discs!";

  if (await checkUserEmailExists(email)) {
    return ('Email already exists');
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

const deleteUserById = async (id) => {
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
    console.log(`Error deleting user with id: ${id}`, err);
    return err;
  }
}

const updateUser = async (user) => {

  const { id, firstName, lastName, experience, email, hashedPass } = user;

  if (await checkUserEmailExists(email)) {
    return ('Email already exists');
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
    await pool.query(query, [firstName, lastName, experience, email, hashedPass, id]);
  } catch (err) {
    console.log(`Error updating user with id: ${id}`, err);
    return err;
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  checkUserEmailExists,
  addUser,
  deleteUserById,
  updateUser
};

