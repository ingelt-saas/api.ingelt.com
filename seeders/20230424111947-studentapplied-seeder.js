'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "studentApplieds",
      [
        {
          id: 'APPLI1',
          organizationId: "ORG1",
          studentId: "USER001",
          status: 'applied',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'APPLI2',
          organizationId: "ORG2",
          studentId: "USER003",
          status: 'applied',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'APPLI3',
          organizationId: "ORG2",
          studentId: "USER002",
          status: 'applied',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'APPLI4',
          organizationId: "ORG3",
          studentId: "USER006",
          status: 'applied',
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
  }
};
