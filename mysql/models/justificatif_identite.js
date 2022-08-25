"use strict";
module.exports = function(sequelize, DataTypes) {
    let JustificatifIdentite = sequelize.define("JustificatifIdentite", {
            justificatifIdentiteId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            siteId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            justificatifIdentiteCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            justificatifIdentiteLabel: {
                type: DataTypes.STRING,
                allowNull: true
            },

            justificatifIdentiteOrder: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            justificatifIdentiteNiveauConfiance: {//1 haut,2 : bas
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1

            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'justificatif_identite',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    JustificatifIdentite.belongsTo(models.Site, {foreignKey: 'siteId'});
                }
            }
        }
    );
    JustificatifIdentite.associate = function(models) {
        JustificatifIdentite.belongsTo(models.Site, {foreignKey: 'siteId'});
    };
    return JustificatifIdentite;
};
