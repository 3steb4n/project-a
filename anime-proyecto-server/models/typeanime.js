'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class typeAnime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.anime);
    }
  }
  typeAnime.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'typeAnime',
  });

  const createTypeAnime = () => {
    const nameType = ['ONA', 'OVA', 'TV', 'PELICULA', 'BD', 'ESPECIAL'];
    nameType.map(value => {
      typeAnime.count({
        where: { name: value }
      }).then(count => {
        if(count === 0) {
          typeAnime.create({
            name: value
          });
        }
      });
    });
  }
  createTypeAnime();
  
  return typeAnime;
};