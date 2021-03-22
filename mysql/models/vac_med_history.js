"use strict";
module.exports = function(sequelize, DataTypes) {
  let VacMedHistory = sequelize.define("VacMedHistory", {
          vacMedHistoryId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
          vacMedHistoryInsertDate: {
              type: DataTypes.DATEONLY,
              allowNull: false
          },
          vacMedId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          vacMedGroupId: { // type de la vacation du matin
              type: DataTypes.UUID,
              allowNull: false
          },
          vacMedTypeId: {
              type: DataTypes.UUID,
              allowNull: true
          },
          vacMedTypeAMId: { // type vacation après midi
              type: DataTypes.UUID,
              allowNull: true
          },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
          siteId: {
              type: DataTypes.BIGINT,
              allowNull: false
          },
          monthNumber: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          yearNumber: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          vacMedDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          vacMatUserId: {// la vacation du matin
              type: DataTypes.INTEGER,
              allowNull: true
          },
          vacMatUpdateDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          vacAMUpdateDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
          vacAMUserId: { // la vacation de l'après midi
              type: DataTypes.INTEGER,
              allowNull: true
          },
          vacMatUserInitiales: {// la vacation du matin
              type: DataTypes.STRING,
              allowNull: true
          },
          vacAMUserInitiales: {// la vacation de l'après midi
              type: DataTypes.STRING,
              allowNull: true
          },
          vacMatPoids: {
              type: DataTypes.INTEGER,
              allowNull: false,
              defaultValue: 0
          },
          vacAMPoids: {// la vacation de l'après midi
              type: DataTypes.INTEGER,
              allowNull: false,
              defaultValue: 0
          },
          vacMatInfo: {
              type: DataTypes.STRING,
              allowNull: true
          },
          vacAMInfo: {
              type: DataTypes.STRING,
              allowNull: true
          },
          vacMatColor: {
              type: DataTypes.STRING,
              allowNull: true
          },
          vacAMColor: {
              type: DataTypes.STRING,
              allowNull: true
          },
          vacMedIsGarde: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          vacMedDoublonAutoriseMatin: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          vacMedDoublonAutoriseAprem: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          vacMatComment: {// la vacation du matin
              type: DataTypes.STRING,
              allowNull: true
          },
          vacAMComment: {// la vacation de l'apres midi
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
        tableName: 'vac_med_history',
        paranoid: true,
        classMethods: {
          associate: function(models) {

          }
        }
      }
  );

  return VacMedHistory;
};
