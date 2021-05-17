"use strict";
module.exports = function(sequelize, DataTypes) {
    let QuestionnaireHasQuest = sequelize.define("QuestionnaireHasQuest", {
            questionnaireHasQuestionId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            questionnaireId: {
                type: DataTypes.UUID,
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
            tableName: 'questionnaire_has_quest',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    QuestionnaireHasQuest.belongsTo(models.Questionnaire,{foreignKey: 'questionnaireId'});
                    QuestionnaireHasQuest.belongsTo(models.StudyQuest,{foreignKey: 'studyQuestId'});
                }
            }
        }
    );

    return QuestionnaireHasQuest;
};
