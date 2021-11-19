"use strict";
module.exports = function(sequelize, DataTypes) {
    let ExsActe= sequelize.define("ExsActe", {
            EXACTEID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            EXAMENID: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            EXACTECODE: {
                type: DataTypes.STRING,
                allowNull: true
            },

            EXACTEESTCCAM: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            EXACTEESTNGAP: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            EXACTEESTHORSNOM: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            EXACTEQUANTITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            EXACTEMTDEP: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },

            EXACTEANPREVUE: {
                type: DataTypes.STRING,
                allowNull: true
            },


            EX_ACTE_COEFF: {
                type: DataTypes.INTEGER,
                allowNull: false
            },



            DELETED: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'exs_actes',
            paranoid: false,
            classMethods: {
                associate: function(modelsSynapse) {
                }
            }
        }
    );
    return ExsActe;
};
