"use strict";
module.exports = function(sequelize, DataTypes) {
  let VacmedgroupHasSite = sequelize.define("VacmedgroupHasSite", {
          vacmedgroupHasSiteId: {
              type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
      },

          vacMedGroupId: { // la vacation de l'après midi
              type: DataTypes.UUID,
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
        tableName: 'vacmedgroup_has_site',
        paranoid: true,
        classMethods: {
          associate: function(models) {

              VacmedgroupHasSite.belongsTo(models.VacMedGroup,{foreignKey: 'vacMedGroupId'});

          }
        }
      }
  );

  return VacmedgroupHasSite;
};
