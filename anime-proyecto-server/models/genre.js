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

  //Se crea la variable en donde va a almacenar un metodo asincrono con la propiedad fileName (ruta del archivo)
  const generateGenreRegisters = async (fileName = 'list-genres.txt') => {
    //Se importa libreria fs
    const {promises: fsPromises} = require('fs');
    try {
      const contents = await fsPromises.readFile(fileName, 'utf-8');
      let i = 0;
      const arr = contents.split(/\r?\n/);
      //Ciclo for en donde va a realizar la consulta del genero por el nombre que esté en archivo fileName
      for(i = 0; arr.length > i; i++) {
        let listAnime = arr[i];
        Genre.count({
          where: { name: arr[i] }
        }).then((count) => {
          //Si no encuentra el genero en la base de datos, se va a insertar con el metodo create()
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