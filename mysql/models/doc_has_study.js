"use strict";
module.exports = function(sequelize, DataTypes) {
  var DocHasStudy = sequelize.define("DocHasStudy", {
        docHasStudyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        doctorId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        studyId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        duration: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'doc_has_study',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            DocHasStudy.belongsTo(models.Doctor,{foreignKey: 'doctorId'});
            DocHasStudy.belongsTo(models.Study,{foreignKey: 'studyId'});
          }
        }
      }
  );

  return DocHasStudy;
};
