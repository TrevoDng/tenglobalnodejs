const bycrypt = require('bcrypt');
require('dotenv').config({path: 'sample.env'});
const jwtSecret = process.env.JWT_RESET_SECRET_KEY;
const jwt = require('jsonwebtoken');
const { checkEmailExistence } = require('./compareEmail');
const { getUserRoles } = require('./userRoles');
const { userData } = require('./userData');
const { sendPasswordResetMail } = require('../routes/email/nodeMail');

var pool = require('../postgres/postgresConfig');

exports.requestPasswordReset = async (req, res) => {

    const { email } = req.body;
    const userRoles = await getUserRoles(req, res);
    const usersData = await userData(req, res);

    const emailExists = await checkEmailExistence(req, "body");
    console.log({fromReset: emailExists});
 
    

    try {

        if (!emailExists || !userRoles) {
               console.log({resetPasswordError: `${email} Email not found, if not registered please press register button!`})
             return res.status(401).json({resetPasswordError: `${email} Email not found, if not registered please press register button!`});
           } 

            const [userRole] = userRoles;
            const { name, user_id } = userRole;
    //const userPassword = usersData.password;

    console.log({authRole: name, authUserId: user_id});

           const maxAge = 1 * 60 * 60 * 1000;
                const token = jwt.sign(
                    { _id: user_id, email: email },
                    jwtSecret,
                    {
                        expiresIn: maxAge, //1hours
                    }
                );
                res.cookie("jwtresetpassword", token, {
                    httpOnly: true,
                    maxAge: maxAge, // 1hrs in ms
                    //which means for strictly secured app like bank app 
                    //i wont mention maxAge so 
                    //that it will require a user to 
                    //always login ones close the browser
                });

                sendPasswordResetMail(req, res, token);
                //res.setHeader('Set-Cookie', `jwtResetPassword=${cookieValue}; SameSite=None; Secure`);
            //resetpassword

        console.log({resetPasswordMessage: `Reset link sent to `})        
        return res.status(200).json({
            resetPasswordMessage: `Reset link sent to `,
            resetToken: token,
        })
    } catch (error) {
        console.log({resetPasswordError: `Reset link sent failed! `});
        return res.status(401).json({resetPasswordError: `Reset link sent failed! `});
    }
}
    
    //const token = req.params?.['jwtResetPassword'] || req.cookies?.['jwtResetPassword'];
    //const token = req.params['jwtResetPassword'] || req.cookie['jwtResetPassword'];

exports.verifyResetPasswordToken =async (req, res, next) => {
    
    const token = (req.params && req.params['jwtresetpassword']) || (req.cookies && req.cookies['jwtresetpassword']);
    console.log({token: JSON.stringify(token)});

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log({ resetPasswordError: "Not authorised for password reset", errorMessage: err.message });
                return res.status(401).json({
                    resetPasswordError: "Not authorised for password reset"
                  }) 
            } else {
                    next();
                }
        })
    } else {
        console.log({ resetPasswordError: "Not authorized, reset password token not availabe" });
     
        return res
            .status(401)
            .json({ 
                resetPasswordError: "Not authorized, reset password token not availabe",
            })
    }
}

exports.saveNewPassword = async (req, res) => {
    const { newPassword } = req.body;
    console.log({newPassword: newPassword});

    (async() => {
    
      const token = req.params && req.params['jwtresetpassword'] || req.cookies && req.cookies['jwtresetpassword'];
      //const token = req.params?.['jwtresetpassword'] || req.cookies?.['jwtresetpassword'];
    //const token = req.params?.jwtresetpassword || req.cookies?.jwtresetpassword;
        try {
            const hashedPassword = await bycrypt.hash(newPassword, 10);
    
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {

        console.log({userId: decodedToken._id});
        
        if (err) {
          console.log({ savePasswordError: "Invalid token" });
          return res.status(401).json({ savePasswordError: "Invalid token" });
        } else {
          pool.query(
            'UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, decodedToken._id],
            (error, results) => {
              if (error) {
                console.error(error);
              } else if (results.rowCount === 0) {
                console.log({ savePasswordError: "User not found" });
                return res.status(404).json({ savePasswordError: "User not found" });
              } else {
                console.log({ updated: `Password updated successfully for user ID: ${decodedToken._id}` });
                return res.status(200).json({ savePasswordMessage: "Password updated successfully" });
              }
            }
          );
        }
      });
    } else {
      console.log({ savePasswordError: "Reset password token not available" });
      return res.status(401).json({ savePasswordError: "Reset password token not available" });
    }
        } catch (error) {
            console.log("User not created", error);
            return res.status(400).json({
                registerMessage: "User not created",
                RegisterError: error.message,
            });
        }
    })();
  };

/*
exports.saveNewPassword = async (req, res) => {
    const { newPassword } = req.body;
  const hashedPassword = bycrypt.hashSync(newPassword, 10);
    const token = req.params['jwtResetPassword'] || req.cookie['jwtResetPassword'];

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log({ savePasswordError: "Not authorised for password reset" });
                return res.status(401).json({
                    savePasswordError: "Not authorised for password reset"
                  }) //res.redirect('/signin');
            } else {
                pool.query(
                    'UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, decodedToken._id],
                    (error, results) => {
                      if (error) {
                        console.error(error);
                      } else {
                        console.log({updated: `Password updated successfully to id: ${results.rows[0].id} !`});
                        return res.status(200).json({
                            savePasswordMessage: "Not authorised for password reset"
                          });
                      }
                    }
                  );
                }
        })
    } else {
        console.log({ savePasswordError: "Not authorized, reset password token not availabe" });
        //res.redirect('/signin');
        return res
            .status(401)
            .json({ 
                savePasswordError: "Not authorized, reset password token not availabe",
            })
            //res.redirect('/signin');
    }
}
*/