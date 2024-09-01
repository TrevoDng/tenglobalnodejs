const bycrypt = require('bcrypt');
require('dotenv').config({path: 'sample.env'});

const jwtSecret = process.env.JWT_SECRET_KEY;

const jwt = require('jsonwebtoken');
var pool = require('../postgres/postgresConfig');

const { getAcountNumber } = require('../service/accountNumber');
const { sendUserCookies } = require('../service/userCookies');
const { getUserRoles } = require('./userRoles');
const { userData } = require('./userData');
const { checkEmailExistence } = require('./compareEmail');
const { error } = require('console');

//create user table
const sqlUsers = "CREATE TABLE IF NOT EXISTS users (id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, username VARCHAR(255), surname VARCHAR(255), email VARCHAR(255), password VARCHAR(255), contact_number VARCHAR(255), account VARCHAR(255), country_name VARCHAR(255) , profile_picture VARCHAR(255), registered_date TIMESTAMPTZ, updated_on TIMESTAMPTZ)";
pool.query(sqlUsers, function (err, result) {
        if (err) throw err;
        console.log("Users table created");
        return;
      });

      //create role table
const sqlRoles = "CREATE TABLE IF NOT EXISTS roles (id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, name VARCHAR(255))";  
   
pool.query(sqlRoles, function (err, result) {

    const userRole = "USER";
    const adminRole = "ADMIN";

    if (err) {
        console.log("Failed to create roles table");
        return;
    }   
            console.log("Roles table created");
      });

      //create user_role table
const sqlUserRoles = "CREATE TABLE IF NOT EXISTS user_roles (user_id int REFERENCES users(id), role_id int REFERENCES roles(id))";
   
pool.query(sqlUserRoles, function (err, result) {
        if (err) {
            console.log("Failed to create user_roles table");
            return;
        }
        console.log("user_roles table created");
      });

      //create admin_role table
const sqlAdminRoles = "CREATE TABLE IF NOT EXISTS admin_roles (admin_id int, role_id int)"; 
   
pool.query(sqlAdminRoles, function (err, result) {
        if (err) {
            console.log("Failed to create admin_roles table");
            return;
        }
        console.log("admin_roles table created");
      });

