"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "mockTests",
      [
        {
          id: "MT001",
          teacherId: "TEA001",
          name: "Mock Test 1",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT002",
          teacherId: "TEA001",
          name: "Mock Test 2",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT003",
          teacherId: "TEA002",
          name: "Mock Test 3",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "MT004",
          teacherId: "TEA002",
          name: "Mock Test 1",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT005",
          teacherId: "TEA002",
          name: "Mock Test 2",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT006",
          teacherId: "TEA001",
          name: "Mock Test 3",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "MT007",
          teacherId: "TEA001",
          name: "Mock Test 1",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT008",
          teacherId: "TEA001",
          name: "Mock Test 2",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT009",
          teacherId: "TEA001",
          name: "Mock Test 3",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "MT010",
          teacherId: "TEA001",
          name: "Mock Test 1",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT011",
          teacherId: "TEA001",
          name: "Mock Test 2",
          testDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "MT012",
          teacherId: "TEA001",
          name: "Mock Test 3",
          testDate: new Date(),
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
