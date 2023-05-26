"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "orgImages",
      [
        {
          "id": "5066cc62-fe84-4fa4-950a-a03e718c5c77",
          "name": "institute/1684988565364-0.png",
          "createdAt": "2023-05-25 04:22,:47",
          "updatedAt": "2023-05-25 04:22:47",
          "organizationId": "b61377cf-c91e-49e7-b7b9-554b7e844527"
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
