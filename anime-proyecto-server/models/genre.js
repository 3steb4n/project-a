'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //relación llave foranea con la tabla AnimeGenre
    }
  }
  Genre.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genre',
  });

  const generateGenreRegisters = async (fileName = 'list-genres.txt') => {
    const {readFileSync, promises: fsPromises} = require('fs');
    try {
      const contents = await fsPromises.readFile(fileName, 'utf-8');
      let i = 0;
      const arr = contents.split(/\r?\n/);

      for(i = 0; arr.length > i; i++) {
        let listAnime = arr[i];
        Genre.count({
          where: { name: arr[i] }
        }).then((count) => {
          if(count === 0) {
            Genre.create({ name: listAnime });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  generateGenreRegisters();
  return Genre;
};