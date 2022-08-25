"use strict";
module.exports = function(sequelize, DataTypes) {
    let Annsante = sequelize.define("Annsante", {
            annsanteId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            annsanteIdentifiantPP: {
                type: DataTypes.STRING,
                allowNull: false
            },
            annsanteIdentificationNationalePP: {
                type: DataTypes.STRING,
                allowNull: false
            },
        /*
         case "1":
                           civilite="Mr.";
                           break;
                       case "2":
                           civilite="Mme.";
                           break;
                       case "3":
                           civilite="Mlle.";
                           break;
                       case "4":
                           civilite="Enfant";
                           break;
         */
            annsanteCodeCivilite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteLibelleCivilite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteCodeCiviliteExercice: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteLibelleCiviliteExercice: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteNom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsantePrenom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteLibelleProfession: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteRaisonSocialeSite: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteCp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteCommune: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteCedex: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteAdresse: {
                type: DataTypes.STRING,
                allowNull: true
            },
            annsanteIdentifantTechniqueStrcture: {
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
            tableName: 'annsante',
            paranoid: true,
            associate: function (models) {
            }
        }
    );

    return Annsante;
};
