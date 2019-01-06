"use strict";
module.exports = function(sequelize, DataTypes) {
    let Examen= sequelize.define("Examen", {
            idExamen: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idExamenType: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            codeExamen: {
                type: DataTypes.STRING,
                allowNull: true
            },
            designationExamen: {
                type: DataTypes.STRING,
                allowNull: true
            },
            categorieExamen: {
                type: DataTypes.STRING,
                allowNull: true
            },
            regionExamen: {
                type: DataTypes.STRING,
                allowNull: true
            },

            familleExamen: {
            type: DataTypes.STRING,
            allowNull: true
            },
            indicationCabinet: {
                type: DataTypes.STRING,
                allowNull: true
            },
            contreIndicationCabinet: {
                type: DataTypes.STRING,
                allowNull: true
            },
            indicationPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            contreIndicationPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            examenQuestion: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nbFTExamen: {
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
            tableName: 'examen',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {
                    Examen.hasMany(modelsMedris.DossierExamen,{foreignKey: 'idExamen'});
                }
            }
        }
    );
    return Examen;
};
