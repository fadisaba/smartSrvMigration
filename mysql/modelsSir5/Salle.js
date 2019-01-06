"use strict";
module.exports = function(sequelize, DataTypes) {
    let Salle= sequelize.define("Salle", {
            IDE_SALLE: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            IDE_MANIP: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            IDE_SITE: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            CODE: {
                type: DataTypes.STRING,
                allowNull: true
            },
            LIBELLE: {
                type: DataTypes.STRING,
                defaultValue: null

            }
        },
        {
            tableName: 'SALLE',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    Salle.belongsTo(modelsSir5.Manipulateur,{foreignKey: 'IDE_MANIP'});
                    Salle.belongsTo(modelsSir5.Site,{foreignKey: 'IDE_SITE'});

                    Salle.hasMany(modelsSir5.Examen,{foreignKey: 'IDE_SALLE'});

                }
            }
        }
    );

    return Salle;
};
