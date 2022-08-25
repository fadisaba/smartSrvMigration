"use strict";
module.exports = function(sequelize, DataTypes) {
    let InvoiceHasFse = sequelize.define("InvoiceHasFse", {
            invoiceHasFseId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            invoiceHasFseType: {// 1 FSE, 2 B2(pour les forfaits techniques).
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoiceId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            invoiceHasFseStatus: {// le statut de la FSE ou du B2 (B2 pour les forfaits techniques) F pour  facturé, A: aquité, S pour envoyé, X :erreur, SE : Securisé
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseDreStatus: {// le statut de la Dre  E=DRE détruit avant envoi,G=DRE créé (ou lot de DRE), T=envoyé DRE, B=acquitté (DRE ou lot de DRE) Y=erreur (DRE ou lot de DRE)
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseMode: {// GS:Sécurisé,SE sécurisé unitairement,GD:Désynchronisé,GG:Dégradé, GI Non sécurisé (pour les FT B2)
                type: DataTypes.STRING,
                allowNull: false
            },
            invoiceHasFseNumber: { // le numéro du FSE ou B2 dans pyxvital
                type: DataTypes.STRING,
                allowNull: false
            },
            invoiceHasFseLotNumber: { // le numéro de lot de la FSE ou du B2 dans pyxvital
                type: DataTypes.STRING,
                allowNull: true
            },
            invoiceHasFseDateMiseEnLot: { // la date de mise en lot de ka FSE ou du B2
                type: DataTypes.DATEONLY,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseLotDreNumber: { // le numéro de lot du DRE de la FSE dans pyxvital
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseNumeroFacturation: { // le numéro de facturation
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseRefDossier: { // il s'agit d'une référence de la consultation que nous pouvons envoyer à pyx pour ajouter à la FSE
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseDateTeletransmission: {// date télétransmission des FSE
                type: DataTypes.DATEONLY,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseDateDreTeletransmission: { // date télétransmission des DRE
                type: DataTypes.DATEONLY,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseDateRetourNoemi: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseErreurNoemi: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseErreurNoemiTraite: { // l'erreur de retour noemi a été traité manuellement par l('utilisateur
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            invoiceHasFseErreurNoemiComment: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:null
            },
            invoiceHasFseAmountNoemiRego: { // récupéré depuis les retours noemie
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue:0
            },
            invoiceHasFseAmountNoemiRegc: {  // récupéré depuis les retours noemie
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue:0
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'invoice_has_fse',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    InvoiceHasFse.hasMany(models.InvoicefseHasFt, {foreignKey: 'invoiceHasFseId'});
                    InvoiceHasFse.belongsTo(models.Invoice,{foreignKey: 'invoiceId'});

                }
            }
        }
    );
    return InvoiceHasFse;
};
