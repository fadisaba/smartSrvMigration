"use strict";
module.exports = function(sequelize, DataTypes) {
    let Commune= sequelize.define("Commune", {
            IDE_COMMUNE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            CODE_POSTAL: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            COMMUNE: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            PAYS: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'COMMUNE',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Commune.hasMany(modelsSir5.Adresse,{foreignKey: 'IDE_COMMUNE'});
                }
            }
        }
    );

    return Commune;
};
