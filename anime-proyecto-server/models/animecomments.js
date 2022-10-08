'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimeComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnimeComments.init({
    id_user: DataTypes.INTEGER,
    id_anime: DataTypes.INTEGER,
    text_comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AnimeComments',
  });
  return AnimeComments;
};