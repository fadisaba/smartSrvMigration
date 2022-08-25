"use strict";
module.exports = function(sequelize, DataTypes) {
    let StudyHasConsent = sequelize.define("StudyHasConsent", {
            studyHasConsentId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            studyId: {
                type: DataTypes.INTEGER,
                allowNull: false

            },
            studyConsentId: {
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
            tableName: 'study_has_consent',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    StudyHasConsent.belongsTo(models.Study,{foreignKey: 'studyId'});
                    StudyHasConsent.belongsTo(models.StudyConsent,{foreignKey: 'studyConsentId'});
                }
            }
        }
    );

    return StudyHasConsent;
};
