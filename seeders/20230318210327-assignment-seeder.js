"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "assignments",
      [
        {
          "id": "3462de9a-cbe1-4abf-a0f6-93eeed858dc6",
          "name": "download.pdf",
          "endDate": "2023-05-30 00:00:00",
          "file": "teacher/assignments/1684847673871-33.pdf",
          "fileSize": 192056,
          "createdAt": "2023-05-23 13:14:35",
          "updatedAt": "2023-05-23 13:14:35",
          "organizationId": "ORG1",
          "teacherId": "IGT3EA"
        },
        {
          "id": "4d1a84d2-e238-424a-ae83-8660cd72b4a7",
          "name": "teacher.pdf",
          "endDate": "2023-05-26 00:00:00",
          "file": "teacher/assignments/1685069686991-46.pdf",
          "fileSize": 192056,
          "createdAt": "2023-05-26 02:54:48",
          "updatedAt": "2023-05-26 02:54:48",
          "organizationId": null,
          "teacherId": "IGT3EA"
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
