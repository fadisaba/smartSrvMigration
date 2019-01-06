"use strict";
module.exports = function(sequelize, DataTypes) {
    let StudyQuest = sequelize.define("StudyQuest", {
            studyQuestId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            studyQuestText: {
                type: DataTypes.TEXT,
                allowNull: false

            },
            studyQuestType: {
                type: DataTypes.INTEGER,// 1- question, - 2- requirements (conditions à remplir)
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
            tableName: 'study_quest',
            paranoid: true
        }
    );

    return StudyQuest;
};
