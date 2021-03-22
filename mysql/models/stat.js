"use strict";
module.exports = function (sequelize, DataTypes) {
    let Stat = sequelize.define("Stat", {
            visitId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            visitBalanceId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            siteCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            patientSearch: {
                type: DataTypes.STRING,
                allowNull: false
            },
            patientZipCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            patientCity: {
                type: DataTypes.STRING,
                allowNull: false
            },
            doctorInitiales: {
                type: DataTypes.STRING,
                allowNull: true
            },
            executantInitiales: {
                type: DataTypes.STRING,
                allowNull: true
            },
            establishmentCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            estHasServCode: {
                type: DataTypes.STRING,
                allowNull: true

            },
            establishmentFtCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitTypeCode: { // s'il s'agit d'urgence le code doit commencer par U, et H : pour hospitalise
                type: DataTypes.STRING,
                allowNull: true
            },
            visitValiditePatientCode: { // s'il s'agit d'urgence le code doit commencer par U, et H : pour hospitalise
                type: DataTypes.STRING,
                allowNull: true
            },
            studyId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            studyTypeId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            studyType2Id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            studyType3Id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            studyType2Code: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyType3Code: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyTypeCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyCode2: {
                type: DataTypes.STRING,
                allowNull: true
            },

            studyCode3: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysicianId: {// MT TRAITANT
                type: DataTypes.UUID
            },
            referringPhysicianSearch: { // MT TRAITANT
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysician1Id: {
                type: DataTypes.UUID,
                allowNull: true
            },
            referringPhysician1Search: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysician2Id: {
                type: DataTypes.UUID,
                allowNull: true
            },
            referringPhysician2Search: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam1Amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            ccam2Amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            ccam3Amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            ccam4Amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            ccam5Amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            ccam6Amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            ccam7Amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            ccam8Amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            ccam1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam3: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam4: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam5: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam6: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam7: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam8: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam1Regroup: {//code regroupemente
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam2Regroup: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam3Regroup: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam4Regroup: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam5Regroup: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam6Regroup: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam7Regroup: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ccam8Regroup: {
                type: DataTypes.STRING,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'stat',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Stat.belongsTo(models.Visit,{foreignKey: 'visitId'});
                    Stat.belongsTo(models.VisitBalance,{foreignKey: 'visitBalanceId'});
                }
            }
        }
    );
    return Stat;
};