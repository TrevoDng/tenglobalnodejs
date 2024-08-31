var express = require('express');
const bycrypt = require('bcrypt');
require('dotenv').config({path: 'sample.env'});

const jwtSecret = process.env.JWT_SECRET_KEY;

const jwt = require('jsonwebtoken');
var pool = require('../postgres/postgresConfig');

//get user by id


exports.userCookies = async (req, res, next) => {
    
    const token = req.cookies.jwt;
    
    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ message: "Not authorised" })
            } else {
                if (decodedToken.role !== "USER") {
                    return res.status(401).json({ message: "Not authorised" })
                } else {
                    
                        res.status(200).json({ user: decodedToken })
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not availabe" })
    }
}