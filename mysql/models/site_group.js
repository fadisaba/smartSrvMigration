"use strict";
module.exports = function(sequelize, DataTypes) {
  var SiteGroup = sequelize.define("SiteGroup", {
    siteGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    siteGroupName: {
      type: DataTypes.STRING,
      allowNull: true
    },
      siteGroupMigrationId: {
          type: DataTypes.STRING,
          allowNull: true
      },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
      }, {
        tableName: 'site_group',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            SiteGroup.hasMany(models.Site,{foreignKey: 'siteGroupId'});
          }
        }
      }
  );
  return SiteGroup;
};
