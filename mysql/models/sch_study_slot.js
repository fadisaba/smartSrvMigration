"use strict";
module.exports = function(sequelize, DataTypes) {
  var SchStudySlot = sequelize.define("SchStudySlot", {
        schStudySlotId: {
         type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
        },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
         availStudyId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
          schStudySlotStartDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
         schStudySlotEndDate: {
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
        tableName: 'sch_study_slot',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              SchStudySlot.belongsTo(models.Room,{foreignKey: 'roomId'});
              SchStudySlot.belongsTo(models.Study,{foreignKey: 'studyId'});
          }
        }
      }
  );

  return SchStudySlot;
};
