"use strict";
module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
        patientId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        cityId: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        referringPhysicianId: {
            type: DataTypes.UUID,
            allowNull: true
    },
        patientMigrationId: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientSearch: {
          type: DataTypes.STRING,
          allowNull: false
        },
        patientFname: {
          type: DataTypes.STRING,
          allowNull: true,
            set: function(val) {
                var fnameArray=val.split(" ");
                var result="";
                fnameArray.forEach(function(_item)
                {
                    _item=_item.toLowerCase();
                    result+=_item.charAt(0).toUpperCase() + _item.substr(1)+" ";
                });
                this.setDataValue('patientFname', result.trim());
            }
        },
        patientLName: {
          type: DataTypes.STRING,
          allowNull: true,
            set: function(val) {
                this.setDataValue('patientLName', val.toUpperCase());

            }
        },
        patientGender: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        patientTitle: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientIns: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientBirthday: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
          patientBirthName: {
              type: DataTypes.STRING,
              allowNull: true
          },
        patientSocialNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientSocialKey: {
          type: DataTypes.CHAR(2),
          allowNull: true
        },
            patientPhoneNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientMobileNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientFaxNumber: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientEmail: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientIsMerged: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        patientIsVip: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        patientZipCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        patientAddress: {
          type: DataTypes.STRING,
          allowNull: true
        },
          patientPregnant:{
              type: DataTypes.BOOLEAN,
              defaultValue: false
          },
          patientPacsId:{
              type: DataTypes.STRING,
              allowNull: true
          },
          patientNbVisit: {
              type: DataTypes.INTEGER,
              defaultValue: 0
          },

          patientInsKey: {
              type: DataTypes.CHAR(3),
              allowNull: true
          },
          patientAllergies: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientMigrationField: {//used with migration to use temporary data
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
        tableName: 'patient',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              Patient.hasMany(models.Visit,{foreignKey: 'patientId'});
              Patient.hasMany(models.Info,{foreignKey: 'patientId'});
              Patient.hasMany(models.Worklist,{foreignKey: 'patientId'});
              Patient.hasMany(models.Rego, {foreignKey: 'patientId'});
              Patient.hasMany(models.Regc, {foreignKey: 'patientId'});
              Patient.hasMany(models.PatientDoc, {foreignKey: 'patientId'});
              Patient.hasMany(models.Appointment, {foreignKey: 'patientId'});
              Patient.hasMany(models.PatientHasIpp, {foreignKey: 'patientId'});
              Patient.belongsTo(models.City,{foreignKey: 'cityId',constraints:false});
              Patient.belongsTo(models.ReferringPhysician,{foreignKey: 'referringPhysicianId',constraints: false});

          }
        }
      }
  );

  return Patient;
};
