"use strict";
module.exports = function(sequelize, DataTypes) {
  let BankAccountTransaction = sequelize.define("BankAccountTransaction", {

      bankAccountTransactionId: {
              type: DataTypes.STRING,
              allowNull: false,
              primaryKey: true
          },
          bankAccountId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          rspId: {
              type: DataTypes.UUID,
              allowNull: true
          },
          bankAccountTransactionSimplifiedWording: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          bankAccountTransactionOriginalWording: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          bankAccountTransactionRef: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          bankAccountTransactionDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          bankAccountTransactionApplicationDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          bankAccountTransactionLastUpdate: {
              type: DataTypes.DATE,
              allowNull: true
          },
          bankAccountTransactionDateScraped: {
              type: DataTypes.DATE,
              allowNull: true
          },
          bankAccountTransactionAmount: {
              type: DataTypes.DECIMAL(10, 2),
              allowNull: true
          },
          bankAccountTransactionIsMatched: {
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
        tableName: 'bank_account_transaction',
        paranoid: true,
          classMethods: {
              associate: function (models) {
                  BankAccountTransaction.belongsTo(models.BankAccount,{foreignKey: 'bankAccountId'});
              }
          }
      }
  );
  return BankAccountTransaction;
};
