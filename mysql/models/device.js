 "use strict";
module.exports = function(sequelize, DataTypes) {
  let Device = sequelize.define("Device", {
        deviceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
          deviceUuid: {
              type: DataTypes.UUID,
              allowNull: true
          },
          pyxirisCounterId: {
              type: DataTypes.UUID,
              allowNull: true
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
          bankAccountId: {
              type: DataTypes.UUID,
              allowNull: true
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
          deviceFtDerniereEpuration: {
              type: DataTypes.DATE,
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
          deviceGenerateFT: {
              type: DataTypes.BOOLEAN,
              allowNull: true
          },
          deviceFTNormalAmount: {//
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true,
              defaultValue:0
          },
          deviceFTSeuil1Amount: {//
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true,
              defaultValue:0
          },
          deviceFTSeuil2Amount: {//
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true,
              defaultValue:0
          },
          deviceFTSeuil3Amount: {//
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true,
              defaultValue:0
          },
          deviceFTSeuil1: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          deviceFTSeuil2: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          deviceFTSeuil3: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          deviceFT2Pourcent: { // le pourcentage de réduction pour calculer le deuxième forfait exemple :85
              type: DataTypes.INTEGER,
              allowNull: true
          },
          deviceMigrationId: {
              type: DataTypes.STRING,
              allowNull: true
          },
          deviceMigrationId2: {
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
              Device.hasMany(models.DeviceFtCounter,{foreignKey: 'deviceId'});

          }
        }
      }
  );

  return Device;
};
