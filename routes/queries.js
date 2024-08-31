require('dotenv').config({path: 'sample.env'});

const jwtSecret = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

var pool = require('../postgres/postgresConfig');
const bycrypt = require('bcrypt');
const { checkEmailExistence } = require('../auth/compareEmail');


//admin get all users
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        return res.status(200).json(results.rows)
    })
}

const getUsersEmail = (req, res) => {

    pool.query('SELECT email FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            //console.log("failed to get email");
            throw error
        }
        return res.status(200).json(results.rows); 
    
    })
    //res.status(401).json(resOutput + " already exists");
}
  
  const getUsersDetails = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if(error) {
            //console.log("failed to get email");
            throw error
        }
        return res.status(200).json(results.rows); 
    
    })
    //res.status(401).json(resOutput + " already exists");
}

const updateEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send({emailError: "Unauthorised"});
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret);

           const results = pool.query(
            'UPDATE users SET email = $1 WHERE id = $2', [email, decodedToken._id])
            .catch((error) => {
                console.log("Failed chage email!", error)
                return res.status(400).json({userError: "Failed chage email!"})
              });

           console.log({emailMessage: (await results).rows});
        return res.status(200).json({emailMessage: `Email was successfully changed`});
    } catch (error) {
        return res.status(200).json({emailError: `Failed to change email`});
    }
}

const updateContactNumber = async (req, res) => {
    const { contact_number } = req.body;
    console.log(contact_number);
    const token = req.cookies.jwt;
    //const emailExists = await checkEmailExistence(req, "token");

    if (!token) {
        return res.status(401).send({numberError: "Unauthorised"});
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret);

           const results = pool.query(
            'UPDATE users SET contact_number = $1 WHERE id = $2', [contact_number, decodedToken._id])
            .catch((error) => {
                console.log("Failed to chage number!", error)
                return res.status(400).json({numberError: "Failed to chage number!"})
              });

           console.log({emailMessage: (await results).rows});
        return res.status(200).json({numberMessage: `Number was successfully changed`});
    } catch (error) {
        return res.status(200).json({numberError: `Failed to change number`});
    }
}

//verify user by id
const getUserById = (req, res, next) => {

    const token = req.cookies.jwt;
    const id = parseInt(req.params['id']);
    
    if (!token) {
        return res.status(401).send("Unauthorised");
    }

    const decodedToken = jwt.verify(token, jwtSecret);
    console.log("_id", decodedToken._id);

    if (decodedToken._id === id && decodedToken.role === "USER") {
        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if(error) {
                console.log({message: "fail to get all user data by id"})
                return res.status(400).json({message: "fail to get all user data by id"});
            }
            return res.status(200).json(results.rows[0]);
            //next();
        })
    } else {
        return res.status(401).json({message: "not authorised"});
    }
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { username, email } = req.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3', [username, email, id],
        (error, results) => {
            if(error) {
                throw error
            }
            return res.status(200).send(`User ,odified with ID: ${id}`)
        }
    )
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        return res.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUsersEmail,
    getUsersDetails,
    updateEmail,
    updateContactNumber
}