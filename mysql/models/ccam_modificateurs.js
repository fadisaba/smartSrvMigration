"use strict";
module.exports = function(sequelize, DataTypes) {
  var CcamModificateurs = sequelize.define("CcamModificateurs", {
          CCAMModificateurId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true
          },
          CCAMModificateurCode: {
              type: DataTypes.STRING,
              allowNull: false
          },
          CCAMModificateurCoef: {
          type: DataTypes.DECIMAL(10, 3),
          allowNull: true
        },
          CCAMModificateurAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true
        },
          CCAMModificateurStartDate: {
              type: DataTypes.DATEONLY,
              allowNull: false
          },
          CCAMModificateurEndDate: {
              type: DataTypes.DATEONLY,
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'ccam_modificateurs',
        paranoid: true
      }
  );

  return CcamModificateurs;
};
