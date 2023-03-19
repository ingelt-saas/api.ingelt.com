"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "assignments",
      [
        {
          id: "ASS001",
          batchId: "BAT01",
          name: "Assignment 1",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS002",
          batchId: "BAT02",
          name: "Assignment 2",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS003",
          batchId: "BAT01",
          name: "Assignment 3",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file3",
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
