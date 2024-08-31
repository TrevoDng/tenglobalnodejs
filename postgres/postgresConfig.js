require('dotenv').config({path: 'sample.env'});

const Pool = require('pg').Pool;

const user = process.env.POSTGRES_USER;
const host = process.env.POSTGRES_HOST;
const database = process.env.POSTGRES_DATABASE
const password = process.env.POSTGRES_PASSWORD
const dialect = process.env.POSTGRES_DIALECT;
const port = process.env.POSTGRES_PORT


 const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    dialect: dialect,
    port: port,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

module.exports = pool;