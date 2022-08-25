"use strict";
module.exports = function (sequelize, DataTypes) {
    let RspFse = sequelize.define("RspFse", {
            rspFseId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            rspId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            rspFseDateVirement: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            rspFseIssuer: {
                type: DataTypes.INTEGER, // 1 FSE, 2 FT
                allowNull: false
            },

            rspFseNumeroFse: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFseNumeroFacturation: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFseNumeroRsp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rspFseRegime: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFseErreur: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            rspFsePatientLName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFsePatientFName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFsePatientBirthday: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFsePatientInsee: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFseDestinataire: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFseMandataire: {
                type: DataTypes.STRING,
                allowNull: true
            },
            rspFseAmoAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            rspFseAmcAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            rspTotalTotalAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            rspFseIsMatched: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            rspFseIsIgnored: { // ignoré du rapporchement
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'rsp_fse',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    RspFse.belongsTo(models.Rsp, {foreignKey: 'rspId'});
                }
            }
        }
    );

    return RspFse;
};
