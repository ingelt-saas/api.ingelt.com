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
        {
          id: "TEA003",
          name: "Teacher 3",
          gender: "Male",
          email: "teacher3@example.com",
          password: "123456",
          expertise: "Mathematics",
          dob: "1985-04-10",
          phoneNo: "9876543210",
          city: "New York",
          state: "New York",
          country: "United States",
          pincode: "10001",
          workExp: "8",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "TEA004",
          name: "Teacher 4",
          gender: "Female",
          email: "teacher4@example.com",
          password: "password123",
          expertise: "English",
          dob: "1992-11-08",
          phoneNo: "1234567890",
          city: "Sydney",
          state: "New South Wales",
          country: "Australia",
          pincode: "2000",
          workExp: "4",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "TEA005",
          name: "Teacher 5",
          gender: "Male",
          email: "teacher5@example.com",
          password: "qwerty",
          expertise: "Social Studies",
          dob: "1987-06-20",
          phoneNo: "9876543210",
          city: "Toronto",
          state: "Ontario",
          country: "Canada",
          pincode: "M5V 1R7",
          workExp: "6",
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
