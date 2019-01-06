module.exports = function(sequelize, DataTypes) {
  let PatientHprim = sequelize.define("PatientHprim", {
          patientHprimId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
          patientHl7Id: {
              type: DataTypes.UUID,
              allowNull: false
          },
          patientHprimNatureAssurance: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimAmoDebutDroit: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          patientHprimAmoFinDroit: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          patientHprimNumImm: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimRangGem: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimRangNaissance: {
              type: DataTypes.STRING,
              allowNull: true,
              defaultValue: '0'
          },
          patientHprimCodeRegime: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimCodeCaisse: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimCodeCentre: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimNaturePices: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimNomAssure: {
              type: DataTypes.STRING,
              allowNull: true
          },   patientHprimNatureExoneration: {
              type: DataTypes.STRING,
              allowNull: true
          },   patientHprimPrenomAssure: {
              type: DataTypes.STRING,
              allowNull: true
          },   patientHprimNumeroAt: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimDateAT: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          patientHprimEmployeurAt: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimAddresseEmployeurAt: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHprimDebutGrossesse: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'patient_hprim',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              PatientHprim.belongsTo(models.PatientHl7,{foreignKey: 'patientHl7Id',constraints: false});
          }
        }
      }
  );

  return PatientHprim;
};
