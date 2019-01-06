"use strict";
module.exports = function(sequelize, DataTypes) {
    let Examen= sequelize.define("Examen", {
            IDU_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDU_DOSSIER: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_NOMENCLATURE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_MANIP: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_SALLE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_APPAREIL: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            PLATRE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            MONTANT: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            DOS_PDS: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            DOS_PDL: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            }, DOS_IDS: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            }, DOS_IDSV: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },DOS_Dgm: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            }

        },
        {
            tableName: 'EXAMEN',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Examen.belongsTo(modelsSir5.Dossier,{foreignKey: 'IDU_DOSSIER'});
                    Examen.belongsTo(modelsSir5.Nomenclature,{foreignKey: 'IDE_NOMENCLATURE'});
                    Examen.belongsTo(modelsSir5.Manipulateur,{foreignKey: 'IDE_MANIP'});
                    Examen.belongsTo(modelsSir5.Salle,{foreignKey: 'IDE_SALLE'});
                    Examen.belongsTo(modelsSir5.Appareil,{foreignKey: 'IDE_APPAREIL'});

                    Examen.hasMany(modelsSir5.ExamenCcam,{foreignKey: 'IDU_EXAMEN'});
                    Examen.hasMany(modelsSir5.DossierMedecin,{foreignKey: 'IDU_EXAMEN'});
                }
            }
        }
    );
    return Examen;
};
