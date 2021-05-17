"use strict";
module.exports = function(sequelize, DataTypes) {
    let Questionnaire = sequelize.define("Questionnaire", {
            questionnaireId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            questionnaireCode: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            questionnaireLabel: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            questionnaireType: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1

            },
            questionnaireAlwaysAsked: {
                type: DataTypes.BOOLEAN,
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
            tableName: 'questionnaire',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Questionnaire.hasMany(models.Question, {foreignKey: 'questionnaireId'});
                }
            }
        }
    );

    return Questionnaire;
};
