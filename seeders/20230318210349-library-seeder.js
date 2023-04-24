"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "libraries",
      [
        {
          id: "DOC004",
          organizationId: "ORG1",
          file: "document 1",
          fileSize: "1MB",
          subject: "listening",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "DOC002",
          organizationId: "ORG1",
          file: "document 2",
          fileSize: "1MB",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "DOC003",
          organizationId: "ORG2",
          file: "document 3",
          fileSize: "1MB",
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
