"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "batches",
      [
        {
          id: "BAT01",
          organizationId: 1,
          name: "Batch 1",
          regDate: new Date(),
          active: true,
          classroomLink: "https://classroom.google.com/u/0/c/MTUxMjM2NjU1MzI2",
          averageBand: 1,
          totalAverageBand: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "BAT02",
          organizationId: 2,
          name: "Batch 2",
          regDate: new Date(),
          active: true,
          classroomLink: "https://classroom.google.com/u/0/c/MTUxMjM2NjU1MzI2",
          averageBand: 2,
          totalAverageBand: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "BAT03",
          organizationId: 1,
          name: "Batch 3",
          regDate: new Date(),
          active: true,
          classroomLink: "https://classroom.google.com/u/0/c/MTUxMjM2NjU1MzI2",
          averageBand: 3,
          totalAverageBand: 3,
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
