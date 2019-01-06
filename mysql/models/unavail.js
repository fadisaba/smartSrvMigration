"use strict";
module.exports = function(sequelize, DataTypes) {
  let Unavail = sequelize.define("Unavail", {
          unavailId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
          UnavailName: {
              type: DataTypes.STRING,
              allowNull: false
          },
          UnavailCode: {
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
        tableName: 'unavail',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              Unavail.hasMany(models.SiteUnavail,{foreignKey: 'unavailId'});
              Unavail.hasMany(models.RoomUnavail,{foreignKey: 'unavailId'});
          }
        }
      }
  );
  return Unavail;
};

