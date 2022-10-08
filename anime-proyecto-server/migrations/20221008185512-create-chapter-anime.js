'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChapterAnimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapter_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      url_video: {
        type: Sequelize.STRING
      },
      url_preview: {
        type: Sequelize.STRING
      },
      id_anime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'animes',
          key: 'id'
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
    await queryInterface.dropTable('ChapterAnimes');
  }
};