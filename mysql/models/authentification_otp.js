"use strict";
module.exports = function (sequelize, DataTypes) {
    var AuthentificationOtp = sequelize.define("AuthentificationOtp", {
            authentificationOtpId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            authentificationOtpEmail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            authentificationOtpValue: {
                type: DataTypes.STRING,
                allowNull: false
            },
            authentificationOtpDateTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'authentification_otp',
            paranoid: true,
            classMethods: {
                associate: function (models) {

                }
            }
        }
    );

    return AuthentificationOtp;
};
