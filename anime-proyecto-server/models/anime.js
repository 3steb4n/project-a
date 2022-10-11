'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of S
     * 
     *  dDall this method automatically.
     */
    static associate(models) {
      // define association here
      //relación llave foranea con la tabla AnimeGenre
    }
  }
  anime.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    season: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url_preview: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url_trailer: {
      type: DataTypes.STRING,
    },
    number_chapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anime_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'anime',
  });
  return anime;
};