"use strict";
module.exports = function(sequelize, DataTypes) {
    let StudyVisitHasActe = sequelize.define("StudyVisitHasActe",{
        studyVisitHasActeId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            studyVisitId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            studyActeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            visitId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            studyCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            studyVisitHasActeModificators: { // les modificateur
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeAcceptedModificators: { // les modificateurs possibles
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeQuantity: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            studyVisitHasActeUnitPrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: '0.00'
            },
            studyVisitHasActeAmount: { // montant de l'acte
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: '0.00'
            },
            studyVisitHasActeAmountDepassement: { // le montant de dépassement
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue: '0.00'
            },
            studyVisitHasActeAssociationNonPrevu: { // code association non prévu
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeCode: { // code de l'acte ccam
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeCodeGroupement: { // code groupement de l'acte ccam
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeType: { // le type de l'acte : 1 ccam, 2 : ngap, 3 hors nomenclature
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            studyVisitHasActeDepense: { // qualificatif de dépense
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeExoParticuliere: { // exonération particulière
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeSoumisEntentePrealable: { // si acte est soumis à entente préalable
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeCodeAccEntentePrealable: { // code de l'accord de l'entente préalable
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeDateEntentePrealable: { // date de l'envoi de l'entente préalable
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            studyVisitHasActeRefundingCode: { //C1:Acte remboursableC2:Acte non remboursableC3:Acte remboursable ou non suivant circonstances
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeExceptionalRefunding: { // remboursement exceptionnel
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeIsHoliday: { // il s'agit d'un jour férie
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeIsEmergency: { // acte en urgence
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeIsNight: { // une acte effectué la nuit
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeIsComparatif: { // modificateur C a mettre, remplacé par le modificateur B pour bloc
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeIsPlatre: { // Modificateur D a mettre
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeSuppCharge: { // le supplement de charge
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeIsDomicile: { // acte effectué à domicile
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeIsAld: { // en rapport avec l'ALD
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeIsMultiple: { // acte multiple
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            studyVisitHasActeDenombrement: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            studyVisitHasActeCodeAffine: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeCoefficient: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            studyVisitHasActeExtensionDoc: { // code de l'extention documentaire
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeMigrationId: {
                type: DataTypes.STRING,
                allowNull: true
            },
            studyVisitHasActeDateActe: { // date de la réalisation de l'acte
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'study_visit_has_acte',
            paranoid: true,
            classMethods: {
                associate: function(models) {
                    StudyVisitHasActe.belongsTo(models.StudyVisit,{foreignKey: 'studyVisitId'});
                    StudyVisitHasActe.belongsTo(models.StudyActe,{foreignKey: 'studyActeId'});
                    StudyVisitHasActe.belongsTo(models.Visit,{foreignKey: 'visitId'});
                }
            }
        }
    );
    return StudyVisitHasActe;
};
