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
          file: "User1Assign1",
          submissionDate: new Date(),
          evaluated: true,
          status: 'uploaded',
          scores: "9",
          remarks: "Good",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "SUB002",
          assignmentId: "ASS002",
          studentId: "USER001",
          file: "User1Assign2",
          submissionDate: new Date(),
          evaluated: true,
          status: 'uploaded',
          scores: "10",
          remarks: "Very Good",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "SUB003",
          assignmentId: "ASS003",
          studentId: "USER001",
          file: "User1Assign3",
          submissionDate: new Date(),
          evaluated: true,
          status: 'uploaded',
          scores: "10",
          remarks: "Good",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "SUB004",
          assignmentId: "ASS001",
          studentId: "USER002",
          file: "User2Assign1",
          submissionDate: new Date(),
          evaluated: true,
          status: 'uploaded',
          scores: "10",
          remarks: "Good",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "SUB005",
          assignmentId: "ASS002",
          studentId: "USER002",
          file: "submission 2",
          submissionDate: new Date(),
          evaluated: true,
          status: 'uploaded',
          scores: "10",
          remarks: "Good",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
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
