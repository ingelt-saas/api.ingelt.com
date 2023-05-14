"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "libraries",
      [
        {
          id: "DOC004",
          file: "document 1",
          name: "document 1",
          fileSize: 1200390,
          subject: "listening",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "DOC002",
          file: "document 2",
          name: "document 1",
          fileSize: 1200390,
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "DOC003",
          file: "document 3",
          name: "document 1",
          fileSize: 1200390,
          subject: "writing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
