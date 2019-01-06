 "use strict";
module.exports = function(sequelize, DataTypes) {
  let Device = sequelize.define("Device", {
        deviceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
          modalityId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          deviceTypeId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
        siteId: {
         type: DataTypes.BIGINT,
          allowNull: false
        },
        deviceName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        deviceModel:{
          type: DataTypes.STRING,
          allowNull: true
        },
        deviceAET: {
          type: DataTypes.STRING,
          allowNull: true
        },
          deviceAgreementDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
        deviceAgreementNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
          deviceInstallationDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
        deviceTrademark: {
          type: DataTypes.STRING,
          allowNull: true
        },

        devicePower: {
          type: DataTypes.STRING,
          allowNull: true
        },
          deviceZone: {
              type: DataTypes.STRING,
              allowNull: true
          },
          deviceFtCounter: {
              type: DataTypes.STRING,
              allowNull: true
          },
          deviceFtIdentification: {
              type: DataTypes.STRING,
              allowNull: true
          },
        deviceLecture: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
          deviceSupport: {
              type: DataTypes.INTEGER,
              allowNull: true,
              defaultValue: 0
          },
          deviceUidSenolog: {
              type: DataTypes.STRING,
              allowNull: true
          },
          deviceMigrationId: {
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
        tableName: 'device',
        paranoid: true,
        classMethods: {
          associate: function(models) {

              Device.hasMany(models.StudyVisit,{foreignKey: 'deviceId'});
              Device.hasMany(models.RoomHasDevice,{foreignKey: 'deviceId'});
              Device.hasMany(models.DeviceHasStudy,{foreignKey: 'deviceId'});
              Device.hasMany(models.InvoicefseHasFt,{foreignKey: 'deviceId'});
              Device.hasMany(models.FtAvailNumber,{foreignKey: 'deviceId'});
              Device.belongsTo(models.Modality,{foreignKey: 'modalityId'});
              Device.belongsTo(models.Site,{foreignKey: 'siteId'});
              Device.belongsTo(models.DeviceType,{foreignKey: 'deviceTypeId'});

          }
        }
      }
  );

  return Device;
};
