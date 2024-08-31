const jwt = require('../../jwtconfig/jwtconfig');
//import { jwt } from "../../jwtconfig/jwtconfig";
require('dotenv').config({path: 'sample.env'});

const jwtVerification=(req, res)=> {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            return res.status(401).send(error);
        }

    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = {jwtVerification,};