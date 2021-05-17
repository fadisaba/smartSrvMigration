"use strict";
module.exports = function(sequelize, DataTypes) {
    let Ps= sequelize.define("Ps", {
            id_ps: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            code: {
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
            num_nat: {
                type: DataTypes.STRING,
                allowNull: true
            } ,
            type_ps: {
                type: DataTypes.STRING,
                allowNull: true
            } ,
            obsolete: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'ps',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {

                }

            }
        }
    );
    return Ps;
};
