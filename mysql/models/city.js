"use strict";
module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("City", {
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    depId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cityName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cityZipCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
      cityMigrationId: {
          type: DataTypes.STRING,
          allowNull: true
      },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      }, {
        tableName: 'city',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            City.hasMany(models.User,{foreignKey: 'cityId',constraints: false});
            City.hasMany(models.Site,{foreignKey: 'siteCityId',constraints: false});
            City.hasMany(models.Patient,{foreignKey: 'cityId',constraints: false});
            City.hasMany(models.ReferringPhysician,{foreignKey: 'cityId',constraints: false});
            City.hasMany(models.Establishment,{foreignKey: 'cityId',constraints: false});
          }
        }
      }
  );

  return City;
};
