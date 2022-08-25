"use strict";
module.exports = function(sequelize, DataTypes) {
    let Rating = sequelize.define("Rating", {
            ratingId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            patientId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            siteId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            ratingCode: {
                type: DataTypes.UUID,
                allowNull: false
            },
            ratingValue: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ratingText: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ratingResponse: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ratingDate: {
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
            tableName: 'rating',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    Rating.belongsTo(models.Patient, {foreignKey: 'patientId'});
                }
            }
        }
    );

    return Rating;
};
