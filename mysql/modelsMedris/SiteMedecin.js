"use strict";
module.exports = function(sequelize, DataTypes) {
    let SiteMedecin= sequelize.define("SiteMedecin", {
            idSiteMedecin: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idSite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },idMedecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
             idMaintenance: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            DEL: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'site_medecin',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return SiteMedecin;
};
