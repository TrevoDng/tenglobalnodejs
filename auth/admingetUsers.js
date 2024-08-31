const bycrypt = require('bcrypt');
require('dotenv').config({path: 'sample.env'});

const jwtSecret = process.env.JWT_SECRET_KEY;

const jwt = require('jsonwebtoken');
var pool = require('../postgres/postgresConfig');

const { getAcountNumber } = require('../service/accountNumber');
const { sendUserCookies } = require('../service/userCookies');
const { getUserRoles } = require('./userRoles');
const { userData } = require('./userData');
const { checkEmailExistence } = require('./compareEmail'); //must call await to call this
const { error } = require('console');

//admin get all users
exports.getUsers = async (req, res, next) => {
    await pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            res.status(401).json({ message: "Getting users Not successful", error: err.message })
            //throw error
        }

        const users = results.rows;
        const role_id = 1;

        //get roles
        pool.query('SELECT name FROM roles WHERE id = $1', [role_id], (error, results) => {
            
            const role = results.rows[0].name;

            const userFunction = users.map(user => {
            const container = {}
            container.username = user.username
            container.role = role;
            return container
        })
        return res.status(200).json({ user: userFunction })

        })
    })
    /*
    .catch(err => 
        res.status(401).json({ message: "Not successful", error: err.message })
    )
    */
};