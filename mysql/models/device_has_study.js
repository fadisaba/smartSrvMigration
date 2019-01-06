"use strict";
module.exports = function(sequelize, DataTypes) {
  var DeviceHasStudy = sequelize.define("DeviceHasStudy", {
        deviceHasStudyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        studyId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        deviceId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'device_has_study',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            DeviceHasStudy.belongsTo(models.Device,{foreignKey: 'deviceId'});
            DeviceHasStudy.belongsTo(models.Study,{foreignKey: 'studyId'});
          }
        }
      }
  );

  return DeviceHasStudy;
};
