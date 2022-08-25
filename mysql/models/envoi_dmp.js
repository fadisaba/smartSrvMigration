"use strict";
module.exports = function(sequelize, DataTypes) {
    let EnvoiDmp = sequelize.define("EnvoiDmp", {
            envoiDmpId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            siteId: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            reportId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            envoiDmpIdentifiantStructure: { // l'identifiant du structure finess ou rpps rang ou siret
                type: DataTypes.STRING,
                allowNull: false
            },
            envoiDmpRequestUidId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            envoiDmpUniqueId: {// l'identifiant du document envoyé, sera utilisé si nous vou lons remplacer ce document
                type: DataTypes.STRING,
                allowNull: true
            },
            envoiDmpType: { //  1 envoi DMP, 2 Envoi Ms santé,3 Envoi MS santé ps (medecin correspondants)
                type: DataTypes.INTEGER,
                allowNull: false
            },
            envoiDmpEmailDestinatire: {
                type: DataTypes.STRING,
                allowNull: false
            },
            envoiDmpName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            envoiDmpNameLabel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            envoiDmpErrorLabel: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            envoiDmpDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            envoiDmpStatut: { // 0 non envoyé, 1 envoyé, 2 erreur d'envoi
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'envoi_dmp',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    EnvoiDmp.belongsTo(models.Site, {foreignKey: 'siteId'});
                    EnvoiDmp.belongsTo(models.Report, {foreignKey: 'reportId'});
                }
            }
        }
    );
    EnvoiDmp.associate = function(models) {
        EnvoiDmp.belongsTo(models.Site, {foreignKey: 'siteId'});
        EnvoiDmp.belongsTo(models.Report, {foreignKey: 'reportId'});
    };
    return EnvoiDmp;
};
