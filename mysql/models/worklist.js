module.exports = function(sequelize, DataTypes) {
  var Worklist = sequelize.define("Worklist", {
        worklistId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        visitId: {
          type: DataTypes.UUID,
          allowNull: false
        },
          patientId: {
              type: DataTypes.UUID,
              allowNull: false
          },
        siteId: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
        worklistStudies: {
          type: DataTypes.STRING,
          allowNull: true
        },
          worklistStudiesIds: {
              type: DataTypes.STRING,
              allowNull: true
          },
        worklistDoctor: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklistMedPresc: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklistMedRecipient: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklistDictationsNb: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        worklistLastDictationStatus: {// sera utilisé pour les dictée priorisé
          type: DataTypes.INTEGER,
          allowNull: true
        },
        worklistCrsNb: {
          type: DataTypes.INTEGER,
          allowNull: true,
            defaultValue: 0
        },
        worklistLastCrStatus: {
          type: DataTypes.INTEGER,
          allowNull: true,
            defaultValue: 0
        },

        worklistFTNum: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklistPatientInfo: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklistVisitInfo: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklistVisitComment: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklistPatientInfoAlertLevel: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        worklistVisitInfoAlertLevel: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        worklistPriseEnCharge: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklistPatientDu: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true
        },
        worklisPatientPaid: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true
        },
        worklistFtDu: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true
        },
        worklistFtPaid: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true
        },
        worklisCrEmailedTo: {
          type: DataTypes.STRING,
          allowNull: true
        },
        worklisCrMailedTo: {
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
        tableName: 'worklist',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            Worklist.belongsTo(models.Visit,{foreignKey: 'visitId'});
              Worklist.belongsTo(models.Patient,{foreignKey: 'patientId'});
              Worklist.belongsTo(models.Site,{foreignKey: 'siteId'});
          }
        }
      }
  );

  return Worklist;
};