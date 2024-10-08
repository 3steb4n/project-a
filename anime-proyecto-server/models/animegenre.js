'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimeGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.anime);
      this.belongsTo(models.Genre);
    }
  }
  AnimeGenre.init({}, {
    sequelize,
    modelName: 'AnimeGenre',
  });
  return AnimeGenre;
};