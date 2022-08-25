"use strict";
module.exports = function(sequelize, DataTypes) {
    let StudyConsent = sequelize.define("StudyConsent", {
            studyConsentId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            studyConsentText: {
                type: DataTypes.TEXT,
                allowNull: false

            },
            studyConsentPath: {
                type: DataTypes.STRING,
                allowNull: false
            },
            studyConsentOrder: {
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
            tableName: 'study_consent',
            paranoid: true
        }
    );

    return StudyConsent;
};
