/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StudyComment', {
    studyCommentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    studyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'study',
        key: 'studyId'
      }
    },
    studyCommentText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    studyCommentisDel:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },

    deleteAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isDel:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: 'study_comment'
  });
};
