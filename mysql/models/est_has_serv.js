"use strict";
module.exports = function (sequelize, DataTypes) {
    var  EstHasServ = sequelize.define("EstHasServ", {
        estHasServId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
            },
        establishmentId: {
            type: DataTypes.UUID,
            allowNull: false
            },
        estHasServCode: {
            type: DataTypes.STRING,
            allowNull: true

        },
        estHasServName: {
                type: DataTypes.STRING,
                allowNull: true

            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'est_has_serv',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    EstHasServ.belongsTo(models.Establishment,{foreignKey: 'establishmentId'});
                }
            }
        }
    );
    return EstHasServ;
};
