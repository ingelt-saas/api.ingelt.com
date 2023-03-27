"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "students",
      [
        {
          id: "USER001",
          batchId: "BAT01",
          name: "Laura Hensen",
          email: "laura@email.com",
          password: "123456",
          phoneNo: "1234567890",
          gender: "Female",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          pinCode: "400001",
          dob: "1990-01-01",
          active: true,
          targetScore: 7.0,
          previousScore: 6.5,
          averageBand: 7.0,
          totalAverageBand: 7.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "USER002",
          batchId: "BAT01",
          name: "Donald Trump",
          email: "donald@trumporg.us",
          password: "123456",
          phoneNo: "1234567",
          gender: "Male",
          city: "New York",
          state: "New York",
          country: "USA",
          pinCode: "10001",
          dob: "1990-01-01",
          active: true,
          targetScore: 7.0,
          previousScore: 6.5,
          averageBand: 5.0,
          totalAverageBand: 6.0,
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
