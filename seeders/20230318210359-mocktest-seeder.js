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
          teacherId: 'TEA001',
          name: "Mock Test 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT002",
          batchId: "BAT01",
          teacherId: 'TEA001',
          name: "Mock Test 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT003",
          batchId: "BAT01",
          teacherId: 'TEA002',
          name: "Mock Test 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "MT004",
          batchId: "BAT03",
          teacherId: 'TEA002',
          name: "Mock Test 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT005",
          batchId: "BAT03",
          teacherId: 'TEA002',
          name: "Mock Test 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT006",
          batchId: "BAT03",
          teacherId: 'TEA001',
          name: "Mock Test 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "MT007",
          batchId: "BAT04",
          teacherId: 'TEA001',
          name: "Mock Test 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT008",
          batchId: "BAT04",
          teacherId: 'TEA001',
          name: "Mock Test 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT009",
          batchId: "BAT04",
          teacherId: 'TEA001',
          name: "Mock Test 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "MT010",
          batchId: "BAT05",
          teacherId: 'TEA001',
          name: "Mock Test 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT011",
          batchId: "BAT05",
          teacherId: 'TEA001',
          name: "Mock Test 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT012",
          batchId: "BAT05",
          teacherId: 'TEA001',
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
