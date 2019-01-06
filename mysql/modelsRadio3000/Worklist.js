"use strict";
module.exports = function(sequelize, DataTypes) {
    let Worklist= sequelize.define("Worklist", {
            CODE_WORKLIST: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NOM_WORKLIST: {
                type: DataTypes.STRING,
                allowNull: true
            },
            TYPE_WORKLIST: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            MODAETITLE_WORKLIST: {
                type: DataTypes.STRING,
                allowNull: true
            },
            MODTYPE_WORKLIST: {
                type: DataTypes.STRING,
                allowNull: true
            },
            APPAETITLE_WORKLIST: {
                type: DataTypes.STRING,
                allowNull: true
            },

            TCPPORT_WORKLIST: {
            type: DataTypes.STRING,
            allowNull: true
            },
            DELAIPURGE_WORKLIST: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            CHEMIN_WORKLIST: {
                type: DataTypes.STRING,
                allowNull: true
            },
            TAGS_WORKLIST: {
                type: DataTypes.STRING,
                allowNull: true
            },
            NUMMEDECIN: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PURGEFINCOTATION: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            NON_RESPECT_DICOM: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            INVERSE_MEDECIN: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'WORKLIST',
            paranoid: false,
            classMethods: {
                associate: function(modelsRadio3000) {

                }
            }
        }
    );
    return Worklist;
};
