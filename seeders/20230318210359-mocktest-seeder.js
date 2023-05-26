"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "mockTests",
      [
        {
          "id": "11bb194e-443e-4558-b9c8-b1fb57c71f64",
          "testDate": "2023-05-27 00:00:00",
          "name": "The New MT",
          "createdAt": "2023-05-25 09:17:57",
          "updatedAt": "2023-05-25 09:17:57",
          "organizationId": null,
          "teacherId": "IGT3EA"
        },
        {
          "id": "14f8e956-3095-4ef4-b19b-1600dcb42ecb",
          "testDate": "2023-05-27 00:00:00",
          "name": "mt001",
          "createdAt": "2023-05-25 19:53:24",
          "updatedAt": "2023-05-25 19:53:24",
          "organizationId": null,
          "teacherId": "IGT3EA"
        },
        {
          "id": "2aefcb7e-aa2d-4d98-a736-9b2da5bf0044",
          "testDate": "2023-05-21 00:00:00",
          "name": "Random",
          "createdAt": "2023-05-26 05:22:49",
          "updatedAt": "2023-05-26 05:22:49",
          "organizationId": null,
          "teacherId": "IGT3E9"
        },
        {
          "id": "434b5748-dc6c-4453-b51a-97af0a6ceb3a",
          "testDate": "2023-01-24 00:00:00",
          "name": "Test 1",
          "createdAt": "2023-05-26 05:12:29",
          "updatedAt": "2023-05-26 05:12:29",
          "organizationId": null,
          "teacherId": "IGT3E9"
        },
        {
          "id": "6b4f4458-58a7-49f2-9405-b2e941bc5fdd",
          "testDate": "2023-05-26 00:00:00",
          "name": "The Test MT",
          "createdAt": "2023-05-25 09:17:17",
          "updatedAt": "2023-05-25 09:17:17",
          "organizationId": null,
          "teacherId": "IGT3EA"
        },
        {
          "id": "856d2be9-6b1a-4249-98cc-925bbb4bad48",
          "testDate": "2023-05-25 00:00:00",
          "name": "Random 3",
          "createdAt": "2023-05-26 05:36:05",
          "updatedAt": "2023-05-26 05:36:05",
          "organizationId": null,
          "teacherId": "IGT3E9"
        },
        {
          "id": "8997d85e-98b7-48d9-9c1c-e2869a28d388",
          "testDate": "2023-05-22 00:00:00",
          "name": "Random 1",
          "createdAt": "2023-05-26 05:26:01",
          "updatedAt": "2023-05-26 05:26:01",
          "organizationId": null,
          "teacherId": "IGT3E9"
        },
        {
          "id": "8a3630c8-d055-4c6a-8747-ce520125bdc1",
          "testDate": "2003-01-21 00:00:00",
          "name": "Mock Test 1",
          "createdAt": "2023-05-25 20:28:30",
          "updatedAt": "2023-05-25 20:28:30",
          "organizationId": null,
          "teacherId": "IGT3E9"
        },
        {
          "id": "c772cf15-252b-46ae-9738-15bac59a46e5",
          "testDate": "2023-05-27 00:00:00",
          "name": "Random 2",
          "createdAt": "2023-05-26 05:30:40",
          "updatedAt": "2023-05-26 05:30:40",
          "organizationId": null,
          "teacherId": "IGT3E9"
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
