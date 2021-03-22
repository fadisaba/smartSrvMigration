"use strict";
module.exports = function (sequelize, DataTypes) {
    let VisitValiditePatient = sequelize.define("VisitValiditePatient", {
            visitValiditePatientId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            visitValiditePatientCode: { // s'il s'agit d'urgence le code doit commencer par U, et H : pour hospitalise
                type: DataTypes.STRING,
                allowNull: true
            },
            visitValiditePatientName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            visitValiditePatientColor: {
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
            tableName: 'visit_validite_patient',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                   // VisitValiditePatient.hasMany(models.Visit,{foreignKey: 'visitValiditePatientId',constraints:false});
                }
            }
        }
    );
    return VisitValiditePatient;
};
