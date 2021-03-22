"use strict";
module.exports = function(sequelize, DataTypes) {
    var StudyVisit = sequelize.define("StudyVisit", {
        studyVisitId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4

            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            studyId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            deviceId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: { // as technician
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            studyVisitImagesAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            studyVisitImagesAvailableCheckTime: {
                type: DataTypes.DATE,
                allowNull: true
            },
            studyVisitPrice: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: true,
                defaultValue: '0.00'
            },
            studyVisitHasDeletedActe: {// true lorsqu'on supprime un acte de l'examen depuis la cotation
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            studyVisitPacsId: { // study id we sent to the pacs into the hl7 and to modalities into the worklist xml
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitMigrationId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            visitMigrationId: {
                type: DataTypes.STRING,
                allowNull: true
            },
			studyMigrationId: {
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
            tableName: 'study_visit',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    StudyVisit.hasMany(models.StudyVisitHasActe,{foreignKey: 'studyVisitId'});
                    StudyVisit.belongsTo(models.Study,{foreignKey: 'studyId'});
                    StudyVisit.belongsTo(models.Visit,{foreignKey: 'visitId'});
                    StudyVisit.belongsTo(models.Device,{foreignKey: 'deviceId'});
                    StudyVisit.belongsTo(models.User,{foreignKey: 'userId',constraints: false});
                }
            }
        }
    );
    return StudyVisit;
};
