'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimeStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnimeStatus.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AnimeStatus',
  });
  const generateAnimeStatus = () => {
    const animeStatus = ['En emisión', "Finalizado"];
    animeStatus.map(value => {
      AnimeStatus.count({
        where: {name: value}
      }).then(count => {
        if(count == 0) {
          AnimeStatus.create({
            name: value
          });
        }
      })
    });
  };
  generateAnimeStatus();
  return AnimeStatus;
};