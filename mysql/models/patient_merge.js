module.exports = function(sequelize, DataTypes) {
  let PatientMerge = sequelize.define("PatientMerge", {
        patientMergeId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
          patientMergeTableId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          patientMergeTableName: {
            type: DataTypes.STRING,
              allowNull: false
          },
          patientMergeCurrentPatientId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          patientMergePreviousPatientId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          patientMergeDate: {
              type: DataTypes.DATE,
              allowNull: true
          },

        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'patient_merge',
        paranoid: true,
        classMethods: {
          associate: function(models) {
          }
        }
      }
  );

  return PatientMerge;
};
