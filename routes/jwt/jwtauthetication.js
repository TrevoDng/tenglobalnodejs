const express = require('express');
const dotenv = require('dotenv');
const jwt = require('../../jwtconfig/jwtconfig');
//import { jwt } from '../../jwtconfig/jwtconfig';
const app = express();

require('dotenv').config({path: 'sample.env'});

const generateToken = async (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 11,
    }

        let token = await jwt.sign(data, jwtSecretKey);

       res.send(token);
}

module.exports = {generateToken};
