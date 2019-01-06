"use strict";
module.exports = function(sequelize, DataTypes) {
    let StudyHasStudyDoc = sequelize.define("StudyHasStudyDoc", {
            studyHasStudyDocId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            studyId: {
                type: DataTypes.INTEGER,
                allowNull: false

            },
            studyDocId: {
                type: DataTypes.UUID,
                allowNull: false

            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'study_has_study_doc',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    StudyHasStudyDoc.belongsTo(models.Study,{foreignKey: 'studyId'});
                    StudyHasStudyDoc.belongsTo(models.StudyDoc,{foreignKey: 'studyDocId'});
                }
            }
        }
    );

    return StudyHasStudyDoc;
};