exports.signup = async (req, res, next) => {
    //must check if cell number already exists

    const { username, surname, email, password, contact_number, country_name, file } = req.body;
    console.log({file: file});

    const registered_date = new Date().toLocaleString();
    const updated_on = new Date().toLocaleString();
    const account = getAcountNumber.result;

    const profile_picture = file;
    console.log({"Request body ": JSON.stringify(req.body)})
        
           // (async ()=> {
                
                try {
                    const hash = await bycrypt.hash(password, 12)
                    .catch((error) => {
                        //console.log({"failed to hash password ": error});
                        return;
                    });

                    const userStatement = `INSERT INTO users (
                        username,
                        surname,
                        email, 
                        password, 
                        contact_number, 
                        account, 
                        country_name, 
                        profile_picture, 
                        registered_date, 
                        updated_on) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

                    const usersResults = await pool.query(userStatement, 
                    [
                        username, 
                        surname,
                        email, 
                        hash, 
                        contact_number, 
                        account, 
                        country_name, 
                        profile_picture, 
                        registered_date, 
                        updated_on
                    ])
                    .catch((error) => {
                        console.log("User not created!", error)
                        //return res.status(400).json({registerError: "User not created!"})
                    });

                    const user_id = (await usersResults).rows[0].id;
                    const role_id = 1;
                    const rolesStatement = 'INSERT INTO user_roles (user_id, role_id) VALUES($1, $2) RETURNING *';
                    const userRolesResults = pool.query(rolesStatement, [user_id, role_id])
                    .catch((error) => {
                        console.log("User not saved to user_roles!", error)
                        //return res.status(400).json({registerError: "User not saved to user_roles!"})
                    });

                    console.log((await userRolesResults).rows);
                    
                    const roleResults = pool.query('SELECT name FROM roles WHERE id = $1', [role_id])
                    .catch((error) => {
                        console.log("failed to get data from roles!", error)
                        return res.status(400).json({registerError: "roles failed!"})
                    });
                    const role = (await roleResults).rows[0].name;

                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                    { _id: user_id, email: email, role: role },
                    jwtSecret,
                    {
                        expiresIn: maxAge, //3hours
                    },
                    { algorithm: 'RS256' }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201).json({
                        message: "User succesfully Logged in",
                        user: user_id,
                        role: role,
                });

                } catch (error) {
                    console.log("User not created", error);
                    return res.status(400).json({
                        registerMessage: "User not created",
                        registerError: error.message,
                    });
                }
                       // res.status(201).send(`User added with ID: ${results.rows[0].id}`) 
                return;
            //})();
}

exports.signin = async (req, res, next) => {
    const {username, email, password} = req.body;

    const checkEmail = await checkEmailExistence(req, "body");
  console.log(checkEmail);
    
    if (!checkEmail) {
        console.log("Data with provided email not found!")
        return res.status(400).json({userError: "Email or password is incorrect!"});
    } else {

        const userRoles = await getUserRoles(req, res);
        const usersData = await userData(req, res);

    (async() => {
        const createAccountNumber = getAcountNumber;
        console.log("acoount: " + createAccountNumber.result);
    })();

    if(!email || !password) {
        return res.status(400).json({
            message: "please type in email and password",
        })
    }

    const [userRole] = userRoles;
    const { name, user_id } = userRole;

    //wrong line password should be retrived form jwt token
    const userPassword = usersData.password;

    console.log({authRole: name, authUserId: user_id, authUserPassword: userPassword});

    try {

        (async() => {
            //const role = results.rows[0].name;
            console.log("Login role: " + name);
        //   await bycrypt.compare(password, userPassword).then((result)=> {
           // console.log({compare_password: result});
           // if(result) {
                
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { _id: user_id, email: email, role: name },
                    jwtSecret,
                    {
                        expiresIn: maxAge, //3hours
                    }
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                });
                return res.status(201).json({
                    message: "User succesfully Logged in",
                    user: user_id,
                    role: name,
                });
          //  } else {
              // return res.status(400).json({message: "Login not successful!"});
            //}
           // });
          
            })();
     

    } catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
  }
    
}

/*
// Generate password reset token
const generatePasswordResetToken = (user) => {
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  };

exports.forgotPassword = async(req, res) => {
    const { email } = req.body;

    const checkEmail = await checkEmailExistence(req);
  console.log(checkEmail);
    
    if (!checkEmail) {
        console.log("email not found!")
        return res.status(400).json({emailError: "Email not found!"});
    } else {
        return res.status(200).json({linkMessage: resetLink});
    }
}
*/

exports.adminSignin = async (req, res, next) => {
    const {username, email, password} = req.body;

    (async() => {
        const createAccountNumber = getAcountNumber;
        console.log("acoount: " + createAccountNumber.result);
    })();

    if(!email || !password) {
        return res.status(400).json({
            message: "please typein email and password",
        })
    }

    try {

        pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
            if(err) {
                console.log("Failed to to get admin data");
                return;
            }
    
            //let searchName = username;
            let myResults = results.rows;
            let nameOutput = "";
            let passwordOutput = "";
            let emailOutput = "";
            let usersId = "";
    
    myResults.map((usersData, index) => {
        
        if(email == usersData.email) {
            nameOutput = usersData.username;
            passwordOutput = usersData.password;
            emailOutput = usersData.email;
            usersId = usersData.id;
            return;
            } 
    
            else if (email == usersData.email){
                return false
            }
    })

        //get user role id 
        pool.query('SELECT role_id FROM user_roles WHERE user_id = $1', [usersId], (error, results) => {
        
        //console.log("Role id = " + results.rows[0].role_id);

        const role_id = results.rows[0].role_id;
        
        //get roles
        pool.query('SELECT name FROM roles WHERE id = $1', [role_id], (error, results) => {
        (async() => {
            const role = results.rows[0].name;
            console.log("Login role: " + role);
          // await bycrypt.compare(password, passwordOutput).then((result)=> {
            console.log(password)
                
            //if(result) {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { _id: usersId, email, role: role },
                    jwtSecret,
                    {
                        expiresIn: maxAge, //3hours
                    }
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                });
                res.status(201).json({
                    message: "User succesfully Logged in",
                    user: usersId,
                    role: role,
                });
           // } else {
               // return res.status(400).json({message: "Login not successful!"});
           // }
           // });
          
            })();
        });
    });
    })

    } catch (error) {
        return res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

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
            
            return Object.assign({}, user, {role: role})
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

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log({message: "Not authorised"});
                return res.status(401).json({ 
                    message: "Not authorised", 
                    messageStatus: "UNAUTHORIZED",
                })
            } else {
                if (decodedToken.role !== "ADMIN") {
                    console.log({message: "Not authorised"});
                    return res.status(401).json({ 
                        message: "Not authorised", 
                        messageStatus: "UNAUTHORIZED",
                    })
                } else {
                    next()
                }
            }
        })
    } else {
        console.log({ message: "Not authorized, token not availabe" })
        res.redirect('/admin/signin')
        /*return res
            .status(401)
            .json({ 
                message: "Not authorized, token not availabe", 
                messageStatus: "UNAUTHORIZED",
            });*/
    }
}


exports.clientsAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log({ message: "Not authorised, this is client auth" });
                res.redirect('/signin');
                return res.status(401).json({
                    message: "Not authorised, this is client auth",
                    messageStatus: "UNAUTHORIZED",
                  }) //res.redirect('/signin');
            } else {
                if (decodedToken.role !== "USER") {
                    console.log({ message: "Not authorised, this is client auth" });
                    res.redirect('/signin');
                    return res.status(401).json({ 
                        message: "Not authorised, this is client auth", 
                        messageStatus: "UNAUTHORIZED",
                         }) //res.redirect('/signin');
                } else {
                    next()
                }
            }
        })
    } else {
        console.log({ message: "Not authorized, token not availabe" });
        res.redirect('/signin');
        return res
            .status(401)
            .json({ 
                message: "Not authorized, token not availabe", 
                messageStatus: "UNAUTHORIZED",
            })
            //res.redirect('/signin');
    }
}


/*
//saving image to firebase
  const admin = require('firebase-admin');
  const storage = admin.storage();

  // Initialize Firebase Admin SDK
  admin.initializeApp({
  credential: admin.credential.cert('path/to/serviceAccountKey.json'),
  storageBucket: 'your-firebase-storage-bucket-name',
  });
  
  // Upload a file to Firebase Storage
  //const fileBuffer = // Load the file buffer from your server storage
  const fileName = 'image'; // Remove file extension
  const bucket = storage.bucket();
  //const file = bucket.file(fileName);
  
  file.save(fileBuffer)
  .then(() => {
  // Retrieve the file URL
  return file.getDownloadURL();
  })
  .then((fileUrl) => {
  console.log(`File uploaded to Firebase Storage: ${fileName}`);
  console.log(`File URL: ${fileUrl}`);
  // Store the file URL in your database or use it as needed
  })
  .catch((error) => {
  console.error('Error uploading file:', error);
  });
*/