const pool = require("../postgres/postgresConfig");

exports.checkEmailExistence = async (req, source) => {
  let email;

  switch (source) {
    case 'body':
      email = req.body.email;
      break;
    case 'token':
      const token = req.params.token || req.cookies['jwtResetPassword'] || req.cookies['jwt'];
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.log({token: 'Invalid token'});
          //res.status(401).send('Invalid token');
        } else {
          email = decoded.email;
        }
      });
      break;
    case 'header':
      email = req.headers.email;
      break;
    case 'params':
        email = req.params.email;
        break;
    default:
      throw new Error('Invalid source');
  }

  console.log({compareEmail: email});

  try {
    const results = await pool.query('SELECT email FROM users ORDER BY id ASC');
    const emailResults = results.rows;

    const emailFound = emailResults.find((emailData) => emailData.email === email);
    console.log({databaseEmail: emailFound ? true : false});

    return emailFound ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/*
exports.checkEmailExistence = async (req) => {
    const { email } = req.body;

    const token = req.params.token;
    const token2 = req.cookies['jwtResetPassword'];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).send('Invalid token');
      } else {
        const userEmail = decoded.email;
      }
    });
  
    try {
      const results = await pool.query('SELECT email FROM users ORDER BY id ASC');
      const emailResults = results.rows;
  
      const emailFound = emailResults.find((emailData) => emailData.email === email);
      
      return emailFound ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  */