"use strict";
module.exports = function(sequelize, DataTypes) {
  let UserAvail = sequelize.define("UserAvail", {
          userAvailId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
          },
          userAvailTypeId: {
              type: DataTypes.UUID,
              allowNull: true
          },
          userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
         userAvailStartDate: {
              type: DataTypes.DATE,
              allowNull: false
          },
          userAvailEndDate: {
              type: DataTypes.DATE,
              allowNull: false
          },
          userAvailType: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          userAvailIsGarde: {
              type: DataTypes.BOOLEAN,
              allowNull: false,
              defaultValue: false
          },
          userAvailRecurrenceId: {
              type: DataTypes.UUID,
              allowNull: true
          },
          userAvailIsUnavailable: { // true if user is unavailable (titulaire) false if available (remplacant)
              type: DataTypes.BOOLEAN,
              allowNull: true
          },

          userAvailIsForRemplacant: { // cette zone n'est pas utilisée
              type: DataTypes.BOOLEAN,
              allowNull: true
          },
          userAvailComment: { // commentaire
              type: DataTypes.STRING,
              allowNull: true
          },
          userAvailStartPM: {// disponiblité ou indisponibilité commence l'apres midi
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          userAvailEndAM: {
              type: DataTypes.BOOLEAN,//// disponiblité ou indisponibilité se termine le matin (matin inclu)
              allowNull: true,
              defaultValue: false
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user_avail',
        paranoid: true,
        classMethods: {
          associate: function(models) {
              UserAvail.belongsTo(models.User,{foreignKey: 'userId'});
              UserAvail.belongsTo(models.UserAvailType,{foreignKey: 'userAvailTypeId',constraints: false});
          }
        }
      }
  );
  return UserAvail;
};

