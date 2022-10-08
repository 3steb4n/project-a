'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChapterAnime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChapterAnime.init({
    chapter_name: DataTypes.STRING,
    description: DataTypes.STRING,
    url_video: DataTypes.STRING,
    url_preview: DataTypes.STRING,
    id_anime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChapterAnime',
  });
  return ChapterAnime;
};