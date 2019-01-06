"use strict";
module.exports = function(sequelize, DataTypes) {
    let GrpSite= sequelize.define("GrpSite", {
            IDE_GRP_SITE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            CODE: {
                type: DataTypes.STRING,
                allowNull: true

            },
            LIBELLE: {
                type: DataTypes.STRING,
                defaultValue: null
            }
        },
        {
            tableName: 'GRP_SITE',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    GrpSite.hasMany(modelsSir5.Site,{foreignKey: 'IDE_GRP_SITE'});
                }
            }
        }
    );

    return GrpSite;
};
