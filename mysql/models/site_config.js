"use strict";
module.exports = function(sequelize, DataTypes) {
  let SiteConfig = sequelize.define("SiteConfig", {
    siteConfigId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
      siteId: {
          type: DataTypes.BIGINT,
          allowNull: false,
      },
    siteConfigStartHour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    siteConfigEndHour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    siteConfigPyxMode: { // GS : sécurisé, GD :desynchronisé, GG dégradé
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'S'
    },
    siteConfigFseIsChecked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    siteConfigUidSenolog: {
      type: DataTypes.STRING,
      allowNull: true
    },
    siteConfigSenologType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    siteConfigJSDavUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
      siteConfigNchApiPath: {
      type: DataTypes.STRING,
      allowNull: false
    },
      siteConfigPyxPath: {
          type: DataTypes.STRING,
          allowNull: false
      },
      siteConfigPyxirisPath: {
          type: DataTypes.STRING,
          allowNull: false
      },
      siteConfigPyxPort: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      siteConfigPyxirisPort: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      siteConfigPyxNodePort: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
    siteConfigTranscriptionPath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    siteConfigAmoDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    siteConfigAmcDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
      siteConfigPdsMandatory: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },

      siteConfigCotFerieAuto: { // calcul automatique du modificateur F ferié
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      siteConfigCotUrgenceAuto: {// calcul automatique du modificateur U Urgence
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      siteConfigCotEnfantAuto: {// calcul automatique du modificateur E Enfant
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      siteConfigCotNuitAuto: {// calcul automatique du modificateur N Nuit
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      siteConfigCotNuitHeureDebut: { // heure début pour le modificateur  U
          type: DataTypes.TIME,
          allowNull: false
      },
      siteConfigCotNuitHeureFin: { // heure de fin pour le modificateur  U
          type: DataTypes.TIME,
          allowNull: false
      },
      siteConfigCotSupplementAuto: { // Ajouter le supplément d'archivage YYYY600 de facon automatique pour les acte de scann, IRM, Mammo
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
      },
      siteConfigStartTP: {
          type: DataTypes.DATEONLY,
          allowNull: false
      },
      siteConfigEndTP: {
          type: DataTypes.DATEONLY,
          allowNull: false
      },

    active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      }, {
        tableName: 'site_config',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            SiteConfig.belongsTo(models.Site,{foreignKey: 'siteId'});
          }
        }
      }
  );
  return SiteConfig;
};
