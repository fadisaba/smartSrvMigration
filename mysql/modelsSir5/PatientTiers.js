"use strict";
module.exports = function(sequelize, DataTypes) {
    let PatientTiers= sequelize.define("PatientTiers", {
            IDE_PATIENT: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            IDE_TIERS: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            RANGTIERS: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            NUMERO_ADHERENT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            RANG_BENEFICIAIRE: {
                type: DataTypes.INTEGER,
                defaultValue: 0

            },
            DATE_DEBDROITS: {
                type: DataTypes.DATE,
                allowNull: true

            },
            DATE_FINDROITS: {
                type: DataTypes.DATE,
                allowNull: true

            }
        },
        {
            tableName: 'PATIENT_TIERS',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    PatientTiers.belongsTo(modelsSir5.Tiers,{foreignKey: 'IDE_TIERS'});

                    PatientTiers.hasMany(modelsSir5.Dossier,{foreignKey: 'IDE_PATIENT'});
                    PatientTiers.hasMany(modelsSir5.PatientTiers,{foreignKey: 'IDE_PATIENT'});


                }
            }
        }
    );

    return PatientTiers;
};
