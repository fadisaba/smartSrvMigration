
"use strict";
module.exports = function (sequelize, DataTypes) {
    let VisitHasDose = sequelize.define("VisitHasDose", {
            visitHasDoseId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            visitHasDoseRegionAna: {// 1 :Tête et cou , 2 : thorax, 3: Abdomaine et  Pelvis , 4:T.A.P, 5 sein ,6 Extrémités : Pédiatrie et autres
                type: DataTypes.INTEGER,
                allowNull: false
            },
            visitHasDoseDe: { // dose d'entrée (mGy)
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitHasDosePds: { // produit dose surface
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitHasDosePdsUnite: { // 1- mGy.cm2. ou à voir 2-µGy.m2, cGy.cm2 : 1Gy.cm2 = 100µGy.m2 = 100cGy.cm2 = 1000mGy.cm2
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitHasDosePdl: { // pour le scanner - produit dose largeur mesure mGy.cm,
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitHasDoseCtdi: { // pour le scanner CTDIVol meusure : mGy
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitHasDoseSeinDroit: { //DGM sein droit
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitHasDoseSeinGauche: { // DGM sein gauche
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'visit_has_dose',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    VisitHasDose .belongsTo(models.Visit, {foreignKey: 'visitId'});
                }
            }
        }
    );
    return VisitHasDose;
};
