"use strict";
module.exports = function(sequelize, DataTypes) {
    let Coordonnee= sequelize.define("Coordonnee", {
            id_coordonnee: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_commune: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            adr_ligne1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            adr_ligne2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cedex: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telephone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            cellulaire: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fax: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
            type: DataTypes.STRING,
            allowNull: true
            },
            consentement_email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            consentement_sms: {
                type: DataTypes.STRING,
                allowNull: true
            },
            commentaire: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'coordonnee',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {
                    Coordonnee.belongsTo(modelsEris.Commune,{foreignKey: 'id_commune'});
                }

            }
        }
    );
    return Coordonnee;
};
