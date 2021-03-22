"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserFilterDetail = sequelize.define("UserFilterDetail", {
          userFilterDetailId: {
              type: DataTypes.UUID,
              allowNull: false,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
        },
        userFilterId: {
            type: DataTypes.UUID,
            allowNull: false
          },
          siteCode: {
              type: DataTypes.STRING,
              allowNull: true
          },
          siteCodeOp: {// operation
              type: DataTypes.STRING,
              allowNull: true
          },
          patientLName: {
              type: DataTypes.STRING,
              allowNull: true
          },
          patientLNameOp: {
              type: DataTypes.STRING,
              allowNull: true
          },
          worklistStudies: {
              type: DataTypes.STRING,
              allowNull: true
          },
          worklistStudiesOp: {
              type: DataTypes.STRING,
              allowNull: true
          },
          visitPEC: {
              type: DataTypes.STRING,
              allowNull: true
          },
          visitPECOp: {
              type: DataTypes.STRING,
              allowNull: true
          },
          worklistDoctor: {
              type: DataTypes.STRING,
              allowNull: true
          },
          worklistDoctorOp: {
              type: DataTypes.STRING,
              allowNull: true
          },
          visitIsDone: {
              type: DataTypes.STRING,
              allowNull: true
          },
          visitIsDoneOp: {
              type: DataTypes.STRING,
              allowNull: true
          },
          worklistLastCrStatus: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          worklistLastCrStatusOp: {
              type: DataTypes.STRING,
              allowNull: true
          },
          visitCotationStatus: {
              type: DataTypes.INTEGER,
              allowNull: true
          },
          visitCotationStatusOp: {
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
        tableName: 'user_filter_detail',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserFilterDetail.belongsTo(models.UserFilter,{foreignKey: 'userFilterId'});
          }
        }
      }
  );
  return UserFilterDetail;
};
