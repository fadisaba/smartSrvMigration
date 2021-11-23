"use strict";
module.exports = function(sequelize, DataTypes) {
    let Consult= sequelize.define("Consult", {
            CONSULTID: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            PATIENTID: {
                type: DataTypes.STRING,
                allowNull: true
            },

            CONSULTIDNUM: {
                type: DataTypes.STRING,
                allowNull: true
            },
            CONSULTPACSID: {
                type: DataTypes.STRING,
                allowNull: true
            },

            SITEID: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            USERID: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            DICT_USER_ID: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CONSULTREMPLACANTID: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            ETABLISSEMENTID: {
                type: DataTypes.STRING,
                allowNull: true
            },

            ETABSERVID: {
                type: DataTypes.STRING,
                allowNull: true
            },

            CONSULTNUMEROSEJOUR: {
                type: DataTypes.STRING,
                allowNull: true
            },
        //    CONSULTHEURE

            CONSULTDATE: {
                type: DataTypes.DATE,
                allowNull: true
            },
            CONSULTHEURE: {
                type: DataTypes.STRING,
                allowNull: true
            },


            CONSULTPARVITALE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            CONSULTESTGRATUITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CONSULT_FT_GRATUIT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CONSULTESTHOSPITALISATION: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CONSULTESTURGENCE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },





            CONSULTREPONSEALD: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CONSULTTERMINEE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            CONSULTTPAMO: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            CONSULTTPAMC: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            CONSULT_FT_CONCERNE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CONSULT_N_RELANCE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CONSULT_COMM: {
                type: DataTypes.STRING,
                allowNull: true
            },

            CONSULT_PATIENT_TAILLE: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            CONSULT_PATIENT_POIDS: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },

            DELETED: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'consults',
            paranoid: false,
            classMethods: {
                associate: function(modelsSynapse) {
                }
            }
        }
    );
    return Consult;
};
