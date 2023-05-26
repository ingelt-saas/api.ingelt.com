"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "batches",
      [
        {
          "id": "0f8f6f93-a7b3-46d8-b6c4-690a4b7de74c",
          "name": "The Test batch",
          "regDate": null,
          "active": 0,
          "endDate": "2023-05-25 09:10:55",
          "classroomLink": null,
          "averageBand": null,
          "totalAverageBand": null,
          "createdAt": "2023-05-25 09:10:47",
          "updatedAt": "2023-05-25 09:10:55",
          "organizationId": "ORG1"
        },
        {
          "id": "502611ca-e0d5-427a-b93c-fd674f6f9cca",
          "name": "Batch New",
          "regDate": null,
          "active": 1,
          "endDate": null,
          "classroomLink": null,
          "averageBand": null,
          "totalAverageBand": null,
          "createdAt": "2023-05-26 05:54:42",
          "updatedAt": "2023-05-26 05:54:42",
          "organizationId": "ORG1"
        },
        {
          "id": "7a05b8da-bcf8-4c28-82bf-12d27b7494aa",
          "name": "Batch 1",
          "regDate": null,
          "active": 1,
          "endDate": null,
          "classroomLink": null,
          "averageBand": null,
          "totalAverageBand": null,
          "createdAt": "2023-05-20 08:12:08",
          "updatedAt": "2023-05-20 08:12:08",
          "organizationId": "ORG3"
        },
        {
          "id": "8c6cd362-6db4-44d5-aae7-013afccceb38",
          "name": "Batch 1",
          "regDate": null,
          "active": 0,
          "endDate": "2023-05-23 10:31:41",
          "classroomLink": "https://meet.google.com/kym-qozx-fhz",
          "averageBand": null,
          "totalAverageBand": null,
          "createdAt": "2023-05-19 13:31:47",
          "updatedAt": "2023-05-25 20:19:49",
          "organizationId": "ORG1"
        },
        {
          "id": "9ca511bf-9a1f-4e2b-b72f-d7a98dfd423d",
          "name": "Batch 3",
          "regDate": null,
          "active": 0,
          "endDate": "2023-05-25 20:16:33",
          "classroomLink": null,
          "averageBand": null,
          "totalAverageBand": null,
          "createdAt": "2023-05-23 10:58:05",
          "updatedAt": "2023-05-25 20:16:33",
          "organizationId": "ORG1"
        },
        {
          "id": "bd7b63a1-b248-4bf9-b5a2-545e911c5fd8",
          "name": "Batch 2",
          "regDate": null,
          "active": 0,
          "endDate": "2023-05-23 06:20:29",
          "classroomLink": null,
          "averageBand": null,
          "totalAverageBand": null,
          "createdAt": "2023-05-19 18:10:00",
          "updatedAt": "2023-05-23 06:20:29",
          "organizationId": "ORG1"
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
