"use strict";
module.exports = function (sequelize, DataTypes) {
    let VisitType = sequelize.define("VisitType", {
           visitTypeId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            visitTypeCode: { // s'il s'agit d'urgence le code doit commencer par U, et H : pour hospitalise
                type: DataTypes.STRING,
                allowNull: true
            },
            visitTypeName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            visitTypeColor: {
                type: DataTypes.STRING,
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
            tableName: 'visit_type',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                   // VisitType.hasMany(models.Visit,{foreignKey: 'VisitTypeId',constraints:false});
                }
            }
        }
    );
    return VisitType;
};
