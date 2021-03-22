"use strict";
module.exports = function(sequelize, DataTypes) {
  var Departement = sequelize.define("Departement", {
    departementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    departementCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    departementNom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departementNomUppercase: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departementSlug: {
      type: DataTypes.STRING,
      allowNull: true
    },
    departementNomSoundex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      }, {
        tableName: 'departement',
        paranoid: true,
        classMethods: {
          associate: function(models) {
          }
        }
      }
  );

  return Departement;
};
