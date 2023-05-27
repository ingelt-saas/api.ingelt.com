"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "BatchesTeachers",
      [
        {
          "id": "2977abdc-2fc9-4bc4-9a22-d607579dd9ae",
          "subject": "reading",
          "createdAt": "2023-05-23 06:02:20",
          "updatedAt": "2023-05-23 06:02:23",
          "batchId": "8c6cd362-6db4-44d5-aae7-013afccceb38",
          "teacherId": "IGT3E9"
        },
        {
          "id": "4cd4844a-53e5-4884-896f-0e8956f9aa22",
          "subject": null,
          "createdAt": "2023-05-20 16:57:51",
          "updatedAt": "2023-05-20 16:57:51",
          "batchId": null,
          "teacherId": "IGT3E9"
        },
        {
          "id": "805417b9-81e8-4ffc-8863-4ad48d207c25",
          "subject": null,
          "createdAt": "2023-05-20 08:09:31",
          "updatedAt": "2023-05-20 08:09:31",
          "batchId": null,
          "teacherId": "IGT3E7"
        },
        {
          "id": "a08788c2-d3e4-4c7b-8f98-43fe9beffc3c",
          "subject": null,
          "createdAt": "2023-05-20 08:12:17",
          "updatedAt": "2023-05-20 08:12:17",
          "batchId": "7a05b8da-bcf8-4c28-82bf-12d27b7494aa",
          "teacherId": "IGT3E7"
        },
        {
          "id": "a1d766f9-cf33-495b-a1dd-b643d77ad9fc",
          "subject": null,
          "createdAt": "2023-05-20 08:10:11",
          "updatedAt": "2023-05-20 08:10:11",
          "batchId": null,
          "teacherId": "IGT3E8"
        },
        {
          "id": "b662f66f-3b68-47ca-9bf6-8f90a6f2861d",
          "subject": "",
          "createdAt": "2023-05-23 11:39:54",
          "updatedAt": "2023-05-23 12:01:40",
          "batchId": "9ca511bf-9a1f-4e2b-b72f-d7a98dfd423d",
          "teacherId": "IGT3E9"
        },
        {
          "id": "e1259f0a-fe9e-4f5f-9435-45a0d813c912",
          "subject": "reading;speaking",
          "createdAt": "2023-05-23 06:57:19",
          "updatedAt": "2023-05-23 06:57:23",
          "batchId": "8c6cd362-6db4-44d5-aae7-013afccceb38",
          "teacherId": "IGT3EA"
        },
        {
          "id": "e6818594-c8c8-4dd6-a476-86f366f155b7",
          "subject": null,
          "createdAt": "2023-05-19 18:11:56",
          "updatedAt": "2023-05-19 18:11:56",
          "batchId": null,
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
