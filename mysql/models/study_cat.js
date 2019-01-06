"use strict";
module.exports = function(sequelize, DataTypes) {
  var StudyCat = sequelize.define("StudyCat", {
    studyCatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    studyCatName: {
      type: DataTypes.STRING,
      allowNull: false
    },
      studyCatMigrationId: {
          type: DataTypes.STRING,
          allowNull: true
      },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
      }, {
        tableName: 'study_cat',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            StudyCat.hasMany(models.StudyType,{foreignKey: 'studyCatId'});

          }
        }
      }
  );

  return StudyCat;
};