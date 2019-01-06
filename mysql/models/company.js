"use strict";
module.exports = function(sequelize, DataTypes) {
  let Bank = sequelize.define("Bank", {
          bankId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
          },
          cityId: {
              type: DataTypes.INTEGER,
              defaultValue: 0
          },
        bankCode: {
          type: DataTypes.STRING,
          allowNull: false
        },
          bankName: {
          type: DataTypes.STRING,
          allowNull: true
        },
          bankZipCode: {
              type: DataTypes.STRING,
              allowNull: true
          },
          bankAddress: {
              type: DataTypes.STRING,
              allowNull: true
          },
          bankPhoneNumber: {
              type: DataTypes.STRING,
              allowNull: true
          },
          bankFaxNumber: {
              type: DataTypes.STRING,
              allowNull: true
          },
          bankIsForCheckOnly: {// to enter check payment only
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
        tableName: 'bank',
        paranoid: true,
          associate: function (models) {
              Bank.hasMany(models.BankAccount, {foreignKey: 'bankId'});
          }
      }
  );

  return Bank;
};
