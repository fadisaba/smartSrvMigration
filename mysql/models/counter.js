"use strict";
module.exports = function(sequelize, DataTypes) {
    let Counter = sequelize.define("Counter",{
            counterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            counterName: {
                type: DataTypes.STRING,
                allowNull: false
            },
        counterValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'counter',
            paranoid: true

        }
    );
    return Counter;
};

