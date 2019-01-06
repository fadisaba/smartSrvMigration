"use strict";
module.exports = function(sequelize, DataTypes) {
  let BankAccountConfig = sequelize.define("BankAccountConfig", {
          bankAccountConfigId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4
          },
          paymentMethodId: { // null : ALL
              type: DataTypes.UUID,
              allowNull: true,
                  defaultValue:null
          },
          bankAccountId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          siteId: { // 0 : ALL
              type: DataTypes.BIGINT,
              allowNull: true,
              defaultValue:0
          },
          userId: { // doctor 0 ALL
              type: DataTypes.INTEGER,
              allowNull: true,
              defaultValue:0
          },
          bankAccountConfigTier: {  // 0:All , 1 patient , 2 rego , 3 regc, 4 establishment, 5 ft patient, 6 ft rego,7 ft establishment, 8 Noemie rego,9 Noemie regc
          type: DataTypes.INTEGER,
          allowNull: true,
              defaultValue:0
        },
          bankAccountConfigSecteur: {// le secteur du médecin => possible values :0 ALL , 1 secteur 1,2 secteur 2
              type: DataTypes.INTEGER,
              allowNull: true,
              defaultValue:0
          },
          bankAccountConfigIsForNoemie: {// retour noemi => possible values :false No, true
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue:false
          },

        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'bank_account_config',
        paranoid: true,
          classMethods: {
              associate: function (models) {
                  BankAccountConfig.belongsTo(models.BankAccount,{foreignKey: 'bankAccountId'});
                  BankAccountConfig.belongsTo(models.Site,{foreignKey: 'siteId',constraints:false});
                  BankAccountConfig.belongsTo(models.User,{foreignKey: 'userId',constraints:false});
                  BankAccountConfig.belongsTo(models.PaymentMethod,{foreignKey: 'paymentMethodId',constraints:false});
              }
          }
      }
  );
  return BankAccountConfig;
};
