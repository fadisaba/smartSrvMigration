"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserCps = sequelize.define("UserCps", {
          userCpsId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          userIdTargetOfTeletransmissionAuto: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          siteId: {
              type: DataTypes.BIGINT,
              allowNull: false
          },
          userCpsCodePorteur: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsAddedWihoutPyx: { // la situation a été ajouté sans la lecture de la carte(ajout manuel)
              type: DataTypes.BOOLEAN,
              allowNull: true
          },
          userCpsTeletransmissionAuto: { // si true effectuer une télétransmission automatique pour cette situation
              type: DataTypes.BOOLEAN,
              allowNull: true
          },
          userCpsDerniereEpuration: {
              type: DataTypes.DATE,
              allowNull: true
          },
          userCpsType: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsAdeli: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCle: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsNumero: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsNumeroSituation: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCivilite: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsNom: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsPrenom: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsModeExercice: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsSecteurActivite: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsTypeIdStructure: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsNumeroIdStructure: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCleIdStructure: {
              type: DataTypes.TEXT,
              allowNull: true
          }, userCpsRaisonSocialeStructure: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCodeSpecialite: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsSpecialite: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCodeConvention: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsConvention: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsZoneTarifaire: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCodeZoneTarifaire: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsZoneIk: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCodeZoneIk: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsAgrement: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCodeAgrement: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCode2Agrement: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsCode3Agrement: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsHabilitationFact: {
              type: DataTypes.TEXT,
              allowNull: true
          },
          userCpsHabilitationLot: {
              type: DataTypes.TEXT,
              allowNull: true
          },

      active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_cps',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserCps.belongsTo(models.User,{foreignKey: 'userId'});
            //  UserCps.belongsTo(models.User,{foreignKey: 'userIdTargetOfTeletransmissionAuto',constraints:false});
              UserCps.belongsTo(models.Site,{foreignKey: 'siteId'});
          }
        }
      }
  );
  return UserCps;
};
