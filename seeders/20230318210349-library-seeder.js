"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "libraries",
      [
        {
          id: "LIB3E7",
          name: "Library 1",
          file: "file1.pdf",
          subject: "reading",
          fileSize: 1024,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "LIB3E8",
          name: "Library 2",
          file: "file2.pdf",
          subject: "writing",
          fileSize: 2048,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more library records as needed
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
