"use strict";
module.exports = function(sequelize, DataTypes) {
  let VacmedgroupPublish = sequelize.define("VacmedgroupPublish", {
          vacmedgroupPublishId: {
              type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
      },
          vacMedGroupId: {
              type: DataTypes.UUID,
              allowNull: false
          },

          vacmedgroupPublishMonthNumber: { // le mois publié
              type: DataTypes.INTEGER,
              allowNull: false
          },
          vacmedgroupPublishYearNumber: {// l'année publiée
              type: DataTypes.INTEGER,
              allowNull: false
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'vacmedgroup_publish',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              VacmedgroupPublish.belongsTo(models.VacMedGroup,{foreignKey: 'vacMedGroupId'});
          }
        }
      }
  );
  return VacmedgroupPublish;
};
