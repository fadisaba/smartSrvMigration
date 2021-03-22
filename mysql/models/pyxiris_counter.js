"use strict";
module.exports = function(sequelize, DataTypes) {
    let PyxirisCounter= sequelize.define("PyxirisCounter",{
            pyxirisCounterId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
        pyxirisCounterCounterValue: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'pyxiris_counter',
            paranoid: true,
             classMethods: {
           associate: function(models) {
            }
            }
        }
    );
    return PyxirisCounter;
};