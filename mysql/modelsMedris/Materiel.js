"use strict";
module.exports = function(sequelize, DataTypes) {
    let Materiel= sequelize.define("Materiel", {
            idMateriel: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idMaterielType: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, idSalle: {
                type: DataTypes.INTEGER,
                allowNull: true
            },idSite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },idCabinet: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            codeMateriel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            designationMateriel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numeroAgrement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            classeAgrement: {
                type: DataTypes.STRING,
                allowNull: true
            },

            dateAgrement: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            marqueMateriel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            modeleMateriel: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            statutMateriel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            boolNumerisation: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            boolDICOM: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            AETMateriel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            uidMateriel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            boolMammo: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            dateInstallation: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            puissance: {
                type: DataTypes.STRING,
                allowNull: true
            },
            implantation: {
                type: DataTypes.STRING,
                allowNull: true
            },
            support: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lecteur: {
                type: DataTypes.STRING,
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
            tableName: 'materiel',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return Materiel;
};
