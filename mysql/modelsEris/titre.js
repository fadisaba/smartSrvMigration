"use strict";
module.exports = function(sequelize, DataTypes) {
    let Titre= sequelize.define("Titre", {
            id_titre: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            code_titre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            titre_reduit: {
                type: DataTypes.STRING,
                allowNull: true
            },
            titre: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'titre',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {

                }

            }
        }
    );
    return Titre;
};
