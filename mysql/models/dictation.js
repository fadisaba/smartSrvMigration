"use strict";
module.exports = function(sequelize, DataTypes) {
  var Dictation = sequelize.define("Dictation", {
          dictationId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        doctorId: { // the doctor validate the report
          type: DataTypes.INTEGER,
          allowNull: false
        },
        visitId: {
          type: DataTypes.UUID,
          allowNull: false
        },
          dictationPath: {
          type: DataTypes.STRING,
          allowNull: false
        },
          dictationDate: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: DataTypes.NOW
          },
          dictationDuration: {
              type: DataTypes.STRING,
              allowNull: true
          },
          dictationPriority: {
              type: DataTypes.INTEGER, // 1 heigh,2 midium, 3 low
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }

      },
      {
        tableName: 'dictation',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              Dictation.belongsTo(models.Visit,{foreignKey: 'visitId'});
              Dictation.belongsTo(models.Doctor,{foreignKey: 'doctorId'});
          }
        }
      }
  );

  return Dictation;
};