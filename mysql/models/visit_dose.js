
"use strict";
module.exports = function (sequelize, DataTypes) {
    let VisitDose = sequelize.define("VisitDose", {
            visitDoseId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            visitDoseDroit: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitDoseGauche: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            visitDoseRadio: {
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
            tableName: 'visit_dose',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    VisitDose.belongsTo(models.Visit, {foreignKey: 'visitId'});
                }
            }
        }
    );
    return VisitDose;
};
