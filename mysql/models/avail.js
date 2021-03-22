"use strict";
module.exports = function(sequelize, DataTypes) {
  let Avail = sequelize.define("Avail", {
        availId: {
             type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
        },
        availName: {
          type: DataTypes.STRING,
          allowNull: true
        },
       availCode: {
              type: DataTypes.STRING,
              allowNull: true
          },
          availColor: {
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
        tableName: 'avail',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              Avail.hasMany(models.AvailHasStudy,{foreignKey: 'availId'});
              Avail.hasMany(models.SchAvailSlot,{foreignKey: 'availId'});
          }
        }
      }
  );

  return Avail;
};
