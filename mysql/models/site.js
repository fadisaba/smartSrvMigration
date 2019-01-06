"use strict";
module.exports = function(sequelize, DataTypes) {
  let Site = sequelize.define("Site", {
        siteId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        siteGroupId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        siteName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        siteCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sitePhone: {
          type: DataTypes.STRING,
          allowNull: true
        },
        siteFax: {
          type: DataTypes.STRING,
          allowNull: true
        },
        siteCategory: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        siteAddress1: {
          type: DataTypes.STRING,
          allowNull: true
        },
        siteAddress2: {
          type: DataTypes.STRING,
          allowNull: true
        },
        siteZipCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        siteCityId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
          siteMigrationId: {
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
        tableName: 'site',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            Site.belongsTo(models.City,{foreignKey: 'siteCityId',constraints:false});
            Site.belongsTo(models.SiteGroup,{foreignKey: 'siteGroupId'});
            Site.hasOne(models.SiteConfig,{foreignKey: 'siteId'});
            Site.hasMany(models.Visit,{foreignKey: 'siteId'});
            Site.hasMany(models.Room,{foreignKey: 'siteId'});
            Site.hasMany(models.Device,{foreignKey: 'siteId'});
            Site.hasMany(models.Worklist,{foreignKey: 'siteId'});
            Site.hasMany(models.ReportHf,{foreignKey: 'siteId',constraints:false});
              Site.hasMany(models.Payment,{foreignKey: 'siteId'});
              Site.hasMany(models.ResourceSch,{foreignKey: 'siteId'});
              Site.hasMany(models.RoomSch,{foreignKey: 'siteId'});
              Site.hasMany(models.SiteUnavail,{foreignKey: 'siteId'});
              Site.hasMany(models.UserAvailbyday,{foreignKey: 'siteId'});
              Site.hasMany(models.RoomAvailbyday,{foreignKey: 'siteId'});

              Site.belongsTo(models.CashBoxConfig,{foreignKey: 'siteId',constraints:false});
              Site.belongsTo(models.BankAccountConfig,{foreignKey: 'siteId',constraints:false});

          }
        }
      }
  );

  return Site;
};
