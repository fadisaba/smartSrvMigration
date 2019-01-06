"use strict";
module.exports = function(sequelize, DataTypes) {
  let Doctor = sequelize.define("Doctor", {
        doctorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        doctorIsSubstitute: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          doctorSubstituteNumFacturation: {
              type: DataTypes.STRING,
              allowNull: true
          },
          doctorSubstituteCleFacturation: {
              type: DataTypes.STRING,
              allowNull: true
          },
        doctorSenologUID: {
          type: DataTypes.STRING,
          allowNull: true
        },
        doctoHasOptionCoordination: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        doctorHasSector2: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
          doctorParametresAcs: {
              type: DataTypes.INTEGER, // 1:TP coordonnée, 2 AMC Classique
              allowNull: false,

          },
          doctorContratTarifaire: {
              type: DataTypes.INTEGER, // 1:Aucun, 2 OPTAM -3 OPTAM-CO
              allowNull: false

          },
          doctorMigrationId: {
              type: DataTypes.STRING,
              allowNull: true
          },
          doctorSignature: {
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
        tableName: 'doctor',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              Doctor.hasMany(models.DocHasStudy,{foreignKey: 'doctorId'});
              Doctor.hasMany(models.Visit,{foreignKey: 'doctorId'});
              Doctor.belongsTo(models.User,{foreignKey: 'userId'});
              Doctor.hasMany(models.Report,{foreignKey: 'doctorId'});
              Doctor.hasMany(models.Dictation,{foreignKey: 'doctorId'});
              Doctor.hasMany(models.ReportHf,{foreignKey: 'doctorId'});
              Doctor.hasMany(models.ReportTemplate,{foreignKey: 'doctorId'});
              Doctor.hasMany(models.ReportKeyword,{foreignKey: 'doctorId'});
              Doctor.hasMany(models.ReportTemplateHasStudy,{foreignKey: 'doctorId',constraints:false});


          }
        }
      }
  );

  return Doctor;
};

