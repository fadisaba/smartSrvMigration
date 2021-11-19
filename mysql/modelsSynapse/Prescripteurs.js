"use strict";
module.exports = function(sequelize, DataTypes) {
    let Prescripteurs= sequelize.define("Prescripteurs", {
            PRESCRIPTEURID: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            PRESCRIPTEURNOM: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PRESCRIPTEURPRENOM: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PRESCRIPTEURNOMPRENOM: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURSPECIALITES: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURADRESSE1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURADRESSE2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURCOMMUNECP: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURCOMMUNEID: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PRESCRIPTEURTEL: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURFAX: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURPORTABLE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEUREMAIL: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEURAPICRYPT: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PRESCRIPTEUR_EST_FUSIONNE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            PRESCRIPTEUR_NUMERO: {
                type: DataTypes.STRING,
                allowNull: true
            },
            PRESCRIPTEUR_COMMENTAIRE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            DELETED: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: 'PRESCRIPTEURS',
            paranoid: false,
            classMethods: {
                associate: function(modelsSynapse) {
                }
            }
        }
    );
    return Prescripteurs;
};
