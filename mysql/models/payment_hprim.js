module.exports = function(sequelize, DataTypes) {
    let PaymentHprim = sequelize.define("PaymentHprim", {
            paymentHprimId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            establishmentId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            paymentHprimSender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            paymentHprimFileName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            paymentHprimVisitNumber: { // le numéro de séjour
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentHprimAccountNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentHprimRang: {
                type: DataTypes.STRING,
                allowNull: false
            },
            paymentHprimAmount: {
                type:DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            paymentHprimDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },

            paymentHprimMode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentHprimIPP: {
                type: DataTypes.STRING,
                allowNull: false
            },
            paymentHprimPatientSearch: {
                type: DataTypes.STRING,
                allowNull: false
            },
            paymentHprimPatientFname: {
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
                    this.setDataValue('paymentHprimPatientFname', result.trim());
                }
            },
            paymentHprimPatientLName: { // le nom de l'usage
                type: DataTypes.STRING,
                allowNull: true,
                set: function(val) {
                    this.setDataValue('paymentHprimPatientLName', val.toUpperCase());
                }
            },

            paymentHprimPatientGender: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentHprimPatientBirthday: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            paymentHprimPatientAdmissionStatus: {
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
            paymentHprimVisitPacsId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            paymentHprimIsIgnored: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },

            paymentHprimIsPointed: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },

            paymentHprimPointedDate: {
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
            tableName: 'payment_hprim',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                      PaymentHprim.belongsTo(models.Establishment, {foreignKey: 'establishmentId'});
                }
            }
        }
    );

    return PaymentHprim;
};
