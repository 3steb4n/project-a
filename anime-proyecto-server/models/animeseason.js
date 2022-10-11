'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimeSeason extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnimeSeason.init({
    id_principal_anime: DataTypes.INTEGER,
    id_season_anime: DataTypes.INTEGER,
    number_season: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnimeSeason',
  });
  return AnimeSeason;
};