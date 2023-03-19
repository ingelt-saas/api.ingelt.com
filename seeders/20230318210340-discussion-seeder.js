"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "discussions",
      [
        {
          id: "BAT0USER001DISC1",
          batchId: "BAT01",
          senderId: "USER001",
          senderName: "John Doe",
          message: "Hello, I am John Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "BAT0USER001DISC2",
          batchId: "BAT01",
          senderId: "USER001",
          senderName: "Jane Austen",
          message: "Hello, I am Jane Austen",
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
