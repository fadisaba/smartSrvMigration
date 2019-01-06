"use strict";
module.exports = function(sequelize, DataTypes) {
  var SchAvailSlot = sequelize.define("SchAvailSlot", {
        schAvailSlotId: {
         type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
        },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
         availId: {
          type: DataTypes.UUID,
          allowNull: false
        },
          schAvailSlotStartDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
         schAvailSlotEndDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'sch_avail_slot',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              SchAvailSlot.belongsTo(models.Room,{foreignKey: 'roomId'});
              SchAvailSlot.belongsTo(models.Avail,{foreignKey: 'availId'});
          }
        }
      }
  );

  return SchAvailSlot;
};
