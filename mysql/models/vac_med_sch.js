"use strict";
module.exports = function(sequelize, DataTypes) {
    let VacMedSch = sequelize.define("VacMedSch", {
            vacMedSchId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            vacMedSchMonthNumber: { // la vacation de l'après midi
                type: DataTypes.INTEGER,
                allowNull: false
            },
            vacMedSchYearNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            vacMedSchIsPublished: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'vac_med_sch',
            paranoid: true,
            classMethods: {
                associate: function(models) {

                    VacMedSch.hasMany(models.VacMed,{foreignKey: 'vacMedSchId'});

                }
            }
        }
    );

    return VacMedSch;
};
