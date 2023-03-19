"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "mockTests",
      [
        {
          id: "MT001",
          batchId: "BAT01",
          name: "Mock Test 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT002",
          batchId: "BAT02",
          name: "Mock Test 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT003",
          batchId: "BAT02",
          name: "Mock Test 3",
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
