"use strict";
module.exports = function (sequelize, DataTypes) {
    let StudyType = sequelize.define("StudyType", {
            studyTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            studyTypeCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyTypeName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyTypeRdvColor: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyTypeMigrationId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyTypeIsVisitbleForRdv: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }

        }, {
            tableName: 'study_type',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    StudyType.hasMany(models.Study, {foreignKey: 'studyTypeId'});
                    StudyType.belongsTo(models.StudyCat, {foreignKey: 'studyCatId'})
                }
            }
        }
    );

    return StudyType;
};
