"use strict";
module.exports = function(sequelize, DataTypes) {
  let Modality = sequelize.define("Modality", {
    modalityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    modalityCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    modalityName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }

      }, {
        tableName: 'modality',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            Modality.hasMany(models.Device,{foreignKey: 'modalityId'});
          }
        }
      }
  );

  return Modality;
};
