"use strict";
module.exports = function(sequelize, DataTypes) {
    let QuestRep = sequelize.define("QuestRep", {
            questRepId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            studyQuestId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            appointmentId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: true
            },
            questRepCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'quest_rep',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    QuestRep.belongsTo(models.StudyQuest,{foreignKey: 'studyQuestId'});
                }
            }
        }
    );

    return QuestRep;
};
