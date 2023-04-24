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
          teacherId: 'TEA005',
          name: "Assignment 1",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS002",
          batchId: "BAT01",
          teacherId: 'TEA004',
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
          teacherId: 'TEA002',
          name: "Assignment 3",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS004",
          batchId: "BAT03",
          teacherId: 'TEA005',
          name: "Assignment 1",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS005",
          batchId: "BAT03",
          teacherId: 'TEA005',
          name: "Assignment 2",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS006",
          batchId: "BAT03",
          teacherId: 'TEA005',
          name: "Assignment 3",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS007",
          batchId: "BAT04",
          teacherId: 'TEA005',
          name: "Assignment 1",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS008",
          batchId: "BAT04",
          teacherId: 'TEA005',
          name: "Assignment 2",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS009",
          batchId: "BAT04",
          teacherId: 'TEA005',
          name: "Assignment 3",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS010",
          batchId: "BAT05",
          teacherId: 'TEA005',
          name: "Assignment 1",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS011",
          batchId: "BAT05",
          teacherId: 'TEA005',
          name: "Assignment 2",
          assignedDate: new Date(),
          endDate: new Date(),
          file: "file2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ASS012",
          batchId: "BAT05",
          teacherId: 'TEA005',
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
