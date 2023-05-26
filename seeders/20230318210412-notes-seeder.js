"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "notes",
      [
        {
          "id": "134338b1-0bd8-4e7e-9ac7-e556b2b98fb9",
          "name": "board brochure.pdf",
          "file": "admin/notes/1684924875417-15.pdf",
          "uploaderName": "Gunjan Singh",
          "uploaderId": "IGT3EA",
          "subject": "speaking",
          "fileSize": 517457,
          "createdAt": "2023-05-24 10:41:19",
          "updatedAt": "2023-05-24 10:41:19",
          "organizationId": "ORG1"
        },
        {
          "id": "15409f47-192e-4056-be7b-a0e3ba960d78",
          "name": "board brochure.pdf",
          "file": "admin/notes/1684925087389-47.pdf",
          "uploaderName": "John Davis",
          "uploaderId": "IGO3E9",
          "subject": "speaking",
          "fileSize": 517457,
          "createdAt": "2023-05-24 10:44:51",
          "updatedAt": "2023-05-24 10:44:51",
          "organizationId": "ORG1"
        },
        {
          "id": "40bc558b-1b36-4641-b722-2f91aa0e6508",
          "name": "download.pdf",
          "file": "admin/notes/1684847639185-59.pdf",
          "uploaderName": "Gunjan Singh",
          "uploaderId": "c3444075-3a53-4e42-b350-3cba8dc6b705",
          "subject": "reading",
          "fileSize": 192056,
          "createdAt": "2023-05-23 13:14:00",
          "updatedAt": "2023-05-23 13:14:00",
          "organizationId": "ORG1"
        },
        {
          "id": "53335543-3215-43ce-bf66-440d4b0e3045",
          "name": "board brochure.pdf",
          "file": "admin/notes/1685078209200-49.pdf",
          "uploaderName": "John Davis",
          "uploaderId": "IGO3E9",
          "subject": "writing",
          "fileSize": 517457,
          "createdAt": "2023-05-26 05:16:50",
          "updatedAt": "2023-05-26 05:16:50",
          "organizationId": "ORG1"
        },
        {
          "id": "5b794822-8436-4897-954c-894db8efddad",
          "name": "IELTS Business Proposal.pdf",
          "file": "admin/notes/1684521532649-52.pdf",
          "uploaderName": "John Doe",
          "uploaderId": "ADM01",
          "subject": "speaking",
          "fileSize": 517457,
          "createdAt": "2023-05-19 18:38:55",
          "updatedAt": "2023-05-19 18:38:55",
          "organizationId": "ORG1"
        },
        {
          "id": "747ef799-0045-47b3-a43d-1caa0467147f",
          "name": "IELTS Business Proposal.pdf",
          "file": "admin/notes/1684521549062-9.pdf",
          "uploaderName": "John Doe",
          "uploaderId": "ADM01",
          "subject": "reading",
          "fileSize": 517457,
          "createdAt": "2023-05-19 18:39:10",
          "updatedAt": "2023-05-19 18:39:10",
          "organizationId": "ORG1"
        },
        {
          "id": "7d1d02bb-803c-4538-807a-d7c564072c71",
          "name": "teacher.pdf",
          "file": "admin/notes/1685071018945-58.pdf",
          "uploaderName": "Gunjan Singh",
          "uploaderId": "IGT3EA",
          "subject": "reading",
          "fileSize": 192056,
          "createdAt": "2023-05-26 03:17:00",
          "updatedAt": "2023-05-26 03:17:00",
          "organizationId": null
        },
        {
          "id": "8899a6a9-ce47-4e6c-8219-baf83fce0dde",
          "name": "teacher.pdf",
          "file": "admin/notes/1685078099258-59.pdf",
          "uploaderName": "Sumit Kaushik",
          "uploaderId": "IGO3E7",
          "subject": "speaking",
          "fileSize": 192056,
          "createdAt": "2023-05-26 05:15:00",
          "updatedAt": "2023-05-26 05:15:00",
          "organizationId": "ORG1"
        },
        {
          "id": "a87c1d41-f947-4e4a-bd8f-6c076039c1ff",
          "name": "board brochure.pdf",
          "file": "admin/notes/1685078260036-40.pdf",
          "uploaderName": "John Davis",
          "uploaderId": "IGO3E9",
          "subject": "listening",
          "fileSize": 517457,
          "createdAt": "2023-05-26 05:17:41",
          "updatedAt": "2023-05-26 05:17:41",
          "organizationId": "ORG1"
        },
        {
          "id": "ff51973b-de72-43c4-980c-02d47923402c",
          "name": "teacher.pdf",
          "file": "admin/notes/1685078074462-34.pdf",
          "uploaderName": "Sumit Kaushik",
          "uploaderId": "IGO3E7",
          "subject": "reading",
          "fileSize": 192056,
          "createdAt": "2023-05-26 05:14:36",
          "updatedAt": "2023-05-26 05:14:36",
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
