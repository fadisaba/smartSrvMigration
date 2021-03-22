"use strict";
module.exports = function (sequelize, DataTypes) {
    let Product = sequelize.define("Product", {
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            productCIP: { // l'identifiant du produit: est sur 13 caractère
                type: DataTypes.STRING,
                allowNull: true
            },
           productName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productConsumerUnit: { // unité de consomation  Boite, - FL :flecon  - ML
                type: DataTypes.STRING,
                allowNull: true

            },
            productMeasureUnit: { // unité de mesure - ML
                type: DataTypes.STRING,
                allowNull: true
            },
            productOrderUnit: { // unité de commande   Boite, - FL :flecon, pièce,
                type: DataTypes.STRING,
                allowNull: true
            },
            productStudyType: { // SCAN, RADIO, IRM
                type: DataTypes.STRING,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            tableName: 'product',
            paranoid: true,
            classMethods: {
                associate: function (models) {
                    Product.hasMany(models.VisitHasProduct, {foreignKey: 'productId'});
                }
            }
        }
    );

    return Product;
};
