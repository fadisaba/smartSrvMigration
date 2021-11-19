"use strict";
module.exports = function(sequelize, DataTypes) {
    let Examen= sequelize.define("Examen", {
            EXAMENID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            TYPEEXAMENID: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            EXAMENNBFT: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            EXAMENDESIGNATION: {
                type: DataTypes.STRING,
                allowNull: true
            },
            EXAMENABREV: {
                type: DataTypes.STRING,
                allowNull: true
            },
            EXAMENDUREEENMINUTES: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            EXAMENPOIDS: {
                type: DataTypes.DECIMAL(10, 2),
                defaultValue: 0
            },

            EXAMENESTHORSNOM: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            EXAMENNBJOURSSMS: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            EXAMENESTSENOLOG: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            EXAMENESTINJECTE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            EXAMENQUESTIONNAIRE: {
                type: DataTypes.STRING,
                allowNull: true
            },

            EXAMENCOMM: {
                type: DataTypes.STRING,
                allowNull: true
            },

            EXAMEN_MULTI_SEG: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            EXAMEN_INACTIF: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            EXAMEN_DOSIMETRIE: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            EXAMEN_EST_FT: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            EXAMEN_GENERATE_WL: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            EXAMEN_NB_JOUR_INJ: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            EXAMEN_HEURE_CONVOC: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            DELETED: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'EXAMENS',
            paranoid: false,
            classMethods: {
                associate: function(modelsSynapse) {
                }
            }
        }
    );
    return Examen;
};
