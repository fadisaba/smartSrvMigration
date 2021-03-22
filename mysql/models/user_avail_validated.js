"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserAvailValidated = sequelize.define("UserAvailValidated", {
          userAvailValidatedId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
          userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
         userAvailValidatedMonth: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          userAvailValidatedYear: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          userAvailValidatedType: {//1 indispo Or dispo Medecin
              type: DataTypes.INTEGER,
              allowNull: false
          },
          userAvailValidatedDate: {
              type: DataTypes.DATEONLY,
              allowNull: false
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_avail_validated',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserAvailValidated.belongsTo(models.User,{foreignKey: 'userId'});
          }
        }
      }
  );
  return UserAvailValidated;
};

