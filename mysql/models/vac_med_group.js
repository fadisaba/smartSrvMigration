"use strict";
module.exports = function(sequelize, DataTypes) {
  let VacMedGroup = sequelize.define("VacMedGroup", {
          vacMedGroupId: {
              type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
      },

          vacMedGroupLabel: { // la vacation de l'après midi
              type: DataTypes.STRING,
              allowNull: true
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

          }
        }
      }
  );

  return VacMedGroup;
};
