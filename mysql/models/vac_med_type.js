"use strict";
module.exports = function(sequelize, DataTypes) {
  let VacMedType = sequelize.define("VacMedType", {
          vacMedTypeId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
          vacMedTypeName: {
          type: DataTypes.STRING,
          allowNull: false
        },
          vacMedTypeCode: {
              type: DataTypes.STRING,
              allowNull: false
          },
          vacMedTypeCat: {
              type: DataTypes.INTEGER, // 1- administratif , 2 Maintenance, 3 Panne, 4 formation
              allowNull: false
          },
          vacMedTypePoids: {
              type: DataTypes.INTEGER, // de 0 à 100
              allowNull: false
          },
          vacMedTypeDoublonAutorise: {
              type: DataTypes.BOOLEAN,
              allowNull: false,
              defaultValue: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'vac_med_type',
        paranoid: true,
        classMethods: {
          associate: function(models) {

              VacMedType.hasMany(models.VacMed,{foreignKey: 'vacMedTypeId', constraints: false});
          }
        }
      }
  );

  return VacMedType;
};
