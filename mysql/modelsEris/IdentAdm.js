"use strict";
module.exports = function (sequelize, DataTypes) {
    let IdentAdm = sequelize.define("IdentAdm", {
            id_ident_adm: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_identite: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'ident_adm',
            paranoid: false,
            classMethods: {
                associate: function (modelsEris) {

                }

            }
        }
    );
    return IdentAdm;
};
