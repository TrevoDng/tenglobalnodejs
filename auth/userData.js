const pool = require("../postgres/postgresConfig");
const { checkEmailExistence } = require("./compareEmail");

//get user data using email to be supplied only to the server
exports.userData = async (req, res) => {
    const { email } = req.body;

    const checkEmail = await checkEmailExistence(req, "body");
    
    if (!checkEmail) {

        console.log("Data with provided email not found!")
        res.status(400).json({userError: "Email or password is wrong!"});
          return;
    } else {
        try {
            const results = await pool.query('SELECT * FROM users ORDER BY id ASC')
            .catch((error) => {
                console.log("Failed to get user data!", error)
                res.status(400).json({userError: "Failed to get user data!"});
                return;
            });
            const userResults = results.rows;
    
            const dataFound = userResults.find(user => user.email === email);
    
            console.log({dataFound: dataFound});
    
            if (dataFound) {
                return dataFound;
            } else {
                console.log("no data found");
                return;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}