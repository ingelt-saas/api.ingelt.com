"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "mockTestMarks",
      [
        {
          mockTestId: "MT001",
          studentId: "USER001",
          id: "MTM01",
          listeningBands: 7.5,
          readingBands: 7.5,
          writingBands: 7.5,
          speakingBands: 6.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mockTestId: "MT001",
          studentId: "USER002",
          id: "MTM02",
          listeningBands: 8.0,
          readingBands: 8.0,
          writingBands: 8.0,
          speakingBands: 8.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mockTestId: "MT002",
          studentId: "USER001",
          id: "MTM03",
          listeningBands: 7.0,
          readingBands: 7.0,
          writingBands: 7.0,
          speakingBands: 7.0,
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
