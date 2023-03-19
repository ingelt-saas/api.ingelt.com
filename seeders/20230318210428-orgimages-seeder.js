"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "orgImages",
      [
        {
          id: "ORGIMG001",
          organizationId: 1,
          name: "image1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ORGIMG002",
          organizationId: 2,
          name: "image2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ORGIMG003",
          organizationId: 1,
          name: "image3",
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
