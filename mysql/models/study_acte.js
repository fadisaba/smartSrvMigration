"use strict";
module.exports = function(sequelize, DataTypes) {
  var StudyActe = sequelize.define("StudyActe", {
        studyActeId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        studyId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
          establishmentId: {
            type: DataTypes.UUID,
              allowNull: true
          },
        studyActeCode: { // 1 CCAM ,2 ngap,3 hors nomenclature,
          type: DataTypes.STRING,
          allowNull: true
        },
          studyActeCodeGroupement: {
              type: DataTypes.STRING,
              allowNull: true
          },
        studyActeType: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        studyActeAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },

        studyActeAssociationNonPrevu: { // association non prévu
          type: DataTypes.STRING,
          allowNull: true
        },
        studyActeModificators: { // les modificateurs
          type: DataTypes.STRING,
          allowNull: true
        },
        studyActeDepense: { // qualificatif de dépense
          type: DataTypes.STRING,
          allowNull: true
        },
        studyActeQuantity: { // quantité des actes
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1
        },
        studyActeAdditionalAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
          defaultValue: '0.00'
        },
          studyActeAdditionalOptamAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true,
              defaultValue: '0.00'
          },
          studyActeAdditionalSecteur1Amount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true,
              defaultValue: '0.00'
          },
          studyActeAdditionalSecteur2Amount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true,
              defaultValue: '0.00'
          },
        studyActeAcceptedModificators: { // les modificateurs possibles pour l'acte
          type: DataTypes.STRING,
          allowNull: true
        },
        studyActeCoefficient: {
          type: DataTypes.INTEGER,
          allowNull: true,
            defaultValue: 1
        },
        studyActeEntentePrealable: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        studyActeRefundingCode: { //C1:Acte remboursableC2:Acte non remboursableC3:Acte remboursable ou non suivant circonstances
          type: DataTypes.STRING,
          allowNull: true
        },
          studyActeExonerationParticuliere: {
              type: DataTypes.STRING,
              allowNull: true,
              defaultValue: '0'
          },
          studyActeExtensionDocumentaire: {
              type: DataTypes.STRING,
              allowNull: true
          },
          studyActeMigrationId: {
              type: DataTypes.STRING,
              allowNull: true
          },
          studyActeMigrationId2: {
              type: DataTypes.STRING,
              allowNull: true
          },
          studyActeMigrationId3: {
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
        tableName: 'study_acte',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              StudyActe.belongsTo(models.Study,{foreignKey: 'studyId'});
          }
        }
      }
  );

  return StudyActe;
};
