"use strict";
module.exports = function(sequelize, DataTypes) {
  var VisitHasProduct = sequelize.define("VisitHasProduct", {
        visitHasProductId: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false
        },
          visitId: {
              type: DataTypes.UUID,
              allowNull: false
          },
          visitHasProductQuantity: {
              type: DataTypes.STRING,
              allowNull: true
          },
          visitHasProductExpirationDate: { // date de péremption
              type: DataTypes.DATEONLY,
              allowNull: false
          },
          visitHasProductLotNumber: {// numéro de lot
              type: DataTypes.STRING,
              allowNull: false
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'visit_has_product',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              VisitHasProduct.belongsTo(models.Visit,{foreignKey: 'visitId'});
              VisitHasProduct.belongsTo(models.Product,{foreignKey: 'productId'});
          }
        }
      }
  );

  return VisitHasProduct;
};
