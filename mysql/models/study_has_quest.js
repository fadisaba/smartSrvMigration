"use strict";
module.exports = function(sequelize, DataTypes) {
    let StudyHasQuest = sequelize.define("StudyHasQuest", {
            studyHasQuestionId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            studyId: {
                type: DataTypes.INTEGER,
                allowNull: false

            },
            studyQuestId: {
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
            tableName: 'study_has_quest',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    StudyHasQuest.belongsTo(models.Study,{foreignKey: 'studyId'});
                    StudyHasQuest.belongsTo(models.StudyQuest,{foreignKey: 'studyQuestId'});
                }
            }
        }
    );

    return StudyHasQuest;
};
