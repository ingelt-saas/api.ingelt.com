"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "discussions",
      [
        {
          id: "06235d62-f35c-4e85-9609-ff34524b1638",
          senderId: "7adf4851-0b40-4c83-bad3-b21027fe7b86",

          message: "concept",
          designation: "student",
          createdAt: "2023-05-21 17:19:23",
          updatedAt: "2023-05-21 17:19:23",
        },
        {
          id: "0b92aa28-fdf6-43bc-9550-9a9ac400498c",
          senderId: "c3444075-3a53-4e42-b350-3cba8dc6b705",

          message: "Hello, Speaking Instructor This Side, Ms. Alexandra Botez",
          designation: "teacher",
          createdAt: "2023-05-23 07:09:45",
          updatedAt: "2023-05-23 07:09:45",
        },
        {
          id: "1ef93549-3726-4ed5-b20f-55087fb2c7cc",
          senderId: "a7a6f39a-73a5-4093-aa4f-372f11438148",

          message: "Hi",
          designation: "student",
          createdAt: "2023-05-25 19:46:44",
          updatedAt: "2023-05-25 19:46:44",
        },
        {
          id: "4aa10442-a0d7-465a-825d-ef3bc544a88a",
          senderId: "7adf4851-0b40-4c83-bad3-b21027fe7b86",

          message: "Hello",
          designation: "student",
          createdAt: "2023-05-25 19:45:14",
          updatedAt: "2023-05-25 19:45:14",
        },
        {
          id: "7c8f100a-ae8a-4758-aba0-76401b1e29b8",
          senderId: "c3444075-3a53-4e42-b350-3cba8dc6b705",

          message: "Hello World",
          designation: "teacher",
          createdAt: "2023-05-20 05:43:18",
          updatedAt: "2023-05-20 05:43:18",
        },
        {
          id: "c25d160a-b930-41b1-a3e8-35903f2726f9",
          senderId: "7adf4851-0b40-4c83-bad3-b21027fe7b86",

          message: "Lorem Ipsum",
          designation: "student",
          createdAt: "2023-05-21 14:23:03",
          updatedAt: "2023-05-21 14:23:03",
        },
        {
          id: "e2a16062-5fe0-44d1-afe8-620796df4bdf",
          senderId: "c3444075-3a53-4e42-b350-3cba8dc6b705",

          message: "What's the status?",
          designation: "teacher",
          createdAt: "2023-05-23 07:17:01",
          updatedAt: "2023-05-23 07:17:01",
        },
        {
          id: "f58022c9-094d-466e-9161-5f5c161660ff",
          senderId: "7adf4851-0b40-4c83-bad3-b21027fe7b86",

          message: "Good Night",
          designation: "student",
          createdAt: "2023-05-25 19:46:44",
          updatedAt: "2023-05-25 19:46:44",
        },
        {
          id: "f60a7347-9e10-4327-a7dd-7220863fdb1d",
          senderId: "c3444075-3a53-4e42-b350-3cba8dc6b705",
          message: "hello",
          designation: "teacher",
          createdAt: "2023-05-23 10:41:10",
          updatedAt: "2023-05-23 10:41:10",
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
