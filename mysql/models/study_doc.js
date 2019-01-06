"use strict";
module.exports = function(sequelize, DataTypes) {
    let StudyDoc= sequelize.define("StudyDoc", {
            studyDocId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            studyDocName: {
                type: DataTypes.TEXT,
                allowNull: false

            },
             studyDocContent: {
            type: DataTypes.BLOB,
            allowNull: true
            },
            studyDocType: {
                type: DataTypes.INTEGER,// 1- appointment
                allowNull: false,
                defaultValue: 1

            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'study_doc',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    StudyDoc.hasMany(models.StudyHasStudyDoc, {foreignKey: 'studyDocId'});
                }
            }
        }
    );

    return StudyDoc;
};
