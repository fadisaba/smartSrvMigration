"use strict";
module.exports = function(sequelize, DataTypes) {
  let AvailHasStudy = sequelize.define("AvailHasStudy", {
        availHasStudyId: {
         type: DataTypes.UUID,
                allowNull: false,
            defaultValue: DataTypes.UUIDV4,
                primaryKey: true
        },
        studyId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
         availId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      },
      {
        tableName: 'avail_has_study',
        paranoid: true,
        classMethods: {
          associate: function(models) {

              AvailHasStudy.belongsTo(models.Study,{foreignKey: 'studyId'});
              AvailHasStudy.belongsTo(models.Avail,{foreignKey: 'availId'});
          }
        }
      }
  );

  return AvailHasStudy;
};
