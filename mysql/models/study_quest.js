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
            studyQuestCate: {
                type: DataTypes.INTEGER,// 1- oui/non, 2- oui/non/jsp, 3- date, 4- combo, 5- text
                allowNull: false,
                defaultValue: 1

            },
            studyQuestRequired: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            studyQuestAge: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            studyQuestGender: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            studyQuestOrder: {
                type: DataTypes.INTEGER,
                allowNull: true
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
