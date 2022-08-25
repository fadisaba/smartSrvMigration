    "use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        cityId: {
          type: DataTypes.INTEGER,
          defaultValue: 0

        },
        userCatId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        userFName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        userLName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        userLogin: {
          type: DataTypes.STRING,
          allowNull: true
        },
          userHprimCode: {
              type: DataTypes.STRING,
              allowNull: true
          },
        userPass: {
          type: DataTypes.STRING,
          allowNull: true
        },
        userInitiales: {
          type: DataTypes.STRING,
          allowNull: true
        },
        userZipCode: {
          type: DataTypes.STRING,
          allowNull: true
        },
        userAddress: {
          type: DataTypes.STRING,
          allowNull: true
        },
          userEmail: {
              type: DataTypes.STRING,
              allowNull: true
          },
        userPhone: {
          type: DataTypes.STRING,
          allowNull: true
        },
        userFax: {
          type: DataTypes.STRING,
          allowNull: true
        },
          userSchResourceColor: {
              type: DataTypes.STRING,
              allowNull: true
          },
          userMigrationId: {
              type: DataTypes.STRING,
              allowNull: true
          },
          userIsVirtual: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false
          },
          userDescription: { // used for doctor
              type: DataTypes.TEXT,
              allowNull: true
          },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'user',
        paranoid: true,
        classMethods: {
          associate: function(models) {
            User.belongsTo(models.City,{foreignKey: 'cityId',constraints:false});
            User.belongsTo(models.UserCat,{foreignKey: 'userCatId'});
              User.hasOne(models.Doctor,{foreignKey: 'userId'});
              User.hasMany(models.StudyVisit,{foreignKey: 'userId',constraints:false});
              User.hasMany(models.Appointment,{foreignKey: 'doctorId',constraints:false});
              User.hasMany(models.UserAvailbyday,{foreignKey: 'userId'});
              User.hasMany(models.CashBoxConfig,{foreignKey: 'userId',constraints:false});
              User.hasMany(models.BankAccountConfig,{foreignKey: 'userId',constraints:false});
              User.hasMany(models.UserCps,{foreignKey: 'userId',constraints:false});
              User.hasMany(models.ConcurrentAccess,{foreignKey: 'userId'});
              User.hasMany(models.ConcurrentFse,{foreignKey: 'userId'});
              User.hasMany(models.UserHasLog,{foreignKey: 'userId'});
              User.hasMany(models.UserPlanningVac,{foreignKey: 'userId'});
              User.hasMany(models.UserFilter,{foreignKey: 'userId'});

          }
        }
      }
  );

  return User;
};
