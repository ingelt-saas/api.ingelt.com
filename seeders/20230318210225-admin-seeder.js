"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "admins",
      [
        {
          "id": "IGO3E7",
          "name": "Sumit Kaushik",
          "email": "sumit@ingelt.com",
          "password": "$2b$10$gowfk2YxzRBw9/MI8zFOBeC3E5eFR51RV0lruaJxIFgQnhlMTOjdS",
          "picture": "admin/profile/1684520152656-52.jpeg",
          "createdAt": "2023-05-19 12:52:18",
          "updatedAt": "2023-05-19 18:17:29",
          "organizationId": "ORG1"
        },
        {
          "id": "IGO3E8",
          "name": "Jane Doe",
          "email": "janedoe@email.com",
          "password": "$2b$10$gowfk2YxzRBw9/MI8zFOBeC3E5eFR51RV0lruaJxIFgQnhlMTOjdS",
          "picture": "https://picsum.photos/200",
          "createdAt": "2023-05-19 12:52:18",
          "updatedAt": "2023-05-19 12:52:18",
          "organizationId": "ORG2"
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
