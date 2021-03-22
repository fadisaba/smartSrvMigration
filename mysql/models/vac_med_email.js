"use strict";
module.exports = function(sequelize, DataTypes) {
  let VacMedEmail = sequelize.define("VacMedEmail", {
          vacMedEmailId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
          vacMedEmailDate: {
              type: DataTypes.DATEONLY,
              allowNull: false
          },
          vacMedId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          siteId: {
              type: DataTypes.BIGINT,
              allowNull: false
          },
          roomId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          vacMedEmailMatInitialUserId: {// la vacation du matin
              type: DataTypes.INTEGER,
              allowNull: true
          },
          vacMedEmailMatFinalUserId: {// la vacation du matin
              type: DataTypes.INTEGER,
              allowNull: true
          },
          vacMedEmailApremInitialUserId: {// la vacation de l après midi
              type: DataTypes.INTEGER,
              allowNull: true
          },
          vacMedEmailApremFinalUserId: {// la vacation du matin
              type: DataTypes.INTEGER,
              allowNull: true
          },

          vacMedEmailIsSent: {
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
        tableName: 'vac_med_email',
        paranoid: true,
        classMethods: {
          associate: function(models) {

          }
        }
      }
  );

  return VacMedEmail;
};