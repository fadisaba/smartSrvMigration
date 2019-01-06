"use strict";
module.exports = function(sequelize, DataTypes) {
  var TfieldCat = sequelize.define("TfieldCat", {
          tfieldCatId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
        },
          tfieldCatName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'tfield_cat',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              TfieldCat.hasMany(models.Tfield,{foreignKey: 'tfieldCatId'});
          }
        }
      }
  );

  return TfieldCat;
};
