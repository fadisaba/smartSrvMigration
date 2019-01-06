"use strict";
module.exports = function(sequelize, DataTypes) {
  let BankAccount = sequelize.define("BankAccount", {
          bankAccountId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
          },
          bankId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          bankAccountCode: {
          type: DataTypes.STRING,
          allowNull: false
        },
          bankAccountName: {
          type: DataTypes.STRING,
          allowNull: true
        },
          bankAccountIban: {
              type: DataTypes.STRING,
              allowNull: true
          },
          bankAccountBic: {
              type: DataTypes.STRING,
              allowNull: true
          },
          bankAccountUserName: { //  utilisé avec l'api de récupération de transaction bancaire
              type: DataTypes.STRING,
              allowNull: true
          },
          bankAccountUserPassword: { //  utilisé avec l'api de récupération de transaction bancaire
              type: DataTypes.STRING,
              allowNull: true
          },

          bankAccountLastSynchroniseBankAccount: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          bankAccountSychronizationDelay: { //  le nombre de jours entre la date du jour la date max pour faire synchronisation à faire
              type: DataTypes.INTEGER,
              allowNull: true
          },
          bankAccountAssociatedAccountNumber: { // the associated account number=> needed when exporting to accounting software
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
        tableName: 'bank_account',
        paranoid: true,
          classMethods: {
              associate: function (models) {
                  BankAccount.hasMany(models.Payment, {foreignKey: 'bankAccountId',constraints: false});
                  BankAccount.hasMany(models.BankAccountConfig, {foreignKey: 'bankAccountId'});
                  BankAccount.hasMany(models.BankAccountTransaction, {foreignKey: 'bankAccountId'});
                  BankAccount.belongsTo(models.Bank,{foreignKey: 'bankId'});
              }
          }
      }
  );
  return BankAccount;
};
