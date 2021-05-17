"use strict";
module.exports = function (sequelize, DataTypes) {
    let RapprochementAmo = sequelize.define("RapprochementAmo", {
            rapprochementAmoId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            rapprochementAmoName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rapprochementAmoRegime: { //ce regime doit correspondre au Régime retourné par le RSP
                type: DataTypes.STRING,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'rapprochement_amo',
            paranoid: true,
            classMethods: {
                associate: function (models) {

                }
            }
        }
    );

    return RapprochementAmo;
};
