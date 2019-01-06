"use strict";
module.exports = function(sequelize, DataTypes) {
  var Stateful = sequelize.define("Stateful", {
    statefulId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    statefulUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statefulKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statefulValue: {
      type: DataTypes.TEXT,
      allowNull: true
    },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      }, {
        tableName: 'stateful'
      }
  );

  return Stateful;
};