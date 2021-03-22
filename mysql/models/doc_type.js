"use strict";
module.exports = function (sequelize, DataTypes) {
    let DocType = sequelize.define("DocType", {
            docTypeId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            docTypeName: {
                type: DataTypes.STRING,
                allowNull: false
            },

            docTypeRelatedTo: { // 2 patient,1 visit 3 other
                type: DataTypes.INTEGER,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'doc_type',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    DocType.hasMany(models.PatientDoc, {foreignKey: 'docTypeId'});
                }
            }
        }
    );
    return DocType;
};
