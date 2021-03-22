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
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          patientHl7VisitNumber: { // le numéro de séjour
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7AccountNumber: { // le numéro du dossier administratif avec le hl7Pam, peut regrouper plusieurs numero de séjour
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7UfHebergement: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7UfResponsable: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7Lit: {
              type: DataTypes.STRING,
              allowNull: true
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
        patientHl7LName: { // le nom de l'usage
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
          patientHl7SecondName: { // le nom de naissance
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
          patientHl7AdmissionStatus: {
            // pour le hprim :  Admission status   : OP sortie  IP entrée ER : entrée URGENCE
              // pour le hl7PAm :  patientClass   :
              // E Emergency Urgences
              // I Inpatient Hospitalisé
              // O Outpatient Externe : consultation de patient externe
              // P Preadmit Préadmission
              // R Recurring
              // Patient
              // Séance
              // D Hospitalisation de jour
              // M Hospitalisation de nuit
              // W Hospitalisation de semaine
              // S Psychiatrie
              // K Nouveau né
              // U Unknown Inconnu
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7DebutAmo: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          patientHl7FinAmo: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },

          patientHl7RangGem: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7Regime: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7Caisse: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7Centre: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7NatureAssurance: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7NaturePieces: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7CodeExoneration: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7NomAssure: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7PrenomAssure: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientHl7IsSortie: {// le patient est sortie de l'hopital
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          patientHl7Chambre: { // chambre
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
              PatientHl7.belongsTo(models.Establishment, {foreignKey: 'establishmentId'});
          }
        }
      }
  );

  return PatientHl7;
};
