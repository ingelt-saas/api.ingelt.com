"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "assignments",
      [
        {
          id: "ASS001",
          teacherId: "TEA005",
          name: "Assignment 1",
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS002",
          teacherId: "TEA004",
          name: "Assignment 2",
          endDate: new Date(),
          file: "file2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS003",
          teacherId: "TEA002",
          name: "Assignment 3",
          endDate: new Date(),
          file: "file3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS004",
          teacherId: "TEA005",
          name: "Assignment 1",
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS005",
          teacherId: "TEA005",
          name: "Assignment 2",
          endDate: new Date(),
          file: "file2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS006",
          teacherId: "TEA005",
          name: "Assignment 3",
          endDate: new Date(),
          file: "file3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS007",
          teacherId: "TEA005",
          name: "Assignment 1",
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS008",
          teacherId: "TEA005",
          name: "Assignment 2",
          endDate: new Date(),
          file: "file2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS009",
          teacherId: "TEA005",
          name: "Assignment 3",
          endDate: new Date(),
          file: "file3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS010",
          teacherId: "TEA005",
          name: "Assignment 1",
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS011",
          teacherId: "TEA005",
          name: "Assignment 2",
          endDate: new Date(),
          file: "file2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS012",
          teacherId: "TEA005",
          name: "Assignment 3",
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
