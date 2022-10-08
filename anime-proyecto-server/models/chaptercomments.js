'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChapterComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChapterComments.init({
    id_user: DataTypes.INTEGER,
    id_chapter: DataTypes.INTEGER,
    text_comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChapterComments',
  });
  return ChapterComments;
};