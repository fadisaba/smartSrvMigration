"use strict";
module.exports = function(sequelize, DataTypes) {
  let VacMedGroup = sequelize.define("VacMedGroup", {
          vacMedGroupId: {
              type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
      },
          vacMedGroupLabel: {
              type: DataTypes.STRING,
              allowNull: true
          },
          vacMedGroupIsPlanningType: {// il s'agit d'un planning type
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: true
          },
          vacMedGroupIsArchived: {// il s'agit d'un planning type archivé
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          vacMedGroupWeeksNumber: { // le nombre de semaines concernées par le planning type
              type: DataTypes.INTEGER,
              allowNull: true
          },
          vacMedGroupMonthNumber: { // utilisé pour les plannings types
              type: DataTypes.INTEGER,
              allowNull: false
          },
          vacMedGroupYearNumber: {// utilisé pour les plannings types
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
        tableName: 'vac_med_group',
        paranoid: true,
        classMethods: {
          associate: function(models) {

              VacMedGroup.hasMany(models.VacMed,{foreignKey: 'vacMedGroupId'});
              VacMedGroup.hasMany(models.VacmedgroupHasSite,{foreignKey: 'vacMedGroupId'});
              VacMedGroup.hasMany(models.VacmedgroupPublish,{foreignKey: 'vacMedGroupId'});

          }
        }
      }
  );

  return VacMedGroup;
};
