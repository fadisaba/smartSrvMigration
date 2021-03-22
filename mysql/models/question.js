"use strict";
module.exports = function (sequelize, DataTypes) {
    let Question = sequelize.define("Question", {
            questionId: {
                type: DataTypes.UUID,
                //  allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            questionnaireId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            questionCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            questionText: {
                type: DataTypes.STRING,
                allowNull: false
            },
            questionRequired: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            questionType: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            questionAge: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            questionGender: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            questionOrder: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'question',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Question.belongsTo(models.Questionnaire, {foreignKey: 'questionnaireId'});
                }
            }
        }
    );
    return Question;
};
