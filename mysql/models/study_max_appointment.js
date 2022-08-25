"use strict";
module.exports = function(sequelize, DataTypes) {
  let StudyMaxAppointment = sequelize.define("StudyMaxAppointment", {
          studyMaxAppointmentId: {
              type: DataTypes.UUID,
              allowNull: false,
              primaryKey: true
        },
          userId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          studyId: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          studyMaxAppointmentDate: {
              type: DataTypes.DATEONLY,
              allowNull: false
          },
          studyMaxAppointmentNumber: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          studyMaxAppointmentEveryDay: { // si true le max est valable tous le temp indépendemment de schedulerMaxStudyDate
              type: DataTypes.BOOLEAN,
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
        tableName: 'study_max_appointment',
        paranoid: true,
        classMethods: {
          associate: function(models) {
          }
        }
      }
  );
  return StudyMaxAppointment;
};