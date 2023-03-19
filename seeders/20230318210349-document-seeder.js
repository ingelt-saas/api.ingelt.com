"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "documents",
      [
        {
          id: "DOC004",
          organizationId: 1,
          file: "document 1",
          fileSize: "1MB",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "DOC002",
          organizationId: 1,
          file: "document 2",
          fileSize: "1MB",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "DOC003",
          organizationId: 1,
          file: "document 3",
          fileSize: "1MB",
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
