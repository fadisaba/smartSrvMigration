module.exports = function(sequelize, DataTypes) {
    let PatientHasIpp= sequelize.define("PatientHasIpp", {
            patientHasIppId:{
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            establishmentId:{
                type: DataTypes.UUID,
                allowNull: false
            },
            patientHasIppNumero: {
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
            tableName: 'patient_has_ipp',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    PatientHasIpp.belongsTo(models.Patient,{foreignKey: 'patientId'});
                    PatientHasIpp.belongsTo(models.Establishment,{foreignKey: 'establishmentId'});
                }
            }
        }
    );

    return PatientHasIpp;
};
