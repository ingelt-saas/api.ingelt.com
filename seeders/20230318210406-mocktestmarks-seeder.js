"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "mockTestMarks",
      [
        {
          id: "MOCKTESTMAKRS1",
          listeningBands: 7.5,
          readingBands: 8,
          writingBands: 7,
          speakingBands: 7.5,
          createdAt: new Date(),
          updatedAt: new Date(),
          mockTestId:"11bb194e-443e-4558-b9c8-b1fb57c71f64",
          studentId:"IGS3E6"
        },
        {
          id: "MOCKTESTMAKRS2",
          listeningBands: 6.5,
          readingBands: 7,
          writingBands: 6.5,
          speakingBands: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
          mockTestId:"14f8e956-3095-4ef4-b19b-1600dcb42ecb",
          studentId:"IGS3E6"
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
