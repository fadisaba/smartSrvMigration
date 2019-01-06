module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FiscalYear', {
    fiscalYearId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    siteGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site_group',
        key: 'siteGroupId'
      }
    },
    fiscalYearName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fiscalYearStartDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fiscalYearEndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fiscalYearIsClosed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
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
    tableName: 'fiscal_year'
  });
};
