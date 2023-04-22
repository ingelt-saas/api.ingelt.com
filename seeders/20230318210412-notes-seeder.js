"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "notes",
      [
        {
          id: "NOTE001",
          batchId: "BAT01",
          teacherId: "TEA001",
          file: "file1",
          fileSize: "1MB",
          subject: "listening",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE002",
          batchId: "BAT01",
          teacherId: "TEA001",
          file: "file2",
          fileSize: "2MB",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE010",
          batchId: "BAT02",
          teacherId: "TEA001",
          file: "file10",
          fileSize: "2MB",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE003",
          batchId: "BAT02",
          teacherId: "TEA002",
          file: "file3",
          fileSize: "3MB",
          subject: "writing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE004",
          batchId: "BAT02",
          teacherId: "TEA002",
          file: "file4",
          fileSize: "4MB",
          subject: "speaking",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE005",
          batchId: "BAT03",
          teacherId: "TEA003",
          file: "file5",
          fileSize: "5MB",
          subject: "listening",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE006",
          batchId: "BAT03",
          teacherId: "TEA003",
          file: "file6",
          fileSize: "6MB",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE007",
          batchId: "BAT04",
          teacherId: "TEA004",
          file: "file7",
          fileSize: "7MB",
          subject: "writing",
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
