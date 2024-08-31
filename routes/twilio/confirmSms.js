require('dotenv').config({path: 'sample.env'});
const jwtSecret = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

//const pool = require('../postgres/postgresConfig');

const { sendSms } = require("./twlio");
const pool = require('../../postgres/postgresConfig');

exports.confirmSms =(req, res)=> {
    const { username, country_name, amount, destination, pending_action, user_id } = req.body;
    const id = parseInt(req.params['id']);

    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, jwtSecret);

    //${destination} ${pending_action} ${user_id}
     const message = `${username} your request to send ${amount} to ${country_name} is being processed`;

     

     if (decodedToken._id === id && decodedToken.role === "USER") {
        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if(error) {
                throw error
            }
            const userResults = results.rows;
            let contactResults = "";

            userResults.map((user) => {
                if (username === user.username) {
                    contactResults = user.contact_number;
                }
            })

            console.log({contact_number: contactResults});
            //send sms
            sendSms(message, contactResults);
        })
    } 
    //else {
    //res.status(401).json({message: "not authorised"});
    //}
}