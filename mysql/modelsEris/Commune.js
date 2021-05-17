"use strict";
module.exports = function(sequelize, DataTypes) {
    let Commune= sequelize.define("Commune", {
            id_commune: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_pays: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            code_postal: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ville: {
                type: DataTypes.STRING,
                allowNull: true
            },
            modifiable: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'commune',
            paranoid: false,
            classMethods: {
                associate: function(modelsEris) {

                }

            }
        }
    );
    return Commune;
};
