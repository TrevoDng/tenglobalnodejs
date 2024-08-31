//const { sequelize, Sequelize } = require("./clients");

module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull:false
    
          },
          description: {
            type: Sequelize.STRING,
            allowNull:true
          },
          createdAt: Sequelize.DATE, 
          updatedAt: Sequelize.DATE,
});

  return Roles;  
}