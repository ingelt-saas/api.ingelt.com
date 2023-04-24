"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "admins",
      [
        {
          id: "ADM01",
          organizationId: "ORG1",
          name: "John Doe",
          email: "johndoe@email.com",
          password: "password",
          picture: "https://picsum.photos/200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ADM02",
          organizationId: "ORG2",
          name: "Jane Doe",
          email: "janedoe@email.com",
          password: "password",
          picture: "https://picsum.photos/200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ADM03",
          organizationId: "ORG3",
          name: "John Davis",
          email: "davis@email.com",
          password: "password",
          picture: "https://picsum.photos/200",
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
