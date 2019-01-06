"use strict";
module.exports = function(sequelize, DataTypes) {
    let Patient= sequelize.define("Patient", {
            idPatient: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idCorrespondant: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            nomPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nomJFPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenomPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            civilitePatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            agePatient: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            vivantPatient: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            situationPatient: {
            type: DataTypes.STRING,
            allowNull: true
            },
            numSSPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cleSSPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rangGemellaire: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            sexePatient: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            dateNaissance: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            lieuNaissance: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dptNaissance: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paysNaissance: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nationalitePatient: {
                type: DataTypes.STRING,
                allowNull: true
            },  precisionNationalite: {
                type: DataTypes.STRING,
                allowNull: true
            },  idCoordonnee: {
                type: DataTypes.INTEGER,
                allowNull: true
            },  professionPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },  nomAPrevenir: {
                type: DataTypes.STRING,
                allowNull: true
            },  prenomAPrevenir: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telephoneAPrevenir: {
                type: DataTypes.STRING,
                allowNull: true
            },
            portableAPrevenir: {
                type: DataTypes.STRING,
                allowNull: true
            },
            parenteAPrevenir: {
                type: DataTypes.STRING,
                allowNull: true
            },
            informationPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NIPPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },

            dateNaissanceLunaire: {
                type: DataTypes.STRING,
                allowNull: true
            },
            INS_C: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cleINS_C: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codesCouverture: {
                type: DataTypes.STRING,
                allowNull: true
            },
            soldePatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            antecedentPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            alergiePatient: {
                type: DataTypes.STRING,
                allowNull: true
            },  facteurRisquePatient: {
                type: DataTypes.STRING,
                allowNull: true
            },  traitementPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },  idMaintenance: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            DEL: {
                type: DataTypes.INTEGER,
                allowNull: true
            }




        },
        {
            tableName: 'patient',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {
                    Patient.belongsTo(modelsMedris.Coordonnee,{foreignKey: 'idCoordonnee'});
                    Patient.belongsTo(modelsMedris.Correspondant,{foreignKey: 'idCorrespondant'});

                }

            }
        }
    );
    return Patient;
};
