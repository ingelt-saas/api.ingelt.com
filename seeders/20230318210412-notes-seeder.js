"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "notes",
      [
        {
          id: "NOTE001",
          file: "file1",
          name: "Note 1",
          uploaderId: "TEA001",
          uploaderName: "Teacher 1",
          fileSize: "1MB",
          subject: "listening",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE002",
          file: "file2",
          name: "Note 2",
          uploaderId: "TEA001",
          uploaderName: "Teacher 1",
          fileSize: "2MB",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE010",
          file: "file10",
          name: "Note 10",
          uploaderId: "TEA001",
          uploaderName: "Teacher 1",
          fileSize: "2MB",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE003",
          file: "file3",
          name: "Note 3",
          uploaderId: "TEA001",
          uploaderName: "Teacher 1",
          fileSize: "3MB",
          subject: "writing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE004",
          file: "file4",
          name: "Note 4",
          uploaderId: "TEA001",
          uploaderName: "Teacher 1",
          fileSize: "4MB",
          subject: "speaking",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE005",
          file: "file5",
          name: "Note 5",
          uploaderId: "TEA001",
          uploaderName: "Teacher 1",
          fileSize: "5MB",
          subject: "listening",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE006",
          file: "file6",
          name: "Note 6",
          uploaderId: "TEA001",
          uploaderName: "Teacher 1",
          fileSize: "6MB",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "NOTE007",
          file: "file7",
          name: "Note 7",
          uploaderId: "TEA001",
          uploaderName: "Teacher 1",
          fileSize: "7MB",
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
