"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserPlanningVac = sequelize.define("UserPlanningVac", {
          userPlanningVacId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          siteId: {
              type: DataTypes.BIGINT,
              allowNull: false
          },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_planning_vac',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserPlanningVac.belongsTo(models.User,{foreignKey: 'userId'});
              UserPlanningVac.belongsTo(models.Site,{foreignKey: 'siteId'});
          }
        }
      }
  );
  return UserPlanningVac;
};