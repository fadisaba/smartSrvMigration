"use strict";
module.exports = function(sequelize, DataTypes) {
    let GroupeExamen= sequelize.define("GroupeExamen", {
            IDE_GROUPE_EXAMEN: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NOM: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'GROUPE_EXAMEN',
            paranoid: false,
            classMethods: {
                associate: function(modelsSir5) {
                    GroupeExamen.hasMany(modelsSir5.Nomenclature,{foreignKey: 'IDE_GROUPE_EXAMEN'});
                }
            }
        }
    );
    return GroupeExamen;
};