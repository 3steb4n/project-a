'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AnimeGenres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      animeId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Animes'
        }
      },
      GenreId: {
          type: Sequelize.INTEGER,
          references: {
            key: 'id',
            model: 'Genres'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AnimeGenres');
  }
};