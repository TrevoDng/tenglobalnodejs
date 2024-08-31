const dbConfig = require('../../postgres/db.config');

//import dbConfig from '../../postgres/db.config';

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Sequelize Connection to the database has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

    const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.roles = require("./roles.model.js")(sequelize, Sequelize);
    db.users = require("./users.model.js")(sequelize, Sequelize);
    db.permissions = require("./permissions.model")(sequelize,Sequelize);
    db.user_roles = require("./users_roles.model")(sequelize, Sequelize);
    db.roles_permissions = require("./roles_permissions")(sequelize, Sequelize);
    sequelize.sync();

    module.exports = db;