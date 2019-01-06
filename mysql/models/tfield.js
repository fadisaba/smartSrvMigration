"use strict";
module.exports = function(sequelize, DataTypes) {
  var Tfield = sequelize.define("Tfield", {
          tfieldId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
          },
          tfieldCatId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          tfieldName: { // the field name into the template
              type: DataTypes.STRING,
              allowNull: false
          },
          tfieldDbName: {// the field name into the database
              type: DataTypes.STRING,
              allowNull: true,
              defaultValue: 0
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'tfield',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              Tfield.belongsTo(models.TfieldCat,{foreignKey: 'tfieldCatId'});
          }
        }
      }
  );

  return Tfield;
};
