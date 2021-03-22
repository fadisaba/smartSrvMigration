
"use strict";
module.exports = function (sequelize, DataTypes) {
    var VisitHasRph = sequelize.define("VisitHasRph", {
            visitHasRphId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            referringPhysicianId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            patientIsOrientedBy: { // true if the Referring physician  oriented patient
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
                active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'visit_has_rph',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    VisitHasRph.belongsTo(models.Visit, {foreignKey: 'visitId'});
                    VisitHasRph.belongsTo(models.ReferringPhysician, {foreignKey: 'referringPhysicianId'});
                }
            }
        }
    );
    return VisitHasRph;
};
