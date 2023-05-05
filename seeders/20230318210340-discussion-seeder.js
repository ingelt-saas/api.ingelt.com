"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "discussions",
      [
        {
          id: "BAT0USER001DISC1",
          senderId: "USER001",
          senderName: "John Doe",
          message: "Hello, I am John Doe",
          designation: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "BAT0USER001DISC2",
          senderId: "USER001",
          senderName: "Jane Austen",
          designation: "student",
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
