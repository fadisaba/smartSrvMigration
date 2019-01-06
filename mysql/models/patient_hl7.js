module.exports = function(sequelize, DataTypes) {
  let PatientHl7 = sequelize.define("PatientHl7", {
        patientHl7Id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
          establishmentId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          patientHl7Sender: {
            type: DataTypes.STRING,
              allowNull: false
          },
          patientHl7FileName: {
              type: DataTypes.STRING,
              allowNull: false
          },
          patientHl7Error: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7Date: {
              type: DataTypes.DATE,
              allowNull: true
          },
          patientHl7VisitNumber: {
              type: DataTypes.STRING,
              allowNull: false
          },
          patientHl7IPP: {
              type: DataTypes.STRING,
              allowNull: false
          },
          patientHl7Search: {
          type: DataTypes.STRING,
          allowNull: false
        },
        patientHl7Fname: {
          type: DataTypes.STRING,
          allowNull: true,
            set: function(val) {
                let fnameArray=val.split(" ");
                let result="";
                fnameArray.forEach(function(_item)
                {
                    _item=_item.toLowerCase();
                    result+=_item.charAt(0).toUpperCase() + _item.substr(1)+" ";
                });
                this.setDataValue('patientHl7Fname', result.trim());
            }
        },
        patientHl7LName: {
          type: DataTypes.STRING,
          allowNull: true,
            set: function(val) {
                this.setDataValue('patientHl7LName', val.toUpperCase());
            }
        },
        patientHl7Gender: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientHl7Title: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientHl7Birthday: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
          patientHl7BirthName: {
              type: DataTypes.STRING,
              allowNull: true
          },
        patientHl7SocialNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientHl7SocialKey: {
          type: DataTypes.CHAR(2),
          allowNull: true
        },
        patientHl7PhoneNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientHl7MobileNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientHl7Email: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientHl7ZipCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientHl7Address: {
          type: DataTypes.STRING,
          allowNull: true
        },
          patientHl7City: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7DateMouv: { // la date du mouvement en norme hprim
              type: DataTypes.DATE,
              allowNull: true
          },
          patientHl7Medecins: { // les medecins associés au patient en norme hprim séparés par un ^
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7AdmissionStatus: { // Admission status in hprim  : OP sortie  IP entrée ER : entrée URGENCE
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
        tableName: 'patient_hl7',
        paranoid: true,
        classMethods: {
          associate: function(models) {
               PatientHl7.hasOne(models.PatientHprim, {foreignKey: 'patientHl7Id', constraints: false});
              PatientHl7.belongsTo(models.Establishment, {foreignKey: 'establishmentId'});
          }
        }
      }
  );

  return PatientHl7;
};
