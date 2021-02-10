"use strict";
module.exports = function(sequelize, DataTypes) {
    let Dossier= sequelize.define("Dossier", {
            idDossier: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            idSite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idMedecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idPatient: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idServiceHospit: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idEtablissementHospit: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idCorrespondant: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idCorrespondant2: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idCorrespondantMT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            nomPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            initialesMedecin: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenomPatient: {
                type: DataTypes.STRING,
                allowNull: true
            },
            demandePar: {
                type: DataTypes.STRING,
                allowNull: true
            },
            arriveeDossier: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateDossier: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureDossier: {
            type: DataTypes.TIME,
            allowNull: true
            },
            nbFT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            boolGratuit: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, boolCMU: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, boolALD: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, boolAME: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, boolAMEC: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, boolACS: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolAT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolFeuilletAT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolDepistage: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolInvalidite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolNH: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolUrgence: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            forcerFinMaternite: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            employeurAT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateAT: {
                type: DataTypes.DATEONLY,
                allowNull: true
            }, dateMaternite: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            numeroDepistage: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateArriveDossier: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureArriveDossier: {
                type: DataTypes.TIME,
                allowNull: true
            },
            dateSalleDossier: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureSalleDossier: {
                type: DataTypes.TIME,
                allowNull: true
            },
            dateClotureDossier: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            heureClotureDossier: {
                type: DataTypes.TIME,
                allowNull: true
            },
            observationsDossier: {
                type: DataTypes.STRING,
                allowNull: true
            },
            boolCR: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            boolCRVerrouille: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            boolDictee: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            statutCR: {
                type: DataTypes.STRING,
                allowNull: true
            },
            boolCotation: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            statutCotation: {
                type: DataTypes.STRING,
                allowNull: true
            },
            boolCotationMedecin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            boolGenerationPAV: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            boolReglement: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            statutReglement: {
                type: DataTypes.STRING,
                allowNull: true
            },
            idFacture: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            statutDossier: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            typeDossier: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            TPAMO: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            TPAMC: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            codeEtablissementExterne: {
                type: DataTypes.STRING,
                allowNull: true
            },
            parcoursDeSoins: {
                type: DataTypes.STRING,
                allowNull: true
            },
            depassementTotal: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numeroSejour: {
                type: DataTypes.STRING,
                allowNull: true
            }, numChambre: {
                type: DataTypes.STRING,
                allowNull: true
            },numFactureHprimXml: {
                type: DataTypes.STRING,
                allowNull: true
            },boolAccuseFactureHprimXml: {
                type: DataTypes.INTEGER,
                allowNull: true
            },dateFactureHprimXML: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },motifClotureDossier: {
                type: DataTypes.STRING,
                allowNull: true
            },numeroAT: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numeroATCompl: {
                type: DataTypes.STRING,
                allowNull: true
            }, boolAccidentDroitCommun: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, dateAccidentDroitCommun: {
                type: DataTypes.DATEONLY,
                allowNull: true
            }, boolRembFT: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, forcer: {
                type: DataTypes.INTEGER,
                allowNull: true
            }, datePrescription: {
                type: DataTypes.DATEONLY,
                allowNull: true
            }, regimeAMO_AT: {
                type: DataTypes.STRING,
                allowNull: true
            },caisseAMO_AT: {
                type: DataTypes.STRING,
                allowNull: true
            },centreAMO_AT: {
                type: DataTypes.STRING,
                allowNull: true
            },protocoleDeSoin: {
                type: DataTypes.INTEGER,
                allowNull: true
            },traitantDeclare: {
                type: DataTypes.INTEGER,
                allowNull: true
            },horsPDS: {
                type: DataTypes.INTEGER,
                allowNull: true
            },mobilitePatient: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolMonaco: {
                type: DataTypes.INTEGER,
                allowNull: true
            },couleurCarteMonaco: {
                type: DataTypes.INTEGER,
                allowNull: true
            },statutGratuit: {
                type: DataTypes.INTEGER,
                allowNull: true
            },pourcentageRemboursement: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolImpFSP: {
                type: DataTypes.INTEGER,
                allowNull: true
            },boolPDFErreur: {
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
            tableName: 'dossier',
            paranoid: false,
            classMethods: {
                associate: function(modelsMedris) {

                }
            }
        }
    );
    return Dossier;
};
