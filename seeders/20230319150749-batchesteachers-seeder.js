"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "BatchesTeachers",
      [
        {
          id: 'BATCH0',
          batchId: "BAT01",
          teacherId: "TEA001",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'BATCH1',
          batchId: "BAT01",
          teacherId: "TEA002",
          subject: "writing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'BATCH2',
          batchId: "BAT01",
          teacherId: "TEA003",
          subject: "listening",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'BATCH3',
          batchId: "BAT01",
          teacherId: "TEA004",
          subject: "speaking",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'BATCH4',
          batchId: "BAT02",
          teacherId: "TEA001",
          subject: "reading",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'BATCH5',
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
