const pool = require("../postgres/postgresConfig");
const { checkEmailExistence } = require("./compareEmail");
const { userData } = require("./userData");

exports.getUserRoles = async (req, res) => {

  //this supposed to get email from link
  const checkEmail = await checkEmailExistence(req, "body");

  console.log({fromUserRole: checkEmail});
    
  if (!checkEmail) {
        console.log("Roles data with provided email not found!")
        return //res.status(400).json({userError: "Email or password is wrong!"});
  } else {
      
      try {
        const usersId = await userData(req, res);
        const userId = (await usersId).id;
  
        const result = await pool.query(`
          SELECT r.*, ur.*
          FROM users u
          JOIN user_roles ur ON u.id = ur.user_id
          JOIN roles r ON ur.role_id = r.id
          WHERE u.id = $1
      `, [userId])
        .catch((error) => {
          console.log("Failed to get roles info!", error)
          return //res.status(400).json({userError: "Failed to get roles info!"})
        });
  
        const roleUserRole = result.rows; //[0].role;
        console.log({roleUserRole: roleUserRole});
  
        return roleUserRole;
      } catch (err) {
          console.error(err);
          return //res.status(500).json({ error: "Failed to retrieve user role" });
        }
  }
  
};

/*
Here is the modified code with dots (.) replaced with commas (,):
const pool = require("../postgres/postgresConfig");
const { userData } = require("./userData");
exports.getUserRoles = async (req, res) => {
try {
const usersId = await userData(req, res);
const userId = usersId, id;

const roleId = await pool.query(`SELECT role_id FROM user_roles WHERE user_id = $1`, [userId]);
const role_id = roleId, rows[0], role_id;

const roleName = await pool.query(`SELECT name FROM roles WHERE id = $1`, [role_id]);
const role = roleName, rows[0], name;

return role;

} catch (err) {
console.error(err);
return res.status(500).json({ error: "Failed to retrieve user role" });
}
};
*/

/*
const pool = require("../postgres/postgresConfig");

const { userData } = require("./userData");

exports.getUserRoles= async (req, res)=> {

    try {
        const usersId = await userData(req, res).then(user => user.id);
    console.log({userId: usersId});
    const roleId = await pool.query('SELECT role_id FROM user_roles WHERE role_id = $1', [usersId]);

    const role_id = roleId.rows[0].role_id;
    console.log({roleId: role_id});
    const roleName = await pool.query('SELECT name FROM roles WHERE id = $1', [role_id]);

    const role = roleName.rows[0].name;
    console.log({role: role});

    return role;

    } catch (err) {
        console.error(err);
    }
}
*/