"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "BatchesTeachers",
      [
        {
          batchId: "BAT01",
          teacherId: "TEA001",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          batchId: "BAT01",
          teacherId: "TEA002",
          subject: "writing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          batchId: "BAT01",
          teacherId: "TEA003",
          subject: "listening",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          batchId: "BAT01",
          teacherId: "TEA004",
          subject: "speaking",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          batchId: "BAT02",
          teacherId: "TEA001",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          batchId: "BAT02",
          teacherId: "TEA004",
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
