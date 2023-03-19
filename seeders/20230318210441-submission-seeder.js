"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "submissions",
      [
        {
          id: "SUB001",
          assignmentId: "ASS001",
          studentId: "USER001",
          file: "file1",
          submissionDate: new Date(),
          evaluated: true,
          scores: "10",
          remarks: "Good",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "SUB002",
          assignmentId: "ASS002",
          studentId: "USER002",
          file: "file2",
          submissionDate: new Date(),
          evaluated: true,
          scores: "10",
          remarks: "Good",
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
