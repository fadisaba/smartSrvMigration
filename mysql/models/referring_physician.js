"use strict";
module.exports = function (sequelize, DataTypes) {
    var ReferringPhysician = sequelize.define("ReferringPhysician", {
            referringPhysicianId: {
                type: DataTypes.UUID,
                //  allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            cityId: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            referringPhysicianFName: {
                type: DataTypes.STRING,
                allowNull: true,
                set: function (val) {
                    var fnameArray = val.split(" ");
                    var result = "";
                    fnameArray.forEach(function (_item) {
                        _item = _item.toLowerCase();
                        result += _item.charAt(0).toUpperCase() + _item.substr(1) + " ";
                    });
                    this.setDataValue('referringPhysicianFName', result.trim());
                }
            },
            referringPhysicianLName: {
                type: DataTypes.STRING,
                allowNull: true,
                set: function (val) {
                    this.setDataValue('referringPhysicianLName', val.toUpperCase());

                }
            },
            referringPhysicianSearch: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysicianGender: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            referringPhysicianTitle: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            referringPhysicianZipCode: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysicianAddress: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysicianPhoneNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysicianFaxNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysicianEmail: {
                type: DataTypes.STRING,
                allowNull: true
            },
            referringPhysicianInvoicingNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referringPhysicianSpeciality: {
            type: DataTypes.STRING,
            allowNull: true
        },
            referringPhysicianMigrationId: {
            type: DataTypes.STRING,
            allowNull: true
        },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            tableName: 'referring_physician',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    ReferringPhysician.hasMany(models.Patient, {foreignKey: 'referringPhysicianId', constraints: false});
                    ReferringPhysician.hasMany(models.VisitHasRph, {foreignKey: 'referringPhysicianId'});
                    ReferringPhysician.belongsTo(models.City, {foreignKey: 'cityId', constraints: false});
                }
            }
        }
    );

    return ReferringPhysician;
};
