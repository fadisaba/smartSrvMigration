"use strict";
module.exports = function(sequelize, DataTypes) {
  let SiteUnavail = sequelize.define("SiteUnavail", {
          siteUnavailId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
            unavailId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          siteId: {
              type: DataTypes.BIGINT,
              allowNull: false
          },
         siteUnavailStartDate: {
              type: DataTypes.DATE,
              allowNull: false
          },
            siteUnavailEndDate: {
              type: DataTypes.DATE,
              allowNull: false
          },
          siteUnavailComment: {
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
        tableName: 'site_unavail',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              SiteUnavail.belongsTo(models.Site,{foreignKey: 'siteId'});
              SiteUnavail.belongsTo(models.Unavail,{foreignKey: 'unavailId'});
          }
        }
      }
  );
  return SiteUnavail;
};

