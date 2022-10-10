'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Animes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      season: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      url_preview: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_trailer: {
        type: Sequelize.STRING,
      },
      number_chapter: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      anime_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'typeAnimes'
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'AnimeStatuses'
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
    await queryInterface.dropTable('Animes');
  }
};