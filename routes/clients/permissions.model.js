module.exports = (sequelize, Sequelize) => {
    const Permissions = sequelize.define("permissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      name: {
        type: Sequelize.STRING, // Define an array of strings
        allowNull: false
      },
      createdAt: Sequelize.DATE, 
      updatedAt: Sequelize.DATE,
    });
  
    return Permissions;
  };
