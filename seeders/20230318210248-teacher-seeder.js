"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "teachers",
      [
        {
          id: "TEA001",
          name: "Teacher 1",
          gender: "Male",
          email: "teacher1@email.com",
          password: "password",
          expertise: "Maths",
          dob: "1990-01-01",
          phoneNo: "1234567890",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          pincode: "400001",
          workExp: "5",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "TEA002",
          name: "Teacher 2",
          gender: "Female",
          email: "teacher2@email.com",
          password: "password",
          expertise: "Science",
          dob: "1990-01-01",
          phoneNo: "1234567890",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          pincode: "400001",
          workExp: "5",
          active: true,
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
