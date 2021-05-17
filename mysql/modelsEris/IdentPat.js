"use strict";
module.exports = function (sequelize, DataTypes) {
    let IdentPat = sequelize.define("IdentPat", {
            id_ident_pat: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_ident_adm: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            nir: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nir_cle: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'ident_pat',
            paranoid: false,
            classMethods: {
                associate: function (modelsEris) {

                }

            }
        }
    );
    return IdentPat;
};
