"use strict";
module.exports = function(sequelize, DataTypes) {
  let Study = sequelize.define("Study", {
    studyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
          studyTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studyCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    studyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
        studyPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
          defaultValue: '0.00'
        },

    studyFtNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    studyDuration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    studyInvoiceCat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    studyDaysNbToSendSms: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    studyDosimetry: { //0 no DOSE 1 : RADIO 2 :SCANNER 3 : MAMMO
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    studyIsInjected: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
          studyIsSupplement: { // un supplément
          type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          studySupplementAutoType: { // le type  les supplements à etre ajouté de facon automatique dans les cotation il faut renseigner un type, ce type doit etre rensigné egalement pour les examens qui vont avoir un supplément du meme type qui s'appliquera de facon automaique
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
    studyGenerateDicomWl: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    studyMultiSegment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
          studyRequireDoctor: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          studyRequireTech: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          studyIsSenolog: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          studyMigrationId: {
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
        tableName: 'study',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            Study.hasMany(models.DocHasStudy,{foreignKey: 'studyId'});
            Study.hasMany(models.StudyActe,{foreignKey: 'studyId'});
            Study.hasMany(models.StudyVisit,{foreignKey: 'studyId'});
            Study.hasMany(models.DeviceHasStudy,{foreignKey: 'studyId'});
            Study.hasMany(models.ReportTemplateHasStudy,{foreignKey: 'studyId'});
             Study.hasMany(models.SchStudySlot,{foreignKey: 'studyId'});
            Study.belongsTo(models.StudyType,{foreignKey: 'studyTypeId'})
          }
        }
      }
  );
  return Study;
};
