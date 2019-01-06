"use strict";
module.exports = function(sequelize, DataTypes) {
  let VisitBalance = sequelize.define("VisitBalance", {
          visitBalanceId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
          },
          visitId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          visitBalancePatientAmount: { // le montant de remise est  déduit du montant de la part patient "visitBalancePatientAmount"
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalancePatientPaidAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalancePatientLossAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRegoAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRegoPaidAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRegoLossAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },

          visitBalanceRegcAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRegcPaidAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRegcLossAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRemiseAmount: { // juste pour information et ne doit pas rentré dans les calcul puisqu'il est déjà déduit du montant de la part patient
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalancePatientFtAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalancePatientFtPaidAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalancePatientFtLossAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRegoFtAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRegoFtPaidAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRegoFtLossAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceEstablishmentFtAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceEstablishmentFtPaidAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceEstablishmentFtLossAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: false,
              defaultValue:0
          },
          visitBalanceRemiseFtAmount: {
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
        tableName: 'visit_balance',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              VisitBalance.belongsTo(models.Visit,{foreignKey: 'visitId'});
          }
        }
      }
  );
  return VisitBalance;
};

