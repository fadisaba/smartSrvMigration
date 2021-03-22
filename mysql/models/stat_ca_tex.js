"use strict";
module.exports = function (sequelize, DataTypes) {
    let StatCaTex = sequelize.define("StatCaTex", {
            statId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            statCaTexDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            statCaTexSiteCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            statCaTexSiteId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            statCaTexStudyTypeId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            statCaTexStudyTypeCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            statCaTexDoctorInitiales: {
                type: DataTypes.STRING,
                allowNull: true
            },

            statCaTexStudyTypeAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            statCaTexStudyNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0
            },
            statCaTexMonthId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0
            },
            statCaTexMonthName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:0
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'stat_ca_tex',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                }
            }
        }
    );
    return StatCaTex;
};