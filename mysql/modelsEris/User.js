"use strict";
module.exports = function(sequelize, DataTypes) {
    let User= sequelize.define("User", {
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_user_profil: {
                type: DataTypes.INTEGER,
            },
            login: {
                type: DataTypes.STRING,
                allowNull: true
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: true
            },
            prenom: {
                type: DataTypes.STRING,
                allowNull: true
            } ,
            obsolete: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'user',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {

                }

            }
        }
    );
    return User;
};
